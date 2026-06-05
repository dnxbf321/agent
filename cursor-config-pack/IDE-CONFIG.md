# IDE 配置文档

> 采集时间：2026-06-05  
> 环境：macOS · dengjiayao  
> 范围：**仅用户级配置**，不含项目级 `.vscode/`、`.editorconfig`、`.prettierrc` 等

---

## 配置文件路径总览

| 类型 | Cursor | VS Code |
| --- | --- | --- |
| 用户 Settings | `~/Library/Application Support/Cursor/User/settings.json` | `~/Library/Application Support/Code/User/settings.json` |
| 按键绑定 | `~/Library/Application Support/Cursor/User/keybindings.json` | `~/Library/Application Support/Code/User/keybindings.json` |
| 扩展目录 | `~/.cursor/extensions/` | `~/.vscode/extensions/` |
| MCP 配置 | `~/.cursor/mcp.json` | — |
| Cursor Skills | `~/.cursor/skills-cursor/` | — |
| Cursor Plugins | `~/.cursor/plugins/cache/` | — |
| 启动参数 | `~/.cursor/argv.json` | — |
| User Rules | Cursor Settings → Rules（云端/账户） | — |

---

## 一、VS Code 配置

### 1.1 已安装扩展（39 个，去重后）

#### 代码质量 / 格式化

| 扩展 ID | 版本 | 名称 |
| --- | --- | --- |
| `esbenp.prettier-vscode` | 12.4.0 | Prettier - Code formatter |
| `dbaeumer.vscode-eslint` | 3.0.24 | ESLint |
| `stylelint.vscode-stylelint` | 2.2.1 | Stylelint |
| `editorconfig.editorconfig` | 0.18.2 | EditorConfig |
| `usernamehw.errorlens` | 3.28.0 | Error Lens |
| `drknoxy.eslint-disable-snippets` | 1.4.1 | eslint-disable-snippets |

#### 前端 / CSS

| 扩展 ID | 版本 | 名称 |
| --- | --- | --- |
| `bradlc.vscode-tailwindcss` | 0.14.29 | Tailwind CSS IntelliSense |
| `clinyong.vscode-css-modules` | 0.5.4 | CSS Modules |
| `csstools.postcss` | 1.0.9 | PostCSS Language Support |
| `mrmlnc.vscode-less` | 0.6.3 | Less IntelliSense |
| `formulahendry.auto-rename-tag` | 0.1.10 | Auto Rename Tag |
| `naumovs.color-highlight` | 2.8.0 | Color Highlight |
| `kisstkondoros.vscode-gutter-preview` | 0.32.2 | Image preview |
| `styled-components.vscode-styled-components` | 1.7.8 | Styled Components |

#### Git

| 扩展 ID | 版本 | 名称 |
| --- | --- | --- |
| `eamodio.gitlens` | 17.12.2 | GitLens |
| `mhutchie.git-graph` | 1.30.0 | Git Graph |
| `codezombiech.gitignore` | 0.10.0 | gitignore |

#### 开发效率

| 扩展 ID | 版本 | 名称 |
| --- | --- | --- |
| `chakrounanas.turbo-console-log` | 3.22.0 | Turbo Console Log |
| `christian-kohler.path-intellisense` | 2.10.0 | Path Intellisense |
| `christian-kohler.npm-intellisense` | 1.4.5 | npm Intellisense |
| `jasonnutter.search-node-modules` | 1.3.0 | Search node_modules |
| `gruntfuggly.todo-tree` | 0.0.226 | Todo Tree |
| `cardinal90.multi-cursor-case-preserve` | 1.0.5 | Multiple cursor case preserve |
| `aaron-bond.better-comments` | 3.0.2 | Better Comments |
| `psioniq.psi-header` | 1.25.4 | psioniq File Header |
| `mikestead.dotenv` | 1.0.1 | DotENV |
| `oderwat.indent-rainbow` | 8.3.1 | indent-rainbow |
| `uctakeoff.vscode-counter` | 3.7.2 | VSCode Counter |
| `wallabyjs.quokka-vscode` | 1.0.759 | Quokka.js |
| `ritwickdey.liveserver` | 5.7.10 | Live Server |
| `yzane.markdown-pdf` | 2.0.1 | Markdown PDF |

#### 主题 / 可视化

| 扩展 ID | 版本 | 名称 |
| --- | --- | --- |
| `zhuangtongfa.material-theme` | 3.19.0 | One Dark Pro |
| `pkief.material-icon-theme` | 5.34.0 | Material Icon Theme |
| `vscode-icons-team.vscode-icons` | 12.18.0 | vscode-icons |

