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

## 4. Add Test Scripts
Update your `package.json` to include convenient test scripts:

```bash
npm pkg set scripts.test:e2e="playwright test"
npm pkg set scripts.test:e2e:ui="playwright test --ui"
npm pkg set scripts.test:e2e:headed="playwright test --headed"
```

Or manually add to `package.json`:
```json
"scripts": {
  ...
  "test:e2e": "playwright test",
  "test:e2e:ui": "playwright test --ui",
  "test:e2e:headed": "playwright test --headed"
}
```

## 5. Run E2E Tests
```bash
# Headless mode (default)
pnpm test:e2e

# Interactive UI mode (recommended for debugging)
pnpm test:e2e:ui

# Headed mode (see the actual browser)
pnpm test:e2e:headed
```

This will start the dev server, run the tests in the specified mode, and report results.
