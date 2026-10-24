"use client";

import { useEffect, useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { CityField, Stepper, usePopover, fieldBtn, labelCls, ddmm, fmt, type City } from "@/components/searchParts";

const TRIPS = [
  { id: "round", label: "Round trip" },
  { id: "oneway", label: "One way" },
  { id: "multi", label: "Multi-city" },
] as const;

function TripIcon({ id }: { id: "round" | "oneway" | "multi" }) {
  const common = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (id === "oneway") return <svg {...common}><path d="M4 12h16M14 6l6 6-6 6" /></svg>;
  if (id === "round") return <svg {...common}><path d="M17 3l4 4-4 4M3 11V9a2 2 0 0 1 2-2h16M7 21l-4-4 4-4M21 13v2a2 2 0 0 1-2 2H3" /></svg>;
  return <svg {...common}><circle cx="5" cy="6" r="2" /><circle cx="19" cy="12" r="2" /><circle cx="7" cy="19" r="2" /><path d="M7 6h6a4 4 0 0 1 0 8H9a3 3 0 0 0 0 5" /></svg>;
}

type Leg = { to: City | null; date: Date | undefined };

/** One flight's date in the multi-city form. */
function LegDate({ label, value, min, onPick }: { label: string; value: Date | undefined; min: Date; onPick: (d: Date | undefined) => void }) {
  const pop = usePopover();
  return (
    <div className="relative" ref={pop.ref}>
      <span className={labelCls}>{label}</span>
      <button type="button" className={fieldBtn} onClick={() => pop.setOpen(!pop.open)} aria-haspopup="dialog" aria-expanded={pop.open}>
        <span className={value ? "" : "text-slate/70"}>{value ? fmt(value) : "Add date"}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>
      </button>
      {pop.open && (
        <div role="dialog" aria-label="Choose date" className="tj-cal absolute left-0 z-50 mt-2 w-max rounded-2xl border border-mist bg-white p-3 shadow-2xl">
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
            weekStartsOn={1}
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
    window.location.href = `/flights?flightSearch=${code}${direct ? "&direct=1" : ""}${bags ? "&bags=1" : ""}`;
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
      .then((g: { city?: string }) => (g.city ? fetch(`/api/cities?q=${encodeURIComponent(g.city)}`).then((r) => r.json()) : null))
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
  const dateLabel = !depart ? "" : trip === "round" ? `${fmt(depart)}${back ? "  →  " + fmt(back) : "  →  Return"}` : fmt(depart);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (trip === "multi") {
      if (!from) return setErr("Choose where your trip starts.");
      let prev: City = from;
      let prevDate: Date | undefined;
      for (const [i, l] of legs.entries()) {
        if (!l.to) return setErr(`Choose the destination for flight ${i + 1}.`);
        if (l.to.code === prev.code) return setErr(`Flight ${i + 1} starts and ends in the same city.`);
        if (!l.date) return setErr(`Pick a date for flight ${i + 1}.`);
        if (prevDate && l.date < prevDate) return setErr(`Flight ${i + 1} is before flight ${i}.`);
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
    if (!from || !to) return setErr("Choose your departure and arrival cities from the list.");
    if (from.code === to.code) return setErr("Departure and arrival are the same city.");
    if (!depart) return setErr("Pick your travel dates.");
    if (trip === "round" && !back) return setErr("Pick a return date, or switch to one way.");
    setErr("");

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
      <span className={labelCls}>Travellers &amp; cabin</span>
      <button type="button" className={fieldBtn} onClick={() => { pax.setOpen(!pax.open); dates.setOpen(false); }} aria-haspopup="dialog" aria-expanded={pax.open}>
        <span>
          {total} traveller{total > 1 ? "s" : ""} · {cabin === "business" ? "Business" : "Economy"}
        </span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {pax.open && (
        <div role="dialog" aria-label="Travellers and cabin" className="absolute right-0 z-50 mt-2 w-72 rounded-2xl border border-mist bg-white p-4 shadow-2xl">
          <Stepper label="Adults" hint="12+ years" value={adults} min={1} max={9 - children - infants} onChange={(n) => { setAdults(n); if (infants > n) setInfants(n); }} />
          <Stepper label="Children" hint="2–11 years" value={children} min={0} max={9 - adults - infants} onChange={setChildren} />
          <Stepper label="Infants" hint="Under 2, on lap" value={infants} min={0} max={Math.min(adults, 9 - adults - children)} onChange={setInfants} />
          <div className="mt-2 border-t border-mist pt-3">
            <p className="mb-2 text-sm font-semibold text-ink">Cabin</p>
            <div className="grid grid-cols-2 gap-1 rounded-xl bg-cloud p-1 text-sm font-semibold">
              {(["economy", "business"] as const).map((c) => (
                <button key={c} type="button" onClick={() => setCabin(c)} className={`rounded-lg px-3 py-1.5 capitalize transition ${cabin === c ? "bg-white text-ink shadow" : "text-slate hover:text-ink"}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <button type="button" onClick={() => pax.setOpen(false)} className="mt-4 w-full rounded-xl bg-ink py-2.5 text-sm font-bold text-white transition hover:bg-ink-2">
            Done
          </button>
        </div>
      )}
    </div>
  );
  const submitBtn = (
    <button type="submit" className="rounded-xl bg-amber px-6 py-3 text-sm font-bold text-ink transition hover:bg-amber-deep md:py-[13px]">
      Search flights
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
          className="flex items-center gap-2 rounded-full border border-mist bg-white py-1.5 pl-3 pr-3 text-sm font-semibold text-ink shadow-sm outline-none transition hover:border-amber focus-visible:ring-2 focus-visible:ring-amber"
        >
          <TripIcon id={trip} />
          {TRIPS.find((t) => t.id === trip)!.label}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`text-slate transition ${tripMenu.open ? "rotate-180" : ""}`} aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
        </button>
        {tripMenu.open && (
          <ul role="listbox" aria-label="Trip type" className="absolute left-0 z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-mist bg-white p-1.5 shadow-2xl">
            {TRIPS.map((t) => (
              <li key={t.id} role="option" aria-selected={trip === t.id}>
                <button
                  type="button"
                  onClick={() => {
                    setTrip(t.id);
                    setErr("");
                    tripMenu.setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition hover:bg-cloud ${trip === t.id ? "bg-cloud text-ink" : "text-slate"}`}
                >
                  <TripIcon id={t.id} />
                  <span className="flex-1">{t.label}</span>
                  {trip === t.id && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5A300" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10" /></svg>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-ink">
        <input type="checkbox" checked={direct} onChange={(e) => setDirect(e.target.checked)} className="h-4 w-4 accent-[#FFB703]" />
        Direct flights only
      </label>
      <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-ink">
        <input type="checkbox" checked={bags} onChange={(e) => setBags(e.target.checked)} className="h-4 w-4 accent-[#FFB703]" />
        Baggage included
      </label>
      </div>

      {trip === "multi" ? (
        <div className="space-y-3">
          {legs.map((leg, i) => (
            <div key={i} className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_2rem] md:items-end">
              {i === 0 ? (
                <CityField label="From" value={from} onPick={setFrom} placeholder="City or airport" />
              ) : (
                <div>
                  <span className={labelCls}>From</span>
                  <div className={`${fieldBtn} cursor-default bg-cloud/60 text-slate`}>{legs[i - 1].to ? `${legs[i - 1].to!.name} (${legs[i - 1].to!.code})` : "Previous destination"}</div>
                </div>
              )}
              <CityField label="To" value={leg.to} onPick={(c) => setLegs((ls) => ls.map((l, k) => (k === i ? { ...l, to: c } : l)))} placeholder="City or airport" />
              <LegDate label={`Flight ${i + 1} date`} value={leg.date} min={legs[i - 1]?.date ?? today} onPick={(d) => setLegs((ls) => ls.map((l, k) => (k === i ? { ...l, date: d } : l)))} />
              {legs.length > 2 ? (
                <button type="button" onClick={() => setLegs((ls) => ls.filter((_, k) => k !== i))} aria-label={`Remove flight ${i + 1}`} className="grid h-8 w-8 place-items-center rounded-full border border-mist text-slate transition hover:border-red-400 hover:text-red-500 md:mb-2">
                  ×
                </button>
              ) : (
                <span />
              )}
            </div>
          ))}
          <div className="flex flex-wrap items-end gap-3">
            {legs.length < 5 && (
              <button type="button" onClick={() => setLegs((ls) => [...ls, { to: null, date: undefined }])} className="rounded-xl border border-dashed border-slate/40 px-4 py-3 text-sm font-semibold text-ink transition hover:border-amber">
                + Add another flight
              </button>
            )}
            <div className="w-full sm:w-64">{paxField}</div>
            <div className="sm:ml-auto">{submitBtn}</div>
          </div>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-[2fr_1.35fr_1fr_auto] md:items-end">
          <div className="relative grid gap-3 sm:grid-cols-2">
            <CityField label="From" value={from} onPick={setFrom} placeholder="City or airport" />
            <CityField label="To" value={to} onPick={setTo} placeholder="City or airport" />
            <button
              type="button"
              onClick={() => {
                setFrom(to);
                setTo(from);
              }}
              aria-label="Swap departure and arrival"
              className="absolute left-1/2 top-[calc(50%+10px)] z-10 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-mist bg-white text-ink shadow transition hover:border-amber sm:grid"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7" /></svg>
            </button>
          </div>

          {/* Dates */}
          <div className="relative" ref={dates.ref}>
            <span className={labelCls}>{trip === "round" ? "Depart — Return" : "Depart"}</span>
            <button type="button" className={fieldBtn} onClick={() => { dates.setOpen(!dates.open); pax.setOpen(false); }} aria-haspopup="dialog" aria-expanded={dates.open}>
              <span className={dateLabel ? "" : "text-slate/70"}>{dateLabel || "Add dates"}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>
            </button>
            {dates.open && (
              <div role="dialog" aria-label="Choose dates" className="tj-cal absolute left-0 z-50 mt-2 w-max rounded-2xl border border-mist bg-white p-3 shadow-2xl">
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
                    weekStartsOn={1}
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
                    weekStartsOn={1}
                  />
                )}
              </div>
            )}
          </div>

          {paxField}
          {submitBtn}
        </div>
      )}
      {err && <p role="alert" className="mt-3 text-sm font-medium text-red-600">{err}</p>}
    </form>
  );
}
