# Step 4: Integration Testing

Now that we have new pages and components, let's ensure they work correctly with our tests.

## 1. Unit Testing the Card

Create `src/components/Card.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { Card } from './Card';
import { describe, it, expect } from 'vitest';

describe('Card Component', () => {
  it('renders title and children', () => {
    render(<Card title="Test Title">Test Content</Card>);
    
    expect(screen.getByText('Test Title')).toBeDefined();
    expect(screen.getByText('Test Content')).toBeDefined();
  });

  it('renders footer when provided', () => {
    render(
      <Card title="Start" footer={<span>Footer Content</span>}>
        Body
      </Card>
    );

    expect(screen.getByText('Footer Content')).toBeDefined();
  });
});
```

Run unit tests:
```bash
pnpm test
```

## 2. E2E Testing the Navigation

We added the About page and a link to it. Let's test that flow in `tests/navigation.spec.ts`.

Create `tests/navigation.spec.ts`:

```typescript
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
```

Run E2E tests:
```bash
pnpm test:e2e
```

## Summary

In this chapter, we:
- created new routes (`/about`),
- implemented nested layouts (`/dashboard`),
- built a styled component (`Card`),
- and added unit and E2E tests to cover the new features.
