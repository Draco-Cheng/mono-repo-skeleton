import { test, expect } from '@playwright/test';

test('Nx Monorepo Dashboard e2e', async ({ page }) => {
  // Step 1: Home page
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Welcome to the Nx Monorepo Dashboard');
  await expect(page.getByText(/main dashboard/i)).toBeVisible();
  await expect(page.getByRole('button', { name: /Go to \/ping API Demo/i })).toBeVisible();
  await expect(page.getByTestId('footer')).toBeVisible();

  // Step 2: Click /ping button
  await page.getByRole('button', { name: /Go to \/ping API Demo/i }).click();
  await expect(page).toHaveURL('http://localhost:3000/ping');

  // Step 3: /ping page
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Nx Monorepo Demo');
  await expect(page.getByText(/fullstack example/i)).toBeVisible();
  await expect(page.getByRole('button', { name: /Refresh/i })).toBeVisible();
  await expect(page.getByTestId('footer')).toBeVisible();

  // Step 4: Click Refresh button
  await page.getByRole('button', { name: /Refresh/i }).click();
  // Check loading state or API result (can be enhanced based on ApiResult component)
});