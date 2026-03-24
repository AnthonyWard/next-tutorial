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