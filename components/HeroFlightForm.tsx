"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { useCurrency } from "@/components/CurrencyProvider";
import { WL_CURRENCIES } from "@/lib/wlCurrencies";
import { CityField, Stepper, usePopover, fieldBtn, labelCls, ddmm, fmt, dayPickerLocale, type City } from "@/components/searchParts";

const TRIPS = [{ id: "round" }, { id: "oneway" }, { id: "multi" }] as const;

function TripIcon({ id }: { id: "round" | "oneway" | "multi" }) {
  const common = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (id === "oneway") return <svg {...common}><path d="M4 12h16M14 6l6 6-6 6" /></svg>;
  if (id === "round") return <svg {...common}><path d="M17 3l4 4-4 4M3 11V9a2 2 0 0 1 2-2h16M7 21l-4-4 4-4M21 13v2a2 2 0 0 1-2 2H3" /></svg>;
  return <svg {...common}><circle cx="5" cy="6" r="2" /><circle cx="19" cy="12" r="2" /><circle cx="7" cy="19" r="2" /><path d="M7 6h6a4 4 0 0 1 0 8H9a3 3 0 0 0 0 5" /></svg>;
}

type Leg = { to: City | null; date: Date | undefined };

/** One flight's date in the multi-city form. */
function LegDate({ label, value, min, onPick }: { label: string; value: Date | undefined; min: Date; onPick: (d: Date | undefined) => void }) {
  const t = useTranslations("form");
  const locale = useLocale();
  const pop = usePopover();
  return (
    <div className="relative" ref={pop.ref}>
      <span className={labelCls}>{label}</span>
      <button type="button" className={fieldBtn} onClick={() => pop.setOpen(!pop.open)} aria-haspopup="dialog" aria-expanded={pop.open}>
        <span className={value ? "" : "text-slate/70"}>{value ? fmt(value, locale) : t("addDate")}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>
      </button>
      {pop.open && (
        <div role="dialog" aria-label={t("chooseDate")} className="tj-cal absolute start-0 z-50 mt-2 w-max rounded-2xl border border-mist bg-white p-3 shadow-2xl">
          <DayPicker
            mode="single"
            numberOfMonths={2}
            selected={value}
            onSelect={(d) => {
              onPick(d);
              if (d) pop.setOpen(false);
            }}
            disabled={{ before: min }}
            startMonth={min}
            {...dayPickerLocale(locale)}
          />
        </div>
      )}
    </div>
  );
}

/**
 * Home-page flight search. It doesn't show results itself: it sends the visitor to /flights,
 * where the search widget reads the search code from the URL, runs the search and shows the results.
 */
export type Initial = {
  trip: "round" | "oneway" | "multi";
  from: City;
  to?: City;
  depart?: string; // YYYY-MM-DD
  back?: string | null;
  legs?: { to: City; date: string }[];
  adults: number;
  children: number;
  infants: number;
  cabin: "economy" | "business";
  direct?: boolean;
  bags?: boolean;
};

const toDate = (iso?: string | null) => (iso ? new Date(Number(iso.slice(0, 4)), Number(iso.slice(5, 7)) - 1, Number(iso.slice(8, 10))) : undefined);

