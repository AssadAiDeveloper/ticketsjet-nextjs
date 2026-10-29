import { isRtl } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import PageHero from "@/components/PageHero";
import { alternatesFor } from "@/lib/i18nPages";
import { robotsFor } from "@/lib/seo";
import TripForm, { type TripInitial } from "@/components/TripForm";
import { bookingUrl } from "@/lib/config";
import { cityName as locCity } from "@/lib/cityName";
import { searchTrips, type TripQuery } from "@/lib/tripSearch";
import { searchCode } from "@/lib/fares";
import { getCities } from "@/lib/places";
import Price from "@/components/Price";
import { dayMonth } from "@/lib/format";

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
const IATA = /^[A-Za-z]{3}$/, CC = /^[A-Za-z]{2}$/, MONTH = /^\d{4}-\d{2}$/, DAY = /^\d{4}-\d{2}-\d{2}$/;

function parse(sp: SP): { q: TripQuery; tn: string } | null {
  const from = one(sp.from).toUpperCase(), to = one(sp.to).toUpperCase();
  if (!IATA.test(from) || !(IATA.test(to) || CC.test(to))) return null;
  const q: TripQuery = { from, to };
  const dep = one(sp.dep), ret = one(sp.ret), m = one(sp.m), len = parseInt(one(sp.len), 10);
  if (DAY.test(dep) && DAY.test(ret)) { q.dep = dep; q.ret = ret; }
  else if (MONTH.test(m)) { q.month = m; if (len > 0 && len <= 60) q.len = len; }
  else return null;
  return { q, tn: one(sp.tn).slice(0, 60) };
}

export async function generateMetadata({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<SP> }): Promise<Metadata> {
  const searching = !!parse(await searchParams);
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tfp" });
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
    alternates: alternatesFor(locale, "/trip-finder"),
    robots: searching ? { index: false, follow: true } : robotsFor(locale),
  };
}

