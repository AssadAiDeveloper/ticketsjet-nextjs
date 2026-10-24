import type { Metadata } from "next";
import Link from "next/link";
import TripForm, { type TripInitial } from "@/components/TripForm";
import AdSlot from "@/components/AdSlot";
import { bookingUrl } from "@/lib/config";
import { searchTrips, type TripQuery } from "@/lib/tripSearch";
import { searchCode } from "@/lib/fares";
import { getCities } from "@/lib/places";

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

export async function generateMetadata({ searchParams }: { searchParams: Promise<SP> }): Promise<Metadata> {
  const searching = !!parse(await searchParams);
  return {
    title: "Trip Finder — Cheapest Flights to a City or Country",
    description: "Pick where you're flying from and where to, choose a month or exact dates, and see the lowest fares found. Then compare hotels for the same dates.",
    alternates: { canonical: "/trip-finder" },
    robots: searching ? { index: false, follow: true } : undefined,
  };
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const nice = (iso: string) => { const d = new Date(iso + "T00:00:00Z"); return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`; };

export default async function TripFinderPage({ searchParams }: { searchParams: Promise<SP> }) {
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
    fromName = f?.name ?? q.from;
    const toIsCountry = q.to.length === 2;
    const t = toIsCountry ? null : cities.find((c) => c.code === q.to);
    initial = {
      from: { code: q.from, name: fromName, country: f?.country ?? "" },
      to: toIsCountry ? { code: q.to, name: tn || q.to, country: q.to, kind: "country" } : { code: q.to, name: t?.name ?? (tn || q.to), country: t?.country ?? "" },
      mode: q.dep ? "exact" : "flex", month: q.month, len: q.len ? String(q.len) : "", dep: q.dep, ret: q.ret,
    };
  }

  const best = result?.offers[0];
  const toName = initial?.to?.name ?? "";

  return (
    <>
      <section className="bg-ink pb-16 pt-10">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">Trip finder</p>
          <h1 className="font-display mt-3 max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Where do you want to go, and when?</h1>
          <p className="mt-3 max-w-xl text-sm text-white/70">Type a city or a whole country, pick a month or exact dates, and we search the lowest fares automatically.</p>
        </div>
      </section>

      <div className="mx-auto -mt-10 max-w-6xl px-4 pb-14">
        <TripForm key={parsed ? JSON.stringify(parsed.q) : "new"} initial={initial} />

        {parsed && (
          <section className="mt-10" aria-live="polite">
            {result === null ? (
              <p className="rounded-2xl border border-mist bg-white p-6 text-slate">Fare search is unavailable right now. Please try again shortly, or use the <Link className="font-semibold text-ink underline" href="/flights">flight search</Link>.</p>
            ) : result.offers.length === 0 ? (
              <div className="rounded-2xl border border-mist bg-white p-6">
                <p className="font-semibold text-ink">No recent fares found for {fromName} → {toName} in that period.</p>
                <p className="mt-1 text-sm text-slate">Prices come from recent searches, so quiet routes can be empty. Try another month, nearby dates, or <Link className="font-semibold text-ink underline" href="/flights">search live prices</Link>.</p>
              </div>
            ) : (
              <>
                <h2 className="font-display text-2xl font-bold text-ink">Lowest fares {fromName} → {toName}</h2>
                <p className="mt-1 text-sm text-slate">Round-trip fares in USD found in recent searches. Final prices are confirmed on the booking page.</p>
                {result.relaxed && <p className="mt-2 rounded-lg bg-amber/15 px-3 py-2 text-sm text-ink">No fares matched that exact trip length, so these are the cheapest of any length.</p>}
                <ul className="mt-5 grid gap-3">
                  {result.offers.map((o) => (
                    <li key={o.dest + o.depart}>
                      <Link href={`/flights?flightSearch=${searchCode(parsed!.q.from, { code: o.dest, depart: o.depart, back: o.back })}`} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-mist bg-white p-4 transition hover:border-amber">
                        <div>
                          <p className="font-display text-lg font-bold text-ink">{fromName} → {o.destName}</p>
                          <p className="text-sm text-slate">{nice(o.depart)}{o.back ? ` – ${nice(o.back)}` : ""}{o.nights !== null ? ` · ${o.nights} nights` : ""} · {o.stops === 0 ? "Direct" : `${o.stops} stop${o.stops > 1 ? "s" : ""}`}</p>
                        </div>
                        <p className="text-right"><span className="block text-xs text-slate">from</span><span className="text-2xl font-extrabold text-ink">${o.price}</span></p>
                      </Link>
                    </li>
                  ))}
                </ul>

                {best && (
                  <div className="mt-8 grid gap-4 md:grid-cols-3">
                    <a href={bookingUrl({ city: best.destName, checkin: best.back ? best.depart : undefined, checkout: best.back ?? undefined })} target="_blank" rel="nofollow noopener" className="block rounded-2xl border border-mist bg-white p-5 hover:border-amber">
                      <p className="font-mono text-xs text-amber">STAY</p>
                      <p className="font-display mt-1 text-lg font-bold text-ink">Hotels in {best.destName}</p>
                      <p className="mt-1 text-sm text-slate">{best.back ? `Opens Booking.com for ${nice(best.depart)} – ${nice(best.back)}.` : "Opens Booking.com."} Prices are shown there.</p>
                    </a>
                    <Link href="/services/esim" className="block rounded-2xl border border-mist bg-white p-5 hover:border-amber">
                      <p className="font-mono text-xs text-amber">CONNECT</p>
                      <p className="font-display mt-1 text-lg font-bold text-ink">Travel eSIM</p>
                      <p className="mt-1 text-sm text-slate">Mobile data before you land.</p>
                    </Link>
                    <Link href="/activities" className="block rounded-2xl border border-mist bg-white p-5 hover:border-amber">
                      <p className="font-mono text-xs text-amber">DO</p>
                      <p className="font-display mt-1 text-lg font-bold text-ink">Things to do</p>
                      <p className="mt-1 text-sm text-slate">Tours and tickets in popular cities.</p>
                    </Link>
                  </div>
                )}
              </>
            )}
          </section>
        )}

        {!parsed && (
          <section className="mt-10 max-w-3xl text-slate">
            <h2 className="font-display text-xl font-bold text-ink">How it works</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5">
              <li>Choose where you&apos;re flying from, and a city or a whole country as the destination.</li>
              <li>Pick a flexible month with a trip length, or exact dates.</li>
              <li>We list the lowest recent fares. Pick one to see live results, and open a hotel search for the same dates.</li>
            </ol>
            <p className="mt-4 text-sm">Fares come from recent searches by travellers and are a guide, not a guarantee. Hotel prices are shown on the hotel site.</p>
          </section>
        )}
        <div className="my-10"><AdSlot slot="3333333333" /></div>
      </div>
    </>
  );
}
