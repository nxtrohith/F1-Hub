import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import BookEvent from "@/components/BookEvent";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import type { IEvent } from "@/types";
import EventsCard from "@/components/EventsCard";
import { getBaseUrl } from "@/lib/utils";

// Recommended racing underline h2 style; Fallback if `after:` variants aren't available:
// Fallback: text-red-600 font-semibold mt-4 pb-1 border-b-2 border-red-600 tracking-wide uppercase
const h2style = "relative font-semibold tracking-wide uppercase text-white-900 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-24 after:bg-red-600";

const EventDetailItem = ({ icon, alt, label }: { icon: string; alt: string; label: string }) => (
    <div className="flex flex-row gap-2 items-center">
        <Image src={icon} alt={alt} width={17} height={17} />
        <p>{label}</p>
    </div>
)
const EventTags = ({ tags }: { tags: string[] }) => (
    <div className="flex flex-row gap-1.5 flex-wrap mt-4">
        {tags.map((tag) => (
            <div key={tag} className="pill">{tag}</div>
        ))}
    </div>
)

const EventDetailsContent = async ({ slug }: { slug: string }) => {
    noStore();
    const baseUrl = getBaseUrl();
    const request = await fetch(new URL(`/api/events/${slug}`, baseUrl).toString(), { cache: "no-store" });
    const { event: { description, image, date, time, location, mode, venue, title, organizer, capacity, tags }, event } = await request.json();

    if (!event) return notFound();
    const bookings = 10;

    const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug) ?? [];
    let parsedTags: string[] = [];
    try {
        parsedTags = Array.isArray(tags)
            ? (typeof tags[0] === "string" ? JSON.parse(tags[0] ?? "[]") : tags)
            : [];
    } catch (error) {
        parsedTags = [];
    }
  return (
    <section id='event'>
        <div className="header">
            <h1 className={`${h2style} text-4xl`}>{title}</h1>
        </div>

        <div className="details">
            {/* {Left Side} */}

            <div className="content">
                <Image src={image} alt={title} width={400} height={400} className="rounded-sm" />

                <section className="flex flex-col gap-2">
                    <h2 className={h2style}>Event Description</h2>
                    <p>{description}</p>
                </section>

                <section className="flex flex-col gap-2">
                    <h2 className={h2style}>
                        Event Details
                    </h2>

                    <EventDetailItem icon="/icons/calendar.svg" alt="Date Icon" label={date} />
                    <EventDetailItem icon="/icons/clock.svg" alt="Time Icon" label={time} />
                    <EventDetailItem icon="/icons/mode.svg" alt="Mode Icon" label={mode} />
                    <EventDetailItem icon="/icons/pin.svg" alt="pin Icon" label={location} />
                    <EventDetailItem icon="/icons/audience.svg" alt="Capacity Icon" label={`Capacity: ${capacity}`} />
                </section>

                <EventTags tags={parsedTags} />
            </div>

            {/* {Right Side} */}
            <aside className="booking">
                <div className="signup-card">
                    <h2>Book Your Spot</h2>
                    {bookings < capacity ? (
                        <div>
                            <p>Spots available: {capacity - bookings}</p>
                            <BookEvent />
                        </div>
                    ) : (
                        <p>Sorry, this event is fully booked.</p>
                    )}
                </div>
            </aside>
        </div>

        <div className="flex w-full flex-col gap-4 pt-15">

            <h2 className={h2style}>Similar Events</h2>
            <div className="events">
                {similarEvents.length > 0 && similarEvents.map((simEvent: IEvent) => (
                    <EventsCard key={simEvent.id} {...simEvent} />
                ))}
            </div>
        </div>
    </section>
    
  )
}

const Page = ({ params }: { params: { slug: string } }) => {
    const { slug } = params;
    return (
        <Suspense fallback={<div className="text-center">Loading event...</div>}>
            <EventDetailsContent slug={slug} />
        </Suspense>
    );
};

export default Page