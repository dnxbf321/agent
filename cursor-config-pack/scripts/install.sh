#!/usr/bin/env bash
# Cursor 配置包安装脚本 (macOS)
# 用法: ./scripts/install.sh [--dry-run] [--merge-settings]

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACK_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
DRY_RUN=false
MERGE_SETTINGS=false

CURSOR_USER_DIR="${CURSOR_USER_DIR:-$HOME/Library/Application Support/Cursor/User}"
CURSOR_HOME="${CURSOR_HOME:-$HOME/.cursor}"

usage() {
  cat <<'EOF'
用法: install.sh [选项]

选项:
  --dry-run          仅打印将要执行的操作，不实际修改
  --merge-settings   合并 settings（默认覆盖；合并需 jq，暂未实现则跳过提示）
  -h, --help         显示帮助

环境变量:
  CURSOR_USER_DIR    Cursor User 目录（默认 macOS 路径）
  CURSOR_HOME        Cursor 主目录（默认 ~/.cursor）
EOF
}

log() { echo "[cursor-config-pack] $*"; }
run() {
  if [[ "$DRY_RUN" == true ]]; then
    echo "  [dry-run] $*"
  else
    "$@"
  fi
}

backup_file() {
  local target="$1"
  if [[ -f "$target" ]]; then
    local backup="${target}.bak.$(date +%Y%m%d%H%M%S)"
    log "备份: $target -> $backup"
    run cp "$target" "$backup"
  fi
}

install_settings() {
  local src="$PACK_DIR/settings/settings.json"
  local dest="$CURSOR_USER_DIR/settings.json"
  log "安装 settings.json"
  run mkdir -p "$CURSOR_USER_DIR"
  backup_file "$dest"
  run cp "$src" "$dest"
}

install_keybindings() {
  local src="$PACK_DIR/keybindings/keybindings.json"
  local dest="$CURSOR_USER_DIR/keybindings.json"
  log "安装 keybindings.json"
  run mkdir -p "$CURSOR_USER_DIR"
  backup_file "$dest"
  run cp "$src" "$dest"
}

install_mcp() {
  local template="$PACK_DIR/mcp/mcp.json.template"
  local dest="$CURSOR_HOME/mcp.json"
  log "安装 mcp.json"
  run mkdir -p "$CURSOR_HOME"
  backup_file "$dest"
  run cp "$template" "$dest"
}

install_extensions() {
  local list="$PACK_DIR/extensions/extensions.txt"
  local cli=""
  if command -v cursor &>/dev/null; then
    cli="cursor"
  elif command -v code &>/dev/null; then
    cli="code"
    log "未找到 cursor CLI，回退使用 code"
  else
    log "警告: 未找到 cursor/code CLI，跳过扩展安装"
    log "请手动: cursor --install-extension <id>"
    return 0
  fi

  log "安装扩展（来自 extensions.txt）"
  while IFS= read -r line || [[ -n "$line" ]]; do
    line="${line%%#*}"
    line="$(echo "$line" | xargs)"
    [[ -z "$line" ]] && continue
    log "  -> $line"
    run "$cli" --install-extension "$line" --force
  done < "$list"
}

print_manual_steps() {
  cat <<'EOF'

========================================
手动步骤（安装脚本无法自动完成）
========================================

1. User Rules
   Cursor Settings → Rules → 从 cursor/rules/ 复制各 .md 内容添加为 User Rule

2. Superpowers Plugin
   Cursor Settings → Plugins → 搜索并安装 "Superpowers"

3. 重启 Cursor 使配置生效

EOF
}

main() {
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --dry-run) DRY_RUN=true; shift ;;
      --merge-settings) MERGE_SETTINGS=true; shift ;;
      -h|--help) usage; exit 0 ;;
      *) log "未知选项: $1"; usage; exit 1 ;;
    esac
  done

  log "配置包目录: $PACK_DIR"
  log "目标 User 目录: $CURSOR_USER_DIR"
  log "目标 Cursor 目录: $CURSOR_HOME"

  if [[ "$MERGE_SETTINGS" == true ]]; then
    log "注意: --merge-settings 尚未实现，将执行覆盖安装"
  fi

  install_settings
  install_keybindings
  install_mcp
  install_extensions
  print_manual_steps

  log "完成"
}

main "$@"
