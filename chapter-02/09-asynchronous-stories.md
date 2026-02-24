# Step 9: Asynchronous Stories (MSW)

Storybook allows us to document components in different states. For components that fetch data, we need to mock the network. We will use `msw` (Mock Service Worker) and the Storybook addon.

## 1. Install MSW and Addon
```bash
pnpm add -D msw msw-storybook-addon
```

## 2. Initialize MSW
Generate the service worker file in the `public` folder:
```bash
pnpm dlx msw init public/
```

## 3. Configure Storybook
Update `.storybook/preview.ts` to initialize the MSW loader.

```typescript
import type { Preview } from "@storybook/react";
import { initialize, mswLoader } from 'msw-storybook-addon';

// Initialize MSW
initialize();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  // Add the loader to all stories
  loaders: [mswLoader],
};

export default preview;
```

## 4. Create the Story
Create `src/stories/UserList.stories.ts`.

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import UserList from '../components/UserList';

const meta = {
  title: 'Example/UserList',
  component: UserList,
} satisfies Meta<typeof UserList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/users', () => {
          return HttpResponse.json([
            { id: 1, name: 'Storybook User 1', role: 'Admin' },
            { id: 2, name: 'Storybook User 2', role: 'Guest' },
          ]);
        }),
      ],
    },
  },
};

export const ErrorState: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/users', () => {
          return new HttpResponse(null, { status: 500 });
        }),
      ],
    },
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/users', async () => {
          // Infinite delay
          await new Promise(() => {}); 
          return HttpResponse.json([]);
        }),
      ],
    },
  },
};
```

## 5. Run Storybook
```bash
pnpm storybook
```
You can now switch between "Success", "ErrorState", and "Loading" to see how the component behaves without changing code.
