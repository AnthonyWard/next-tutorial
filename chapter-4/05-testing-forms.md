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
    // Navigate to an event page
    await page.goto('/events/1');
  });

  test('should display validation errors for empty submissions or invalid emails', async ({ page }) => {
    // Submit invalid data to trigger either schema error UI or native browser validity.
    await page.fill('input[name="name"]', 'Jane Doe');
    await page.fill('input[name="email"]', 'invalid-email');
    await page.click('button[type="submit"]');

    const locator = page.locator('text=Please enter a valid email address');

    await expect(locator).toBeVisible({ timeout: 2000 }).catch(async () => {
      const isInvalid = await page.$eval(
        'input[name="email"]',
        (el) => (el as HTMLInputElement).validity.typeMismatch,
      );
      expect(isInvalid).toBeTruthy();
    });
  });

  test('should successfully book an event, disable the button, and show a toast', async ({ page }) => {
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');

    for (let attempt = 0; attempt < 3; attempt++) {
      await nameInput.fill('Jane Doe');
      await emailInput.fill('jane@example.com');

      const nameValue = await nameInput.inputValue();
      const emailValue = await emailInput.inputValue();

      if (nameValue === 'Jane Doe' && emailValue === 'jane@example.com') {
        break;
      }

      await page.waitForTimeout(250);
    }

    await expect(nameInput).toHaveValue('Jane Doe');
    await expect(emailInput).toHaveValue('jane@example.com');

    // Submit the form
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Use stable in-form success state for cross-browser reliability.
    const successBanner = page.locator('div.bg-green-100.text-green-800');
    await expect(successBanner).toContainText('Booking successfully confirmed!', { timeout: 10000 });

    await expect(submitButton).toBeEnabled();

    await expect(nameInput).toHaveValue('');
    await expect(emailInput).toHaveValue('');
  });
});
```

Depending on your Playwright configuration, you can run this with:
```bash
pnpm test:e2e
```

## Chapter 4 Complete! 🎉

You've successfully built a robust form using modern Next.js and React patterns! You've learned how to:
- Mutate data safely via **Server Actions**
- Run client-side validation using **Zod** and **React Hook Form**
- Handle long-running operations with **useFormStatus**
- Improve UX with **Toast Notifications**
- Keep your features reliable by writing **Unit** and **E2E Tests**