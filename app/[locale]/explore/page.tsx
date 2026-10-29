import { getTranslations, setRequestLocale } from "next-intl/server";
import { getFares } from "@/lib/fares";
import { regionBlock, regionOf } from "@/lib/regions";
import { getPhoto } from "@/lib/destinationPhotos";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import PriceMap from "@/components/PriceMap";
import { cityName as locCity } from "@/lib/cityName";
import { getCities } from "@/lib/places";
import AdSlot from "@/components/AdSlot";
import Faq from "@/components/Faq";
import { alternatesFor } from "@/lib/i18nPages";
import PageHero from "@/components/PageHero";
import DestPhoto from "@/components/DestPhoto";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "exp" });
  return { title: t("metaTitle"), description: t("metaDesc"), alternates: alternatesFor(locale, "/explore") };
}

export default async function ExplorePage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ origin?: string }> }) {
  const { locale } = await params;
  const sp = await searchParams;
  const rawOrigin = (sp?.origin || "").toUpperCase();
  const origin = /^[A-Z]{3}$/.test(rawOrigin) ? rawOrigin : "AMS";
  setRequestLocale(locale);
  const t = await getTranslations("exp");
  const faq = [1, 2, 3, 4].map((i) => ({ q: t(`q${i}`), a: t(`a${i}`) }));
  const cities = await getCities();
  const names = Object.fromEntries(cities.map((c) => [c.code, locCity(c.code, locale, c.name)]));
  const prefix = locale === "en" ? "" : `/${locale}`;
  const fares = await getFares(origin).catch(() => null);
  const cheapest = fares ? fares.points.slice(0, 8) : [];
  // browse by region: 3 cheapest per region block
  const byRegion: Record<string, typeof cheapest> = {};
  if (fares) {
    for (const pt of fares.points) {
      const rb = regionBlock(regionOf(pt.lat, pt.lng) as any);
      if (!byRegion[rb]) byRegion[rb] = [];
      if (byRegion[rb].length < 3) byRegion[rb].push(pt);
    }
  }
  return (
    <>
      <PageHero title={t("heroTitle")} photoKey="explore" />

      <section className="mx-auto -mt-6 max-w-6xl px-4">
        <div className="boarding-pass p-2 sm:p-3">
          <PriceMap names={names} initialOrigin={origin} />
        </div>
        <p className="mt-3 text-xs text-slate">
          {t("note")}
        </p>
      </section>

      <AdSlot slot="7777777777" className="mt-10" />

      {cheapest.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{t("cheapestTitle", { city: names[origin] || origin })}</h2>
          <p className="mt-2 text-xs text-slate">{t("cachedNote")}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cheapest.map((p) => {
              const photo = getPhoto(p.code);
              return (
                <a key={p.code} href={`${prefix}/flights?origin_iata=${origin}&destination_iata=${p.code}&adults=1${p.depart ? `&depart_date=${p.depart}` : ""}${p.back ? `&return_date=${p.back}` : ""}#results`} className="group relative flex flex-col overflow-hidden rounded-2xl border border-mist bg-white transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative aspect-[4/3] overflow-hidden bg-cloud">
                    {photo && photo.url ? <DestPhoto code={p.code} photo={photo} sizes="(min-width:1024px) 25vw, 50vw" alt={`${names[p.code] || p.name}`} className="z-0" /> : <div className="h-full w-full bg-gradient-to-br from-[#16324a] to-[#0b1b2b]" />}
                  </div>
                  <div className="p-4">
                    <p className="font-display text-lg font-bold text-ink">{names[p.code] || p.name}</p>
                    <p className="text-xs text-slate">{p.code}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-bold text-ink">{t("fromPrice", { price: p.price })}</span>
                      <span className="text-xs text-slate">{p.stops === 0 ? t("direct") : t("stops", { n: p.stops })}</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{t("browseByRegion")}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {["europe","middleeast","asia","africa","americas","oceania"].map((rb) => {
            const items = byRegion[rb] || [];
            if (items.length === 0) return null;
            const labelKey = rb === "middleeast" ? "regionMiddleEast" : rb === "americas" ? "regionAmericas" : "region" + rb.charAt(0).toUpperCase() + rb.slice(1);
            return (
              <div key={rb} className="rounded-2xl border border-mist bg-white p-5">
                <h3 className="font-display text-lg font-bold text-ink">{t(labelKey)}</h3>
                <ul className="mt-3 space-y-2">
                  {items.map((p) => (
                    <li key={p.code} className="flex items-center justify-between text-sm">
                      <span className="text-ink">{names[p.code] || p.name}</span>
                      <span className="font-bold text-ink">{t("fromPrice", { price: p.price })}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{t("bookingTips")}</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {[1,2,3,4].map((n) => (
            <li key={n} className="rounded-2xl border border-mist bg-white p-5 text-sm leading-relaxed text-slate">{t(`tip${n}`)}</li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{t("three")}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map((n) => ({ t: t(`c${n}t`), d: t(`c${n}d`) })).map((c) => (
            <div key={c.t} className="rounded-2xl border border-mist bg-white p-6">
              <h3 className="font-display text-lg font-bold text-ink">{c.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{c.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-slate">
          {t("ready")}{" "}
          <Link href="/flights" className="font-semibold text-amber-deep underline">{t("open")}</Link>
        </p>
      </section>

      <section className="border-t border-mist bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{t("faqTitle")}</h2>
          <div className="mt-7"><Faq items={faq} /></div>
        </div>
      </section>
    </>
  );
}
