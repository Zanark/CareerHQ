import { defineConfig, devices } from '@playwright/test';

const ci = Boolean(process.env.CI);
const port = Number(process.env.CAREERHQ_E2E_PORT ?? 4173);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('CAREERHQ_E2E_PORT must be an integer from 1 to 65535.');
}
const baseURL = `http://127.0.0.1:${port}/CareerHQ/`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: ci,
  retries: ci ? 2 : 0,
  workers: ci ? 2 : undefined,
  timeout: 30_000,
  expect: { timeout: 7_000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [{
    name: ci ? 'chromium' : 'edge',
    use: {
      ...devices['Desktop Chrome'],
      viewport: { width: 1440, height: 1000 },
      channel: ci ? undefined : 'msedge',
    },
  }],
  webServer: {
    command: `npm run build && npm run preview -- --port ${port} --strictPort`,
    url: baseURL,
    reuseExistingServer: !ci,
    timeout: 60_000,
  },
});
