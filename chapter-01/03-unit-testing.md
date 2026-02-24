# Step 3: Unit Testing with Vitest and React Testing Library

We will set up Vitest (a fast replacement for Jest) for unit testing individual components and logic. Vitest integrates seamlessly with the modern web ecosystem and Storybook.

## 1. Install Dependencies
Install the necessary packages for testing:

```bash
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom
```

## 2. Configure Vitest
Your project might already have a `vitest.config.ts` from Storybook. We will update it to support React component testing generally.

Modify `vitest.config.ts` (or create it) with the following content. This configures the test environment and alias resolution.

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
 
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

## 3. Setup File
Create `vitest.setup.ts` in the root:

```typescript
import '@testing-library/jest-dom'
```

## 4. Add a Test Script
Update your `package.json` to include a test script.

```bash
npm pkg set scripts.test="vitest"
npm pkg set scripts.test:watch="vitest --watch"
```

Manual update in `package.json`:
```json
"scripts": {
  ...
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
Note: We import from `vitest` instead of using globals if preferred, but we enabled globals in config.

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Msg from './Msg'
 
describe('Msg', () => {
  it('renders a heading', () => {
    render(<Msg text="Hello World" />)
    const el = screen.getByText('Hello World')
    expect(el).toBeInTheDocument()
  })
})
```

## 6. Run Tests
Execute the tests:
```bash
pnpm test
```
