# 文档站登录与环境 token

## 哪些 package 需要登录

以下 **需要** 登录才可测文档站 demo：

- `@hammer/ai-chat`
- `@hammer/audit`
- `@hammer/basic`
- `@hammer/jc`

其余 package（如 `@hammer/pro`、`@hammer/portal`、`hammer`、`brick` 等）在 MCP 演示与 Playwright 运行前**不需要**登录检查。

**`loginCheck` 与 `x-yzw-auth-token` 的区别**：`loginCheck` 校验 SSO 会话 cookie；文档站业务请求在 `localStorage['x-yzw-auth-token']` 存在时写入请求头 `x-yzw-auth-token`。二者可独立——注入 token 后 `loginCheck` 仍可能返回 401，但组织树等业务接口可正常加载。

## MCP：`loginCheck` 与页面弹窗输入 token

在 `browser_navigate` 打开 `https://localhost:8000`（或目标页）后，用 `browser_run_code` 执行 loginCheck：

```js
async (page) => {
  return page.evaluate(async () => {
    try {
      const res = await fetch(
        'https://auac-sso.yzwqa.cn/api/auac/sso/v1/loginCheck',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jcLoginCompatibly: false }),
          credentials: 'include',
        }
      );
      const data = await res.json().catch(() => null);
      return { ok: res.ok, status: res.status, data };
    } catch (e) {
      return { ok: false, error: String(e) };
    }
  });
}
```

若 `ok` 为 false（或请求异常），且 `localStorage` 中尚无 `x-yzw-auth-token`：

1. 用 `browser_run_code` 调用 `promptForAuacTokenInPage`（实现见 [auth-setup.template.ts](../auth-setup.template.ts) 或 [scripts/auac-token-prompt.browser.js](../scripts/auac-token-prompt.browser.js)），在页面中央弹出带 **input** 的对话框。
2. **暂停**自动操作，提示用户：在 MCP 浏览器弹窗中粘贴 **yzw-auac-token** 并点击「确认」。
3. 用户确认后，页面内执行：
   ```js
   window.localStorage.setItem('ENV', 'qa');
   window.localStorage.setItem('x-yzw-auth-token', token值);
   ```
4. `browser_run_code` 中 `await page.reload({ waitUntil: 'load' })`，再 `browser_navigate` 到目标 demo。

若用户在对话中直接提供了 token 字符串，也可先写入 `localStorage` 再 `reload`（与弹窗效果相同）：

```js
async (page) => {
  const token = '用户提供的yzw-auac-token';
  await page.evaluate((t) => {
    localStorage.setItem('ENV', 'qa');
    localStorage.setItem('x-yzw-auth-token', t);
  }, token);
  await page.reload({ waitUntil: 'load' });
}
```

## 环境设置（备选）

右下角 **环境设置** 也可手动填入 token（与弹窗写入的 `localStorage` 键一致）。Locator 见下表；Playwright 自动化优先使用弹窗或 `YZW_AUAC_TOKEN`，环境设置 UI 仅作人工兜底。

| 元素 | Locator |
|------|---------|
| 环境设置入口 | `getByRole('button', { name: '环境设置' })` |
| 用户中心 token | `getByLabel('用户中心token')` |
| 提交 | `getByRole('button', { name: /设\s*置/ })` |
| 首次提示（若有） | `getByRole('button', { name: '我知道了' })` |

实现见 `packages/site/.dumi/theme/layouts/GlobalLayout/components/Settings/EnvSetting.tsx`。

## 生成的 Playwright 测试

- **需登录的 package**（`ai-chat`、`audit`、`basic`、`jc`）：将 [auth-setup.template.ts](../auth-setup.template.ts) 复制为 `src/__test__/helpers/auth-setup.ts`，在 `test.beforeEach` 中调用 `ensureDocSiteLoggedIn(page)`。
- **免登录 package**（如 `pro`、`portal` 等）：**不要** 引入 auth helper。
- **CI / 无头**：须设置环境变量 `YZW_AUAC_TOKEN`（保留 URL 编码）。
- **本地有头**：无环境变量时自动弹出页面 input 弹窗，等待用户输入并确认（最长 5 分钟）。
