# Cursor 可迁移配置包

从 macOS + Cursor 环境导出的 IDE 配置，可用于新机器或团队成员快速还原开发环境。

**导出时间**: 2026-06-05  
**版本**: 1.2.0  
**源用户**: dengjiayao

---

## 目录结构

```
cursor-config-pack/
├── MANIFEST.json              # 包清单与元数据
├── README.md                  # 本文件
├── IDE-CONFIG.md              # 完整 IDE 配置文档（用户级）
├── settings/
│   └── settings.json          # Cursor 用户设置
├── keybindings/
│   └── keybindings.json       # 按键绑定
├── extensions/
│   └── extensions.txt         # Marketplace 扩展 ID 列表（33 个）
├── mcp/
│   └── mcp.json.template      # MCP 配置模板（playwright）
├── cursor/
│   ├── rules/                 # User Rules 文本（需手动导入）
│   └── plugins.md             # Plugins 参考（Superpowers）
└── scripts/
    └── install.sh             # 一键安装脚本 (macOS)
```

---

## 快速安装 (macOS)

```bash
cd cursor-config-pack   # 从本项目根目录进入
chmod +x scripts/install.sh

# 预览（不实际修改）
./scripts/install.sh --dry-run

# 正式安装
./scripts/install.sh
```

安装脚本会自动：

1. 备份并覆盖 `settings.json`、`keybindings.json`
2. 复制 `mcp.json.template` 为 `~/.cursor/mcp.json`
3. 通过 `cursor --install-extension` 安装 extensions.txt 中的扩展

---

## 手动步骤

### 1. User Rules

打开 **Cursor Settings → Rules**，将 `cursor/rules/` 下各文件内容添加为 User Rule：

| 文件 | 说明 |
| --- | --- |
| `git-commit.md` | Git 提交安全协议 |
| `create-pull-request.md` | PR 创建流程 |
| `code-and-communication.md` | 代码与沟通规范 |
| `global-architect-zh.md` | 中文架构师全局规则 |
| `environment-and-skills.md` | 环境与 Skills 遵循 |

### 2. Superpowers Plugin

**Cursor Settings → Plugins** → 搜索 **Superpowers** → Install

提供 TDD、调试、brainstorming、writing-plans 等 14 个 skills。详见 `cursor/plugins.md`。

---

## Windows / Linux 迁移

| 项 | macOS | Windows | Linux |
| --- | --- | --- | --- |
| User 目录 | `~/Library/Application Support/Cursor/User` | `%APPDATA%\Cursor\User` | `~/.config/Cursor/User` |
| Cursor 目录 | `~/.cursor` | `%USERPROFILE%\.cursor` | `~/.cursor` |

手动复制文件时，将 `settings/`、`keybindings/` 内容放到对应 User 目录；`mcp.json.template` 复制为 `~/.cursor/mcp.json`。

Windows 按键绑定中 `cmd` 需改为 `ctrl`（本包为 macOS 布局）。

---

## 自定义项（迁移前建议修改）

| 配置 | 位置 | 说明 |
| --- | --- | --- |
| `psi-header` 作者 | `settings/settings.json` | `author` / `authorEmail` |
| 外部终端 | `settings/settings.json` | `terminal.external.osxExec: iTerm.app` |

---

## 验证清单

- [ ] 主题 `One Dark Pro Mix` + 图标 `Material Icon Theme` 正常
- [ ] `⇧⌘F` 格式化、`⇧⌥F` 全局搜索、`⇧⌘O` 整理 import
- [ ] 内置 Git Blame 行内装饰正常（`git.blame.editorDecoration.enabled`）
- [ ] MCP: playwright 在 Settings → MCP 中 Connected
- [ ] User Rules 5 条已导入
- [ ] Superpowers 插件已启用
- [ ] Prettier / ESLint 扩展正常工作
