# Step 4: Storybook Interaction Testing

Storybook allows you to simulate user behavior (clicks, typing) directly inside your stories using the `play` function. These interactions run both in the Storybook UI and as automated tests.

## 1. Install Dependencies
Install the interaction testing package:

```bash
pnpm add -D @storybook/test
```

## 2. Create a Story with Interactions
Create a new file `src/stories/Msg.stories.ts`:

```typescript
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
    // Verify the text is present
    await expect(canvas.getByText('Interactive Test')).toBeInTheDocument();
  },
};
```

## 3. Run Storybook to See Interactions
1. Run `pnpm storybook`.
2. Navigate to "Example/Msg" -> "With Interaction".
3. Open the "Interactions" panel at the bottom.
4. You should see "PASS" indicating the expectation passed.

## 4. Automated Testing with Vitest
The great news: your play functions already run as automated tests! When you run `pnpm test`, Vitest executes all your stories including their play functions.

You'll see output like:
```
✓ storybook (chromium) src/stories/Msg.stories.ts (2 tests)
  ✓ Default
  ✓ WithInteraction
```

Both stories run as tests, and the `WithInteraction` story executes its play function automatically. No additional setup needed!

### Benefits of this approach:
- Write interactions once, use them in Storybook UI and automated tests
- Single test command runs both unit tests and Storybook tests
- Fast execution with Vitest's browser mode
- No need to keep Storybook server running for tests
