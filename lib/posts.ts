export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "how-to-find-cheap-flights",
    title: "How to Find Cheap Flights in 2026: 9 Tactics That Actually Work",
    description:
      "From flexible-date search to 'Everywhere' destinations, these are the proven ways to cut your airfare — without cutting corners.",
    date: "2026-07-01",
    readingTime: "6 min read",
    body: [
      "The single biggest lever on airfare is flexibility. If you can shift your departure by even two or three days, calendar-view search will often surface fares 20–40% lower than your original dates. Mid-week departures (Tuesday and Wednesday) remain consistently cheaper than Friday and Sunday.",
      "Second: search by region, not by city. Searching 'Everywhere' or a whole country lets the fare data tell you where the deals are, instead of forcing a route and paying whatever it costs. Many of the best trips start with a price, not a destination.",
      "Third: book the sweet spot. For short-haul flights, the best fares typically appear 3–8 weeks before departure; for long-haul, 2–5 months. Last-minute deals are mostly a myth on popular routes.",
      "Finally, always compare across providers. TicketsJet searches hundreds of airlines and agencies at once and never adds booking fees — you book directly with the provider at their price.",
    ],
  },
  {
    slug: "hotel-booking-mistakes",
    title: "7 Hotel Booking Mistakes That Cost You Money",
    description:
      "Free cancellation traps, resort fees, and the map trick most travellers miss — here's how to book smarter stays.",
    date: "2026-06-24",
    readingTime: "5 min read",
    body: [
      "Mistake one: booking on the first price you see. Hotel rates vary widely between platforms for the exact same room. A comparison search across providers routinely finds differences of 10–25% per night.",
      "Mistake two: ignoring the total price. Resort fees, city taxes and cleaning charges can add 15–30% to the headline rate. Always compare the final checkout price, not the nightly teaser.",
      "Mistake three: booking non-refundable too early. If your plans have any chance of changing, a free-cancellation rate a few euros higher is almost always the better bet — you can rebook if prices drop.",
      "Use the map view. Hotels one metro stop outside the tourist core are often 30–40% cheaper for an identical standard of room, and the commute is usually minutes.",
    ],
  },
  {
    slug: "car-rental-guide",
    title: "The No-Surprises Car Rental Guide: Insurance, Fuel and Deposits Explained",
    description:
      "What full-to-full really means, when extra insurance is worth it, and how to avoid the counter upsell.",
    date: "2026-06-15",
    readingTime: "5 min read",
    body: [
      "Fuel policy is the first thing to check. 'Full-to-full' — pick up full, return full — is almost always the fairest deal. 'Full-to-empty' policies charge premium fuel rates and refund nothing for what you don't use.",
      "On insurance: the basic rate usually includes Collision Damage Waiver with a high excess (deductible). Third-party excess insurance bought online in advance is typically far cheaper than the same cover sold at the rental counter.",
      "Hold a credit card in the main driver's name. Most rental desks require one for the security deposit; debit cards are frequently refused or trigger forced insurance purchases.",
      "Photograph the car — every panel, wheels, windscreen and fuel gauge — at pickup and at return. It takes ninety seconds and it is the single best protection against damage disputes.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
