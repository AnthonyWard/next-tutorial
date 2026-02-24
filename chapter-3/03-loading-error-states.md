# Step 3: Loading and Error States [Part 1: Loading]

Since our data fetching has a simulated delay, users will see a blank screen or a spinner if we don't handle it. Next.js App Router uses `loading.tsx` to show an instant loading state.

## 1. Create a Loading UI for Events

Create `src/app/events/loading.tsx`. This file will automatically wrap the page file in a Suspense boundary.

```tsx
// src/app/events/loading.tsx
export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="h-10 w-48 bg-gray-200 dark:bg-zinc-800 rounded mb-8 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-48 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}
```

Navigate to `/events`. You should see the skeleton loading state for 1 second before the content appears.

# Step 3: Loading and Error States [Part 2: Error]

What if the fetch fails? `error.tsx` acts as an Error Boundary.

## 1. Simulate an Error

Temporarily modify `src/lib/events.ts` to throw an error:

```typescript
export async function getEvents(): Promise<Event[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    throw new Error("Failed to load events");
    // return events;
}
```

## 2. Create Error UI

Create `src/app/events/error.tsx`. It must be a **Client Component**.

```tsx
// src/app/events/error.tsx
'use client'; 

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-4xl mx-auto p-8 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try again
      </button>
    </div>
  );
}
```

Reload `/events`. You will see the error UI.
**Don't forget to revert your simulated error in `src/lib/events.ts`!**
