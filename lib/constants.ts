export type EventItem = {
  image: string;
  title: string;
  slug: string;
  location: string;
  date: string; // e.g., "2025-11-07"
  time: string; // e.g., "09:00 AM"
};

export const teams = [
	{
		image: "/images/redbullracingcard.jpg", // Updated path
		title: "RedBull Racing",
		slug: "redbull-racing",
	},
	{
		image: "/images/mercedescard.jpg", // Updated path
		title: "Mercedes AMG",
		slug: "mercedes-amg",
	},
	{
		image: "/images/ferraricard.jpg", // Updated path
		title: "Scuderia Ferrari",
		slug: "scuderia-ferrari",
	},
	{
		image: "/images/mclarencard1.jpg", // Updated path
		title: "McLaren F1 Team",
		slug: "mclaren-f1-team",
	},
	{
		image: "/images/alpinecard2.jpg", // Updated path
		title: "Alpine F1 Team",
		slug: "alpine-f1-team",
	},
	{
		image: "/images/astoncard.jpg", // Updated path
		title: "Aston Martin Cognizant",
		slug: "aston-martin-cognizant",
	},
	{
		image: "/images/williamcard.jpg", // Updated path
		title: "Williams Racing",
		slug: "williams-racing",
	},
	{
		image: "/images/hasscard.jpg", // Updated path
		title: "Haas F1 Team",
		slug: "haas-f1-team",
	},
	{
		image: "/images/audicard.jpg", // Updated path
		title: "Revolut Audi F1 Team",
		slug: "revolut-audi-f1-team",
	},
	{
		image: "/images/visarbcard.jpg", // Updated path
		title: "Visa CashApp RB F1 Team",
		slug: "visa-cashapp-rb-f1-team",
	},
  {
		image: "/images/caddilaccard.jpg", // Updated path
		title: "Cadillac F1 Team",
		slug: "cadillac-f1-team",
	},
];

export const events: EventItem[] = [
  {
    image: "/images/bahrain-gp.jpg",
    title: "Bahrain GP Watch Party 2026",
    slug: "bahrain-gp-watch-party-2026",
    location: "London, UK - The Paddock Sports Bar",
    date: "2026-03-01",
    time: "02:00 PM"
  },
  {
    image: "/images/miami-gp.jpg",
    title: "Miami GP Fan Meet & Greet",
    slug: "miami-gp-fan-meet-2026",
    location: "Miami, FL - Hard Rock Stadium",
    date: "2026-05-03",
    time: "10:00 AM"
  },
  {
    image: "/images/monaco-gp.jpg",
    title: "Monaco GP Live Streaming Event",
    slug: "monaco-gp-live-streaming-2026",
    location: "New York, NY - F1 Arcade",
    date: "2026-05-24",
    time: "08:00 AM"
  },
  {
    image: "/images/silverstone-gp.jpg",
    title: "Silverstone GP Pit Lane Experience",
    slug: "silverstone-gp-pit-lane-2026",
    location: "Silverstone, UK - Silverstone Circuit",
    date: "2026-07-05",
    time: "09:00 AM"
  },
  {
    image: "/images/spa-gp.jpg",
    title: "Belgian GP Race Party",
    slug: "belgian-gp-race-party-2026",
    location: "Brussels, Belgium - Grand Prix Lounge",
    date: "2026-07-26",
    time: "01:00 PM"
  },
  {
    image: "/images/monza-gp.jpg",
    title: "Monza GP Tifosi Gathering",
    slug: "monza-gp-tifosi-gathering-2026",
    location: "Milan, Italy - Piazza del Duomo",
    date: "2026-09-06",
    time: "12:00 PM"
  },
  {
    image: "/images/singapore-gp.jpg",
    title: "Singapore GP Night Race Watch Party",
    slug: "singapore-gp-watch-party-2026",
    location: "Singapore - Marina Bay Street Circuit",
    date: "2026-09-20",
    time: "07:00 PM"
  },
  {
    image: "/images/austin-gp.jpg",
    title: "Austin GP Fan Festival",
    slug: "austin-gp-fan-festival-2026",
    location: "Austin, TX - Circuit of The Americas",
    date: "2026-10-18",
    time: "11:00 AM"
  },
  {
    image: "/images/mexico-gp.jpg",
    title: "Mexico City GP Street Party",
    slug: "mexico-city-gp-street-party-2026",
    location: "Mexico City, Mexico - Autódromo Hermanos Rodríguez",
    date: "2026-10-25",
    time: "01:00 PM"
  },
  {
    image: "/images/brazil-gp.jpg",
    title: "São Paulo GP Carnival Celebration",
    slug: "sao-paulo-gp-carnival-2026",
    location: "São Paulo, Brazil - Interlagos Circuit",
    date: "2026-11-01",
    time: "11:00 AM"
  },
  {
    image: "/images/vegas-gp.jpg",
    title: "Las Vegas GP VIP Watch Party",
    slug: "las-vegas-gp-vip-watch-party-2026",
    location: "Las Vegas, NV - The Strip",
    date: "2026-11-21",
    time: "09:00 PM"
  },
  {
    image: "/images/abu-dhabi-gp.jpg",
    title: "Abu Dhabi GP Season Finale Party",
    slug: "abu-dhabi-gp-finale-party-2026",
    location: "Abu Dhabi, UAE - Yas Marina Circuit",
    date: "2026-11-29",
    time: "04:00 PM"
  }
];