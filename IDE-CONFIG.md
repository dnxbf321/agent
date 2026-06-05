# IDE 配置文档

> 采集时间：2026-06-05
> 环境：macOS · Cursor（基于 VS Code）
> 用户：dengjiayao

---

## 配置文件路径总览

| 类型                  | 路径                                                         |
| --------------------- | ------------------------------------------------------------ |
| 用户 Settings         | `~/Library/Application Support/Cursor/User/settings.json`    |
| 按键绑定              | `~/Library/Application Support/Cursor/User/keybindings.json` |
| 扩展目录              | `~/.cursor/extensions/`                                      |
| MCP 配置              | `~/.cursor/mcp.json`                                         |
| Cursor Skills（内置） | `~/.cursor/skills-cursor/`                                   |
| Cursor Plugins        | `~/.cursor/plugins/cache/`                                   |
| 启动参数              | `~/.cursor/argv.json`                                        |

---

## 一、VS Code / Cursor 编辑器配置

### 1.1 外观与主题

| 配置项       | 值                    |
| ------------ | --------------------- |
| 颜色主题     | `One Dark Pro Mix`    |
| 图标主题     | `Material Icon Theme` |
| 字体大小     | `14`                  |
| Minimap      | 关闭                  |
| 面包屑导航   | 关闭                  |
| 括号配对着色 | 开启                  |
| 显示空白字符 | `all`                 |
| Tab 宽度     | `2`                   |
| 行尾         | `\n` (LF)             |

### 1.2 编辑器行为

| 配置项                              | 值                                 | 说明                    |
| ----------------------------------- | ---------------------------------- | ----------------------- |
| `files.autoSave`                    | `off`                              | 不自动保存              |
| `files.insertFinalNewline`          | `true`                             | 文件末尾插入换行        |
| `files.trimTrailingWhitespace`      | `true`                             | 去除行尾空格            |
| `editor.defaultFormatter`           | Prettier                           | 全局默认格式化          |
| `editor.codeActionsOnSave`          | ESLint: never, Stylelint: explicit | 保存时不自动 ESLint fix |
| `editor.acceptSuggestionOnEnter`    | `smart`                            | 智能接受补全            |
| `editor.quickSuggestions`           | comments/strings 均 on             | 注释和字符串内也补全    |
| `editor.suggest.preview`            | `true`                             | 补全预览                |
| `prettier.singleQuote`              | `true`                             | 单引号                  |
| `typescript.preferences.quoteStyle` | `double`                           | TS 引号偏好双引号       |
| `npm.packageManager`                | `pnpm`                             | 包管理器                |
| `typescript.locale`                 | `zh-CN`                            | TS 语言包中文           |

### 1.3 语言专属 Formatter

| 语言                                       | Formatter          |
| ------------------------------------------ | ------------------ |
| JavaScript / TS / JSX / TSX / JSON / JSONC | Prettier           |
| HTML                                       | VS Code 内置       |
| XML                                        | DotJoshJohnson.xml |
| Markdown                                   | 自动换行 off        |

### 1.4 终端

| 配置项               | 值                  |
| -------------------- | ------------------- |
| macOS 外部终端       | `iTerm.app`         |
| 退出确认             | `hasChildProcesses` |
| Windows 默认 Profile | Git Bash            |
| 光标闪烁             | 开启                |

### 1.5 Git

| 配置项                              | 值      |
| ----------------------------------- | ------- |
| `git.autofetch`                     | `true`  |
| `git.autoStash`                     | `true`  |
| `git.enableSmartCommit`             | `true`  |
| `git.showPushSuccessNotification`   | `true`  |
| `git.openRepositoryInParentFolders` | `never` |

### 1.6 GitLens（精简配置）

- 关闭 Plus 功能、虚拟仓库、Launchpad、PR 状态栏
- 关闭安装欢迎和升级提示
- Commit 详情文件布局：`list`

### 1.7 文件头（psi-header）

