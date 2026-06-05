---
name: create-hammer-playwright-test
description: >-
  在 Hammer 组件库中，利用 Playwright MCP 为组件生成 Playwright 功能测试（__test__/*.spec.ts）。
  默认先请用户在 MCP 浏览器中演示交互再写代码（除非用户拒绝）。
  布局敏感组件须用 __test__/fixtures.ts 固定视口 1200×900；其余组件 MCP 与 config 默认 1800×900。
  对 @hammer/ai-chat、@hammer/audit、@hammer/basic、@hammer/jc，打开浏览器后须 loginCheck 与环境 token 设置。
  步骤变更时同步更新 test 标题与文件名。当用户要为 Hammer 组件写 E2E/功能测试、Playwright MCP、
  create-hammer-playwright-test、文档站 demo、yzw-auac-token、环境设置、或需登录的组件演示测试时，必须使用本 skill。
---

# Hammer 组件 Playwright 测试生成

在 Hammer monorepo 中，根据用户描述的测试步骤，借助 **Playwright MCP**（`user-playwright`）探索页面并生成 Playwright 测试文件。

## 前置：明确两个值

生成测试代码前，必须明确：

1. **组件名称**（PascalCase，如 `SearchForm`）
2. **package**（`package.json` 的 `name` 字段，如 `@hammer/pro`）

若用户已直接给出，记录下来；否则进入「自动推断」。

## 自动推断（当前打开文件）

**条件**：当前打开文件路径匹配：

```text
packages/{ai-chat,audit,basic,brick,hammer,icons,jc,portal,pro,rich-editor,template-center}/src/*/*.index.{tsx,ts}
```

**规则**：

| 字段     | 推断方式                                                              |
| -------- | --------------------------------------------------------------------- |
| 组件名称 | `index` 文件所在**文件夹名** → 大驼峰（`search-form` → `SearchForm`） |
| package  | 自该文件向上查找最近的 `package.json`，读取 `name`                    |

**大驼峰转换**：按 `-` 分段，每段首字母大写后拼接。

推断完成后，**必须向用户展示**推断结果并请其确认或修正，例如：

```text
推断结果（请确认或修正）：
- 组件名称：SearchForm
- package：@hammer/pro
```

用户确认后再继续。

## 反推组件源码目录

根据 **组件名称** + **package** 定位组件 `index` 文件目录：

1. **package 目录**：`name` 为 `@hammer/{pkg}` 时取 `{pkg}`；`name` 为 `hammer`、`brick` 等无 scope 时，在 `packages/` 下按同名目录匹配。
2. **组件文件夹**：组件名 PascalCase → kebab-case（`SearchForm` → `search-form`）。
3. **index 文件**：在 `packages/{pkgDir}/src/{kebab}/` 下查找 `*.index.tsx` 或 `*.index.ts`。

使用 Glob 验证路径存在。若**找不到**任何匹配的 index 文件 → **结束任务**，说明反推失败，请用户补充正确路径或命名。

> 说明：部分历史组件可能仅有 `index.tsx` 而无 `*.index.ts(x)`；若用户确认使用该路径，以同级 `index.tsx` 所在目录作为组件目录，但自动反推仍以 `*.index.{tsx,ts}` 为准。

## 测试文件路径与命名

测试文件写在组件目录下的 `__test__/` 中，**不要**写在 `index` 同级根目录。

```text
packages/{pkg}/src/{kebab}/__test__/{文件名}.spec.ts
```

**文件名**：根据测试内容自动生成 kebab-case，需见名知意，例如：

| 测试场景               | 文件名示例                               |
| ---------------------- | ---------------------------------------- |
| 筛选设置弹窗全选与重置 | `setting-panel-select-all-reset.spec.ts` |
| 基础查询与展开收起     | `basic-search-expand.spec.ts`            |

命名建议：组件能力 + 关键动作/断言点，2～5 个英文单词，全小写、连字符分隔。若用户指定文件名则优先采用。

生成前若 `__test__` 目录不存在则创建。

## 文档站 URL 与 page.goto

本地文档站 `baseURL` 为 `https://localhost:8000`（见 [playwright-config.template.ts](playwright-config.template.ts)）。

