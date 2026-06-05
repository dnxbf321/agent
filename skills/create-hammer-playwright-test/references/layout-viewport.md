# 布局敏感组件与视口

**布局敏感组件**仅指组件：**SearchForm**、**FieldGrid**（及直接使用 FieldGrid 的封装）。

## 固定视口

布局敏感组件的全部 E2E 用例须使用 **1200×900**，通过 `__test__/fixtures.ts` 的 `test.use({ viewport })` 固定，**不**改 package 级 `playwright.config.ts` 的默认 1800。

## 实现模式

```text
packages/{pkg}/src/{kebab}/__test__/
├── fixtures.ts          # test.use({ viewport: { width: 1200, height: 900 } })
├── foo.spec.ts
└── bar.spec.ts
```

```ts
// fixtures.ts
import { test as base, expect } from '@playwright/test';

export const LAYOUT_SENSITIVE_VIEWPORT = { width: 1200, height: 900 } as const;

export const test = base.extend({});
test.use({ viewport: LAYOUT_SENSITIVE_VIEWPORT });

export { expect };
```

```ts
// *.spec.ts
import type { Locator } from '@playwright/test';
import { expect, test } from './fixtures';
```

## MCP 探索时

布局敏感组件的 MCP `browser_resize` 须与 fixtures 一致（**1200×900**），否则 snapshot / 演示结论与测试代码不一致。

## package 级 config

`playwright.config.ts` 默认 **1800×900**（`projects[].use.viewport`）适用于非布局敏感组件；布局敏感组件仅通过 `fixtures.ts` 覆盖。
