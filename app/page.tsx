import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import Image from "next/image";

const events = [
	{
		image: "/images/redbullracingcard.jpg", // Updated path
		title: "RedBull Racing",
	},
	{
		image: "/images/mercedescard.jpg", // Updated path
		title: "Mercedes AMG",
	},
	{
		image: "/images/ferraricard.jpg", // Updated path
		title: "Scuderia Ferrari",
	},
	{
		image: "/images/mclarencard1.jpg", // Updated path
		title: "McLaren F1 Team",
	},
	{
		image: "/images/alpinecard2.jpg", // Updated path
		title: "Alpine F1 Team",
	},
	{
		image: "/images/astoncard.jpg", // Updated path
		title: "Aston Martin Cognizant",
	},
	{
		image: "/images/williamcard.jpg", // Updated path
		title: "Williams Racing",
	},
	{
		image: "/images/hasscard.jpg", // Updated path
		title: "Haas F1 Team",
	},
	{
		image: "/images/audicard.jpg", // Updated path
		title: "Revolut Audi F1 Team",
	},
	{
		image: "/images/visarbcard.jpg", // Updated path
		title: "Visa CashApp RB F1 Team",
	},
  {
		image: "/images/caddilaccard.jpg", // Updated path
		title: "Cadillac F1 Team",
	},
];

export default function Home() {
	return (
		<section>
			<h1 className="text-center">The F1 2026 Season Hub</h1>
			<p className="text-center mt-5">The view of f1 2026 for fans</p>

			<ExploreBtn />

			<div className="mt-20 space-y-7 ">
				<h3>Teams</h3>

				<ul className="events" style={{ listStyleType: "none" }} className='grid
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3
    gap-x-35
    gap-y-10'>
					{events.map((event) => (
						<li key={event.title} className="">
							<EventCard {...event} />
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