- 文档 md：`packages/site/docs/components/{包名}-{组件kebab}.md`
- Demo URL：`/~demos/docs-components-{包名}-{组件kebab}-demo-{demo名}`
- Demo 锚点：`#root`

### page.goto 规则

`playwright.config.ts` 已配置 `use.baseURL` 时，**优先去掉 origin，只传路径**：

| 用户/拼接得到的完整 URL             | 写入测试代码的 `page.goto` 参数 |
| ----------------------------------- | ------------------------------- |
| `https://localhost:8000/~demos/...` | `'/~demos/...'`                 |
| `http://localhost:8000/foo?bar=1`   | `'/foo?bar=1'`                  |

实现方式：用 `URL` 解析完整地址，取 `pathname + search + hash`（保证以 `/` 开头）。**不要**在测试中重复写 `https://localhost:8000`。

```ts
// 推荐：依赖 baseURL
await page.goto("/~demos/docs-components-pro-search-form-demo-demosetting");
```

用户未提供 URL 时，根据组件与 demo 名拼接完整 URL 后同样剥离 origin；MCP 探索阶段可用完整 URL 调用 `browser_navigate`，生成代码时仍转为相对路径。

若用户提供的 origin 与 `baseURL` 不一致，在回复中说明并询问是否调整 `baseURL`，或对该用例保留完整 URL。

## 浏览器视口

**布局敏感组件**（SearchForm、FieldGrid）细则见 [references/layout-viewport.md](references/layout-viewport.md)。

### 布局敏感组件：fixtures.ts

当组件属于 **SearchForm / FieldGrid** 时：

1. 在 `__test__/fixtures.ts` 写入 **1200×900**（可复制 [fixtures.template.ts](fixtures.template.ts)）。
2. 各 `*.spec.ts` 从 `./fixtures` 引入 `test` / `expect`，**不要**从 `@playwright/test` 直接引入。
3. MCP 探索时 `browser_resize` 须为 **1200×900**，与 fixtures 一致。

```ts
export const LAYOUT_SENSITIVE_VIEWPORT = { width: 1200, height: 900 } as const;
export const test = base.extend({});
test.use({ viewport: LAYOUT_SENSITIVE_VIEWPORT });
```

package 级 `playwright.config.ts` 仍保持 1800×900；布局敏感组件仅通过 fixtures 覆盖。

### 默认视口（1800×900）

| 场景                          | 做法                                                        |
| ----------------------------- | ----------------------------------------------------------- |
| MCP 演示 / 探索（非布局敏感） | `browser_resize`：`width: 1800`, `height: 900`              |
| 非布局敏感 `*.spec.ts`        | 依赖 `playwright.config.ts`，**不要**重复 `setViewportSize` |
| **布局敏感组件**              | MCP 与 fixtures 均为 **1200×900**                           |
| 用户指定其它视口              | 同步改 MCP、fixtures 或 config，并在回复中说明              |

MCP 示例（先读 `browser_resize.json` schema 再调用）：

```json
{ "width": 1800, "height": 900 }
```

**须写在 `projects[].use` 内**，在 `...devices['Desktop Chrome']` 之后覆盖；仅写顶层 `use.viewport` 会被 device 默认值盖掉。

## 文档站登录（需登录的 package）

MCP 演示与 Playwright 测试根据已确认的 **package** 判断是否走本节；需登录 package 列表见 [references/doc-site-login.md](references/doc-site-login.md)。

### MCP 流程（打开浏览器后、进入目标 demo 前）

1. `browser_resize`（**布局敏感组件 1200×900**，其余 **1800×900**）后，`browser_navigate` 至 `https://localhost:8000`（或即将测试的页面）。
2. 用 `browser_run_code` 在页面内执行 **POST** `https://auac-sso.yzwqa.cn/api/auac/sso/v1/loginCheck`，body：`{ jcLoginCompatibly: false }`，`credentials: 'include'`（完整片段见 [references/doc-site-login.md](references/doc-site-login.md)）。
3. **若 `ok` 为 false** 且 `localStorage` 无 `x-yzw-auth-token`：调用 `promptForAuacTokenInPage`（见 [auth-setup.template.ts](auth-setup.template.ts)），在页面弹出带 **input** 的对话框，提示用户粘贴 **yzw-auac-token**；**暂停**自动操作，请用户在 MCP 浏览器弹窗中输入并点击「确认」。
4. 用户确认后页面执行 `localStorage.setItem('x-yzw-auth-token', token)`（同时写入 `ENV=qa`），再 `page.reload()`。
5. 若用户在对话中已提供 token，也可直接 `evaluate` 写入 `localStorage` 后 `reload`，跳过弹窗。
6. 再 `browser_navigate` 到目标 demo，继续视口、演示或探索流程。

