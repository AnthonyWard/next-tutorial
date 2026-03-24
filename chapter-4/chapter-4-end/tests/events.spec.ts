import { test, expect } from '@playwright/test';

test('should list events and navigate to details', async ({ page }) => {
  // Navigate to the events listing
  await page.goto('/events');

  // Expect to see the "Upcoming Events" header
  await expect(page.locator('h1')).toHaveText('Upcoming Events');

  // Expect to see at least one event card
  const cards = page.locator('text=View Details');
  await expect(cards.first()).toBeVisible();

  // Click the first "View Details" link
  await cards.first().click();

  // Verify we navigated to an event details page
  await expect(page).toHaveURL(/\/events\/\d+/);
  
  // Verify details are shown
  await expect(page.locator('text=Back to Events')).toBeVisible();
});