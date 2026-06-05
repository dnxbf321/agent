import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright 测试全局配置文件
 * 参见 https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // 测试文件目录（含各组件下的 __test__/*.spec.ts）
  testDir: './src',

  // 匹配 src 及 __test__ 子目录中的 spec 文件
  testMatch: '**/*.spec.ts',

  // 测试结果如 screenshots, videos, traces 等存放的目录
  outputDir: './test-result',

  // 每个测试的最大超时时间（毫秒）
  timeout: 60 * 1000,

  // expect() 断言的超时时间（毫秒）
  expect: {
    timeout: 10 * 1000,
  },

  // 开启并行测试
  fullyParallel: false,

  // 在 CI 或是无头环境下运行时重试的次数
  retries: process.env.CI ? 1 : 0,

  // 并行测试的 worker 数量
  workers: process.env.CI ? 1 : undefined,

  forbidOnly: !!process.env.CI,

  // 测试报告配置
  reporter: 'list',

  // 共享属性配置
  use: {
    // 基础 URL
    baseURL: 'https://localhost:8000',

    // 本地文档站使用自签名证书
    ignoreHTTPSErrors: true,

    // 收集追踪信息以协助排查失败的测试案例
    trace: 'on-first-retry',

    // 在测试失败时截图
    screenshot: 'only-on-failure',

    // 录制视频
    video: 'retain-on-failure',

    // 浏览器启动配置
    launchOptions: {
      // 每一项操作（点击、输入等）之间强制等待 1000 毫秒
      slowMo: process.env.CI ? undefined : 1000,
    },
  },

  // 配置运行的浏览器平台
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // 须写在 project 内，否则会被 Desktop Chrome 默认视口覆盖
        viewport: { width: 1800, height: 900 },
      },
    },
  ],
});