export default function HeroFlightForm({ initial }: { initial?: Initial } = {}) {
  const t = useTranslations("form");
  const tc = useTranslations("common");
  const locale = useLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;
  const { currency } = useCurrency();
  const [trip, setTrip] = useState<"round" | "oneway" | "multi">(initial?.trip ?? "round");
  const [from, setFrom] = useState<City | null>(initial?.from ?? null);
  const [to, setTo] = useState<City | null>(initial?.to ?? null);
  const [range, setRange] = useState<DateRange | undefined>(initial?.trip === "round" && initial.depart ? { from: toDate(initial.depart), to: toDate(initial.back) } : undefined);
  const [single, setSingle] = useState<Date | undefined>(initial?.trip === "oneway" ? toDate(initial.depart) : undefined);
  const [adults, setAdults] = useState(initial?.adults ?? 1);
  const [children, setChildren] = useState(initial?.children ?? 0);
  const [infants, setInfants] = useState(initial?.infants ?? 0);
  const [cabin, setCabin] = useState<"economy" | "business">(initial?.cabin ?? "economy");
  const [direct, setDirect] = useState(initial?.direct ?? false);
  const [bags, setBags] = useState(initial?.bags ?? false);
  const [err, setErr] = useState("");
  const [legs, setLegs] = useState<Leg[]>(
    initial?.legs?.length ? initial.legs.map((l) => ({ to: l.to, date: toDate(l.date) })) : [{ to: null, date: undefined }, { to: null, date: undefined }],
  );

  /** Full page load so the results widget on /flights starts fresh. */
  function go(code: string) {
    window.location.href = `${prefix}/flights?flightSearch=${code}${direct ? "&direct=1" : ""}${bags ? "&bags=1" : ""}&language=${locale}${WL_CURRENCIES.has(currency) ? `&currency=${currency}` : ""}`;
  }

  useEffect(() => {
    if (initial) return; // opened from a search: keep its values
    // Restore the last search (cities, travellers, cabin) or guess the departure city from the visitor's location.
    let restored = false;
    try {
      const j = JSON.parse(localStorage.getItem("tj-last-search") ?? "null");
      if (j?.from) {
        setFrom(j.from);
        if (j.to) setTo(j.to);
        // Localize restored city names (localStorage keeps English names).
        for (const src of [j.from, j.to]) {
          if (!src?.code) continue;
          fetch(`/api/cities?q=${encodeURIComponent(src.code)}&locale=${locale}`)
            .then((r) => r.json())
            .then((d: { cities?: { code: string; name: string }[] }) => {
              const c = d.cities?.find((x: any) => x.code === src.code);
              if (c) {
                if (src === j.from) setFrom((cur) => cur ? { ...cur, name: c.name } : cur);
                else setTo((cur) => cur ? { ...cur, name: c.name } : cur);
              }
            })
            .catch(() => {});
        }
        if (j.trip === "oneway") setTrip("oneway");
        if (j.adults) setAdults(j.adults);
        setChildren(j.children ?? 0);
        setInfants(j.infants ?? 0);
        if (j.cabin === "business") setCabin("business");
        restored = true;
      }
    } catch {}
    if (restored) return;
    let alive = true;
    fetch("/api/geo")
      .then((r) => r.json())
      .then((g: { city?: string }) => (g.city ? fetch(`/api/cities?q=${encodeURIComponent(g.city)}&locale=${locale}`).then((r) => r.json()) : null))
      .then((j: { cities: City[] } | null) => {
        if (alive && j?.cities?.[0]) setFrom((cur) => cur ?? j.cities[0]);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const tripMenu = usePopover();
  const dates = usePopover();
  const pax = usePopover();
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const total = adults + children + infants;

  const depart = trip === "round" ? range?.from : single;
  const back = trip === "round" ? range?.to : undefined;
  const dateLabel = !depart ? "" : trip === "round" ? `${fmt(depart, locale)}${back ? "  →  " + fmt(back, locale) : `  →  ${t("returnWord")}`}` : fmt(depart, locale);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (trip === "multi") {
      if (!from) return setErr(t("errStart"));
      let prev: City = from;
      let prevDate: Date | undefined;
      for (const [i, l] of legs.entries()) {
        if (!l.to) return setErr(t("errLegDest", { n: i + 1 }));
        if (l.to.code === prev.code) return setErr(t("errSame", { n: i + 1 }));
        if (!l.date) return setErr(t("errLegDate", { n: i + 1 }));
        if (prevDate && l.date < prevDate) return setErr(t("errOrder", { n: i + 1, prev: i }));
        prev = l.to;
        prevDate = l.date;
      }
      setErr("");
      const people = `${adults}${children || infants ? children : ""}${infants ? infants : ""}`;
      // Chained legs in the widget's code: ORIGIN DDMM DEST DDMM DEST …
      const code = `${from.code}${legs.map((l) => ddmm(l.date!) + l.to!.code).join("")}${cabin === "business" ? "c" : ""}${people}`;
      try {
        localStorage.setItem("tj-last-search", JSON.stringify({ from, to: legs[0].to, trip: "round", adults, children, infants, cabin }));
      } catch {}
      go(code);
      return;
    }
    if (!from) return setErr(t("errCities"));
    const isEverywhere = !to || to.kind === "everywhere";
    if (!isEverywhere && from.code === to!.code) return setErr(t("errSameCity"));
    setErr("");

    if (isEverywhere) {
      try { localStorage.setItem("tj-last-search", JSON.stringify({ from, to: null, trip, adults, children, infants, cabin })); } catch {}
      const params = new URLSearchParams({ origin: from.code });
      window.location.href = `${prefix}/explore?${params.toString()}`;
      return;
    }

    if (!depart) return setErr(t("errDates"));
    if (trip === "round" && !back) return setErr(t("errReturn"));

    // Search code in the widget's own format:
    // ORIGIN DDMM DEST [DDMM] [c = business] ADULTS [CHILDREN] [INFANTS]
    const people = `${adults}${children || infants ? children : ""}${infants ? infants : ""}`;
    const code = `${from.code}${ddmm(depart)}${to.code}${back ? ddmm(back) : ""}${cabin === "business" ? "c" : ""}${people}`;
    try {
      localStorage.setItem("tj-last-search", JSON.stringify({ from, to, trip, adults, children, infants, cabin }));
    } catch {}
    // full page load so the search widget on /flights starts fresh
    go(code);
  }

  const paxField = (
            <div className="relative" ref={pax.ref}>
      <span className={labelCls}>{t("travellersCabin")}</span>
      <button type="button" className={fieldBtn} onClick={() => { pax.setOpen(!pax.open); dates.setOpen(false); }} aria-haspopup="dialog" aria-expanded={pax.open} title={t("travellers", { n: total }) + " - " + (cabin === "business" ? t("business") : t("economy"))}>
        <span className="block min-w-0 truncate whitespace-nowrap" title={t("travellers", { n: total }) + " - " + (cabin === "business" ? t("business") : t("economy"))}>
          {t("paxCompact", { n: total, cabin: cabin === "business" ? t("business") : t("economy") })}
        </span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {pax.open && (
        <div role="dialog" aria-label={t("travellersDialog")} className="absolute end-0 z-50 mt-2 min-w-[16rem] max-w-[calc(100vw-2rem)] rounded-2xl border border-mist bg-white p-4 shadow-2xl">
          <Stepper label={t("adults")} hint={t("adultsHint")} value={adults} min={1} max={9 - children - infants} onChange={(n) => { setAdults(n); if (infants > n) setInfants(n); }} />
          <Stepper label={t("children")} hint={t("childrenHint")} value={children} min={0} max={9 - adults - infants} onChange={setChildren} />
          <Stepper label={t("infants")} hint={t("infantsHint")} value={infants} min={0} max={Math.min(adults, 9 - adults - children)} onChange={setInfants} />
          <div className="mt-2 border-t border-mist pt-3">
            <p className="mb-2 text-sm font-semibold text-ink">{t("cabin")}</p>
            <div className="grid grid-cols-2 gap-1 rounded-xl bg-cloud p-1 text-sm font-semibold">
              {(["economy", "business"] as const).map((c) => (
                <button key={c} type="button" onClick={() => setCabin(c)} className={`rounded-lg px-3 py-1.5 transition ${cabin === c ? "bg-white text-ink shadow" : "text-slate hover:text-ink"}`}>
                  {t(c)}
                </button>
              ))}
            </div>
          </div>
          <button type="button" onClick={() => pax.setOpen(false)} className="mt-4 w-full rounded-xl bg-ink py-2.5 text-sm font-bold text-white transition hover:bg-ink-2">
            {tc("done")}
          </button>
        </div>
      )}
    </div>
  );
  const submitBtn = (
    <button type="submit" className="rounded-xl bg-amber px-6 py-3 text-sm font-bold text-ink transition hover:bg-amber-deep md:py-[13px]">
      {t("searchFlights")}
    </button>
  );

  return (
    <form onSubmit={submit} noValidate>
      <div className="mb-3 flex flex-wrap items-center gap-x-5 gap-y-2">
      <div className="relative inline-block" ref={tripMenu.ref}>
        <button
          type="button"
          onClick={() => tripMenu.setOpen(!tripMenu.open)}
          aria-haspopup="listbox"
          aria-expanded={tripMenu.open}
          className="flex items-center gap-2 rounded-full border border-mist bg-white py-1.5 ps-3 pe-3 text-sm font-semibold text-ink shadow-sm outline-none transition hover:border-amber focus-visible:ring-2 focus-visible:ring-amber"
        >
          <TripIcon id={trip} />
          {t(`trip_${trip}`)}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`text-slate transition ${tripMenu.open ? "rotate-180" : ""}`} aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
        </button>
        {tripMenu.open && (
          <ul role="listbox" aria-label={t("tripType")} className="absolute start-0 z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-mist bg-white p-1.5 shadow-2xl">
            {TRIPS.map((tp) => (
              <li key={tp.id} role="option" aria-selected={trip === tp.id}>
                <button
                  type="button"
                  onClick={() => {
                    setTrip(tp.id);
                    setErr("");
                    tripMenu.setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start text-sm font-semibold transition hover:bg-cloud ${trip === tp.id ? "bg-cloud text-ink" : "text-slate"}`}
                >
                  <TripIcon id={tp.id} />
                  <span className="flex-1">{t(`trip_${tp.id}`)}</span>
                  {trip === tp.id && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5A300" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10" /></svg>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-ink max-md:hidden">
        <input type="checkbox" checked={direct} onChange={(e) => setDirect(e.target.checked)} className="h-4 w-4 accent-[#FFB703]" />
        {t("direct")}
      </label>
      <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-ink max-md:hidden">
        <input type="checkbox" checked={bags} onChange={(e) => setBags(e.target.checked)} className="h-4 w-4 accent-[#FFB703]" />
        {t("bags")}
      </label>
      </div>

      {trip === "multi" ? (
        <div className="space-y-3">
          {legs.map((leg, i) => (
            <div key={i} className="grid gap-1.5 md:grid-cols-[1fr_1fr_1fr_2rem] md:items-end">
              {i === 0 ? (
                <CityField label={t("from")} value={from} onPick={setFrom} placeholder={t("cityPlaceholder")} />
              ) : (
                <div>
                  <span className={labelCls}>{t("from")}</span>
                  <div className={`${fieldBtn} cursor-default bg-cloud/60 text-slate`}>{legs[i - 1].to ? <><bdi>{legs[i - 1].to!.name}</bdi> <span dir="ltr" className="text-slate">({legs[i - 1].to!.code})</span></> : t("previousDest")}</div>
                </div>
              )}
              <CityField label={t("to")} value={leg.to} onPick={(c) => setLegs((ls) => ls.map((l, k) => (k === i ? { ...l, to: c } : l)))} placeholder={t("cityPlaceholder")} allowEverywhere />
              <LegDate label={t("flightDate", { n: i + 1 })} value={leg.date} min={legs[i - 1]?.date ?? today} onPick={(d) => setLegs((ls) => ls.map((l, k) => (k === i ? { ...l, date: d } : l)))} />
              {legs.length > 2 ? (
                <button type="button" onClick={() => setLegs((ls) => ls.filter((_, k) => k !== i))} aria-label={t("removeFlight", { n: i + 1 })} className="grid h-8 w-8 place-items-center rounded-full border border-mist text-slate transition hover:border-red-400 hover:text-red-500 md:mb-2">
                  ×
                </button>
              ) : (
                <span />
              )}
            </div>
          ))}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 py-1 md:hidden"><label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-ink"><input type="checkbox" checked={direct} onChange={(e) => setDirect(e.target.checked)} className="h-4 w-4 accent-[#FFB703]" />{t("direct")}</label><label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-ink"><input type="checkbox" checked={bags} onChange={(e) => setBags(e.target.checked)} className="h-4 w-4 accent-[#FFB703]" />{t("bags")}</label></div>
          <div className="flex flex-wrap items-end gap-1.5">
            {legs.length < 5 && (
              <button type="button" onClick={() => setLegs((ls) => [...ls, { to: null, date: undefined }])} className="rounded-xl border border-dashed border-slate/40 px-4 py-3 text-sm font-semibold text-ink transition hover:border-amber">
                {t("addFlight")}
              </button>
            )}
            <div className="w-full sm:w-64">{paxField}</div>
            <div className="sm:ms-auto">{submitBtn}</div>
          </div>
        </div>
      ) : (
        <div className="grid gap-1.5 md:grid-cols-[2fr_1.35fr_minmax(11rem,1fr)_auto] md:items-end">
          <div className="relative grid gap-1.5 sm:grid-cols-2 sm:gap-x-0 sm:[&>div:nth-child(1)_input]:rounded-e-none sm:[&>div:nth-child(1)_input]:pe-6 sm:[&>div:nth-child(2)_input]:rounded-s-none sm:[&>div:nth-child(2)_input]:border-s-0 sm:[&>div:nth-child(2)_input]:ps-6">
            <CityField label={t("from")} value={from} onPick={setFrom} placeholder={t("cityPlaceholder")} />
            <CityField label={t("to")} value={to} onPick={setTo} placeholder={t("cityPlaceholder")} allowEverywhere />
            <button
              type="button"
              onClick={() => {
                setFrom(to);
                setTo(from);
              }}
              aria-label={t("swap")}
              className="absolute end-2 top-[calc(50%+10px)] group z-10 grid h-8 w-8 -translate-y-1/2 place-items-center sm:end-auto sm:start-1/2 sm:-translate-x-1/2 sm:rtl:translate-x-1/2 rounded-full border border-mist bg-white text-ink shadow-sm ring-4 ring-white transition hover:border-amber hover:bg-amber"
            >
              <svg className="transition-transform duration-300 group-hover:rotate-180" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7" /></svg>
            </button>
          </div>

          {/* Dates */}
          <div className="relative" ref={dates.ref}>
            <span className={labelCls}>{trip === "round" ? t("departReturn") : t("depart")}</span>
            <button type="button" className={fieldBtn} onClick={() => { dates.setOpen(!dates.open); pax.setOpen(false); }} aria-haspopup="dialog" aria-expanded={dates.open}>
              <span className={dateLabel ? "" : "text-slate/70"}>{dateLabel || t("addDates")}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>
            </button>
            {dates.open && (
              <div role="dialog" aria-label={t("chooseDates")} className="tj-cal absolute start-0 z-50 mt-2 w-max rounded-2xl border border-mist bg-white p-3 shadow-2xl">
                {trip === "round" ? (
                  <DayPicker
                    mode="range"
                    numberOfMonths={2}
                    selected={range}
                    onSelect={(r) => {
                      setRange(r);
                      if (r?.from && r?.to && r.to.getTime() !== r.from.getTime()) dates.setOpen(false);
                    }}
                    disabled={{ before: today }}
                startMonth={today}
                    {...dayPickerLocale(locale)}
                  />
                ) : (
                  <DayPicker
                    mode="single"
                    numberOfMonths={2}
                    selected={single}
                    onSelect={(d) => {
                      setSingle(d);
                      if (d) dates.setOpen(false);
                    }}
                    disabled={{ before: today }}
                startMonth={today}
                    {...dayPickerLocale(locale)}
                  />
                )}
              </div>
            )}
          </div>

          {paxField}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 py-1 md:hidden"><label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-ink"><input type="checkbox" checked={direct} onChange={(e) => setDirect(e.target.checked)} className="h-4 w-4 accent-[#FFB703]" />{t("direct")}</label><label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-ink"><input type="checkbox" checked={bags} onChange={(e) => setBags(e.target.checked)} className="h-4 w-4 accent-[#FFB703]" />{t("bags")}</label></div>
          {submitBtn}
        </div>
      )}
      {err && <p role="alert" className="mt-3 text-sm font-medium text-red-600">{err}</p>}
    </form>
  );
}
