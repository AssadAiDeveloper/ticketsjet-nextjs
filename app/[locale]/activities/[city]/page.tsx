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

export const dynamicParams = false;
export const revalidate = 21600;
export function generateStaticParams() {
  return ACTIVITY_CITIES.map((c) => ({ city: c.slug }));
}

type Props = { params: Promise<{ locale: string; city: string }> };

import { alternatesFor } from "@/lib/i18nPages";
import { countryName } from "@/lib/format";
import { DEST_CC } from "@/lib/richPrice";
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, city } = await params;
  const c = activityCity(city);
  if (!c) return {};
  const t = await getTranslations({ locale, namespace: "ac" });
  const tp = await getTranslations({ locale, namespace: "place" });
  const k = c.iata.toLowerCase();
  const v = { city: tp(`${k}.name`), country: countryName(DEST_CC[k], locale) };
  return { title: t("metaTitle", v), description: t("metaDesc", v), alternates: alternatesFor(locale, `/activities/${c.slug}`) };
}

export default async function ActivityCityPage({ params }: Props) {
  const { locale, city } = await params;
  setRequestLocale(locale);
  const c = activityCity(city);
  if (!c) notFound();
  const t = await getTranslations("ac");
  const tp = await getTranslations("place");
  const ta = await getTranslations("act");
  const k = c.iata.toLowerCase();
  const name = tp(`${k}.name`);
  const country = countryName(DEST_CC[k], locale);
  const routes = ROUTES.filter(([, d]) => d === k).slice(0, 6);
  const faq = [
    { q: t("q1", { city: name }), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
  ];
  const prefix = locale === "en" ? "" : `/${locale}`;
  const ld = [
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: (await getTranslations("flights"))("home"), item: `${SITE.url}${prefix}` },
      { "@type": "ListItem", position: 2, name: (await getTranslations("aci"))("h1"), item: `${SITE.url}${prefix}/activities` },
      { "@type": "ListItem", position: 3, name, item: `${SITE.url}${prefix}/activities/${c.slug}` },
    ] },
  ];
  const linkCls = "block h-full rounded-2xl border border-mist bg-white p-4 text-sm font-semibold text-ink hover:border-amber";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="bg-ink pb-14 pt-14">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">{t("kicker", { country })}</p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{t("h1", { city: name })}</h1>
          <p className="mt-4 max-w-xl text-white/70">{ta(`${c.slug}.blurb`)}</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <section>
          <h2 className="font-display text-2xl font-bold text-ink">{t("popular")}</h2>
          <p className="mt-1 text-sm text-slate">{t("popularSub")}</p>
          <div className="mt-5 rounded-2xl border border-mist bg-white p-3 sm:p-5">
            <ActivitiesWidget cityId={c.tiqets} cards={6} minHeight={600} />
          </div>
        </section>

        <section className="mt-12 max-w-3xl">
          <h2 className="font-display text-xl font-bold text-ink">{t("tips", { city: name })}</h2>
          <ul className="mt-3 list-disc space-y-2 ps-5 text-slate">
            <li>{ta(`${c.slug}.tip1`)}</li>
            <li>{ta(`${c.slug}.tip2`)}</li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-xl font-bold text-ink">{t("plan")}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {routes.map(([o, d]) => (
              <li key={o}>
                <Link href={`/cheap-flights/${routeSlug(o, d)}`} className={linkCls}>
                  {t("flightsFrom", { from: tp(`${o}.name`), city: name })}
                </Link>
              </li>
            ))}
            <li><Link href={`/destinations/${c.slug}`} className={linkCls}>{t("guide", { city: name })}</Link></li>
            <li><a href={bookingUrl({ city: c.name })} target="_blank" rel="nofollow noopener" className={linkCls}>{t("hotels", { city: name })}</a></li>
            <li><Link href="/services/esim" className={linkCls}>{t("esim", { city: name })}</Link></li>
          </ul>
        </section>

        <div className="my-10">
          <AdSlot slot="8888888888" />
        </div>

        <section className="max-w-3xl">
          <h2 className="font-display mb-4 text-2xl font-bold text-ink">{(await getTranslations("route"))("questions")}</h2>
          <Faq items={faq} />
        </section>
      </div>
    </>
  );
}