### 生成的 Playwright 测试

- 需登录的 package（`ai-chat`、`audit`、`basic`、`jc`）：将 [auth-setup.template.ts](auth-setup.template.ts) 复制为 `src/__test__/helpers/auth-setup.ts`，在 `test.beforeEach` 中调用 `ensureDocSiteLoggedIn(page)`（`packageNeedsLogin(package)` 为 true）。
- **CI / 无头**：须提供 `YZW_AUAC_TOKEN` 环境变量（用户中心 cookie `yzw-auac-token`，保留 URL 编码）。
- **本地有头、无环境变量**：`loginCheck` 失败后自动弹出页面 input 弹窗，等待用户输入并确认（见 `scripts/auac-token-prompt.browser.js`）。
- `loginCheck` 已通过或 `localStorage` 已有 token 时跳过注入。
- 免登录 package（如 `pro`、`portal` 等）**不要** 引入 auth helper。

## 使用 Playwright MCP 生成测试

### 何时必须先请用户演示

在编写或追加测试代码之前，**务必先请用户在 Playwright MCP 打开的浏览器中演示一遍**。

**例外**：用户明确表示「不需要演示 / 直接写代码 / 按文字生成即可」时，可跳过演示，但须在回复中说明跳过了演示及可能风险。

### 演示协作流程

1. 确认文档站可访问（`packages/site` + 对应组件包 dev）；提醒用户本地地址 `https://localhost:8000`。
2. 调用 MCP `browser_resize`：**布局敏感组件 1200×900**，其余 **1800×900**（见「浏览器视口」）。
3. `browser_navigate` 至文档站；若 **package 需登录**，按上一节完成 `loginCheck` 与 token 设置后再进入 demo。
4. 用 MCP `browser_navigate` 打开目标 demo（可用完整 URL；生成代码时仍用相对路径）。
5. 用 MCP 帮用户进入待测状态，然后**暂停自动操作**，说明：「请在浏览器中按你的步骤演示，完成后回复『演示完了』」。
6. 用户演示结束后：
   - `browser_snapshot` 抓取最终 DOM；
   - 必要时 `browser_run_code` 验证 locator、拖拽、hover 点击是否与演示一致。
7. 再转写为 `@playwright/test` 代码。

### 从演示中归纳实现要点

演示结束后，在回复中简要记录（便于写入测试与 skill 沉淀）

### 生成代码步骤

用户演示完成（或用户拒绝演示）后：

1. 读取 MCP 工具 schema：`mcps/user-playwright/tools/*.json`（**调用前必读**）。
2. 常用工具：`browser_resize`（视口见上节）→ `browser_navigate` →（需登录时 `loginCheck` / 环境设置）→ `browser_snapshot` → `browser_click` / `browser_drag` / `browser_run_code` 等。
3. 按已确认步骤在页面上再走一遍（或完全依据演示结论），根据 snapshot 确认元素可达。
4. 转写为 `@playwright/test` 代码，写入 `__test__/{文件名}.spec.ts`；布局敏感组件一并生成 `fixtures.ts`；需登录 package 一并生成 `auth-setup.ts` 与 `beforeEach` 调用。

### Locator 生成规则

用户未指定 locator 时，按下列优先级生成（并在最终回复中**列出全部 locator**）：

