# Step 3: Unit Testing with Vitest and React Testing Library

We will add unit testing for individual components using Vitest and React Testing Library. This setup works alongside the existing Storybook test configuration.

## 1. Install Dependencies
Install the necessary packages for testing:

```bash
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom
```

## 2. Configure Vitest for Component Tests
Your project already has a `vitest.config.ts` from Storybook setup. We'll add a second test project for component tests without removing the Storybook integration.

Update `vitest.config.ts` to add a components project:

```typescript
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import react from '@vitejs/plugin-react';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    projects: [
      // Existing Storybook test project
      {
        extends: true,
        plugins: [
          storybookTest({ configDir: path.join(dirname, '.storybook') }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
      // New component test project
      {
        plugins: [react()],
        test: {
          name: 'components',
          include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
          environment: 'jsdom',
          globals: true,
          setupFiles: './vitest.setup.ts',
        },
      },
    ],
  },
});
```

## 3. Setup File
Create `vitest.setup.ts` in the root:

```typescript
import '@testing-library/jest-dom';
```

## 4. Test Script
Your `package.json` should already have a test script from Storybook setup. If not, add:

```json
"scripts": {
  "test": "vitest",
  "test:watch": "vitest --watch"
}
```

## 5. Write a Unit Test
Let's test a simple component.
Create a component `src/components/Msg.tsx`:

```tsx
export default function Msg({ text }: { text: string }) {
  return <div>{text}</div>;
}
```

Create a test file `src/components/Msg.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Msg from './Msg';
 
describe('Msg', () => {
  it('renders the text', () => {
    render(<Msg text="Hello World" />);
    const el = screen.getByText('Hello World');
    expect(el).toBeInTheDocument();
  });
});
```

## 6. Run Tests
Execute all tests (both component tests and Storybook tests):
```bash
pnpm test
```

You should see output showing both test projects running:
- `components` - Your unit tests
- `storybook` - Your Storybook stories as tests
