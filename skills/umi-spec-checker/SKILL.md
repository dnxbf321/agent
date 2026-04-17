---
name: umi-spec-checker
description: 专门用于检查和修复 Umi.js/Next.js 项目开发规范的工具。当项目中存在 `umi` 或 `@umijs/max` 依赖时，请务必调用此技能对文件命名、Import 语法以及代码规范进行扫描。即使用户没有明确提到“检查规范”，只要你在进行代码重构、创建新文件或处理 Import 报错时，都应主动遵循此技能定义的规则。
---

# Umi 开发规范检查器 (Umi Spec Checker)

此技能旨在确保项目代码完全符合预设的 Umi 开发规范。

## 1. 触发时机

- 当 `package.json` 中包含 `umi` 或 `@umijs/max` 时。
- 用户要求“检查代码规范”或“修复导入路径”时。
- 在创建新的 React 组件或 Hook 时，主动应用命名规则。

## 2. 核心规范定义

### A. 文件命名规范 (File Naming)

1. **中性原则**：所有文件名和路径必须使用**纯英文**。
2. **index 禁令**：
   - 禁止将 `index` 作为文件夹名称（例如禁止 `/user-list/index/page.tsx`）。
   - 允许且仅允许使用 `index.ts` 或 `index.tsx` 作为文件名，且必须**全小写**。
3. **React Hooks**：
   - 如果文件默认导出的是 React Hook，文件名必须以 `use` 开头。
   - 遵循 **CamelCase** (小驼峰) 规范，例如：`useBizConf.ts`。
4. **组件目录一致性**：
   - 在 `components` 或 `component` 目录下，子文件/子目录命名允许选择 **PascalCase** (大驼峰) 或 **kebab-case** (短横线)。
   - **铁律**：每一个独立的 `components` 文件夹内部必须保持风格统一，禁止两者混用。
5. **通用情况**：其他所有文件和文件夹默认遵循 **kebab-case** 规范，例如：`order-detail-view.tsx`。

### B. Import 语法规范

1. **相对路径优先规则**：

   1. 规则a

   - 若 Import 的目标路径位于**平级**或**平级文件夹的下级**，必须使用相对路径。
   - _示例_：在 `src/pages/home/index.tsx` 中引用 `src/pages/home/components/A.tsx`，必须写成 `import { ... } from './components/A'`。

   2. 规则b

   - 作用范围：glob pattern 符合 `src/{pages,components,layouts,runtime-config}/*/` 的目录。
   - 若 Import 的目标路径**未超出**该一级目录边界，必须使用相对路径。
   - _示例_：在 `src/pages/home/index.tsx` 中引用 `src/pages/home/utils.ts`，必须写成 `import { ... } from './utils'`。
   - _错误示例_：在 `src/pages/home/index.tsx` 中引用 `src/pages/zoo/common.ts`，写成 `import { ... } from '../zoo/common'`，正确写法是 `import { ... } from '@/pages/zoo/common'`。

2. **绝对路径 (Alias) 规则**：

   - 其他所有情况必须使用项目绝对路径。
   - 必须以 `@/` 开头，指代 `src` 目录。
   - _示例_：`import { Tab } from '@/components/my-tab'`。

3. **Type-Only Imports**：

   - 导入 Interface 或 Type 时，必须显式包含 `type` 关键字。但如果从同一路径同时导入了非 Interface 或 Type 内容，则不受此规则约束。
   - _示例_：`import type { UserInfo } from '@/components/user'`。
   - _示例_：`import User, { UserInfo } from '@/components/user'`

4. **自动清理规则 (Auto-fix)**：

   - **禁止** Import 语句之间保留任何空行。
   - 如果检查到空行，请**直接重写**文件内容以移除空行。

### C. 质量保障

1. **ESLint 扫描**：
   - 当用户提出“运行全项检查”或具体要求时，执行 `pnpm run lint`。
   - 捕获所有 `error` 级别的错误，并将其列入最终的规范报告。

## 3. 执行流程

### 第一步：命名静态扫描

- 遍历受影响的目录，使用 `ls -R` 或 `list_dir` 检查文件名是否合规。
- 特别注意 `components` 目录下的风格一致性。

### 第二步：源码内容解析与修复

- 读取当前操作的文件，检查 Import 语句。
- 发现 Import 间有空行？立即调用 `replace_file_content` 或 `multi_replace_file_content` 进行修复。
- 检查路径是否符合“相对路径优先”或“Alias 别名”规则。
- 检查 Interface 导入是否漏掉了 `type`。

### 第三步：生成规范报告

- 汇总所有不合规项。
- 格式如下：
  - **不规范项**：[具体位置]
  - **违反规则**：[规则描述]
  - **修改方案**：[示例代码或操作建议]

## 4. 注意事项

- 保持 KISS 原则，不要进行过度设计。
- 在修改用户文件前，除非是明确的自动修复规则，否则请先告知用户违规位置。