export default async function TripFinderPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<SP> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("tfp");
  const tx = await getTranslations("extras");
  const tc = await getTranslations("common");
  const nice = (iso: string) => dayMonth(iso, locale);
  const arrow = isRtl(locale) ? "←" : "→";
  const sp = await searchParams;
  const parsed = parse(sp);
  let result = null;
  let fromName = "", initial: TripInitial | undefined;

  if (parsed) {
    const { q, tn } = parsed;
    result = await searchTrips(q);
    let cities: Awaited<ReturnType<typeof getCities>> = [];
    try { cities = await getCities(); } catch {}
    const f = cities.find((c) => c.code === q.from);
    fromName = locCity(q.from, locale, f?.name ?? q.from);
    const toIsCountry = q.to.length === 2;
    const t = toIsCountry ? null : cities.find((c) => c.code === q.to);
    initial = {
      from: { code: q.from, name: fromName, country: f?.country ?? "" },
      to: toIsCountry ? { code: q.to, name: tn || q.to, country: q.to, kind: "country" } : { code: q.to, name: t ? locCity(q.to, locale, t?.name ?? q.to) : (tn || q.to), country: t?.country ?? "" },
      mode: q.dep ? "exact" : "flex", month: q.month, len: q.len ? String(q.len) : "", dep: q.dep, ret: q.ret,
    };
  }

  const best = result?.offers[0];
  const toName = initial?.to?.name ?? "";

  return (
    <>
      <PageHero title={t("heroTitle")} photoKey="trip-finder" />

      <div className="relative z-30 mx-auto -mt-10 max-w-6xl px-4 pb-14">
        <TripForm key={parsed ? JSON.stringify(parsed.q) : "new"} initial={initial} />

        {parsed && (
          <section className="mt-10" aria-live="polite">
            {result === null ? (
              <p className="rounded-2xl border border-mist bg-white p-6 text-slate">{t.rich("unavailable", { link: (c) => <Link className="font-semibold text-ink underline" href="/flights">{c}</Link> })}</p>
            ) : result.offers.length === 0 ? (
              <div className="rounded-2xl border border-mist bg-white p-6">
                <p className="font-semibold text-ink">{t("noneTitle", { from: fromName, to: toName })}</p>
                <p className="mt-1 text-sm text-slate">{t.rich("noneText", { link: (c) => <Link className="font-semibold text-ink underline" href="/flights">{c}</Link> })}</p>
              </div>
            ) : (
              <>
                <h2 className="font-display text-2xl font-bold text-ink">{t("resultsTitle", { from: fromName, to: toName })}</h2>
                <p className="mt-1 text-sm text-slate">{t("resultsSub")}</p>
                {result.relaxed && <p className="mt-2 rounded-lg bg-amber/15 px-3 py-2 text-sm text-ink">{t("relaxed")}</p>}
                <ul className="mt-5 grid gap-3">
                  {result.offers.map((o) => (
                    <li key={o.dest + o.depart}>
                      <Link href={`/flights?flightSearch=${searchCode(parsed!.q.from, { code: o.dest, depart: o.depart, back: o.back })}`} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-mist bg-white p-4 transition hover:border-amber">
                        <div>
                          <p className="font-display text-lg font-bold text-ink">{fromName} → {locCity(o.dest, locale, o.destName)}</p>
                          <p className="text-sm text-slate">{nice(o.depart)}{o.back ? ` – ${nice(o.back)}` : ""}{o.nights !== null ? ` · ${tc("nights", { n: o.nights })}` : ""} · {o.stops === 0 ? tc("direct") : tc("stops", { n: o.stops })}</p>
                        </div>
                        <p className="text-right"><span className="block text-xs text-slate">{tc("from")}</span><Price usd={o.price} className="text-2xl font-extrabold text-ink" /></p>
                      </Link>
                    </li>
                  ))}
                </ul>

                {best && (
                  <div className="mt-8 grid gap-4 md:grid-cols-3">
                    <a href={bookingUrl({ city: best.destName, checkin: best.back ? best.depart : undefined, checkout: best.back ?? undefined })} target="_blank" rel="nofollow noopener" className="block rounded-2xl border border-mist bg-white p-5 hover:border-amber">
                      <p className="font-mono text-xs text-amber">{t("stay")}</p>
                      <p className="font-display mt-1 text-lg font-bold text-ink">{tx("hotelsIn", { city: locCity(best.dest, locale, best.destName) })}</p>
                      <p className="mt-1 text-sm text-slate">{best.back ? t("hotelDates", { from: nice(best.depart), to: nice(best.back) }) : t("hotelOpen")}</p>
                    </a>
                    <Link href="/services/esim" className="block rounded-2xl border border-mist bg-white p-5 hover:border-amber">
                      <p className="font-mono text-xs text-amber">{t("connect")}</p>
                      <p className="font-display mt-1 text-lg font-bold text-ink">{tx("esim")}</p>
                      <p className="mt-1 text-sm text-slate">{t("esimText")}</p>
                    </Link>
                    <Link href="/activities" className="block rounded-2xl border border-mist bg-white p-5 hover:border-amber">
                      <p className="font-mono text-xs text-amber">{t("do")}</p>
                      <p className="font-display mt-1 text-lg font-bold text-ink">{t("thingsCard")}</p>
                      <p className="mt-1 text-sm text-slate">{t("thingsText")}</p>
                    </Link>
                  </div>
                )}
              </>
            )}
          </section>
        )}

        {!parsed && (
          <section className="mt-10 max-w-3xl text-slate">
            <h2 className="font-display text-xl font-bold text-ink">{t("how")}</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5">
              <li>{t("s1")}</li>
              <li>{t("s2")}</li>
              <li>{t("s3")}</li>
            </ol>
            <p className="mt-4 text-sm">{t("disclaimer")}</p>
          </section>
        )}
      </div>
    </>
  );
}
