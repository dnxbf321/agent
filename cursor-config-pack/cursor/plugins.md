# Cursor Plugins 参考

## 已安装

| Plugin | 版本 | 来源 | 说明 |
|--------|------|------|------|
| Superpowers | 5.0.7 | cursor-public/superpowers | TDD、调试、协作 skills 库 |

## 安装方式

1. 打开 Cursor → Settings → Plugins
2. 搜索 **Superpowers**
3. 点击 Install

## 包含 Skills（14 个）

- using-superpowers
- brainstorming
- writing-plans / executing-plans
- subagent-driven-development
- test-driven-development
- systematic-debugging
- verification-before-completion
- requesting-code-review / receiving-code-review
- dispatching-parallel-agents
- using-git-worktrees
- finishing-a-development-branch
- writing-skills

## Hooks

Superpowers 在 sessionStart 时执行 `./hooks/session-start`。

> Plugins 由 Cursor 云端/cache 管理，无法通过文件直接迁移；新机器需重新 Install。
