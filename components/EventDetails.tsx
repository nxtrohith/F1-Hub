import EventsCard from '@/components/EventsCard';
import { EventAttrs } from '@/database/event.model';
import { cacheLife } from 'next/cache';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const EventDetails = async ({params} : {params: Promise<string>}) => {
    'use cache';
    cacheLife('hours');
    const res = await fetch(`${BASE_URL}/api/events`).catch(() => null);
    if (!res || !res.ok) return <div className="text-center">Failed to load events.</div>;

    const { events = [] } = await res.json();
    console.log(events);
  return (
    <div>
      <h1 className="text-center">Events</h1>
        <p className="text-center mt-5">Stay updated with the latest events happening around you. Explore, participate, and make the most of your time!</p>
        {/* Add your events listing or other content here */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
                    {events && events.length > 0 && events.map((event: EventAttrs) => (
                        <li key={event.title} className="list-none">
                            <EventsCard {...event} />
                        </li>
                    ))}
        </ul>
    </div>
  )
}

export default EventDetails
