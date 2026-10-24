import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import TpWidget from "@/components/TpWidget";
import Faq from "@/components/Faq";
import AdSlot from "@/components/AdSlot";
import { SITE, activitiesWidget, bookingUrl } from "@/lib/config";
import { ACTIVITY_CITIES, activityCity } from "@/lib/activities";
import { ROUTES, slug as routeSlug } from "@/lib/routes";

export const dynamicParams = false;
export function generateStaticParams() {
  return ACTIVITY_CITIES.map((c) => ({ city: c.slug }));
}

type Props = { params: Promise<{ locale: string; city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = activityCity((await params).city);
  if (!c) return {};
  return {
    title: `Things to Do in ${c.name} — Tours, Tickets & Activities`,
    description: `Popular tours, attraction tickets and activities in ${c.name}, ${c.country}. Tips for booking ahead, plus flights and stays.`,
    alternates: { canonical: `/activities/${c.slug}` },
  };
}

export default async function ActivityCityPage({ params }: Props) {
  setRequestLocale((await params).locale);
  const c = activityCity((await params).city);
  if (!c) notFound();
  const routes = ROUTES.filter(([, d]) => d === c.iata.toLowerCase()).slice(0, 6);
  const faq = [
    { q: `Should I book ${c.name} attractions in advance?`, a: "For the most popular sights, yes. Many use timed entry and can sell out, especially in school holidays and at weekends." },
    { q: "Where do I complete the booking?", a: "Tours and tickets open on the provider's site, where you choose a date and pay. TicketsJet doesn't take payments or add fees." },
    { q: "Can I cancel?", a: "Cancellation terms differ by activity and are shown on each listing before you pay. Check them if your plans might change." },
  ];
  const ld = [
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Things to do", item: `${SITE.url}/activities` },
      { "@type": "ListItem", position: 3, name: c.name, item: `${SITE.url}/activities/${c.slug}` },
    ] },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="bg-ink pb-14 pt-14">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">Things to do · {c.country}</p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Things to do in {c.name}</h1>
          <p className="mt-4 max-w-xl text-white/70">{c.blurb}</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Popular tours and tickets</h2>
          <p className="mt-1 text-sm text-slate">Prices are from the provider and may change. You finish booking on the provider&apos;s site.</p>
          <div className="mt-5 rounded-2xl border border-mist bg-white p-3 sm:p-5">
            <TpWidget src={activitiesWidget(c.tiqets, 6)} minHeight={600} />
          </div>
        </section>

        <section className="mt-12 max-w-3xl">
          <h2 className="font-display text-xl font-bold text-ink">Tips for {c.name}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate">
            {c.tips.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-xl font-bold text-ink">Plan the trip</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {routes.map(([o, d]) => (
              <li key={o}>
                <Link href={`/cheap-flights/${routeSlug(o, d)}`} className="block h-full rounded-2xl border border-mist bg-white p-4 text-sm font-semibold text-ink hover:border-amber">
                  Flights from {o.toUpperCase()} to {c.name} →
                </Link>
              </li>
            ))}
            <li>
              <Link href={`/destinations/${c.slug}`} className="block h-full rounded-2xl border border-mist bg-white p-4 text-sm font-semibold text-ink hover:border-amber">Full {c.name} trip guide →</Link>
            </li>
            <li>
              <a href={bookingUrl({ city: c.name })} target="_blank" rel="nofollow noopener" className="block h-full rounded-2xl border border-mist bg-white p-4 text-sm font-semibold text-ink hover:border-amber">Hotels in {c.name} →</a>
            </li>
            <li>
              <Link href="/services/esim" className="block h-full rounded-2xl border border-mist bg-white p-4 text-sm font-semibold text-ink hover:border-amber">Travel eSIM for {c.name} →</Link>
            </li>
          </ul>
        </section>

        <div className="my-10">
          <AdSlot slot="8888888888" />
        </div>

        <section className="max-w-3xl">
          <h2 className="font-display mb-4 text-2xl font-bold text-ink">Questions</h2>
          <Faq items={faq} />
        </section>
      </div>
    </>
  );
}
