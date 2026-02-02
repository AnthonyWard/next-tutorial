#!/bin/bash
set -e

# Tutorial Validation Script
# This script automatically runs through the steps of the tutorial to ensure validity.

DEMO_DIR="validation_workspace"
PROJECT_NAME="nextjs-training"

echo "Validating Tutorial Steps..."

# Cleanup previous run
if [ -d "$DEMO_DIR" ]; then
    echo "Cleaning up previous workspace..."
    rm -rf "$DEMO_DIR"
fi

mkdir "$DEMO_DIR"
cd "$DEMO_DIR"

echo "=== Step 1: Setup Next.js ==="
# Running the command from Step 1
pnpm create next-app@latest $PROJECT_NAME \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --use-pnpm \
  --no-git \
  --react-compiler

cd $PROJECT_NAME

# Validate install
if [ ! -f "package.json" ]; then
    echo "Error: Next.js setup failed."
    exit 1
fi
echo "Next.js setup complete."

echo "=== Step 2: Add Storybook ==="
# Using --yes to accept defaults non-interactively
# CI=true prevents opening the browser/docs
CI=true pnpm dlx storybook@latest init --package-manager pnpm --yes

# Validate Storybook
if [ ! -d ".storybook" ]; then
    echo "Error: Storybook setup failed."
    exit 1
fi
echo "Storybook setup complete."

echo "=== Step 3: Unit Testing ==="
# 1. Install Dependencies
# Switching to Vitest as it is more compatible with the modern Next.js/Storybook ecosystem initialized here.
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom

# 2. Configure Vitest
# Overwriting vitest.config.ts to ensure basic unit testing works
cat <<EOF > vitest.config.ts
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
EOF

# 3. Setup File
echo "import '@testing-library/jest-dom'" > vitest.setup.ts

# 4. Add Test Script
# Using npm pkg to reliably add the script to package.json
npm pkg set scripts.test="vitest"
npm pkg set scripts.test:watch="vitest --watch"

# 5. Add components and test
mkdir -p src/components

cat <<EOF > src/components/Msg.tsx
export default function Msg({ text }: { text: string }) {
  return <div>{text}</div>;
}
EOF

# Note: imported 'vitest' describe/it to be safe, though globals:true is set
cat <<EOF > src/components/Msg.test.tsx
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
EOF

# 5. Run Tests
echo "Running Unit Tests..."
pnpm exec vitest run

echo "=== Step 4: Storybook Strings ==="
pnpm add -D @storybook/test

mkdir -p src/stories
cat <<EOF > src/stories/Msg.stories.ts
import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import Msg from '../components/Msg';

const meta = {
  title: 'Example/Msg',
  component: Msg,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Msg>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Hello Storybook',
  },
};

export const WithInteraction: Story = {
  args: {
    text: 'Interactive Test',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Interactive Test')).toBeInTheDocument();
  },
};
EOF

# Verify build works (static build check)
echo "Building Storybook..."
pnpm build-storybook --quiet
echo "Storybook build passed."

echo "=== Step 5: Playwright ==="
# Install Playwright directly
pnpm add -D @playwright/test

# Install only Chromium to save time
pnpm exec playwright install chromium

# Add test scripts
npm pkg set scripts.test:e2e="playwright test"
npm pkg set scripts.test:e2e:ui="playwright test --ui"
npm pkg set scripts.test:e2e:headed="playwright test --headed"

# Create playwright config manually

cat <<EOF > playwright.config.ts
import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
EOF

# Create a test
mkdir -p tests
cat <<EOF > tests/example.spec.ts
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000');
  // Just check that the page loads and has some content from create-next-app
  await expect(page).toHaveTitle(/Create Next App/);
});
EOF

echo "Running Playwright Tests..."
# Only run chromium to save time/resources
pnpm exec playwright test --project=chromium

echo "All validation steps passed successfully!"
