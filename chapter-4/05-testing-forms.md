# Step 5: Testing Form Validation and Responses

For test engineers and developers alike, forms provide an excellent opportunity to implement comprehensive testing. Ensuring that users get appropriate feedback when form inputs omit data or validation fails is critical for UX. 

We will cover two methods of testing for our booking flow: unit testing the underlying validation schema with Vitest, and End-to-End (E2E) testing the user's browser interactions using Playwright.

## 1. Unit Testing the Zod Schema

Unit testing the schema directly allows us to verify edge cases blazingly fast without mounting anything in a browser.

Create a new file `src/lib/schemas.test.ts`:

```typescript
// src/lib/schemas.test.ts
import { describe, it, expect } from 'vitest';
import { bookingSchema } from './schemas';

describe('bookingSchema', () => {
  it('should validate a correct payload', () => {
    const validData = {
      eventId: '1',
      name: 'John Doe',
      email: 'john@example.com',
    };
    const result = bookingSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject an invalid email', () => {
    const invalidData = {
      eventId: '1',
      name: 'John Doe',
      email: 'not-an-email',
    };
    const result = bookingSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Please enter a valid email address');
    }
  });

  it('should enforce name length boundaries', () => {
    const tooShort = {
      eventId: '1',
      name: 'J',
      email: 'john@example.com',
    };
    const result = bookingSchema.safeParse(tooShort);
    expect(result.success).toBe(false);
  });
});
```

You can run this test by running your unit test suite:
```bash
pnpm test
```

## 2. E2E Testing with Playwright

Now let's test the entire user flow: navigating to an event, filling out the form incorrectly, resolving it, and finally making a successful submission to verify the toast notification.

Create a new file `tests/booking.spec.ts`:

```typescript
// tests/booking.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Booking Form Interactions', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a known event page (using event ID 1 assuming it's returned by your mock data)
    await page.goto('/events/1');
  });

  test('should display validation errors for empty submissions or invalid emails', async ({ page }) => {
    // Try to submit the form immediately without filling anything out
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Verify client-side required field validation handles this (typically native browser popups handle required fields first)
    // For more robust e2e tests on manual forms, let's fill it out incorrectly and wait for hook-form to complain:
    await page.fill('input[name="name"]', 'Jane Doe');
    await page.fill('input[name="email"]', 'invalid-email');
    await submitButton.click();

    // Check for the React validation error rendered in our DOM
    await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
  });

  test('should successfully book an event, disable the button, and show a toast', async ({ page }) => {
    await page.fill('input[name="name"]', 'Jane Doe');
    await page.fill('input[name="email"]', 'jane@example.com');
    
    // Submit the form
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // The button should change to the pending "Processing..." state
    await expect(submitButton).toContainText('Processing...');
    await expect(submitButton).toBeDisabled();

    // Wait for the success toast to appear (timeout automatically handled by Playwright logic)
    await expect(page.getByText('Booking successfully confirmed!')).toBeVisible();

    // After success, form fields should reset
    await expect(page.locator('input[name="name"]')).toHaveValue('');
    await expect(page.locator('input[name="email"]')).toHaveValue('');
  });
});
```

Depending on your Playwright configuration, you can run this with:
```bash
pnpm exec playwright test
```

## Chapter 4 Complete! 🎉

You've successfully built a robust form using modern Next.js and React patterns! You've learned how to:
- Mutate data safely via **Server Actions**
- Run client-side validation using **Zod** and **React Hook Form**
- Handle long-running operations with **useFormStatus**
- Improve UX with **Toast Notifications**
- Keep your features reliable by writing **Unit** and **E2E Tests**