#### AI / 内部工具

| 扩展 ID | 版本 | 名称 |
| --- | --- | --- |
| `github.copilot-chat` | 0.48.1 | GitHub Copilot Chat |
| `ahmadalli.vscode-nginx-conf` | 0.3.5 | nginx.conf |
| `cweijan.vscode-office` | 3.5.4 | Office Viewer |

#### 语言包

| 扩展 ID | 版本 | 名称 |
| --- | --- | --- |
| `ms-ceintl.vscode-language-pack-zh-hans` | 1.118.x | 简体中文语言包 |

### 1.2 编辑器配置（settings.json 摘要）

#### 外观与主题

| 配置项 | 值 |
| --- | --- |
| 颜色主题 | `One Dark Pro` |
| 图标主题 | `Material Icon Theme` |
| 字体大小 | `14` |
| Activity Bar | 顶部（`workbench.activityBar.location: top`） |
| Minimap | 关闭 |
| 面包屑导航 | 关闭 |
| 括号配对着色 | 开启 |
| 显示空白字符 | `all` |
| Tab 宽度 | `2` |
| 行尾 | `\n` (LF) |

#### 编辑器行为

| 配置项 | 值 | 说明 |
| --- | --- | --- |
| `files.autoSave` | `off` | 不自动保存 |
| `files.insertFinalNewline` | `true` | 文件末尾插入换行 |
| `files.trimTrailingWhitespace` | `true` | 去除行尾空格 |
| `editor.defaultFormatter` | Prettier | 全局默认格式化 |
| `editor.codeActionsOnSave` | ESLint: never, Stylelint: explicit | 保存时不自动 ESLint fix |
| `editor.acceptSuggestionOnEnter` | `smart` | 智能接受补全 |
| `editor.quickSuggestions` | comments/strings 均 on | 注释和字符串内也补全 |
| `editor.suggest.preview` | `true` | 补全预览 |
| `prettier.singleQuote` | `true` | 单引号 |
| `typescript.preferences.quoteStyle` | `double` | TS 引号偏好双引号 |
| `npm.packageManager` | `pnpm` | 包管理器 |

#### 语言专属 Formatter

| 语言 | Formatter |
| --- | --- |
| JavaScript / TS / JSX / TSX / JSON / JSONC | Prettier |
| HTML | VS Code 内置 |
| XML | DotJoshJohnson.xml |
| Markdown | 自动换行 on |

#### 终端

| 配置项 | 值 |
| --- | --- |
| macOS 外部终端 | `iTerm.app` |
| 退出确认 | `hasChildProcesses` |
| Windows 默认 Profile | Git Bash |
| 光标闪烁 | 开启 |
| Code Runner | 在终端运行 |

#### Git

| 配置项 | 值 |
| --- | --- |
| `git.autofetch` | `true` |
| `git.autoStash` | `true` |
| `git.enableSmartCommit` | `true` |
| `git.showPushSuccessNotification` | `true` |
| `git.openRepositoryInParentFolders` | `never` |
| GitLens Plus | 关闭 |
| GitLens Status Bar PR | 关闭 |
| GitLens Welcome / WhatsNew | 关闭 |

#### 文件头（psi-header）

```json
{
  "author": "dengjiayao",
  "authorEmail": "dengjiayao@xiaoduotech.com",
  "template": [
    "@Date: <<filecreated('YYYY-MM-DD HH:mm:ss')>>",
    "@Author: <<author>>",
    "-----",
    "@Description: "
  ],
  "changes-tracking": {
    "isActive": true,
    "autoHeader": "manualSave",
    "exclude": ["css", "less"]
  }
}
```

#### 其他扩展相关配置

| 扩展 / 功能 | 关键配置 |
| --- | --- |
| Settings Sync | 已启用（`sync.autoUpload: true`） |
| Turbo Console Log | `quote: "\`"`, `logType: debug` |
| GitHub Copilot | Code Actions 关闭，Fix Test Failure 关闭 |
| CodeGPT | 语言 Chinese |
| DeepSeek | 已配置（baseURL / model / lang，**不含 API Key**） |
| VSCode Counter | 排除 node_modules、dist、tests 等 |
| search.exclude | `**/dist`, `**/renew` |
| indent-rainbow | `indicatorStyle: light` |
| auto-rename-tag | 所有语言激活 |

### 1.3 按键绑定（keybindings.json）

