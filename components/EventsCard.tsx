"use client";

import Link from "next/link";
import Image from "next/image";
import posthog from "posthog-js";

interface Props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

const EventsCard = ({ title, image, slug, location, date, time }: Props) => {
  return (
    <Link
      href={`/event/${slug}`}
      onClick={() => {
        posthog.capture("event-card-clicked", {
          event_title: title,
          event_slug: slug,
          event_location: location,
          event_date: date,
          event_time: time,
        });
      }}
      className="
        group block w-full overflow-hidden rounded-2xl
        bg-neutral-900 border border-neutral-800
        transition-all duration-300
        hover:border-red-600
        hover:shadow-[0_0_35px_rgba(255,0,0,0.25)]
      "
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/2] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="
            object-cover
            transition-transform duration-500 ease-out
            group-hover:scale-110
          "
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Location */}
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <Image src="/icons/pin.svg" alt="location" width={14} height={14} />
          <p>{location}</p>
        </div>

        {/* Title */}
        <p className="text-base sm:text-lg font-semibold text-white leading-snug group-hover:text-red-500 transition-colors">
          {title}
        </p>

        {/* Date & Time */}
        <div className="flex items-center gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-1">
            <Image src="/icons/calendar.svg" alt="date" width={14} height={14} />
            <p>{date}</p>
          </div>
          <div className="flex items-center gap-1">
            <Image src="/icons/clock.svg" alt="time" width={14} height={14} />
            <p>{time}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventsCard;
