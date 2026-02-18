import { test, expect } from '@playwright/test';

const paths = [
  '/',
  '/artykuly/strategia-dywidendowa-2025',
  '/logowanie',
  '/szukaj?q=gpw',
  '/ulubione',
];

test.describe('Smoke', () => {
  for (const path of paths) {
    test(`visit ${path}`, async ({ page }) => {
      await page.goto(path);
      const title = await page.title();

      if (title.includes('Login – Vercel')) {
        test.skip(true, 'Vercel preview protection aktywne – użyj VERCEL_BYPASS_TOKEN, aby włączyć smoke');
      }

      await expect(page).toHaveTitle(/FusionFinance|Fusion Finance|Fusionfinance/i);
      await expect(page.locator('body')).toBeVisible();
    });
  }
});
