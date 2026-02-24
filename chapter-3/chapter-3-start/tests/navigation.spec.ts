import { test, expect } from '@playwright/test';

test('should navigate to the about page', async ({ page }) => {
  // Start from the index page
  await page.goto('/');

  // Find an element with the text 'Go to About Page' and click on it
  await page.click('text=Go to About Page');

  // The new URL should be "/about" (taking into account the base URL if needed)
  await expect(page).toHaveURL(/\/about/);

  // The new page should contain an h1 with "About Us"
  await expect(page.locator('h1')).toHaveText('About Us');
});

test('should navigate to dashboard layout', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Check for sidebar navigation link
    await expect(page.getByRole('link', { name: 'Overview' })).toBeVisible();
    
    // Check for main content
    await expect(page.locator('h2')).toHaveText('Dashboard Overview');
});