# Step 4: Mocking Data in Tests

When testing components that fetch data, we often want to mock that data to ensure our tests are deterministic and fast.

**Unit Testing Server Components is complex** because they are async and React Testing Library is designed for Client Components (the DOM). For Server Components, we often rely more on E2E tests, or we can use specific patterns to test the logic in isolation.

However, we can easily unit test the *logic* functions or Client Components that receive data.

Let's verify our pages with a Playwright test, which will exercise the full stack including the "server" (mocked Next.js server).

## 1. Create E2E Test for Events

Create `tests/events.spec.ts`.

```typescript
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
```

## 2. Mocking API Responses (Playwright)

If we were fetching from a real external API, we would intercept the network request in Playwright.

```typescript
// Example of network interception (not needed for our internal mock DB, but good to know)
test('mocking external api', async ({ page }) => {
  await page.route('*/**/api/events', async route => {
    const json = [{ id: '1', name: 'Mocked Event' }];
    await route.fulfill({ json });
  });
  
  await page.goto('/events');
  // ...
});
```

Since our data is "server-side" (inside `src/lib/events.ts`), Playwright sees the final HTML. To mock this, we would typically depend on specific test-environment variables or dependency injection, which is advanced. For now, testing the real flow with the realistic mock delay is sufficient for functional testing.

## 3. Run the Tests

```bash
pnpm test:e2e
```
