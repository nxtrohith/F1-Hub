import {GET} from '../api/events/route'
import EventsCard from '@/components/EventsCard';
import { EventAttrs } from '@/database/event.model';
import { getBaseUrl } from '@/lib/utils';

const page = async () => {
    const baseUrl = getBaseUrl();
    const response = await fetch(new URL('/api/events', baseUrl).toString());
    const {events} = await response.json();
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

export default page
