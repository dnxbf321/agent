import type { Page } from '@playwright/test';

/** 文档站 EnvSetting 写入的 localStorage 键 */
const TOKEN_KEY = 'x-yzw-auth-token';
const ENV_KEY = 'ENV';
const LOGIN_CHECK_URL =
  'https://auac-sso.yzwqa.cn/api/auac/sso/v1/loginCheck';

/** 弹窗等待用户输入 token 的最长时间（毫秒） */
const PROMPT_TIMEOUT_MS = 5 * 60 * 1000;

/** 须完成 loginCheck / token 注入才可测 demo 的 package */
export const PACKAGES_REQUIRING_LOGIN = new Set([
  '@hammer/ai-chat',
  '@hammer/audit',
  '@hammer/basic',
  '@hammer/jc',
]);

export function packageNeedsLogin(packageName: string) {
  return PACKAGES_REQUIRING_LOGIN.has(packageName);
}

async function loginCheckOk(page: Page) {
  return page.evaluate(async (url) => {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jcLoginCompatibly: false }),
        credentials: 'include',
      });
      return res.ok;
    } catch {
      return false;
    }
  }, LOGIN_CHECK_URL);
}

async function readStoredToken(page: Page) {
  return page.evaluate((key) => localStorage.getItem(key), TOKEN_KEY);
}

async function injectTokenToLocalStorage(page: Page, token: string) {
  await page.evaluate(
    ({ envKey, tokenKey, auacToken }) => {
      localStorage.setItem(envKey, 'qa');
      localStorage.setItem(tokenKey, auacToken);
    },
    { envKey: ENV_KEY, tokenKey: TOKEN_KEY, auacToken: token }
  );
  await page.reload({ waitUntil: 'load' });
}

/**
 * 在页面内弹出带 input 的对话框，用户确认后写入 x-yzw-auth-token。
 * 实现与 scripts/auac-token-prompt.browser.js 保持一致。
 */
export async function promptForAuacTokenInPage(page: Page) {
  return page.evaluate(() => {
    return new Promise<string | null>((resolve) => {
      const existing = document.getElementById('hammer-auac-token-prompt');
      existing?.remove();

      const overlay = document.createElement('div');
      overlay.id = 'hammer-auac-token-prompt';
      overlay.style.cssText =
        'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;';

      const panel = document.createElement('div');
      panel.style.cssText =
        'background:#fff;padding:24px;border-radius:8px;min-width:420px;max-width:90vw;box-shadow:0 6px 24px rgba(0,0,0,.15);font-family:system-ui,sans-serif;';

      const title = document.createElement('div');
      title.textContent = '需要用户中心 token';
      title.style.cssText = 'font-size:16px;font-weight:600;margin-bottom:8px;';

      const desc = document.createElement('div');
      desc.textContent =
        'loginCheck 未通过。请粘贴用户中心 cookie「yzw-auac-token」的值（保留 URL 编码）。';
      desc.style.cssText =
        'font-size:13px;color:#666;margin-bottom:12px;line-height:1.5;';

      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'yzw-auac-token 值';
      input.autocomplete = 'off';
      input.style.cssText =
        'width:100%;box-sizing:border-box;padding:8px 11px;border:1px solid #d9d9d9;border-radius:6px;font-size:13px;margin-bottom:16px;';

      const actions = document.createElement('div');
      actions.style.cssText = 'display:flex;justify-content:flex-end;gap:8px;';

      const cancelBtn = document.createElement('button');
      cancelBtn.type = 'button';
      cancelBtn.textContent = '取消';
      cancelBtn.style.cssText =
        'padding:6px 16px;border:1px solid #d9d9d9;border-radius:6px;background:#fff;cursor:pointer;';

      const okBtn = document.createElement('button');
      okBtn.type = 'button';
      okBtn.textContent = '确认';
      okBtn.style.cssText =
        'padding:6px 16px;border:none;border-radius:6px;background:#1677ff;color:#fff;cursor:pointer;';

      const confirm = () => {
        const token = input.value.trim();
        if (!token) {
          input.style.borderColor = '#ff4d4f';
          input.focus();
          return;
        }
        window.localStorage.setItem('ENV', 'qa');
        window.localStorage.setItem('x-yzw-auth-token', token);
        overlay.remove();
        resolve(token);
      };

      okBtn.addEventListener('click', confirm);
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') confirm();
      });
      cancelBtn.addEventListener('click', () => {
        overlay.remove();
        resolve(null);
      });

      actions.append(cancelBtn, okBtn);
      panel.append(title, desc, input, actions);
      overlay.append(panel);
      document.body.appendChild(overlay);
      input.focus();
    });
  });
}

/**
 * 打开文档站并完成鉴权。
 * 顺序：loginCheck → 已有 localStorage token → YZW_AUAC_TOKEN → 页面弹窗输入 token。
 */
export async function ensureDocSiteLoggedIn(
  page: Page,
  token = process.env.YZW_AUAC_TOKEN
) {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  if (await loginCheckOk(page)) {
    return;
  }

  if (await readStoredToken(page)) {
    return;
  }

  if (token) {
    await injectTokenToLocalStorage(page, token);
    if (await readStoredToken(page)) {
      return;
    }
  }

  const isHeadless = process.env.CI === 'true' || process.env.CI === '1';
  if (isHeadless && !token) {
    throw new Error(
      'loginCheck 未通过：CI/无头环境请设置环境变量 YZW_AUAC_TOKEN（用户中心 cookie yzw-auac-token）'
    );
  }

  page.setDefaultTimeout(PROMPT_TIMEOUT_MS);
  const promptedToken = await promptForAuacTokenInPage(page);
  page.setDefaultTimeout(30_000);

  if (!promptedToken) {
    throw new Error(
      '未获取到 yzw-auac-token：请在弹窗中输入并确认，或设置环境变量 YZW_AUAC_TOKEN'
    );
  }

  await page.reload({ waitUntil: 'load' });
}
