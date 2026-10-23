"use client";

import { useEffect, useRef, useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";

type City = { code: string; name: string; country: string };

/** Autocomplete city field backed by /api/cities */
function CityField({ label, value, onPick, placeholder }: { label: string; value: City | null; onPick: (c: City | null) => void; placeholder: string }) {
  const [text, setText] = useState("");
  const [list, setList] = useState<City[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (value || text.trim().length < 2) return setList([]);
    const t = setTimeout(() => {
      fetch(`/api/cities?q=${encodeURIComponent(text.trim())}`)
        .then((r) => r.json())
        .then((j: { cities: City[] }) => setList(j.cities))
        .catch(() => setList([]));
    }, 180);
    return () => clearTimeout(t);
  }, [text, value]);

  return (
    <div className="relative">
      <label className="block font-mono text-[10px] uppercase tracking-widest text-slate">{label}</label>
      <input
        value={value ? `${value.name} (${value.code})` : text}
        onChange={(e) => {
          onPick(null);
          setText(e.target.value);
          setOpen(true);
        }}
        onFocus={(e) => value && e.currentTarget.select()}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder={placeholder}
        autoComplete="off"
        className="mt-1 w-full rounded-xl border border-mist bg-white px-3 py-3 text-sm font-medium text-ink outline-none transition focus:border-amber"
      />
      {open && list.length > 0 && !value && (
        <ul className="absolute z-50 mt-1 w-full overflow-hidden rounded-xl border border-mist bg-white shadow-xl">
          {list.map((c) => (
            <li key={c.code}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onPick(c);
                  setText("");
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm hover:bg-cloud"
              >
                <span className="text-ink">{c.name}</span>
                <span className="font-mono text-xs text-slate">{c.code}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const two = (n: number) => String(n).padStart(2, "0");
const ddmm = (d: Date) => two(d.getDate()) + two(d.getMonth() + 1);
const fmt = (d?: Date) => (d ? d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }) : "");

/** Closes a popover when the user clicks outside of it */
function usePopover() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return { open, setOpen, ref };
}

const fieldBtn =
  "mt-1 flex w-full items-center justify-between gap-2 rounded-xl border border-mist bg-white px-3 py-3 text-left text-sm font-medium text-ink outline-none transition hover:border-slate/40 focus:border-amber";
const labelCls = "block font-mono text-[10px] uppercase tracking-widest text-slate";

function Stepper({ label, hint, value, min, max, onChange }: { label: string; hint: string; value: number; min: number; max: number; onChange: (n: number) => void }) {
  const btn = "grid h-8 w-8 place-items-center rounded-full border border-mist text-lg leading-none text-ink transition hover:border-amber disabled:cursor-not-allowed disabled:opacity-30";
  return (
    <div className="flex items-center justify-between py-2.5">
      <div>
        <p className="text-sm font-semibold text-ink">{label}</p>
        <p className="text-xs text-slate">{hint}</p>
      </div>
      <div className="flex items-center gap-3">
        <button type="button" className={btn} disabled={value <= min} onClick={() => onChange(value - 1)} aria-label={`Fewer ${label}`}>−</button>
        <span className="w-4 text-center text-sm font-bold text-ink">{value}</span>
        <button type="button" className={btn} disabled={value >= max} onClick={() => onChange(value + 1)} aria-label={`More ${label}`}>+</button>
      </div>
    </div>
  );
}

/**
 * Home-page flight search. It doesn't show results itself: it sends the visitor to /flights,
 * where the search widget reads the search code from the URL, runs the search and shows the results.
 */
export default function HeroFlightForm() {
  const [trip, setTrip] = useState<"round" | "oneway">("round");
  const [from, setFrom] = useState<City | null>(null);
  const [to, setTo] = useState<City | null>(null);
  const [range, setRange] = useState<DateRange | undefined>();
  const [single, setSingle] = useState<Date | undefined>();
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabin, setCabin] = useState<"economy" | "business">("economy");
  const [err, setErr] = useState("");
  const dates = usePopover();
  const pax = usePopover();
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const total = adults + children + infants;

  const depart = trip === "round" ? range?.from : single;
  const back = trip === "round" ? range?.to : undefined;
  const dateLabel = !depart ? "" : trip === "round" ? `${fmt(depart)}${back ? "  →  " + fmt(back) : "  →  Return"}` : fmt(depart);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!from || !to) return setErr("Choose your departure and arrival cities from the list.");
    if (from.code === to.code) return setErr("Departure and arrival are the same city.");
    if (!depart) return setErr("Pick your travel dates.");
    if (trip === "round" && !back) return setErr("Pick a return date, or switch to one way.");
    setErr("");

    // Search code in the widget's own format:
    // ORIGIN DDMM DEST [DDMM] [c = business] ADULTS [CHILDREN] [INFANTS]
    const people = `${adults}${children || infants ? children : ""}${infants ? infants : ""}`;
    const code = `${from.code}${ddmm(depart)}${to.code}${back ? ddmm(back) : ""}${cabin === "business" ? "c" : ""}${people}`;
    // full page load so the search widget on /flights starts fresh
    window.location.href = `/flights?flightSearch=${code}`;
  }

  return (
    <form onSubmit={submit} noValidate>
      <div role="radiogroup" aria-label="Trip type" className="mb-3 inline-flex gap-1 rounded-xl bg-cloud p-1 text-sm font-semibold">
        {([["round", "Round trip"], ["oneway", "One way"]] as const).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={trip === id}
            onClick={() => setTrip(id)}
            className={`rounded-lg px-4 py-1.5 transition ${trip === id ? "bg-white text-ink shadow" : "text-slate hover:text-ink"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_1fr_1.35fr_1fr_auto] md:items-end">
        <CityField label="From" value={from} onPick={setFrom} placeholder="City or airport" />
        <CityField label="To" value={to} onPick={setTo} placeholder="City or airport" />

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

        {/* Travellers + cabin */}
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

        <button type="submit" className="rounded-xl bg-amber px-6 py-3 text-sm font-bold text-ink transition hover:bg-amber-deep md:py-[13px]">
          Search flights
        </button>
      </div>
      {err && <p role="alert" className="mt-3 text-sm font-medium text-red-600">{err}</p>}
    </form>
  );
}