#### 有效自定义绑定

| 快捷键 (macOS) | 命令 | 说明 |
| --- | --- | --- |
| `⇧⌘F` | `editor.action.formatDocument` | 格式化文档（取代全局搜索） |
| `⇧⌥F` | `workbench.action.findInFiles` | 全局文件搜索（取代格式化） |
| `⌘Y` | `redo` | 重做（取代 ⇧⌘Z） |
| `⇧⌘C` | `csscomb.execute` | CSSComb 排序 |
| `⇧⌘O` | `editor.action.organizeImports` | 整理 import（取代跳转符号） |
| `⌘L ⌘L` | `turboConsoleLog.displayLogMessage` | Turbo Console Log 输出 |

#### 已解除的默认绑定

| 快捷键 | 原命令 |
| --- | --- |
| `⌘\` | 拆分编辑器 / 拆分终端 |
| `⇧⌘K` | 删除行 / CodeGPT inline edit |
| `⇧⌥O` | organizeImports（改到 ⇧⌘O） |
| `⇧⌥F` | formatDocument（改到 ⇧⌘F） |
| `ctrl+alt+l` | turboConsoleLog（改到 ⌘L ⌘L） |

---

## 二、Cursor 配置

> Cursor 基于 VS Code，以下列出 Cursor **完整扩展清单**、**配置差异**及专属内容。

### 2.1 已安装扩展（34 个，去重后）

#### 代码质量 / 格式化

| 扩展 ID | 版本 | 名称 |
| --- | --- | --- |
| `esbenp.prettier-vscode` | 12.4.0 | Prettier - Code formatter |
| `dbaeumer.vscode-eslint` | 3.0.24 | ESLint |
| `stylelint.vscode-stylelint` | 2.2.1 | Stylelint |
| `editorconfig.editorconfig` | 0.18.2 | EditorConfig |
| `usernamehw.errorlens` | 3.26.0 | Error Lens |
| `drknoxy.eslint-disable-snippets` | 1.4.1 | eslint-disable-snippets |

#### 前端 / CSS

| 扩展 ID | 版本 | 名称 |
| --- | --- | --- |
| `bradlc.vscode-tailwindcss` | 0.14.28 | Tailwind CSS IntelliSense |
| `clinyong.vscode-css-modules` | 0.5.4 | CSS Modules |
| `csstools.postcss` | 1.0.9 | PostCSS Language Support |
| `mrmlnc.vscode-less` | 0.6.3 | Less IntelliSense |
| `formulahendry.auto-rename-tag` | 0.1.10 | Auto Rename Tag |
| `naumovs.color-highlight` | 2.8.0 | Color Highlight |
| `kisstkondoros.vscode-gutter-preview` | 0.32.2 | Image preview |

#### Git

| 扩展 ID | 版本 | 名称 | 备注 |
| --- | --- | --- | --- |
| `eamodio.gitlens` | 18.0.0 | GitLens | 已安装，**无用户 settings** |
| `waderyan.gitblame` | 13.0.1 | Git Blame | 已安装，**无用户 settings** |
| `mhutchie.git-graph` | 1.30.0 | Git Graph | — |
| `codezombiech.gitignore` | 0.10.0 | gitignore | — |

#### 开发效率

| 扩展 ID | 版本 | 名称 |
| --- | --- | --- |
| `chakrounanas.turbo-console-log` | 3.23.0 | Turbo Console Log |
| `christian-kohler.path-intellisense` | 2.10.0 | Path Intellisense |
| `christian-kohler.npm-intellisense` | 1.4.5 | npm Intellisense |
| `jasonnutter.search-node-modules` | 1.3.0 | Search node_modules |
| `gruntfuggly.todo-tree` | 0.0.226 | Todo Tree |
| `cardinal90.multi-cursor-case-preserve` | 1.0.5 | Multiple cursor case preserve |
| `aaron-bond.better-comments` | 3.0.2 | Better Comments |
| `psioniq.psi-header` | 1.25.1 | psioniq File Header |
| `mikestead.dotenv` | 1.0.1 | DotENV |
| `oderwat.indent-rainbow` | 8.3.1 | indent-rainbow |

#### 主题 / 可视化

| 扩展 ID | 版本 | 名称 |
| --- | --- | --- |
| `zhuangtongfa.material-theme` | 3.19.0 | One Dark Pro |
| `pkief.material-icon-theme` | 5.35.0 | Material Icon Theme |
| `mermaidchart.vscode-mermaid-chart` | 2.6.8 | Mermaid |
| `bierner.markdown-mermaid` | 1.32.1 | Markdown Preview Mermaid Support |

#### Cursor / AI / 内部工具

| 扩展 ID | 版本 | 名称 |
| --- | --- | --- |
| `anysphere.remote-ssh` | 1.0.54 | Remote - SSH |
| `whyuds.agent-skills-manager` | 0.6.0 | AgentSkillsManager |

#### 语言包

| 扩展 ID | 版本 | 名称 |
| --- | --- | --- |
| `ms-ceintl.vscode-language-pack-zh-hans` | 1.105.0 | 简体中文语言包 |

> 注：目录中另有 `anysphere.remote-ssh` 1.0.53 旧版本残留，当前生效为 1.0.54。

#### VS Code 有而 Cursor 无

GitHub Copilot Chat、Live Server、Quokka.js、VSCode Counter、nginx.conf、Office Viewer、Styled Components、vscode-icons、Markdown PDF 等。

### 2.2 编辑器配置差异（相对 VS Code）

| 配置项 | Cursor 值 | VS Code 值 |
| --- | --- | --- |
| 颜色主题 | `One Dark Pro Mix` | `One Dark Pro` |
| `typescript.locale` | `zh-CN` | 未设置（有 typo `jc/ts.locale`） |
| `prettier.proseWrap` | `never` | 未设置 |
| psi-header email | `dengjiayao@yzw.cn` | `dengjiayao@xiaoduotech.com` |
| Git Blame | 内置 `git.blame.editorDecoration.enabled: true` | 未配置 |
| GitLens settings | **已全部移除** | Plus 关闭、Status Bar PR 关闭等 |
| GitBlame settings | **已全部移除** | 未安装 |
| Mermaid | CodeLens 关闭 | 未安装 |
| VSCodeCounter | 未配置 | 已配置 exclude 规则 |
| search.exclude | 仅 `**/dist` | `**/dist` + `**/renew` |
| Settings Sync | 无 | 已启用 |
| Copilot / DeepSeek | 无 | 已配置 |

#### Cursor Git 相关 settings（当前生效）

| 配置项 | 值 |
| --- | --- |
| `git.autofetch` | `true` |
| `git.autoStash` | `true` |
| `git.enableSmartCommit` | `true` |
| `git.showPushSuccessNotification` | `true` |
| `git.openRepositoryInParentFolders` | `never` |
| `git.blame.editorDecoration.enabled` | `true` |
| `git.blame.ignoreWhitespace` | `true` |

#### Cursor 其他扩展 settings

| 扩展 / 功能 | 关键配置 |
| --- | --- |
| Turbo Console Log | `quote: "\`"` |
| auto-rename-tag | 所有语言激活 |
| indent-rainbow | `indicatorStyle: light` |
| mermaid-chart | `showGenerateDiagramCodeLens: false` |

### 2.3 按键绑定差异（相对 VS Code）

Cursor 在 VS Code 基础上**额外**解除以下 AI / Cursor 专属绑定：

| 快捷键 | 原命令 |
| --- | --- |
| `⌘K` | AI popup generate |
| `⇧⌘K` | AI popup / 删除行 |
| `⌘L` | Browser 地址栏聚焦 |
| `⌘⌫` | `editor.action.deleteLines`（删除当前行） |
| `⌥⌘S` | 切换 Unified Sidebar |

Cursor **无** VS Code 的 `⌘L ⌘L` → Turbo Console Log 绑定。

### 2.4 User Rules

存储在 Cursor Settings → Rules（账户/云端同步），本地无独立文件。当前生效规则如下（备份于 `cursor-config-pack/cursor/rules/`）：

#### git-commit.md — Git 提交规范

- 仅在用户明确要求时 commit，不主动 push
- 遵守 Git Safety Protocol（不改 git config、不 force push、不 skip hooks）
- amend 仅在严格条件下使用；hook 失败则新建 commit
- 提交前并行运行 `git status` / `git diff` / `git log`
- 提交信息用 HEREDOC 传递

#### create-pull-request.md — 创建 PR 规范

- 使用 `gh` 命令处理 GitHub 事务
- 分析完整 commit 历史与 diff
- PR body 用 HEREDOC 格式（Summary + Test plan）
- 完成后返回 PR URL

#### code-and-communication.md — 代码与沟通规范

- 最小改动、避免过度工程、遵循现有约定
- 注释克制，测试按需
- 代码引用格式：`startLine:endLine:filepath`
- Markdown 链接完整，回复篇幅与任务复杂度匹配

#### global-architect-zh.md — 全局架构师规则

- 中文原生 web 前端架构师角色
- 输出：中文语法 + 英文术语
- KISS 原则、第一性原理、拒绝猜测
- Thought 块禁止英文谓语句
- Git commit 格式：`类型: 简短描述`（类型英文，描述中文，≤30 字）

#### environment-and-skills.md — 环境与 Skills 遵循

- 真实环境，必须实际运行命令
- 严格遵循 skill / MCP / 用户指令优先级
- 相关 skill 存在时必须读取并使用

### 2.5 Plugins

#### Superpowers v5.0.7

| 属性 | 值 |
| --- | --- |
| 名称 | Superpowers |
| 来源 | `cursor-public/superpowers` |
| 路径 | `~/.cursor/plugins/cache/cursor-public/superpowers/b7a8f769.../` |
| 描述 | TDD、调试、协作模式等核心 skills 库 |

**内置 Skills（14 个）**

| Skill | 用途 |
| --- | --- |
| `using-superpowers` | 会话开始时查找并调用 skills |
| `brainstorming` | 创意/功能开发前需求探索 |
| `writing-plans` | 多步骤任务写实现计划 |
| `executing-plans` | 分阶段执行计划 |
| `subagent-driven-development` | 子 agent 并行开发 |
| `test-driven-development` | TDD 流程 |
| `systematic-debugging` | 系统化调试 |
| `verification-before-completion` | 完成前验证 |
| `requesting-code-review` | 请求代码审查 |
| `receiving-code-review` | 接收审查反馈 |
| `dispatching-parallel-agents` | 并行 agent 调度 |
| `using-git-worktrees` | Git worktree 隔离开发 |
| `finishing-a-development-branch` | 开发分支收尾 |
| `writing-skills` | 编写/测试 skills |

### 2.6 Cursor 内置 Skills（`~/.cursor/skills-cursor/`，15 个）

| Skill | 用途 |
| --- | --- |
| `automate` | 创建 Cursor Automations |
| `babysit` | PR 合并就绪维护 |
| `canvas` | 创建 Canvas 可视化产物 |
| `create-hook` | 创建 Cursor hooks |
| `create-rule` | 创建 Cursor rules |
| `create-skill` | 编写 Agent Skills |
| `create-subagent` | 创建自定义 subagent |
| `loop` | 循环执行 prompt/skill |
| `migrate-to-skills` | Rules/Commands 迁移为 Skills |
| `sdk` | Cursor SDK 集成指南 |
| `shell` | `/shell` 命令执行 |
| `split-to-prs` | 拆分小 PR |
| `statusline` | CLI 状态栏配置 |
| `update-cli-config` | 修改 CLI 配置 |
| `update-cursor-settings` | 修改 settings.json |

### 2.7 MCP Servers

配置文件：`~/.cursor/mcp.json`

#### playwright

```json
{
  "command": "npx",
  "args": ["@playwright/mcp@0.0.71"]
}
```

**工具（22 个）**：`browser_navigate`、`browser_click`、`browser_type`、`browser_snapshot`、`browser_take_screenshot`、`browser_fill_form`、`browser_evaluate`、`browser_wait_for` 等。

### 2.8 启动参数（argv.json）

| 参数 | 值 |
| --- | --- |
| `enable-crash-reporter` | `true` |
| `crash-reporter-id` | `d33dd93a-fba0-4080-abce-7644e74e8438` |

---

## 三、共享配置特点总结

1. **前端 React/TS 导向**：Prettier + ESLint + Stylelint + pnpm，2 空格缩进，单引号，TS 双引号偏好。
2. **快捷键高度定制**：`⇧⌘F` 格式化、`⇧⌥F` 搜索、`⇧⌘O` 整理 import；Cursor 额外解除 AI 快捷键冲突。
3. **Git 工具链精简（Cursor）**：移除 GitLens / GitBlame 全部用户 settings，改用内置 `git.blame.*`；扩展仍保留安装。
4. **AI 工作流（Cursor）**：Superpowers plugin（14 skills）+ 15 个 Cursor 内置 skills + MCP（playwright）。
5. **文件头自动化**：psi-header 在手动保存时更新，css/less 除外。

---

## 四、可迁移配置包

完整可迁移包位于本项目 `cursor-config-pack/` 目录。

包含 settings、keybindings、extensions 列表、MCP 模板、User Rules 备份。安装方式见 [cursor-config-pack/README.md](cursor-config-pack/README.md)。
