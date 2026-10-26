import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import Faq from "@/components/Faq";
import AdSlot from "@/components/AdSlot";
import Price from "@/components/Price";
import { SITE } from "@/lib/config";
import { searchCode } from "@/lib/fares";
import PriceCalendar from "@/components/PriceCalendar";
import { getMonthFares, getRouteFares } from "@/lib/routeFares";
import { ACTIVITY_CITIES } from "@/lib/activities";
import { DESTS, ROUTES, parseRoute, slug } from "@/lib/routes";
import { alternatesFor } from "@/lib/i18nPages";
import { fullDate, countryName } from "@/lib/format";
import { DEST_CC, fillTokens, usdText } from "@/lib/richPrice";
import DestPhoto from "@/components/DestPhoto";
import { allPhotos } from "@/lib/destinationPhotos";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return ROUTES.map(([o, d]) => ({ route: slug(o, d) }));
}

type Props = { params: Promise<{ locale: string; route: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, route } = await params;
  const r = parseRoute(route);
  if (!r) return {};
  const t = await getTranslations({ locale, namespace: "place" });
  const tr = await getTranslations({ locale, namespace: "route" });
  const from = t(`${r.o}.name`);
  const to = t(`${r.d}.name`);
  const fares = await getRouteFares(r.o, r.d);
  const low = fares ? Math.min(...fares.map((f) => f.price)) : null;
  return {
    title: low ? tr("metaTitleFrom", { from, to, price: usdText(low, locale) }) : tr("metaTitle", { from, to }),
    description: tr("metaDesc", { from, to }),
    alternates: alternatesFor(locale, `/cheap-flights/${slug(r.o, r.d)}`),
    // Without real price data the page is thin, so keep it out of the index.
    robots: fares ? undefined : { index: false, follow: true },
  };
}

