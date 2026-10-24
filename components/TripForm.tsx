"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { CityField, usePopover, fieldBtn, labelCls, fmt, type City } from "@/components/searchParts";

export type TripInitial = { from?: City | null; to?: City | null; mode?: "flex" | "exact"; month?: string; len?: string; dep?: string; ret?: string };

const LENGTHS = [["", "Any length"], ["7", "1 week"], ["10", "10 days"], ["14", "2 weeks"], ["21", "3 weeks"], ["30", "1 month"]];
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const fromIso = (s?: string) => (s ? new Date(s + "T00:00:00") : undefined);

function monthOptions() {
  const out: { v: string; l: string; y: string }[] = [];
  const d = new Date();
  d.setDate(1);
  for (let i = 0; i < 12; i++) {
    out.push({ v: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`, l: d.toLocaleDateString("en-GB", { month: "short" }), y: String(d.getFullYear()) });
    d.setMonth(d.getMonth() + 1);
  }
  return out;
}

/** Trip finder form: where from, where to (city or country), when (flexible month or exact dates), how long. */
export default function TripForm({ initial }: { initial?: TripInitial }) {
  const router = useRouter();
  const months = monthOptions();
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const [from, setFrom] = useState<City | null>(initial?.from ?? null);
  const [to, setTo] = useState<City | null>(initial?.to ?? null);
  const [mode, setMode] = useState<"flex" | "exact">(initial?.mode ?? "flex");
  const [month, setMonth] = useState(initial?.month ?? months[1].v);
  const [len, setLen] = useState(initial?.len ?? "");
  const [range, setRange] = useState<DateRange | undefined>(initial?.dep && initial?.ret ? { from: fromIso(initial.dep), to: fromIso(initial.ret) } : undefined);
  const [err, setErr] = useState("");
  const dates = usePopover();
  const label = range?.from ? `${fmt(range.from)}${range.to ? "  →  " + fmt(range.to) : "  →  Return"}` : "";

  // Default the departure city from the visitor's approximate location.
  useEffect(() => {
    if (initial?.from) return;
    fetch("/api/geo").then((r) => r.json()).then((g: { city: string }) => {
      if (!g.city) return;
      return fetch(`/api/cities?q=${encodeURIComponent(g.city)}`).then((r) => r.json()).then((j: { cities: City[] }) => {
        if (j.cities[0]) setFrom((cur) => cur ?? j.cities[0]);
      });
    }).catch(() => {});
  }, [initial?.from]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!from) return setErr("Choose where you are flying from.");
    if (!to) return setErr("Choose a city or country to fly to.");
    if (mode === "exact" && (!range?.from || !range.to)) return setErr("Pick your departure and return dates.");
    setErr("");
    const q = new URLSearchParams({ from: from.code, to: to.code, tn: to.name });
    if (mode === "exact" && range?.from && range.to) {
      q.set("dep", iso(range.from));
      q.set("ret", iso(range.to));
    } else {
      q.set("m", month);
      if (len) q.set("len", len);
    }
    router.push(`/trip-finder?${q}`);
  }

  const canSwap = !!from && !!to && to.kind !== "country";
  const pill = (on: boolean) => `shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${on ? "border-ink bg-ink text-white" : "border-mist bg-white text-ink hover:border-amber"}`;

  return (
    <form onSubmit={submit} noValidate className="rounded-3xl border border-mist bg-white p-4 shadow-xl sm:p-6">
      <div className="inline-flex rounded-full bg-cloud p-1 text-sm font-semibold" role="tablist" aria-label="Date type">
        {([["flex", "Flexible month"], ["exact", "Exact dates"]] as const).map(([k, l]) => (
          <button key={k} type="button" role="tab" aria-selected={mode === k} onClick={() => setMode(k)} className={`rounded-full px-4 py-1.5 transition ${mode === k ? "bg-white text-ink shadow" : "text-slate hover:text-ink"}`}>{l}</button>
        ))}
      </div>

      <div className="relative mt-4 grid gap-3 md:grid-cols-2">
        <CityField label="From" value={from} onPick={setFrom} placeholder="City or airport" />
        <CityField label="To" value={to} onPick={setTo} placeholder="City or country, e.g. Philippines" withCountries />
        {canSwap && (
          <button
            type="button"
            aria-label="Swap origin and destination"
            onClick={() => { setFrom(to); setTo(from); }}
            className="absolute left-1/2 top-[34px] z-10 hidden h-9 w-9 -translate-x-1/2 place-items-center rounded-full border border-mist bg-white text-ink shadow transition hover:border-amber md:grid"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7" /></svg>
          </button>
        )}
      </div>

      {mode === "flex" ? (
        <div className="mt-5 space-y-4">
          <div>
            <span className={labelCls}>Leaving in</span>
            <div className="-mx-1 mt-2 flex gap-2 overflow-x-auto px-1 pb-1" role="radiogroup" aria-label="Month">
              {months.map((m, i) => (
                <button key={m.v} type="button" role="radio" aria-checked={month === m.v} onClick={() => setMonth(m.v)} className={pill(month === m.v) + " min-w-[64px] !px-3 text-center leading-tight"}>
                  <span className="block">{m.l}</span>
                  {(i === 0 || m.l === "Jan") && <span className="block text-[10px] font-medium opacity-60">{m.y}</span>}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className={labelCls}>Trip length</span>
            <div className="-mx-1 mt-2 flex gap-2 overflow-x-auto px-1 pb-1" role="radiogroup" aria-label="Trip length">
              {LENGTHS.map(([v, l]) => (
                <button key={v} type="button" role="radio" aria-checked={len === v} onClick={() => setLen(v)} className={pill(len === v)}>{l}</button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative mt-5 max-w-md" ref={dates.ref}>
          <span className={labelCls}>Depart — Return</span>
          <button type="button" className={fieldBtn} onClick={() => dates.setOpen(!dates.open)} aria-haspopup="dialog" aria-expanded={dates.open}>
            <span className={label ? "" : "text-slate/70"}>{label || "Add dates"}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>
          </button>
          {dates.open && (
            <div role="dialog" aria-label="Choose dates" className="tj-cal absolute left-0 z-50 mt-2 w-max max-w-[calc(100vw-2rem)] rounded-2xl border border-mist bg-white p-3 shadow-2xl">
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
            </div>
          )}
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" className="rounded-xl bg-amber px-8 py-3.5 text-sm font-bold text-ink transition hover:bg-amber-deep">Find cheapest trips</button>
        <p className="text-xs text-slate">Round trips · prices in USD · from recent searches</p>
      </div>
      {err && <p role="alert" className="mt-3 text-sm font-medium text-red-600">{err}</p>}
    </form>
  );
}
