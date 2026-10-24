import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import Faq from "@/components/Faq";
import AdSlot from "@/components/AdSlot";
import { SITE } from "@/lib/config";
import { searchCode } from "@/lib/fares";
import PriceCalendar from "@/components/PriceCalendar";
import { getMonthFares, getRouteFares } from "@/lib/routeFares";
import { ACTIVITY_CITIES } from "@/lib/activities";
import { DESTS, ROUTES, originName, parseRoute, slug } from "@/lib/routes";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return ROUTES.map(([o, d]) => ({ route: slug(o, d) }));
}

type Props = { params: Promise<{ locale: string; route: string }> };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fmt = (iso: string) => `${Number(iso.slice(8, 10))} ${MONTHS[Number(iso.slice(5, 7)) - 1]} ${iso.slice(0, 4)}`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = parseRoute((await params).route);
  if (!r) return {};
  const from = originName(r.o);
  const to = DESTS[r.d].name;
  const fares = await getRouteFares(r.o, r.d);
  const low = fares ? Math.min(...fares.map((f) => f.price)) : null;
  return {
    title: `Cheap Flights from ${from} to ${to}${low ? ` from $${low}` : ""}`,
    description: `Compare flights from ${from} to ${to}. See recent low fares and the cheapest dates, then search airlines and agencies in one place.`,
    alternates: { canonical: `/cheap-flights/${slug(r.o, r.d)}` },
    // Without real price data the page is thin, so keep it out of the index.
    robots: fares ? undefined : { index: false, follow: true },
  };
}

