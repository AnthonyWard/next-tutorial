# Step 1: Dynamic Routes with [id]

To display individual event details, we need a route that can capture an ID from the URL.

## 1. Create the Events Structure

We want our URLs to look like `/events/1`, `/events/2`, etc.

1.  Create a folder `src/app/events`.
2.  Inside `src/app/events`, create another folder `[eventId]`. The square brackets `[]` tell Next.js this is a dynamic segment.
3.  Inside `src/app/events/[eventId]`, create a `page.tsx` file.

```tsx
// src/app/events/[eventId]/page.tsx
type Props = {
  params: Promise<{ eventId: string }>;
};

export default async function EventDetailsPage({ params }: Props) {
  const { eventId } = await params;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Event Details</h1>
      <p className="text-xl">Displaying details for event ID: {eventId}</p>
    </div>
  );
}
```

*Note: In Next.js 15, `params` is a Promise and must be awaited.*

## 2. Test the Route

1.  Run `pnpm dev`.
2.  Visit `http://localhost:3000/events/123`.
3.  You should see "Displaying details for event ID: 123".

## 3. Generate Static Params (Optional Concept)

If we knew all event IDs ahead of time, we could use `generateStaticParams` to pre-build these pages. For now, we will assume they are dynamic and fetched on demand.
