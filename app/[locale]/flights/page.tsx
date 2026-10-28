import { isRtl } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { alternatesFor } from "@/lib/i18nPages";
import AdSlot from "@/components/AdSlot";
import Faq from "@/components/Faq";
import { WlSearchForm, WlResults } from "@/components/WhiteLabel";
import HeroFlightForm, { type Initial } from "@/components/HeroFlightForm";
import FilterBridge from "@/components/FilterBridge";
import WlSync from "@/components/WlSync";
import NearbyDates from "@/components/NearbyDates";
import TripExtras from "@/components/TripExtras";
import { parseSearchCode } from "@/lib/searchCode";
import { getCities } from "@/lib/places";
import DealsGrid from "@/components/DealsGrid";
import { getDeals } from "@/lib/deals";
import { allPhotos } from "@/lib/destinationPhotos";
import { ROUTES, DESTS, originName, slug } from "@/lib/routes";

type SP = Promise<{ flightSearch?: string; direct?: string; bags?: string }>;

async function cityObj(code: string) {
  try {
    const c = (await getCities()).find((x) => x.code === code);
    if (c) return { code: c.code, name: c.name, country: c.country };
  } catch {}
  return { code, name: code, country: "" };
}

async function cityName(code: string) {
  try {
    return (await getCities()).find((c) => c.code === code)?.name ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: SP }): Promise<Metadata> {
  const { flightSearch } = await searchParams;
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "flights" });
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
    alternates: alternatesFor(locale, "/flights"),
    // Individual search result pages aren't useful in Google; only the plain /flights page is indexed.
    robots: flightSearch ? { index: false, follow: true } : undefined,
  };
}

export default async function FlightsPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: SP }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("flights");
  const tc = await getTranslations("common");
  const tp = await getTranslations("place");
  const arrow = isRtl(locale) ? "←" : "→";
  const faq = [1, 2, 3, 4].map((n) => ({ q: t(`faq${n}q`), a: t(`faq${n}a`) }));
  const { flightSearch, direct, bags } = await searchParams;
  const trip = parseSearchCode(flightSearch);
  const searching = Boolean(flightSearch);
  const destName = trip ? await cityName(trip.dest) : null;
  const deals = searching ? null : await getDeals(locale);
  // Prefill the search box from the URL so the visitor can tweak and search again.
  const initial: Initial | undefined = trip
    ? {
        trip: trip.legs ? "multi" : trip.back ? "round" : "oneway",
        from: await cityObj(trip.origin),
        to: trip.legs ? undefined : await cityObj(trip.dest),
        depart: trip.depart,
        back: trip.back,
        legs: trip.legs ? await Promise.all(trip.legs.map(async (l) => ({ to: await cityObj(l.dest), date: l.date }))) : undefined,
        adults: trip.adults,
        children: trip.children,
        infants: trip.infants,
        cabin: trip.business ? "business" : "economy",
        direct: direct === "1",
        bags: bags === "1",
      }
    : undefined;
  return (
    <>
      <section className={searching ? "bg-ink pb-8 pt-6" : "bg-ink pb-16 pt-14"}>
        <div className="mx-auto max-w-6xl px-4">
          {!searching && <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">{t("kicker")}</p>}
          <h1 className={searching ? "sr-only" : "font-display mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl"}>
            {t("h1")}
          </h1>
          {!searching && (
            <p className="mt-4 max-w-xl text-white/70">
              {t("sub")}
            </p>
          )}
          <div className={`boarding-pass ${searching ? "" : "mt-9"} px-5 py-6 sm:px-7`}>
            <HeroFlightForm key={flightSearch ?? "new"} initial={initial} />
          </div>
          {/* The results widget expects its own search container on the page; it stays off-screen. */}
          <div aria-hidden="true" style={{ position: "fixed", left: 0, top: 0, width: 1, height: 1, overflow: "hidden", transform: "translateX(-9999px)", contain: "paint" }}>
            <WlSearchForm />
          </div>
        </div>
      </section>

      {/* نتائج البحث تظهر هنا — في نفس الصفحة */}
      <section className="mx-auto max-w-6xl px-4">
        {trip && trip.back && <NearbyDates origin={trip.origin} dest={trip.dest} depart={trip.depart} />}
        <WlResults />
        <FilterBridge direct={direct === "1"} bags={bags === "1"} />
        {searching && <WlSync />}
        {trip && destName && <TripExtras city={destName} depart={trip.depart} back={trip.back} />}
      </section>

      {!searching && (
        <>
          <nav aria-label={t("breadcrumb")} className="mx-auto max-w-6xl px-4 pt-6 text-sm text-slate">
            <Link href="/" className="hover:text-ink">{t("home")}</Link> <span aria-hidden="true">›</span> <span className="text-ink">{t("kicker")}</span>
          </nav>

          <section className="mx-auto max-w-6xl px-4 pt-6">
            <ul className="grid gap-4 md:grid-cols-3">
              {[1, 2, 3].map((n) => ({ t: t(`v${n}t`), d: t(`v${n}d`) })).map((c) => (
                <li key={c.t} className="rounded-2xl border border-mist bg-white p-5">
                  <h2 className="font-semibold text-ink">{c.t}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-slate">{c.d}</p>
                </li>
              ))}
            </ul>
          </section>

          {deals && (
            <div className="mx-auto max-w-6xl px-4 pt-14">
              <DealsGrid origin={deals.origin} items={deals.items} photos={Object.fromEntries(Object.entries(allPhotos()).filter(([code]) => deals.items.some((d) => d.code === code)))} />
            </div>
          )}

          <section className="mx-auto max-w-6xl px-4 pt-14">
            <h2 className="font-display text-2xl font-bold text-ink">{t("popular")}</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {ROUTES.slice(0, 14).map(([o, d]) => (
                <li key={`${o}${d}`}>
                  <Link href={`/cheap-flights/${slug(o, d)}`} className="block rounded-full border border-mist bg-white px-4 py-2 text-sm font-medium text-ink hover:border-amber">
                    {t("routeLabel", { from: tp(`${o}.name`), to: tp(`${d}.name`) })}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/cheap-flights" className="block rounded-full px-4 py-2 text-sm font-semibold text-amber-deep hover:underline">{t("allRoutes")} {arrow}</Link>
              </li>
            </ul>
          </section>
        </>
      )}

      <AdSlot slot="3333333333" className="mt-10" />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{t("tipsTitle")}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map((n) => ({ t: t(`tip${n}t`), d: t(`tip${n}d`) })).map((c) => (
            <div key={c.t} className="rounded-2xl border border-mist bg-white p-6">
              <h3 className="font-display text-lg font-bold text-ink">{c.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{c.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-slate">
          {t("playbook")}{" "}
          <Link href="/blog/how-to-find-cheap-flights" className="font-semibold text-amber-deep underline">
            {t("playbookLink")}
          </Link>
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
