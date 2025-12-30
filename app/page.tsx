import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import Image from "next/image";
import { teams } from "@/lib/constants";
import { getBaseUrl } from "@/lib/utils";

const Page = async () => {
	const baseUrl = getBaseUrl();
	const response = await fetch(new URL('/api/events', baseUrl).toString())
	const {events} = await response.json();

	return (
		<section>
			<h1 className="text-center">The F1 2026 Season Hub</h1>
			<p className="text-center mt-5">The view of f1 2026 for fans</p>

			<ExploreBtn />

			<div className="mt-20 space-y-7 ">
				<h3>Grid of 2026</h3>

				<ul
					className="events grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-35 gap-y-10"
					style={{ listStyleType: "none" }}
				>
					{teams.map((team) => (
						<li key={team.title} className="">
							<EventCard {...team} />
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}

export default Page;