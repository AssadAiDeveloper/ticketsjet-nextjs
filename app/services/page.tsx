import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Travel Services — eSIM, Airport Transfers, Flight Compensation",
  description: "Useful extras for your trip: mobile data abroad, airport pickups and flight delay compensation.",
  alternates: { canonical: "/services" },
};

const items = [
  { href: "/services/esim", t: "Travel eSIM", d: "Mobile data abroad without roaming charges." },
  { href: "/services/airport-transfers", t: "Airport transfers", d: "Pre-book a driver and know the price up front." },
  { href: "/services/flight-compensation", t: "Flight compensation", d: "Check if a delay or cancellation entitles you to a payout." },
];

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink">Travel services</h1>
      <p className="mt-3 max-w-xl text-slate">Handy extras that go with a flight booking.</p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {items.map((i) => (
          <li key={i.href}>
            <Link href={i.href} className="block h-full rounded-2xl border border-mist bg-white p-6 hover:border-amber">
              <h2 className="font-display text-lg font-bold text-ink">{i.t}</h2>
              <p className="mt-2 text-sm text-slate">{i.d}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
