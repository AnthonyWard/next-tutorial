# Step 4: Storybook Interaction Testing

Storybook allows you to simulate user behavior (clicks, typing) directly inside your stories using the `play` function.

## 1. Install Dependencies
Install the interaction testing package:

```bash
pnpm add -D @storybook/test
```

## 2. Create a Story for our Component
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

## 4. Automated Storybook Testing (Optional)
To run these tests in the command line (CI/CD), you can use the test runner.

Install the runner:
```bash
pnpm add -D @storybook/test-runner
```

Add a script to `package.json`:
```json
"test-storybook": "test-storybook"
```

Run storybook in one terminal, and in another:
```bash
pnpm test-storybook
```
