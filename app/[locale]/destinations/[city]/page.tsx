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

export const revalidate = 3600;
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
  const tok = "§p§";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="bg-ink pb-14 pt-14">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">{t("kicker", { country })}</p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{t("h1", { city: name })}</h1>
          <p className="mt-4 max-w-xl text-white/70">{ta(`${c.slug}.blurb`)}</p>
          <Link href={bestHref} className="mt-6 inline-block rounded-full bg-amber px-6 py-3 font-semibold text-ink">
            {best && main ? fillTokens(t("ctaFrom", { from: tp(`${main[0]}.name`), price: tok }), { p: P }) : t("ctaSearch", { city: name })}
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <li>
            <Link href={bestHref} className={card}>
              <p className="font-mono text-xs text-amber">{t("s1")}</p>
              <p className="font-display mt-1 text-lg font-bold text-ink">{t("s1t")}</p>
              <p className="mt-1 text-sm text-slate">{best ? fillTokens(t("s1fare", { price: tok }), { p: P }) : t("s1none")}</p>
            </Link>
          </li>
          <li>
            <a href={bookingUrl({ city: c.name })} target="_blank" rel="nofollow noopener" className={card}>
              <p className="font-mono text-xs text-amber">{t("s2")}</p>
              <p className="font-display mt-1 text-lg font-bold text-ink">{t("s2t")}</p>
              <p className="mt-1 text-sm text-slate">{t("s2d", { city: name })}</p>
            </a>
          </li>
          <li>
            <Link href={`/activities/${c.slug}`} className={card}>
              <p className="font-mono text-xs text-amber">{t("s3")}</p>
              <p className="font-display mt-1 text-lg font-bold text-ink">{t("s3t")}</p>
              <p className="mt-1 text-sm text-slate">{t("s3d")}</p>
            </Link>
          </li>
          <li>
            <Link href="/services" className={card}>
              <p className="font-mono text-xs text-amber">{t("s4")}</p>
              <p className="font-display mt-1 text-lg font-bold text-ink">{t("s4t")}</p>
              <p className="mt-1 text-sm text-slate">{t("s4d")}</p>
            </Link>
          </li>
        </ol>

        {routes.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold text-ink">{t("byCity", { city: name })}</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {routes.map(([o, d]) => (
                <li key={o}>
                  <Link href={`/cheap-flights/${routeSlug(o, d)}`} className={card + " !p-4 text-sm font-semibold text-ink"}>
                    {t("routeLink", { from: tp(`${o}.name`), city: name })}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-ink">{t("todo")}</h2>
          <p className="mt-1 text-sm text-slate">{t("todoSub")}</p>
          <div className="mt-5 rounded-2xl border border-mist bg-white p-3 sm:p-5">
            <ActivitiesWidget cityId={c.tiqets} cards={3} minHeight={420} />
          </div>
          <Link href={`/activities/${c.slug}`} className="mt-3 inline-block text-sm font-semibold text-ink underline">{t("moreTodo", { city: name })}</Link>
        </section>

        <section className="mt-12 max-w-3xl">
          <h2 className="font-display text-xl font-bold text-ink">{t("tips", { city: name })}</h2>
          <ul className="mt-3 list-disc space-y-2 ps-5 text-slate">
            <li>{ta(`${c.slug}.tip1`)}</li>
            <li>{ta(`${c.slug}.tip2`)}</li>
          </ul>
        </section>

        <div className="my-10"><AdSlot slot="3333333333" /></div>

        <section className="max-w-3xl">
          <h2 className="font-display mb-4 text-2xl font-bold text-ink">{(await getTranslations("route"))("questions")}</h2>
          <Faq items={faq} />
        </section>
      </div>
    </>
  );
}
