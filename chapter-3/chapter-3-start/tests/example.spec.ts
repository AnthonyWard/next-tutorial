import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000');

  // Expect a title "to contain" a substring.
  // Note: create-next-app default title might vary, check layout.tsx or page.tsx
  // For this tutorial, we will check if the default Next.js text is present
  await expect(page.locator('body')).toContainText('Welcome to Chapter 2'); 
});