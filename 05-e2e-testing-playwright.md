# Step 5: E2E Testing with Playwright

Playwright allows you to test your application running in a real browser context, simulating real user journeys.

## 1. Install Playwright
Run the installation command inside your project root:

```bash
pnpm create playwright
```

Select the following options if prompted (or the defaults):
- Where to put your end-to-end tests? `tests`
- Add a GitHub Actions workflow? `false` (or true if you want it)
- Install Playwright browsers? `true`

## 2. Check Configuration
A `playwright.config.ts` file has been created. Ensure `webServer` is configured to start your Next.js app during tests.

Open `playwright.config.ts` and ensure the `webServer` block is active (uncomment it if necessary) and pointing to `pnpm dev` or `pnpm start`:

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // ... other config
  webServer: {
    command: 'pnpm dev',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

## 3. Write an E2E Test
Create a test file `tests/example.spec.ts` (if it doesn't await exist).
We will test if our home page loads.

```typescript
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000');

  // Expect a title "to contain" a substring.
  // Note: create-next-app default title might vary, check layout.tsx or page.tsx
  // For this tutorial, we will check if the default Next.js text is present
  await expect(page.locator('body')).toContainText('Next.js'); 
});
```

## 4. Run E2E Tests
```bash
pnpm exec playwright test
```

This will start the dev server, run the tests in headless browsers, and report results.
To see the UI mode:
```bash
pnpm exec playwright test --ui
```
