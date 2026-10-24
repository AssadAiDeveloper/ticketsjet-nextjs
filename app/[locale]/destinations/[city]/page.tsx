import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import TpWidget from "@/components/TpWidget";
import Faq from "@/components/Faq";
import AdSlot from "@/components/AdSlot";
import { SITE, activitiesWidget, bookingUrl } from "@/lib/config";
import { ACTIVITY_CITIES, activityCity } from "@/lib/activities";
import { ROUTES, slug as routeSlug, originName } from "@/lib/routes";
import { getRouteFares } from "@/lib/routeFares";
import { searchCode } from "@/lib/fares";

export const revalidate = 3600;
export const dynamicParams = false;
export function generateStaticParams() {
  return ACTIVITY_CITIES.map((c) => ({ city: c.slug }));
}

type Props = { params: Promise<{ locale: string; city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = activityCity((await params).city);
  if (!c) return {};
  return {
    title: `Plan a Trip to ${c.name} — Flights, Hotels & Things to Do`,
    description: `Everything for a trip to ${c.name}, ${c.country}: flight prices, where to stay, tours and tickets, and travel essentials in one place.`,
    alternates: { canonical: `/destinations/${c.slug}` },
  };
}

const card = "block h-full rounded-2xl border border-mist bg-white p-5 hover:border-amber";

export default async function DestinationPage({ params }: Props) {
  setRequestLocale((await params).locale);
  const c = activityCity((await params).city);
  if (!c) notFound();
  const dest = c.iata.toLowerCase();
  const routes = ROUTES.filter(([, d]) => d === dest);
  const main = routes.find(([o]) => o === "ams") ?? routes[0];
  const fares = main ? await getRouteFares(main[0], main[1]) : null;
  const best = fares?.[0];
  const bestHref = best && main
    ? `/flights?flightSearch=${searchCode(main[0].toUpperCase(), { code: c.iata, depart: best.depart, back: best.back })}`
    : "/flights";

  const faq = [
    { q: `When is the cheapest time to fly to ${c.name}?`, a: `It varies by departure city. The price calendar on each route page shows the cheapest days in the next three months.` },
    { q: `Do I need to book ${c.name} attractions in advance?`, a: "For the most popular sights, yes. Many use timed entry and can sell out in school holidays and at weekends." },
    { q: "Does TicketsJet sell these services?", a: "No. We link to the providers, where you choose dates and pay. We don't take payments or add fees." },
  ];
  const ld = [
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Plan a trip", item: `${SITE.url}/destinations` },
      { "@type": "ListItem", position: 3, name: c.name, item: `${SITE.url}/destinations/${c.slug}` },
    ] },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="bg-ink pb-14 pt-14">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">Plan a trip · {c.country}</p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Plan your trip to {c.name}</h1>
          <p className="mt-4 max-w-xl text-white/70">{c.blurb}</p>
          <Link href={bestHref} className="mt-6 inline-block rounded-full bg-amber px-6 py-3 font-semibold text-ink">
            {best && main ? `Flights from ${originName(main[0])} from $${best.price}` : `Search flights to ${c.name}`}
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <li>
            <Link href={bestHref} className={card}>
              <p className="font-mono text-xs text-amber">1 · FLY</p>
              <p className="font-display mt-1 text-lg font-bold text-ink">Compare flights</p>
              <p className="mt-1 text-sm text-slate">{best ? `Recent fares start around $${best.price} round trip.` : "Search live prices from your city."}</p>
            </Link>
          </li>
          <li>
            <a href={bookingUrl({ city: c.name })} target="_blank" rel="nofollow noopener" className={card}>
              <p className="font-mono text-xs text-amber">2 · STAY</p>
              <p className="font-display mt-1 text-lg font-bold text-ink">Find a hotel</p>
              <p className="mt-1 text-sm text-slate">Opens a hotel search for {c.name} on Booking.com.</p>
            </a>
          </li>
          <li>
            <Link href={`/activities/${c.slug}`} className={card}>
              <p className="font-mono text-xs text-amber">3 · DO</p>
              <p className="font-display mt-1 text-lg font-bold text-ink">Tours and tickets</p>
              <p className="mt-1 text-sm text-slate">Skip-the-line tickets and guided tours.</p>
            </Link>
          </li>
          <li>
            <Link href="/services" className={card}>
              <p className="font-mono text-xs text-amber">4 · CONNECT</p>
              <p className="font-display mt-1 text-lg font-bold text-ink">Travel essentials</p>
              <p className="mt-1 text-sm text-slate">eSIM, airport transfers and flight-delay compensation.</p>
            </Link>
          </li>
        </ol>

        {routes.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold text-ink">Flights to {c.name} by departure city</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {routes.map(([o, d]) => (
                <li key={o}>
                  <Link href={`/cheap-flights/${routeSlug(o, d)}`} className={card + " !p-4 text-sm font-semibold text-ink"}>
                    {originName(o)} → {c.name} →
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-ink">Popular things to do</h2>
          <p className="mt-1 text-sm text-slate">Prices come from the provider and may change. You finish booking on their site.</p>
          <div className="mt-5 rounded-2xl border border-mist bg-white p-3 sm:p-5">
            <TpWidget src={activitiesWidget(c.tiqets, 3)} minHeight={420} />
          </div>
          <Link href={`/activities/${c.slug}`} className="mt-3 inline-block text-sm font-semibold text-ink underline">More things to do in {c.name} →</Link>
        </section>

        <section className="mt-12 max-w-3xl">
          <h2 className="font-display text-xl font-bold text-ink">Tips for {c.name}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate">
            {c.tips.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </section>

        <div className="my-10"><AdSlot slot="3333333333" /></div>

        <section className="max-w-3xl">
          <h2 className="font-display mb-4 text-2xl font-bold text-ink">Questions</h2>
          <Faq items={faq} />
        </section>
      </div>
    </>
  );
}
