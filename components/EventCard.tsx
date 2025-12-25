import Image from "next/image"
import Link from "next/link"

interface Props {
  title: string
  image: string
  href?: string
  slug: string
}

const EventCard = ({ title, image, slug }: Props) => {
  return (
    <Link
      href={`/teams/${slug}`}
      className="
        group
        block
        w-[400px]
        rounded-xl
        overflow-hidden
        bg-neutral-900
        border border-neutral-800
        transition-all
        duration-300
        hover:border-red-600
        hover:shadow-[0_0_30px_rgba(255,0,0,0.25)]
      "
    >
      {/* Image container */}
      <div className="relative w-full h-[250px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="
            object-cover
            transition-transform
            group-hover:skew-x-3
            duration-500
            group-hover:scale-110
          "
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* Text */}
      <div className="p-4">
        <p className="text-lg font-semibold text-white tracking-wide group-hover:text-red-500 transition-colors">
          {title}
        </p>
        <p className="text-sm text-neutral-400 mt-1">
          View event details →
        </p>
      </div>
    </Link>
  )
}

export default EventCard