export default async function RoutePage({ params }: Props) {
  setRequestLocale((await params).locale);
  const r = parseRoute((await params).route);
  if (!r) notFound();
  const from = originName(r.o);
  const dest = DESTS[r.d];
  const fares = await getRouteFares(r.o, r.d);
  const cheapest = fares ? fares.reduce((a, b) => (b.price < a.price ? b : a)) : null;
  const rows = fares ? [...fares].sort((a, b) => a.price - b.price).slice(0, 10) : [];
  const direct = fares?.filter((f) => f.stops === 0) ?? [];
  const href = (f: { depart: string; back: string | null }) =>
    `/flights?flightSearch=${searchCode(r.o.toUpperCase(), { code: dest.code, depart: f.depart, back: f.back })}`;

  // Next three calendar months (UTC), cheapest fare per day.
  const now = new Date();
  const monthKeys = [0, 1, 2].map((i) => {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + i, 1));
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
  });
  const calendar = fares
    ? await Promise.all(monthKeys.map(async (month) => ({ month, prices: await getMonthFares(r.o, r.d, month) })))
    : [];
  const today = now.toISOString().slice(0, 10);
  for (const m of calendar) for (const d of Object.keys(m.prices)) if (d < today) delete m.prices[d];
  const calHref = (iso: string, back: string | null) => href({ depart: iso, back });

  const related = ROUTES.filter(([o, d]) => o === r.o && d !== r.d).slice(0, 8);

  const faq = [
    {
      q: `How much is a flight from ${from} to ${dest.name}?`,
      a: cheapest
        ? `Recent searches show round-trip fares from about $${cheapest.price}. Prices change constantly, so the final price is confirmed with the provider before you book.`
        : `Prices vary by date and airline. Run a search to see current fares before you book.`,
    },
    {
      q: `When is the cheapest time to fly from ${from} to ${dest.name}?`,
      a: cheapest
        ? `The lowest recent fare departs on ${fmt(cheapest.depart)}. Mid-week departures outside school holidays are usually cheaper, and flexible dates help most.`
        : `Mid-week departures outside school holidays are usually cheaper, and flexible dates help most.`,
    },
    {
      q: `Are there direct flights from ${from} to ${dest.name}?`,
      a: fares
        ? direct.length
          ? `Yes — some of the recent fares we found were direct. Use the stops column to compare.`
          : `The recent low fares we found include a stop. Direct flights may still exist at a higher price; search to compare.`
        : `This depends on the dates. Search to see direct and one-stop options side by side.`,
    },
    { q: "Do you add fees?", a: "No. TicketsJet is a comparison tool: we show provider prices and send you to the provider to book. We may earn a commission from the provider at no extra cost to you." },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Flights", item: `${SITE.url}/flights` },
      { "@type": "ListItem", position: 3, name: `${from} to ${dest.name}`, item: `${SITE.url}/cheap-flights/${slug(r.o, r.d)}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, crumbs]) }} />
      <section className="bg-ink pb-14 pt-14">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">
            {r.o.toUpperCase()} → {dest.code}
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Cheap flights from {from} to {dest.name}
          </h1>
          <p className="mt-4 max-w-xl text-white/70">
            {cheapest
              ? `Recent round-trip fares start at $${cheapest.price}. Pick a date below or search your own.`
              : `Compare airlines and travel agencies for flights from ${from} to ${dest.name}.`}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/flights" className="rounded-full bg-amber px-6 py-3 font-semibold text-ink hover:brightness-95">
              Search {r.o.toUpperCase()} → {dest.code}
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12">
        {rows.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-bold text-ink">Cheapest dates found</h2>
            <p className="mt-1 text-sm text-slate">Round-trip prices per adult in USD, from recent searches. Refreshed hourly.</p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-mist bg-white">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="bg-cloud text-xs uppercase tracking-wider text-slate">
                  <tr>
                    <th className="px-4 py-3">Depart</th>
                    <th className="px-4 py-3">Return</th>
                    <th className="px-4 py-3">Stops</th>
                    <th className="px-4 py-3">From</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-mist">
                  {rows.map((f) => (
                    <tr key={f.depart}>
                      <td className="px-4 py-3 font-medium text-ink">{fmt(f.depart)}</td>
                      <td className="px-4 py-3 text-slate">{f.back ? fmt(f.back) : "One way"}</td>
                      <td className="px-4 py-3 text-slate">{f.stops === 0 ? "Direct" : `${f.stops} stop${f.stops > 1 ? "s" : ""}`}</td>
                      <td className="px-4 py-3 font-semibold text-ink">${f.price}</td>
                      <td className="px-4 py-3 text-right">
                        <Link href={href(f)} className="rounded-full bg-ink px-4 py-1.5 text-xs font-semibold text-white hover:bg-ink/90">
                          Search
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {calendar.some((m) => Object.keys(m.prices).length > 0) && (
          <div className="mt-12">
            <PriceCalendar months={calendar} hrefFor={calHref} />
          </div>
        )}

        <section className="mt-12 max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-ink">Flying to {dest.name}</h2>
          <p className="mt-3 leading-relaxed text-slate">
            {dest.blurb} {dest.name} is in {dest.country}.
            {fares && ` In the last searches we saw ${fares.length} different departure dates from ${from}, with fares ranging from $${Math.min(...fares.map((f) => f.price))} to $${Math.max(...fares.map((f) => f.price))}.`}
          </p>
          <p className="mt-3 leading-relaxed text-slate">
            Fares are cached from recent searches and can change quickly. The price you see on the results page is the one that counts, and you always finish booking with the airline or agency, not with us.
          </p>
        </section>

        {ACTIVITY_CITIES.some((a) => a.iata === dest.code) && (
          <section className="mt-10 max-w-3xl">
            <Link href={`/activities/${ACTIVITY_CITIES.find((a) => a.iata === dest.code)!.slug}`} className="block rounded-2xl border border-mist bg-white p-5 hover:border-amber">
              <p className="font-semibold text-ink">Things to do in {dest.name}</p>
              <p className="mt-1 text-sm text-slate">Popular tours and attraction tickets, with tips for booking ahead.</p>
              <p className="mt-3 text-sm font-semibold text-amber-deep">See activities →</p>
            </Link>
          </section>
        )}

        <div className="my-10">
          <AdSlot slot="3333333333" />
        </div>

        <section className="max-w-3xl">
          <h2 className="font-display mb-4 text-2xl font-bold text-ink">Questions</h2>
          <Faq items={faq} />
        </section>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold text-ink">More flights from {from}</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {related.map(([o, d]) => (
                <li key={d}>
                  <Link href={`/cheap-flights/${slug(o, d)}`} className="block rounded-xl border border-mist bg-white px-4 py-3 text-sm font-medium text-ink hover:border-amber">
                    {from} to {DESTS[d].name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
