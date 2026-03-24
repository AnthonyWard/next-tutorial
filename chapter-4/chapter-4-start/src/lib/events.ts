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
    // throw new Error("Failed to load events");
    return events;
}