export default async function RoutePage({ params }: Props) {
  const { locale, route } = await params;
  setRequestLocale(locale);
  const r = parseRoute(route);
  if (!r) notFound();
  const t = await getTranslations("route");
  const tp = await getTranslations("place");
  const th = await getTranslations("common");
  const tf = await getTranslations("flights");
  const from = tp(`${r.o}.name`);
  const dest = DESTS[r.d];
  const photos = allPhotos();
  const toName = tp(`${r.d}.name`);
  const country = countryName(DEST_CC[r.d], locale);
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
  const lo = fares ? Math.min(...fares.map((f) => f.price)) : 0;
  const hi = fares ? Math.max(...fares.map((f) => f.price)) : 0;
  const tok = (k: string) => `§${k}§`;
  const P = (n: number) => <Price usd={n} />;

  const a1 = cheapest ? t("a1", { price: tok("price") }) : t("a1none");
  const a2 = cheapest ? t("a2", { date: fullDate(cheapest.depart, locale) }) : t("a2none");
  const a3 = fares ? (direct.length ? t("a3yes") : t("a3no")) : t("a3unk");
  const a1Text = cheapest ? t("a1", { price: usdText(cheapest.price, locale) }) : a1;
  const faq = [
    { q: t("q1", { from, to: toName }), a: cheapest ? fillTokens(a1, { price: P(cheapest.price) }) : a1, text: a1Text },
    { q: t("q2", { from, to: toName }), a: a2, text: a2 },
    { q: t("q3", { from, to: toName }), a: a3, text: a3 },
    { q: t("q4"), a: t("a4"), text: t("a4") },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.text } })),
  };
  const prefix = locale === "en" ? "" : `/${locale}`;
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: tf("home"), item: `${SITE.url}${prefix}` },
      { "@type": "ListItem", position: 2, name: tf("kicker"), item: `${SITE.url}${prefix}/flights` },
      { "@type": "ListItem", position: 3, name: t("fromTo", { from, to: toName }), item: `${SITE.url}${prefix}/cheap-flights/${slug(r.o, r.d)}` },
    ],
  };

  const stopsLabel = (n: number) => (n === 0 ? th("direct") : t("stops", { n }));
  const searchLabel = `${r.o.toUpperCase()} → ${dest.code}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, crumbs]) }} />
      <section className="relative overflow-hidden bg-ink pb-14 pt-14">
        {photos[dest.code] && <DestPhoto code={dest.code} photo={photos[dest.code]} sizes="100vw" alt={toName} className="opacity-30" />}
        <div className="relative z-10">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber" dir="ltr">{searchLabel}</p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {t("h1", { from, to: toName })}
          </h1>
          <p className="mt-4 max-w-xl text-white/70">
            {cheapest ? fillTokens(t("leadFare", { price: tok("price") }), { price: P(cheapest.price) }) : t("leadNone", { from, to: toName })}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/flights" className="rounded-full bg-amber px-6 py-3 font-semibold text-ink hover:brightness-95">
              {fillTokens(t("searchBtn", { route: "§r§" }), { r: <bdi dir="ltr">{searchLabel}</bdi> })}
            </Link>
          </div>
        </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12">
        {rows.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-bold text-ink">{t("cheapestTitle")}</h2>
            <p className="mt-1 text-sm text-slate">{t("cheapestSub")}</p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-mist bg-white">
              <table className="w-full min-w-[520px] text-start text-sm">
                <thead className="bg-cloud text-xs uppercase tracking-wider text-slate">
                  <tr>
                    <th className="px-4 py-3 text-start">{t("thDepart")}</th>
                    <th className="px-4 py-3 text-start">{t("thReturn")}</th>
                    <th className="px-4 py-3 text-start">{t("thStops")}</th>
                    <th className="px-4 py-3 text-start">{t("thFrom")}</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-mist">
                  {rows.map((f) => (
                    <tr key={f.depart}>
                      <td className="px-4 py-3 font-medium text-ink">{fullDate(f.depart, locale)}</td>
                      <td className="px-4 py-3 text-slate">{f.back ? fullDate(f.back, locale) : t("oneWay")}</td>
                      <td className="px-4 py-3 text-slate">{stopsLabel(f.stops)}</td>
                      <td className="px-4 py-3 font-semibold text-ink">{P(f.price)}</td>
                      <td className="px-4 py-3 text-end">
                        <Link href={href(f)} className="rounded-full bg-ink px-4 py-1.5 text-xs font-semibold text-white hover:bg-ink/90">
                          {t("search")}
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
          <h2 className="font-display text-2xl font-bold text-ink">{t("flyingTo", { to: toName })}</h2>
          <p className="mt-3 leading-relaxed text-slate">
            {t("about", { blurb: tp(`${r.d}.blurb`), to: toName, country })}
            {fares && " "}
            {fares &&
              fillTokens(t("stats", { n: fares.length, from, lo: tok("lo"), hi: tok("hi") }), { lo: P(lo), hi: P(hi) })}
          </p>
          <p className="mt-3 leading-relaxed text-slate">{t("cache")}</p>
        </section>

        {ACTIVITY_CITIES.some((a) => a.iata === dest.code) && (
          <section className="mt-10 max-w-3xl">
            <Link href={`/activities/${ACTIVITY_CITIES.find((a) => a.iata === dest.code)!.slug}`} className="block rounded-2xl border border-mist bg-white p-5 hover:border-amber">
              <p className="font-semibold text-ink">{t("thingsTitle", { to: toName })}</p>
              <p className="mt-1 text-sm text-slate">{t("thingsText")}</p>
              <p className="mt-3 text-sm font-semibold text-amber-deep">{t("seeActivities")} →</p>
            </Link>
          </section>
        )}

        <div className="my-10">
          <AdSlot slot="3333333333" />
        </div>

        <section className="max-w-3xl">
          <h2 className="font-display mb-4 text-2xl font-bold text-ink">{t("questions")}</h2>
          <Faq items={faq} />
        </section>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold text-ink">{t("more", { from })}</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {related.map(([o, d]) => (
                <li key={d}>
                  <Link href={`/cheap-flights/${slug(o, d)}`} className="block rounded-xl border border-mist bg-white px-4 py-3 text-sm font-medium text-ink hover:border-amber">
                    {t("fromTo", { from, to: tp(`${d}.name`) })}
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
