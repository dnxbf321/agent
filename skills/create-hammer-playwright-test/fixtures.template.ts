import { test as base, expect } from '@playwright/test';

/** 布局敏感组件（SearchForm / FieldGrid）固定视口，须与 MCP browser_resize 一致 */
export const LAYOUT_SENSITIVE_VIEWPORT = { width: 1200, height: 900 } as const;

export const test = base.extend({});
test.use({ viewport: LAYOUT_SENSITIVE_VIEWPORT });

export { expect };
