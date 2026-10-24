import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import Faq from "@/components/Faq";
import { WlSearchForm, WlResults } from "@/components/WhiteLabel";
import HeroFlightForm, { type Initial } from "@/components/HeroFlightForm";
import FilterBridge from "@/components/FilterBridge";
import NearbyDates from "@/components/NearbyDates";
import TripExtras from "@/components/TripExtras";
import { parseSearchCode } from "@/lib/searchCode";
import { getCities } from "@/lib/places";
import DealsGrid from "@/components/DealsGrid";
import { getDeals } from "@/lib/deals";
import { ROUTES, DESTS, originName, slug } from "@/lib/routes";

type SP = Promise<{ flightSearch?: string; direct?: string; bags?: string }>;

async function cityObj(code: string) {
  try {
    const c = (await getCities()).find((x) => x.code === code);
    if (c) return { code: c.code, name: c.name, country: c.country };
  } catch {}
  return { code, name: code, country: "" };
}

async function cityName(code: string) {
  try {
    return (await getCities()).find((c) => c.code === code)?.name ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ searchParams }: { searchParams: SP }): Promise<Metadata> {
  const { flightSearch } = await searchParams;
  return {
    title: "Cheap Flights — Compare Airlines in One Search",
    description:
      "Compare cheap flights across airlines and travel agents. Flexible dates, an Explore map and no booking fees added by us.",
    alternates: { canonical: "/flights" },
    // Individual search result pages aren't useful in Google; only the plain /flights page is indexed.
    robots: flightSearch ? { index: false, follow: true } : undefined,
  };
}

const faq = [
  { q: "When is the cheapest time to book a flight?", a: "For short-haul routes, the best fares usually appear 3–8 weeks before departure. For long-haul, aim for 2–5 months out. Tuesday and Wednesday departures are consistently the cheapest days to fly." },
  { q: "Can I search flexible dates?", a: "Yes — use the calendar view in the search form to compare fares across the whole month and pick the cheapest combination of dates." },
  { q: "Are the prices final?", a: "Prices shown are sourced live from airlines and agencies. The final price is confirmed on the provider's own site during checkout, before you pay." },
  { q: "Can I book flexible or refundable tickets?", a: "Many airlines offer tickets with free date changes. Apply the flexible-ticket filter in your search results to see only those fares." },
];

export default async function FlightsPage({ searchParams }: { searchParams: SP }) {
  const { flightSearch, direct, bags } = await searchParams;
  const trip = parseSearchCode(flightSearch);
  const searching = Boolean(flightSearch);
  const destName = trip ? await cityName(trip.dest) : null;
  const deals = searching ? null : await getDeals();
  // Prefill the search box from the URL so the visitor can tweak and search again.
  const initial: Initial | undefined = trip
    ? {
        trip: trip.legs ? "multi" : trip.back ? "round" : "oneway",
        from: await cityObj(trip.origin),
        to: trip.legs ? undefined : await cityObj(trip.dest),
        depart: trip.depart,
        back: trip.back,
        legs: trip.legs ? await Promise.all(trip.legs.map(async (l) => ({ to: await cityObj(l.dest), date: l.date }))) : undefined,
        adults: trip.adults,
        children: trip.children,
        infants: trip.infants,
        cabin: trip.business ? "business" : "economy",
        direct: direct === "1",
        bags: bags === "1",
      }
    : undefined;
  return (
    <>
      <section className={searching ? "bg-ink pb-8 pt-6" : "bg-ink pb-16 pt-14"}>
        <div className="mx-auto max-w-6xl px-4">
          {!searching && <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">Flights</p>}
          <h1 className={searching ? "sr-only" : "font-display mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl"}>
            Compare cheap flights across many airlines
          </h1>
          {!searching && (
            <p className="mt-4 max-w-xl text-white/70">
              One search across airlines and agencies. Book directly with the provider —
              TicketsJet never adds fees.
            </p>
          )}
          <div className={`boarding-pass ${searching ? "" : "mt-9"} px-5 py-6 sm:px-7`}>
            <HeroFlightForm key={flightSearch ?? "new"} initial={initial} />
          </div>
          {/* The results widget expects its own search container on the page; it stays off-screen. */}
          <div aria-hidden="true" style={{ position: "absolute", left: -9999, top: 0, width: 1, height: 1, overflow: "hidden" }}>
            <WlSearchForm />
          </div>
        </div>
      </section>

      {/* نتائج البحث تظهر هنا — في نفس الصفحة */}
      <section className="mx-auto max-w-6xl px-4">
        {trip && trip.back && <NearbyDates origin={trip.origin} dest={trip.dest} depart={trip.depart} />}
        <WlResults />
        <FilterBridge direct={direct === "1"} bags={bags === "1"} />
        {trip && destName && <TripExtras city={destName} depart={trip.depart} back={trip.back} />}
      </section>

      {!searching && (
        <>
          <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 pt-6 text-sm text-slate">
            <Link href="/" className="hover:text-ink">Home</Link> <span aria-hidden="true">›</span> <span className="text-ink">Flights</span>
          </nav>

          <section className="mx-auto max-w-6xl px-4 pt-6">
            <ul className="grid gap-4 md:grid-cols-3">
              {[
                { t: "Compare many providers", d: "One search across airlines and travel agencies, with prices shown before you leave." },
                { t: "Find the cheapest dates", d: "Flexible-date strip and price calendars show when a route is cheapest." },
                { t: "No fees from us", d: "You book directly with the provider at their price. We add no markup." },
              ].map((c) => (
                <li key={c.t} className="rounded-2xl border border-mist bg-white p-5">
                  <h2 className="font-semibold text-ink">{c.t}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-slate">{c.d}</p>
                </li>
              ))}
            </ul>
          </section>

          {deals && (
            <div className="mx-auto max-w-6xl px-4 pt-14">
              <DealsGrid origin={deals.origin} items={deals.items} />
            </div>
          )}

          <section className="mx-auto max-w-6xl px-4 pt-14">
            <h2 className="font-display text-2xl font-bold text-ink">Popular routes</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {ROUTES.slice(0, 14).map(([o, d]) => (
                <li key={`${o}${d}`}>
                  <Link href={`/cheap-flights/${slug(o, d)}`} className="block rounded-full border border-mist bg-white px-4 py-2 text-sm font-medium text-ink hover:border-amber">
                    {originName(o)} to {DESTS[d].name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/cheap-flights" className="block rounded-full px-4 py-2 text-sm font-semibold text-amber-deep hover:underline">All routes →</Link>
              </li>
            </ul>
          </section>
        </>
      )}

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
