import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import StaysForm from "@/components/StaysForm";
import Faq from "@/components/Faq";
import { bookingUrl } from "@/lib/config";
import { alternatesFor } from "@/lib/i18nPages";
import { cityName as locCity } from "@/lib/cityName";
import { getCities } from "@/lib/places";
import { countryName } from "@/lib/format";
import DestPhoto from "@/components/DestPhoto";
import PhotoCredit from "@/components/PhotoCredit";
import { allPhotos } from "@/lib/destinationPhotos";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "stays" });
  return { title: t("metaTitle"), description: t("metaDesc"), alternates: alternatesFor(locale, "/stays"), robots: { index: false, follow: true } };
}

const cities: [string, string][] = [["Rome", "rom"], ["Dubai", "dxb"], ["Barcelona", "bcn"], ["Amsterdam", "ams"], ["New York", "nyc"], ["London", "lon"], ["Paris", "par"], ["Istanbul", "ist"]];

export default async function StaysPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("stays");
  const tp = await getTranslations("place");
  const tc = await getTranslations("common");
  const photos = allPhotos();
  const cityList = await getCities();
  const countryOf = (code: string) => cityList.find((c) => c.code === code)?.country ?? "";
  const faq = [1, 2, 3, 4, 5, 6].map((i) => ({ q: t(`q${i}`), a: t(`a${i}`) }));
  return (
    <>
      <section className="relative bg-ink pb-8 pt-8 sm:pb-12 sm:pt-12">
        <div className="mx-auto max-w-5xl px-4">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">{t("h1")}</h1>
          <p className="mt-3 max-w-xl text-white/70">{t("lead")}</p>
          <div className="boarding-pass mt-6 px-5 py-6 sm:px-7">
            <StaysForm />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        <nav className="text-xs text-slate">
          <Link href="/" className="hover:text-ink">{tc("home")}</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{t("h1")}</span>
        </nav>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-xl border border-mist bg-white p-4 shadow-sm">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber/15 text-amber-700">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            </span>
            <span className="text-sm font-medium text-ink">{t("trust1")}</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-mist bg-white p-4 shadow-sm">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber/15 text-amber-700">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
            </span>
            <span className="text-sm font-medium text-ink">{t("trust2")}</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-mist bg-white p-4 shadow-sm">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber/15 text-amber-700">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
            </span>
            <span className="text-sm font-medium text-ink">{t("trust3")}</span>
          </div>
        </div>

        <div className="mt-10 sm:mt-14">
          <Link href="/destinations" className="group relative block aspect-[4/3] overflow-hidden rounded-xl sm:aspect-[16/6]">
            {photos["LON"] && <DestPhoto code="LON" photo={photos["LON"]} sizes="100vw" alt="London" className="z-0" />}
            {photos["LON"] && <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/70 via-black/20 to-transparent pointer-events-none" aria-hidden="true" />}
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 sm:p-10">
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">{t("bannerTitle")}</h2>
              <p className="mt-2 max-w-xl text-sm text-white/80 sm:text-base">{t("bannerSub")}</p>
              <span className="mt-4 inline-block w-fit rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-ink transition group-hover:bg-amber">{t("bannerCta")}</span>
            </div>
            {photos["LON"]?.author && <PhotoCredit author={photos["LON"].author} authorUrl={photos["LON"].photoUrl || ""} photoUrl={photos["LON"].photoUrl || ""} />}
          </Link>
        </div>

        <section className="mt-10 sm:mt-14">
          <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">{t("popular")}</h2>
          <p className="mt-2 text-sm text-slate">{t("popularDesc")}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cities.slice(0, 6).map(([c, k]) => (
              <a key={c} href={bookingUrl({ city: c })} target="_blank" rel="nofollow noopener" className="group flex h-full flex-col overflow-hidden rounded-xl border border-mist bg-white transition hover:border-amber hover:shadow-lg">
                <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-[#16324a] to-[#0b1b2b]">
                  {photos[k.toUpperCase()] && <DestPhoto code={k.toUpperCase()} photo={photos[k.toUpperCase()]} sizes="(min-width: 1024px) 33vw, 50vw, 100vw" alt={tp(`${k}.name`)} className="z-0" />}
                  {photos[k.toUpperCase()] && <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" aria-hidden="true" />}
                  <div className="absolute inset-0 z-10 flex items-end p-4">
                    <p className="font-display text-xl font-bold text-white drop-shadow"><bdi>{tp(`${k}.name`)}</bdi></p>
                  </div>
                  {photos[k.toUpperCase()]?.author && <PhotoCredit author={photos[k.toUpperCase()].author || ""} authorUrl={photos[k.toUpperCase()].photoUrl || ""} photoUrl={photos[k.toUpperCase()].photoUrl || ""} />}
                </div>
                <div className="p-4">
                  <p className="text-sm text-slate">{countryName(countryOf(k.toUpperCase()), locale)}</p>
                  <p className="mt-2 text-sm font-semibold text-amber-deep group-hover:underline">{t("search")}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-10 sm:mt-14">
          <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">{t("exploreMore")}</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {cities.map(([c, k]) => (
              <a key={c} href={bookingUrl({ city: c })} target="_blank" rel="nofollow noopener" className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-xl bg-gradient-to-br from-[#16324a] to-[#0b1b2b] p-4 text-white transition hover:-translate-y-1 hover:shadow-xl">
                {photos[k.toUpperCase()] && <DestPhoto code={k.toUpperCase()} photo={photos[k.toUpperCase()]} sizes="(min-width: 1024px) 33vw, 50vw, 100vw" alt={tp(`${k}.name`)} className="z-0" />}
                {photos[k.toUpperCase()] && <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" aria-hidden="true" />}
                <p className="relative z-10 font-display text-lg font-bold drop-shadow"><bdi>{tp(`${k}.name`)}</bdi></p>
                {photos[k.toUpperCase()]?.author && <PhotoCredit author={photos[k.toUpperCase()].author || ""} authorUrl={photos[k.toUpperCase()].photoUrl || ""} photoUrl={photos[k.toUpperCase()].photoUrl || ""} />}
              </a>
            ))}
          </div>
        </section>

        <div className="mt-10 grid gap-4 rounded-xl bg-cloud p-6 sm:grid-cols-3 sm:mt-14">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber/15 text-amber-700">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">{t("feature1t")}</p>
              <p className="mt-1 text-xs text-slate">{t("feature1d")}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber/15 text-amber-700">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">{t("feature2t")}</p>
              <p className="mt-1 text-xs text-slate">{t("feature2d")}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber/15 text-amber-700">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">{t("feature3t")}</p>
              <p className="mt-1 text-xs text-slate">{t("feature3d")}</p>
            </div>
          </div>
        </div>

        <section className="mt-10 sm:mt-14">
          <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">{t("faqTitle")}</h2>
          <div className="mt-4"><Faq items={faq} /></div>
        </section>

        <section className="mt-10 sm:mt-14">
          <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">{t("moreTravel")}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="rounded-full border border-mist bg-white px-4 py-2 text-sm font-medium text-ink">{t("byStars")}</button>
            <button className="rounded-full border border-mist bg-white px-4 py-2 text-sm font-medium text-ink">{t("popularCities")}</button>
            <button className="rounded-full border border-mist bg-white px-4 py-2 text-sm font-medium text-ink">{t("topCountries")}</button>
          </div>
          <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {cities.map(([c, k]) => (
              <li key={c}><a href={bookingUrl({ city: c })} target="_blank" rel="nofollow noopener" className="text-sm text-slate hover:text-ink hover:underline">{tp(`${k}.name`)}</a></li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
