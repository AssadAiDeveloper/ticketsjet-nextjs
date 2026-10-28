import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import ActivitiesWidget from "@/components/ActivitiesWidget";
import Faq from "@/components/Faq";
import AdSlot from "@/components/AdSlot";
import { SITE, bookingUrl } from "@/lib/config";
import { ACTIVITY_CITIES, activityCity } from "@/lib/activities";
import { ROUTES, slug as routeSlug } from "@/lib/routes";
import Price from "@/components/Price";
import { alternatesFor } from "@/lib/i18nPages";
import { countryName } from "@/lib/format";
import { DEST_CC, fillTokens } from "@/lib/richPrice";
import { getRouteFares } from "@/lib/routeFares";
import { searchCode } from "@/lib/fares";
import DestPhoto from "@/components/DestPhoto";
import { allPhotos } from "@/lib/destinationPhotos";

export const revalidate = 86400;
export const dynamicParams = false;
export function generateStaticParams() {
  return ACTIVITY_CITIES.map((c) => ({ city: c.slug }));
}

type Props = { params: Promise<{ locale: string; city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, city } = await params;
  const c = activityCity(city);
  if (!c) return {};
  const t = await getTranslations({ locale, namespace: "dp" });
  const tp = await getTranslations({ locale, namespace: "place" });
  const k = c.iata.toLowerCase();
  const v = { city: tp(`${k}.name`), country: countryName(DEST_CC[k], locale) };
  return { title: t("metaTitle", v), description: t("metaDesc", v), alternates: alternatesFor(locale, `/destinations/${c.slug}`) };
}

const card = "block h-full rounded-2xl border border-mist bg-white p-5 hover:border-amber";

export default async function DestinationPage({ params }: Props) {
  const { locale, city } = await params;
  setRequestLocale(locale);
  const c = activityCity(city);
  if (!c) notFound();
  const t = await getTranslations("dp");
  const photos = allPhotos();
  const tp = await getTranslations("place");
  const ta = await getTranslations("act");
  const dest = c.iata.toLowerCase();
  const name = tp(`${dest}.name`);
  const country = countryName(DEST_CC[dest], locale);
  const routes = ROUTES.filter(([, d]) => d === dest);
  const main = routes.find(([o]) => o === "ams") ?? routes[0];
  const fares = main ? await getRouteFares(main[0], main[1]) : null;
  const best = fares?.[0];
  const bestHref = best && main
    ? `/flights?flightSearch=${searchCode(main[0].toUpperCase(), { code: c.iata, depart: best.depart, back: best.back })}`
    : "/flights";
  const P = best ? <Price usd={best.price} /> : null;

  const faq = [
    { q: t("q1", { city: name }), a: t("a1") },
    { q: t("q2", { city: name }), a: t("a2") },
    { q: t("q3"), a: t("a3") },
  ];
  const prefix = locale === "en" ? "" : `/${locale}`;
  const ld = [
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: (await getTranslations("flights"))("home"), item: `${SITE.url}${prefix}` },
      { "@type": "ListItem", position: 2, name: (await getTranslations("dpi"))("kicker"), item: `${SITE.url}${prefix}/destinations` },
      { "@type": "ListItem", position: 3, name, item: `${SITE.url}${prefix}/destinations/${c.slug}` },
    ] },
  ];
  const tok = "";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="relative overflow-hidden bg-ink pb-14 pt-14">
        {photos[c.iata] && <DestPhoto code={c.iata} photo={photos[c.iata]} sizes="100vw" alt={`${name}, ${country}`} className="z-0" />}
        {photos[c.iata] && <div className="absolute inset-0 z-[1] bg-gradient-to-r from-ink/80 via-ink/30 to-transparent pointer-events-none" aria-hidden="true" />}
        <div className="relative z-10 mx-auto max-w-6xl px-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">{t("kicker", { country })}</p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{t("h1", { city: name })}</h1>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">{t("todo")}</h2>
            <p className="mt-2 text-sm text-slate">{t("todoSub")}</p>
            <ActivitiesWidget cityId={c.tiqets} cards={6} minHeight={260} />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">{t("ctaSearch", { city: name })}</h2>
            {fares && fares.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {fares.slice(0, 6).map((f) => (
                  <li key={f.depart} className="flex items-center justify-between rounded-xl border border-mist bg-white px-4 py-3 text-sm">
                    <span className="font-medium text-ink">{new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" }).format(new Date(f.depart + "T00:00:00Z"))} – {f.back ? new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" }).format(new Date(f.back + "T00:00:00Z")) : t("s1none")}</span>
                    <span className="font-semibold text-ink"><Price usd={f.price} /></span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-slate">{t("noFares")}</p>
            )}
            <Link href="/flights" className="mt-5 inline-block rounded-xl bg-ink px-5 py-2.5 text-sm font-bold text-white transition hover:bg-ink-2">
              {t("ctaSearch", { city: name })}
            </Link>
          </div>
        </div>

        <section className="mt-12 rounded-2xl border border-mist bg-white p-6">
          <h2 className="font-display text-2xl font-bold text-ink">{t("s2t")}</h2>
          <p className="mt-2 text-sm text-slate">{t("s2d", { city: name })}</p>
          <a href={bookingUrl({ city: name })} target="_blank" rel="nofollow noopener" className="mt-4 inline-block rounded-xl bg-amber px-5 py-2.5 text-sm font-bold text-ink transition hover:bg-amber-deep">
            {t("s2t")}  {name}
          </a>
        </section>

        {ACTIVITY_CITIES.some((a) => a.iata === c.iata) && (
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold text-ink">{t("q1", { city: name })}</h2>
            <div className="mt-5"><Faq items={faq} /></div>
          </section>
        )}
      </div>

      <AdSlot slot="6666666666" className="mt-6" />
    </>
  );
}
