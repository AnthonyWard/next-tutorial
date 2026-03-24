// tests/booking.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Booking Form Interactions', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to an event page
    await page.goto('/events/1');
  });

  test('should display validation errors for empty submissions or invalid emails', async ({ page }) => {
    // Fill it out incorrectly to bypass browser-native 'required' traps mostly and test our RHF
    await page.fill('input[name="name"]', 'Jane Doe');
    await page.fill('input[name="email"]', 'invalid-email');
    await page.click('button[type="submit"]');

    // Check for the React validation error rendered in our DOM
    await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
  });

  test('should successfully book an event, disable the button, and show a toast', async ({ page }) => {
    await page.fill('input[name="name"]', 'Jane Doe');
    await page.fill('input[name="email"]', 'jane@example.com');
    
    // Submit the form
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // The button should change to processing state
    await expect(submitButton).toContainText('Processing...');
    await expect(submitButton).toBeDisabled();

    // Wait for the success toast to appear
    await expect(page.getByText('Booking successfully confirmed!')).toBeVisible();

    // Form fields should reset
    await expect(page.locator('input[name="name"]')).toHaveValue('');
    await expect(page.locator('input[name="email"]')).toHaveValue('');
  });
});