# Step 8: Network Mocking with Playwright

When testing data-dependent components, relying on the real API can be flaky (e.g., if the database is down or changes). We can use Playwright to **intercept** and **mock** network requests.

## 1. Create a Test with Network Mocking
Create a new test file `tests/users.spec.ts`.

We will use `page.route` to intercept calls to `*/**/api/users` and provide a custom response.

```typescript
import { test, expect } from '@playwright/test';

test('mocks the user API and displays the list', async ({ page }) => {
  // 1. Mock the API response
  await page.route('*/**/api/users', async (route) => {
    const json = [
      { id: 1, name: 'Mocked User', role: 'Tester' }
    ];
    await route.fulfill({ json });
  });

  // 2. Go to the page
  await page.goto('http://127.0.0.1:3000');

  // 3. Verify the MOCKED data is valid
  // The real API returns "Alice Johnson", but our mock returns "Mocked User"
  await expect(page.getByText('Mocked User')).toBeVisible();
  
  // 4. Verify the real data is NOT shown (proving the mock worked)
  await expect(page.getByText('Alice Johnson')).not.toBeVisible();
});

test('handles API errors gracefully', async ({ page }) => {
  // 1. Mock an error response
  await page.route('*/**/api/users', async (route) => {
    await route.fulfill({ status: 500 });
  });

  await page.goto('http://127.0.0.1:3000');

  // 2. Verify error message
  await expect(page.getByText('Error loading users')).toBeVisible();
});
```

## 2. Run the Test
```bash
pnpm test:e2e tests/users.spec.ts
```

This ensures your frontend handles data and errors correctly without needing a running backend.
