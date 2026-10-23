import type { Metadata } from "next";
import Link from "next/link";
import TpWidget from "@/components/TpWidget";
import AdSlot from "@/components/AdSlot";
import Faq from "@/components/Faq";
import { WIDGETS } from "@/lib/config";

export const metadata: Metadata = {
  title: "Explore Cheap Flights on a Price Map — Find Where to Fly",
  description:
    "Start from your budget, not the destination. See the cheapest flight prices from your city to destinations around the world on one interactive map.",
  alternates: { canonical: "/explore" },
};

const faq = [
  { q: "How does the price map work?", a: "Pick a departure city and the map shows the lowest recent fares to destinations around the world. Zoom in and click a price to see the dates and open the offer." },
  { q: "Are these prices live?", a: "They are the lowest fares found recently by travellers searching these routes, so treat them as a guide. The final price is always confirmed on the booking page before you pay." },
  { q: "Can I change the departure city?", a: "Yes. Use the departure field on the map to choose another city and the prices update for that origin." },
  { q: "What happens when I click a price?", a: "You'll see the dates for that fare and a button to open the offer, where you complete your booking directly with the airline or travel agent." },
];

export default function ExplorePage() {
  return (
    <>
      <section className="bg-ink pb-14 pt-14">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">Explore</p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Where can your budget take you?
          </h1>
          <p className="mt-4 max-w-xl text-white/70">
            Start from the price, not the destination. Choose your departure city and see the
            cheapest fares around the world on one map.
          </p>
        </div>
      </section>

      <section className="mx-auto -mt-6 max-w-6xl px-4">
        <div className="boarding-pass overflow-hidden p-2 sm:p-3">
          <TpWidget src={WIDGETS.priceMap} minHeight={520} />
        </div>
        <p className="mt-3 text-xs text-slate">
          Prices are indicative return fares found recently. Confirm the final price on the booking page.
        </p>
      </section>

      <AdSlot slot="7777777777" className="mt-10" />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Three ways to use the map</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            { t: "Flexible on where", d: "Zoom into a region and pick the cheapest city that fits the trip you want." },
            { t: "Flexible on when", d: "Click a price to see its dates, then compare nearby days in the flight search." },
            { t: "Fixed destination", d: "Already know where you're going? Use the full flight search for exact dates and filters." },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-mist bg-white p-6">
              <h3 className="font-display text-lg font-bold text-ink">{c.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{c.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-slate">
          Ready to search exact dates?{" "}
          <Link href="/flights" className="font-semibold text-amber-deep underline">Open the flight search</Link>
        </p>
      </section>

      <section className="border-t border-mist bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Price map FAQ</h2>
          <div className="mt-7"><Faq items={faq} /></div>
        </div>
      </section>
    </>
  );
}
