/**
 * 在文档站页面内注入 token 输入弹窗（供 page.evaluate 调用）。
 * 用户确认后执行 localStorage.setItem('x-yzw-auth-token', token)。
 * @returns {Promise<string|null>} 用户确认的 token，取消则 null
 */
function hammerShowAuacTokenPrompt() {
  return new Promise((resolve) => {
    const existing = document.getElementById('hammer-auac-token-prompt');
    if (existing) {
      existing.remove();
    }

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
}