| 用户描述模式                   | 推荐 locator                                                                                    |
| ------------------------------ | ----------------------------------------------------------------------------------------------- |
| `xx按钮`                       | `button.hammer-btn:has-text(xx)`                                                                |
| `xx弹窗`                       | `div.hammer-modal` + `.filter({ has: page.locator('.hammer-modal-title', { hasText: 'xx' }) })` |
| `xx checkbox`                  | `label.hammer-checkbox-wrapper:has(.hammer-checkbox-label:has-text(xx))`                        |
| `checkbox 已勾选`              | `input[type="checkbox"]:checked`                                                                |
| `checkbox 未勾选`              | `input[type="checkbox"]:not(:checked)`                                                          |
| `已禁用`                       | `:disabled`                                                                                     |
| `xx卡片`                       | `.hammer-card:has(.hammer-card-title-content:has-text(xx))`                                     |
| `xx表单项`                     | `.hammer-form-item:has(.hammer-form-item-label:has-text(xx))`                                   |
| `下拉选择器` / `Select`        | `.hammer-select`                                                                                |
| `下拉框` / `Dropdown`          | `.hammer-select-dropdown:visible`                                                               |
| `树` / `Tree`                  | `.hammer-tree`                                                                                  |
| `树节点` / `Tree node`         | `.hammer-tree-treenode`                                                                         |
| `编辑表格` / `Edit table`      | `.hammer-edittablev2`                                                                           |
| `表格` / `Table`               | `.hammer-pro-table`                                                                             |
| `xx列`                         | `.hammer-table-thead .hammer-table-cell:has-text(xx)`                                           |
| Demo 容器（dumi 独立 demo 页） | `#root`                                                                                         |
| 仅有中文元素名、无 locator     | 优先 `page.getByText('xx')` 或 `locator(..., { hasText: 'xx' })`                                |
| 其余                           | `[data-testid=element_auto_testid]`（`element_auto_testid` 由元素语义生成 kebab/snake）         |

Playwright 代码中优先使用：

```ts
page.locator("button.hammer-btn", { hasText: "xx" });
// 或
page.getByRole("button", { name: "xx" });
```

**Hammer 文案注意**：按钮文案常有空格（如「重 置」「查 询」），用 `getByRole('button', { name: /重\s*置/ })` 等正则更稳。

### 测试代码结构建议

**免登录、非布局敏感组件：**

```ts
import { test, expect } from "@playwright/test";

const DEMO_PATH = "/~demos/docs-components-pro-xxx-demo-yyy";
const DEMO_CONTAINER = "#root";

test.describe("ComponentName", () => {
  test("场景：关键动作与断言", async ({ page }) => {
    await page.goto(DEMO_PATH, { waitUntil: "domcontentloaded" });
    const demo = page.locator(DEMO_CONTAINER);
    await expect(demo).toBeVisible({ timeout: 15000 });
    // 步骤与断言
  });
});
```

**布局敏感组件** — 从 `./fixtures` 引入，并保留 `fixtures.ts`（视口 1200×900）：

```ts
import type { Locator } from "@playwright/test";
import { expect, test } from "./fixtures";
```

## 测试标题与文件名同步

测试步骤发生**新增、删除、重排或语义变更**时，必须同步更新命名，使标题、文件名与内容一致。

### 须同步的三处

| 位置                        | 规则                                                             |
| --------------------------- | ---------------------------------------------------------------- |
| `test('...')` 标题          | 中文，概括**完整**场景；用顿号或「与」连接关键步骤，避免只写首步 |
| `test.describe`             | 组件名（PascalCase），一般不变                                   |
| `__test__/{文件名}.spec.ts` | kebab-case；步骤范围变化大时重命名文件                           |

### 标题归纳方法

1. 列出所有「动作 → 预期」对。
2. 提取高频模块名（如「筛选设置弹窗」「右侧已选列表」）。
3. 提取关键动作（全选、反选、重置、拖拽排序、置顶、取消选择等）。
4. 合成一句：`{模块}：{动作1}与{动作2}与{动作3}`，控制在约 40 字以内。

**示例**：

| 步骤范围                   | 推荐 `test` 标题                                       |
| -------------------------- | ------------------------------------------------------ |
| 仅全选 + 重置              | `筛选设置：详细设置弹窗全选与重置`                     |
| 增加反选                   | `筛选设置：详细设置弹窗全选反选与重置`                 |
| 再增加右侧拖拽、置顶、删除 | `筛选设置：详细设置弹窗全选反选重置与右侧拖拽置顶删除` |

### 文件名随内容更新

