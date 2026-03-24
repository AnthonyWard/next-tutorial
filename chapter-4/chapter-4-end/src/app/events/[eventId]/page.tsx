// src/app/events/[eventId]/page.tsx
import { getEvent } from '@/lib/events';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import BookingForm from '@/components/BookingForm';

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
      <BookingForm eventId={eventId} />
    </div>
  );
}