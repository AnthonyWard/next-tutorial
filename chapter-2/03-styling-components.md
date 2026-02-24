# Step 3: Styling Components

We already have Tailwind CSS configured (implied by `globals.css` and imports). Let's build a reusable component with proper styling and verify it in Storybook.

## 1. Create a Card Component

Create `src/components/Card.tsx`:

```tsx
import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card = ({ title, children, footer }: CardProps) => {
  return (
    <div className="border border-gray-200 dark:border-zinc-800 rounded-lg shadow-sm overflow-hidden bg-white dark:bg-black">
      <div className="px-6 py-4 border-b border-gray-100 dark:border-zinc-800">
        <h3 className="font-bold text-xl">{title}</h3>
      </div>
      <div className="p-6">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-3 bg-gray-50 dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800">
          {footer}
        </div>
      )}
    </div>
  );
};
```

## 2. Add a Story

Create `src/stories/Card.stories.tsx` to visualize it:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../components/Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Basic Card',
    children: 'This is the content of the card.',
  },
};

export const WithFooter: Story = {
  args: {
    title: 'Card with Footer',
    children: 'This card has a footer section.',
    footer: <button className="text-blue-500 text-sm">Action</button>,
  },
};
```

## 3. Run Storybook

```bash
pnpm storybook
```

Check the new Card component in the sidebar.

## 4. Use it in the App

Update `src/app/dashboard/page.tsx` to use the Card:

```tsx
import { Card } from '@/components/Card';

export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Statistics">
          <p>Users: 1,200</p>
          <p>Revenue: $45,000</p>
        </Card>
        <Card title="Recent Activity">
          <ul>
            <li>User A joined.</li>
            <li>User B purchased item X.</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
```
