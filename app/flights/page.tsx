import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import Faq from "@/components/Faq";
import { WlSearchForm, WlResults } from "@/components/WhiteLabel";

export const metadata: Metadata = {
  title: "Cheap Flights — Compare 100+ Airlines in One Search",
  description:
    "Compare cheap flights across hundreds of airlines and travel agents. Flexible dates, 'Everywhere' search and zero booking fees on TicketsJet.",
  alternates: { canonical: "/flights" },
};

const faq = [
  { q: "When is the cheapest time to book a flight?", a: "For short-haul routes, the best fares usually appear 3–8 weeks before departure. For long-haul, aim for 2–5 months out. Tuesday and Wednesday departures are consistently the cheapest days to fly." },
  { q: "Can I search flexible dates?", a: "Yes — use the calendar view in the search form to compare fares across the whole month and pick the cheapest combination of dates." },
  { q: "Are the prices final?", a: "Prices shown are sourced live from airlines and agencies. The final price is confirmed on the provider's own site during checkout, before you pay." },
  { q: "Can I book flexible or refundable tickets?", a: "Many airlines offer tickets with free date changes. Apply the flexible-ticket filter in your search results to see only those fares." },
];

export default function FlightsPage() {
  return (
    <>
      <section className="bg-ink pb-16 pt-14">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">Flights</p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Compare cheap flights across 100+ airlines
          </h1>
          <p className="mt-4 max-w-xl text-white/70">
            One search across airlines and agencies. Book directly with the provider —
            TicketsJet never adds fees.
          </p>
          <div className="boarding-pass mt-9 px-5 py-6 sm:px-7">
            <WlSearchForm />
          </div>
        </div>
      </section>

      {/* نتائج البحث تظهر هنا — في نفس الصفحة */}
      <section className="mx-auto max-w-6xl px-4">
        <WlResults />
      </section>

      <AdSlot slot="3333333333" className="mt-10" />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">How to pay less for the same seat</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            { t: "Fly mid-week", d: "Tuesday and Wednesday departures are routinely 15–25% cheaper than Friday and Sunday on the same route." },
            { t: "Search 'Everywhere'", d: "Let fares pick your destination. Region-wide search surfaces deals you would never find searching city by city." },
            { t: "Book the sweet spot", d: "3–8 weeks ahead for short-haul, 2–5 months for long-haul. Last-minute bargains are rare on popular routes." },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-mist bg-white p-6">
              <h3 className="font-display text-lg font-bold text-ink">{c.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{c.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-slate">
          Want the full playbook? Read our guide:{" "}
          <Link href="/blog/how-to-find-cheap-flights" className="font-semibold text-amber-deep underline">
            How to find cheap flights in 2026
          </Link>
        </p>
      </section>

      <section className="border-t border-mist bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Flight search FAQ</h2>
          <div className="mt-7"><Faq items={faq} /></div>
        </div>
      </section>
    </>
  );
}
