# Step 2: Server Components & Data Fetching

Now let's fetch real (simulated) data. In the App Router, components are Server Components by default. This means you can make database queries or API calls directly inside them.

## 1. Create a Fake Database

Let's simulate a database response. Create `src/lib/events.ts`.

```typescript
// src/lib/events.ts
export type Event = {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
};

const events: Event[] = [
  {
    id: '1',
    name: 'Next.js Conference',
    date: '2024-10-25',
    location: 'San Francisco, CA',
    description: 'Join us for the biggest Next.js event of the year.',
  },
  {
    id: '2',
    name: 'React Summit',
    date: '2024-11-14',
    location: 'New York, NY',
    description: 'A gathering of React enthusiasts.',
  },
];

export async function getEvent(id: string): Promise<Event | undefined> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return events.find((event) => event.id === id);
}

export async function getEvents(): Promise<Event[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return events;
}
```

## 2. Update the Event Details Page

Now update `src/app/events/[eventId]/page.tsx` to fetch data.

```tsx
// src/app/events/[eventId]/page.tsx
import { getEvent } from '@/lib/events';
import { notFound } from 'next/navigation';
import Link from 'next/link';

type Props = {
  params: Promise<{ eventId: string }>;
};

export default async function EventDetailsPage({ params }: Props) {
  const { eventId } = await params;
  const event = await getEvent(eventId);

  if (!event) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
        <Link href="/events" className="text-sm text-gray-500 mb-4 block hover:underline">&larr; Back to Events</Link>
      <div className="bg-white dark:bg-zinc-900 shadow rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
        <p className="text-gray-500 mb-4">{new Date(event.date).toLocaleDateString()} • {event.location}</p>
        <p className="text-lg leading-relaxed">{event.description}</p>
      </div>
    </div>
  );
}
```

The `notFound()` function will trigger the generic 404 page or a specific `not-found.tsx` if we define one.

## 3. Create an Events Listing Page

Let's list all events at `/events`. Create `src/app/events/page.tsx`.

```tsx
// src/app/events/page.tsx
import { getEvents } from '@/lib/events';
import Link from 'next/link';
import { Card } from '@/components/Card';

export default async function EventsListPage() {
  const events = await getEvents();

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <Card key={event.id} title={event.name}>
             <p className="text-gray-600 dark:text-gray-400 mb-2">{event.date}</p>
             <p className="mb-4 text-sm">{event.description}</p>
             <Link 
                href={`/events/${event.id}`} 
                className="text-blue-500 hover:underline"
             >
                View Details &rarr;
             </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
```