```json
{
  "author": "dengjiayao",
  "authorEmail": "dengjiayao@yzw.cn",
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

### 1.8 其他扩展相关配置

| 扩展              | 关键配置                                |
| ----------------- | --------------------------------------- |
| yun-api-generator | `yunApi.developerAccount: "dengjiayao"` |
| turbo-console-log | `quote: "\`"`                           |
| auto-rename-tag   | 所有语言激活                            |
| indent-rainbow    | `indicatorStyle: light`                 |
| mermaid-chart     | 关闭 Generate Diagram CodeLens          |
| search.exclude    | `**/dist` 排除搜索                      |

### 1.9 项目级格式化（fulfill-web）

**.editorconfig**

```
indent_style = space, indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
*.md 不 trim 行尾空格
```

**.prettierrc**

```json
{
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "all",
  "proseWrap": "never"
}
```

---

## 二、已安装扩展

### 代码质量 / 格式化

| 扩展 ID                           | 版本   | 名称                      |
| --------------------------------- | ------ | ------------------------- |
| `esbenp.prettier-vscode`          | 12.4.0 | Prettier - Code formatter |
| `dbaeumer.vscode-eslint`          | 3.0.24 | ESLint                    |
| `stylelint.vscode-stylelint`      | 2.2.1  | Stylelint                 |
| `editorconfig.editorconfig`       | 0.18.2 | EditorConfig              |
| `usernamehw.errorlens`            | 3.26.0 | Error Lens                |
| `drknoxy.eslint-disable-snippets` | 1.4.1  | eslint-disable-snippets   |

### 前端 / CSS

| 扩展 ID                               | 版本    | 名称                      |
| ------------------------------------- | ------- | ------------------------- |
| `bradlc.vscode-tailwindcss`           | 0.14.28 | Tailwind CSS IntelliSense |
| `clinyong.vscode-css-modules`         | 0.5.4   | CSS Modules               |
| `csstools.postcss`                    | 1.0.9   | PostCSS Language Support  |
| `mrmlnc.vscode-less`                  | 0.6.3   | Less IntelliSense         |
| `formulahendry.auto-rename-tag`       | 0.1.10  | Auto Rename Tag           |
| `naumovs.color-highlight`             | 2.8.0   | Color Highlight           |
| `kisstkondoros.vscode-gutter-preview` | 0.32.2  | Image preview             |

### Git

| 扩展 ID                  | 版本   | 名称      |
| ------------------------ | ------ | --------- |
| `eamodio.gitlens`        | 18.0.0 | GitLens   |
| `mhutchie.git-graph`     | 1.30.0 | Git Graph |
| `codezombiech.gitignore` | 0.10.0 | gitignore |

### 开发效率

| 扩展 ID                                 | 版本    | 名称                          |
| --------------------------------------- | ------- | ----------------------------- |
| `chakrounanas.turbo-console-log`        | 3.23.0  | Turbo Console Log             |
| `christian-kohler.path-intellisense`    | 2.10.0  | Path Intellisense             |
| `christian-kohler.npm-intellisense`     | 1.4.5   | npm Intellisense              |
| `jasonnutter.search-node-modules`       | 1.3.0   | Search node_modules           |
| `gruntfuggly.todo-tree`                 | 0.0.226 | Todo Tree                     |
| `cardinal90.multi-cursor-case-preserve` | 1.0.5   | Multiple cursor case preserve |
| `aaron-bond.better-comments`            | 3.0.2   | Better Comments               |
| `psioniq.psi-header`                    | 1.25.1  | psioniq File Header           |
| `mikestead.dotenv`                      | 1.0.1   | DotENV                        |
| `oderwat.indent-rainbow`                | 8.3.1   | indent-rainbow                |

### 主题 / 可视化

| 扩展 ID                             | 版本   | 名称                             |
| ----------------------------------- | ------ | -------------------------------- |
| `zhuangtongfa.material-theme`       | 3.19.0 | One Dark Pro                     |
| `pkief.material-icon-theme`         | 5.35.0 | Material Icon Theme              |
| `mermaidchart.vscode-mermaid-chart` | 2.6.8  | Mermaid                          |
| `bierner.markdown-mermaid`          | 1.32.1 | Markdown Preview Mermaid Support |

### Cursor / AI / 内部工具

| 扩展 ID                                 | 版本   | 名称                               |
| --------------------------------------- | ------ | ---------------------------------- |
| `anysphere.remote-ssh`                  | 1.0.54 | Remote - SSH                       |
| `whyuds.agent-skills-manager`           | 0.6.0  | AgentSkillsManager                 |

### 语言包

| 扩展 ID                                  | 版本    | 名称           |
| ---------------------------------------- | ------- | -------------- |
| `ms-ceintl.vscode-language-pack-zh-hans` | 1.105.0 | 简体中文语言包 |

---

## 三、按键绑定（自定义覆盖）

配置文件：`~/Library/Application Support/Cursor/User/keybindings.json`

### 有效自定义绑定

| 快捷键 (macOS) | 命令                                                | 说明                        |
| -------------- | --------------------------------------------------- | --------------------------- |
| `⇧⌘F`          | `editor.action.formatDocument`                      | 格式化文档（取代全局搜索）  |
| `⇧⌥F`          | `workbench.action.findInFiles`                      | 全局文件搜索（取代格式化）  |
| `⌘Y`           | `redo`                                              | 重做（取代 ⇧⌘Z）            |
| `⇧⌘C`          | `csscomb.execute`                                   | CSSComb 排序                |
| `⇧⌘O`          | `editor.action.organizeImports`                     | 整理 import（取代跳转符号） |
| `⌘⌫`           | `editor.action.deleteLines`                         | 删除当前行                  |
| `⌥⌘S`          | `workbench.action.toggleUnifiedSidebarFromKeyboard` | 切换侧边栏                  |

### 已解除的默认绑定

| 快捷键 | 原命令                      |
| ------ | --------------------------- |
| `⌘\`   | 拆分编辑器 / 拆分终端       |
| `⇧⌘K`  | 删除行 / AI 弹窗            |
| `⌘K`   | AI 弹窗 generate            |
| `⌘L`   | Browser 地址栏聚焦          |
| `⇧⌥O`  | organizeImports（改到 ⇧⌘O） |
| `⇧⌥F`  | formatDocument（改到 ⇧⌘F）  |

---

## 四、Cursor 专属配置

### 4.1 User Rules

存储在 Cursor 账户/云端（Settings → Rules），本地无独立文件。当前生效规则摘要：

| Rule         | 核心内容                                                                           |
| ------------ | ---------------------------------------------------------------------------------- |
| Git 提交规范 | 仅在用户明确要求时 commit；遵守 Git Safety Protocol；HEREDOC 提交信息；不主动 push |
| 创建 PR 规范 | 使用 `gh` 命令；分析完整 diff 与 commit 历史；HEREDOC PR body                      |
| 代码编写原则 | 最小改动、避免过度工程、遵循现有约定、注释克制、测试按需                           |
| 沟通规范     | 代码引用用 `startLine:endLine:filepath`；Markdown 链接完整                         |
| Global Rules | 中文输出 + 英文术语；KISS；Git commit 格式 `类型: 简短描述`                        |
| 真实环境     | 必须实际运行命令，不可模拟                                                         |
| Skills 遵循  | 严格遵循 skill / MCP / 用户指令优先级                                              |

完整文本见配置包 `cursor/rules/` 目录。

### 4.2 Plugins

#### Superpowers（已安装）

| 属性 | 值                                  |
| ---- | ----------------------------------- |
| 名称 | Superpowers v5.0.7                  |
| 来源 | `cursor-public/superpowers`         |
| 描述 | TDD、调试、协作模式等核心 skills 库 |

**内置 Skills（14 个）**

| Skill                            | 用途                        |
| -------------------------------- | --------------------------- |
| `using-superpowers`              | 会话开始时查找并调用 skills |
| `brainstorming`                  | 创意/功能开发前需求探索     |
| `writing-plans`                  | 多步骤任务写实现计划        |
| `executing-plans`                | 分阶段执行计划              |
| `subagent-driven-development`    | 子 agent 并行开发           |
| `test-driven-development`        | TDD 流程                    |
| `systematic-debugging`           | 系统化调试                  |
| `verification-before-completion` | 完成前验证                  |
| `requesting-code-review`         | 请求代码审查                |
| `receiving-code-review`          | 接收审查反馈                |
| `dispatching-parallel-agents`    | 并行 agent 调度             |
| `using-git-worktrees`            | Git worktree 隔离开发       |
| `finishing-a-development-branch` | 开发分支收尾                |
| `writing-skills`                 | 编写/测试 skills            |

### 4.3 Cursor 内置 Skills（`~/.cursor/skills-cursor/`）

| Skill                    | 用途                         |
| ------------------------ | ---------------------------- |
| `automate`               | 创建 Cursor Automations      |
| `babysit`                | PR 合并就绪维护              |
| `canvas`                 | 创建 Canvas 可视化产物       |
| `create-hook`            | 创建 Cursor hooks            |
| `create-rule`            | 创建 Cursor rules            |
| `create-skill`           | 编写 Agent Skills            |
| `create-subagent`        | 创建自定义 subagent          |
| `loop`                   | 循环执行 prompt/skill        |
| `migrate-to-skills`      | Rules/Commands 迁移为 Skills |
| `sdk`                    | Cursor SDK 集成指南          |
| `shell`                  | `/shell` 命令执行            |
| `split-to-prs`           | 拆分小 PR                    |
| `statusline`             | CLI 状态栏配置               |
| `update-cli-config`      | 修改 CLI 配置                |
| `update-cursor-settings` | 修改 settings.json           |

### 4.4 MCP Servers

配置文件：`~/.cursor/mcp.json`

#### playwright

```json
{
  "command": "npx",
  "args": ["@playwright/mcp@0.0.71"]
}
```

**工具（22 个）**：`browser_navigate`、`browser_click`、`browser_type`、`browser_snapshot`、`browser_take_screenshot` 等。

---

## 五、配置特点总结

1. **前端 React/TS 导向**：Prettier + ESLint + Stylelint + pnpm，2 空格缩进，单引号。
2. **快捷键高度定制**：`⇧⌘F` 格式化、`⇧⌥F` 搜索、`⇧⌘O` 整理 import。
3. **AI 工作流完整**：Superpowers plugin + 15 个 Cursor 内置 skills + 3 套 MCP。
4. **Git 工具链精简**：GitLens 保留核心功能，关闭 Plus/Launchpad 等干扰项。

---

## 六、可迁移配置包

完整可迁移包位于：

```
~/cursor-config-pack/
~/cursor-config-pack-2026-06-05.zip
```

安装方式见 `cursor-config-pack/README.md`。