- 小改（补 1～2 个断言）：可保留原文件名。
- 流程明显扩展（如新增拖拽/置顶/删除）：重命名，例如 `setting-panel-select-all-reset.spec.ts` → `setting-panel-select-drag-pin-remove.spec.ts`，或采用更贴切的新 kebab 名。
- 重命名后删除旧 spec 文件，避免重复用例。

在回复中说明：**标题**、**文件名**是否已改，以及改动理由。

## 生成后：自动完成运行前配置

写入测试文件后**立即**完成运行前配置（无需用户另行要求）：

### a) 修改 package.json

在目标 package 根目录（与组件 `package.json` 同级）：

- `devDependencies` 添加 `@playwright/test`（版本与 monorepo 其他包或 lockfile 保持一致）
- 若 `scripts.test` 尚未指向 Playwright，设为 `"playwright test"`；若已有 Jest 等其它 `test` 脚本，新增 `"test:e2e": "playwright test"` 并在回复中说明

### b) 生成或更新 playwright.config.ts

将 [playwright-config.template.ts](playwright-config.template.ts) 写入该 package 根目录的 `playwright.config.ts`（已存在则合并差异：`testDir: './src'`、`testMatch: '**/*.spec.ts'` 可匹配 `__test__` 下文件）。

配置须包含 `use.baseURL` 与 `ignoreHTTPSErrors: true`（本地 HTTPS 自签名证书）。默认视口 **1800×900** 写在 `projects[].use` 中（见模板）。**布局敏感组件**在 `__test__/fixtures.ts` 覆盖为 **1200×900**，勿改全局 config。

## 运行测试

- **默认**：完成配置后**不要**执行 `npx playwright test`，除非用户明确要求运行。
- 用户要求运行时，在对应 package 目录执行：`npx playwright test` 或 `npx playwright test src/{kebab}/__test__/{文件名}.spec.ts`

## 会话结束时的必做输出

在回复中**单独一节**列出全部 locator；若源码无 `data-testid`，说明当前依赖的选择器策略，并可选建议补充 `data-testid` 的位置。

## 工作流清单

```
- [ ] 明确/推断 组件名称 + package，并经用户确认
- [ ] 反推组件目录；失败则停止
- [ ] 确认 package 是否需登录（ai-chat/audit/basic/jc 则需）
- [ ] 确认文档站已启动（需时提醒：site + 对应组件包 dev）
- [ ] 判断是否需要用户演示；默认 MCP 开浏览器请用户演示（除非用户拒绝）
- [ ] MCP：`browser_resize`（布局敏感 1200×900 / 其余 1800×900）→ navigate →（需登录）loginCheck / 环境设置 → 目标 demo
- [ ] 布局敏感组件（SearchForm/FieldGrid）：生成 `fixtures.ts`（1200×900）；config 保持默认 1800
- [ ] 需登录 package：含 auth-setup helper
- [ ] 演示结束后 snapshot / run_code 归纳 locator 与复杂交互写法
- [ ] 写入/更新 packages/{pkg}/src/{kebab}/__test__/{auto-name}.spec.ts
- [ ] 步骤变更后同步更新 test 标题（及必要时文件名）
- [ ] 自动配置 package.json + playwright.config.ts
- [ ] 回复中列出 locator；仅用户要求时再运行测试
```

## 允许的包目录

`ai-chat`、`audit`、`basic`、`brick`、`hammer`、`icons`、`jc`、`portal`、`pro`、`rich-editor`、`template-center`

## 参考

- 配置模板：[playwright-config.template.ts](playwright-config.template.ts)
- 布局视口：[references/layout-viewport.md](references/layout-viewport.md)
- 组件 fixtures 模板：[fixtures.template.ts](fixtures.template.ts)
- 登录与环境 token：[references/doc-site-login.md](references/doc-site-login.md)
- Playwright 鉴权 helper 模板：[auth-setup.template.ts](auth-setup.template.ts)
- 页面 token 弹窗脚本：[scripts/auac-token-prompt.browser.js](scripts/auac-token-prompt.browser.js)
- 示例：`packages/pro/src/search-form/__test__/`
- 本地开发：`packages/site` → `pnpm run start`（`https://localhost:8000`）
