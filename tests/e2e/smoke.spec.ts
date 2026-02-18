import { test, expect } from '@playwright/test';

const paths = [
  '/',
  '/artykuly/strategia-dywidendowa-2025',
  '/logowanie',
];

test.describe('Smoke', () => {
  for (const path of paths) {
    test(`visit ${path}`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(/FusionFinance|Fusion Finance|Fusionfinance/i);
      await expect(page.locator('body')).toBeVisible();
    });
  }
});
