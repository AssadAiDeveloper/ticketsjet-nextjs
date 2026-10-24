import Link from "next/link";
import { bookingUrl } from "@/lib/config";

type Props = { city: string; depart: string; back: string | null };

/** Services related to this trip, shown under the search. */
export default function TripExtras({ city, depart, back }: Props) {
  // Booking.com needs a check-out date; for one-way searches we leave dates empty.
  const hotel = bookingUrl({ city, checkin: back ? depart : undefined, checkout: back ?? undefined });
  const cards = [
    { t: `Hotels in ${city}`, d: back ? "Same dates as your flights." : "Search on Booking.com.", href: hotel, external: true, label: "Search stays" },
    { t: "Airport transfer", d: "Pre-book a driver and know the price.", href: "/services/airport-transfers", label: "Learn more" },
    { t: "Travel eSIM", d: "Mobile data abroad, no roaming bill.", href: "/services/esim", label: "Learn more" },
    { t: "Delay protection", d: "Check if a delay could earn you compensation.", href: "/services/flight-compensation", label: "Learn more" },
  ];
  return (
    <section aria-label="Plan the rest of your trip" className="pt-10">
      <h2 className="font-display text-lg font-bold text-ink">Plan the rest of your trip</h2>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <li key={c.t}>
            {c.external ? (
              <a href={c.href} target="_blank" rel="nofollow noopener" className="block h-full rounded-2xl border border-mist bg-white p-4 transition hover:border-amber hover:shadow">
                <p className="font-semibold text-ink">{c.t}</p>
                <p className="mt-1 text-sm text-slate">{c.d}</p>
                <p className="mt-3 text-sm font-semibold text-amber-deep">{c.label} →</p>
              </a>
            ) : (
              <Link href={c.href} className="block h-full rounded-2xl border border-mist bg-white p-4 transition hover:border-amber hover:shadow">
                <p className="font-semibold text-ink">{c.t}</p>
                <p className="mt-1 text-sm text-slate">{c.d}</p>
                <p className="mt-3 text-sm font-semibold text-amber-deep">{c.label} →</p>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
