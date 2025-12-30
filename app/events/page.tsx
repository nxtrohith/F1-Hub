import EventsCard from '@/components/EventsCard';
import { EventAttrs } from '@/database/event.model';
import { getBaseUrl } from '@/lib/utils';

// Force dynamic rendering so we don't pre-render against an unavailable API during build.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
    const baseUrl = getBaseUrl();

    try {
        const response = await fetch(new URL('/api/events', baseUrl).toString(), { cache: 'no-store' });

        if (!response.ok) {
            console.warn('Failed to fetch events', await response.text());
            return renderEmpty();
        }

        const { events } = await response.json();
        return renderList(events);
    } catch (error) {
        console.warn('Events page fetch error', error);
        return renderEmpty();
    }
};

const renderList = (events: EventAttrs[] = []) => (
    <div>
      <h1 className="text-center">Events</h1>
      <p className="text-center mt-5">Stay updated with the latest events happening around you. Explore, participate, and make the most of your time!</p>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
        {events && events.length > 0 && events.map((event: EventAttrs) => (
            <li key={event.title} className="list-none">
                <EventsCard {...event} />
            </li>
        ))}
      </ul>
    </div>
);

const renderEmpty = () => renderList([]);

export default page
