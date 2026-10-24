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

  const chip = (on: boolean) => `rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition ${on ? "border-ink bg-ink text-white" : "border-mist bg-white text-ink hover:border-amber"}`;
  const m = months.find((x) => x.v === month);
  const lenLabel = LENGTHS.find(([v]) => v === len)?.[1];
  const summary = mode === "exact" ? label : `${m ? `${m.l} ${m.y}` : ""}${len ? " · " + lenLabel : ""}`;
  const field = "mt-0.5 flex w-full items-center justify-between gap-2 rounded-lg border border-mist bg-white px-3 py-2 text-left text-sm font-medium text-ink outline-none transition hover:border-slate/40 focus:border-amber";

  return (
    <form onSubmit={submit} noValidate className="rounded-2xl border border-mist bg-white p-3 shadow-lg sm:p-4">
      <div className="relative grid gap-2 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
        <CityField label="From" value={from} onPick={setFrom} placeholder="City or airport" compact />
        <CityField label="To" value={to} onPick={setTo} placeholder="City or country" withCountries compact />

        <div className="relative" ref={dates.ref}>
          <span className={labelCls}>When</span>
          <button type="button" className={field} onClick={() => dates.setOpen(!dates.open)} aria-haspopup="dialog" aria-expanded={dates.open}>
            <span className={summary ? "truncate" : "truncate text-slate/70"}>{summary || "Add dates"}</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>
          </button>
          {dates.open && (
            <div role="dialog" aria-label="Choose when" className="tj-cal absolute right-0 z-50 mt-2 w-max max-w-[calc(100vw-2rem)] rounded-2xl border border-mist bg-white p-3 shadow-2xl">
              <div className="inline-flex rounded-full bg-cloud p-0.5 text-xs font-semibold" role="tablist" aria-label="Date type">
                {([["flex", "Flexible month"], ["exact", "Exact dates"]] as const).map(([k, l]) => (
                  <button key={k} type="button" role="tab" aria-selected={mode === k} onClick={() => setMode(k)} className={`rounded-full px-3 py-1 transition ${mode === k ? "bg-white text-ink shadow" : "text-slate hover:text-ink"}`}>{l}</button>
                ))}
              </div>
              {mode === "flex" ? (
                <div className="mt-3 w-[min(22rem,calc(100vw-4rem))]">
                  <span className={labelCls}>Leaving in</span>
                  <div className="mt-1.5 grid grid-cols-4 gap-1.5" role="radiogroup" aria-label="Month">
                    {months.map((x) => (
                      <button key={x.v} type="button" role="radio" aria-checked={month === x.v} onClick={() => setMonth(x.v)} className={chip(month === x.v) + " leading-tight"}>
                        {x.l}
                        <span className="block text-[9px] font-medium opacity-60">{x.y}</span>
                      </button>
                    ))}
                  </div>
                  <span className={labelCls + " mt-3"}>Trip length</span>
                  <div className="mt-1.5 flex flex-wrap gap-1.5" role="radiogroup" aria-label="Trip length">
                    {LENGTHS.map(([v, l]) => (
                      <button key={v} type="button" role="radio" aria-checked={len === v} onClick={() => setLen(v)} className={chip(len === v)}>{l}</button>
                    ))}
                  </div>
                  <button type="button" onClick={() => dates.setOpen(false)} className="mt-3 w-full rounded-lg bg-ink py-2 text-xs font-bold text-white transition hover:bg-ink-2">Done</button>
                </div>
              ) : (
                <div className="mt-2">
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
        </div>

        <button type="submit" className="rounded-lg bg-amber px-5 py-2 text-sm font-bold text-ink transition hover:bg-amber-deep md:py-[9px]">Search</button>
      </div>
      {err && <p role="alert" className="mt-2 text-xs font-medium text-red-600">{err}</p>}
      <p className="mt-2 text-[11px] text-slate">Round trips · USD · fares from recent searches</p>
    </form>
  );
}
