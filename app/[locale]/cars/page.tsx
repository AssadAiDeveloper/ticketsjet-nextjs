import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import AdSlot from "@/components/AdSlot";
import Faq from "@/components/Faq";
import EconomyBookingsWidget from "@/components/EconomyBookingsWidget";
import DestPhoto from "@/components/DestPhoto";
import PhotoCredit from "@/components/PhotoCredit";
import { allPhotos } from "@/lib/destinationPhotos";
import { alternatesFor } from "@/lib/i18nPages";
import { countryName } from "@/lib/format";
import { DEST_CC } from "@/lib/richPrice";
import { ACTIVITY_CITIES } from "@/lib/activities";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cars" });
  return { title: t("metaTitle"), description: t("metaDesc"), alternates: alternatesFor(locale, "/cars") };
}

const carCities = ["BCN", "ROM", "MAD", "LON", "PAR", "IST", "DXB", "LIS", "ATH"];

export default async function CarsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("cars");
  const tc = await getTranslations("common");
  const tp = await getTranslations("place");
  const tn = await getTranslations("nav");
  const photos = allPhotos();
  const faq = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => ({ q: t(`q${i}`), a: t(`a${i}`) }));
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <section className="bg-ink pb-14 pt-14">
        <div className="mx-auto max-w-3xl px-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">{t("kicker")}</p>
          <h1 className="font-display mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{t("h1")}</h1>
          <p className="mt-4 text-white/70">{t("lead")}</p>
        </div>
      </section>

      <section className="mx-auto -mt-6 max-w-[900px] px-4">
        <div className="boarding-pass p-3 sm:p-5">
          <EconomyBookingsWidget />
        </div>
        <p data-disclosure className="mt-3 text-center text-xs text-slate">{t("affiliateNote")}</p>
      </section>

      <div className="sticky top-0 z-30 mt-6 border-b border-mist bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl gap-2 overflow-x-auto px-4 py-3">
          <a href="#destinations" className="shrink-0 rounded-full border border-mist px-4 py-1.5 text-sm font-medium text-ink hover:border-amber">{t("anchorDest")}</a>
          <a href="#tips" className="shrink-0 rounded-full border border-mist px-4 py-1.5 text-sm font-medium text-ink hover:border-amber">{t("anchorTips")}</a>
          <a href="#faq" className="shrink-0 rounded-full border border-mist px-4 py-1.5 text-sm font-medium text-ink hover:border-amber">{t("anchorFaq")}</a>
          <a href="#search" className="shrink-0 rounded-full bg-ink px-4 py-1.5 text-sm font-bold text-white hover:bg-ink-2">{t("anchorSearch")}</a>
        </div>
      </div>

      <section id="destinations" className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{t("destTitle")}</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {carCities.map((code) => {
            const city = ACTIVITY_CITIES.find((c) => c.iata === code);
            if (!city) return null;
            const name = tp(`${code.toLowerCase()}.name`);
            const country = countryName(DEST_CC[code.toLowerCase()], locale);
            return (
              <li key={code} className="relative">
                <Link href={`/destinations/${city.slug}`} className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br from-[#16324a] to-[#0b1b2b] p-5 text-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
                  {photos[code] && <DestPhoto code={code} photo={photos[code]} sizes="(min-width: 1024px) 33vw, 50vw, 100vw" alt={`${name}, ${country}`} className="z-0" />}
                  {photos[code] && <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" aria-hidden="true" />}
                  <span className="relative z-10 mt-auto">
                    <span className="font-display block text-xl font-semibold leading-tight drop-shadow"><bdi>{name}</bdi></span>
                    <span className="block text-sm text-white/80 drop-shadow">{country}</span>
                    <span className="mt-3 inline-block rounded-lg bg-amber px-3 py-1.5 text-sm font-bold text-ink">{t("rentCar")}</span>
                  </span>
                  {photos[code]?.author && <PhotoCredit author={photos[code].author || ""} authorUrl={photos[code].photoUrl || ""} photoUrl={photos[code].photoUrl || ""} />}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section id="tips" className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{t("anchorTips")}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: t("info1t"), d: t("info1d") },
            { t: t("info2t"), d: t("info2d") },
            { t: t("info3t"), d: t("info3d") },
            { t: t("info4t"), d: t("info4d") },
            { t: t("info5t"), d: t("info5d") },
            { t: t("info6t"), d: t("info6d") },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-mist bg-white p-6">
              <h3 className="font-display text-lg font-bold text-ink">{c.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="border-t border-mist bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{t("faqTitle")}</h2>
          <div className="mt-7"><Faq items={faq} /></div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{t("moreTitle")}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/flights" className="rounded-full border border-mist bg-white px-4 py-2 text-sm font-medium text-ink hover:border-amber">{tn("flights")}</Link>
          <Link href="/stays" className="rounded-full border border-mist bg-white px-4 py-2 text-sm font-medium text-ink hover:border-amber">{tn("stays")}</Link>
          <Link href="/explore" className="rounded-full border border-mist bg-white px-4 py-2 text-sm font-medium text-ink hover:border-amber">{tn("explore")}</Link>
          <Link href="/trip-finder" className="rounded-full border border-mist bg-white px-4 py-2 text-sm font-medium text-ink hover:border-amber">{tn("tripFinder")}</Link>
        </div>
        <p className="mt-8 text-sm text-slate">
          {t("guideLead")}{" "}
          <Link href="/blog/car-rental-guide" className="font-semibold text-amber-deep underline">
            {t("guideLink")}
          </Link>
        </p>
      </section>

      <AdSlot slot="5555555555" className="mt-10" />
    </>
  );
}