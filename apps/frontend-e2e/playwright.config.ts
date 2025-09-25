import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  // Automatically start services before running tests
  webServer: [
    {
      command: 'npx nx build backend && npx nx serve backend',
      port: 8000,
      cwd: '../../',
      reuseExistingServer: !process.env.CI,
      timeout: 120000,
    },
    {
      command: 'npx nx serve frontend',
      port: 3000,
      cwd: '../../',
      reuseExistingServer: !process.env.CI,
      timeout: 120000,
    },
  ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});