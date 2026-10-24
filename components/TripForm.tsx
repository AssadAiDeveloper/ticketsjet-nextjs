"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CityField, labelCls, type City } from "@/components/searchParts";

export type TripInitial = { from?: City | null; to?: City | null; mode?: "flex" | "exact"; month?: string; len?: string; dep?: string; ret?: string };

const LENGTHS = [["", "Any length"], ["7", "About 1 week"], ["10", "About 10 days"], ["14", "About 2 weeks"], ["21", "About 3 weeks"], ["30", "About 1 month"]];
const input = "mt-1 w-full rounded-xl border border-mist bg-white px-3 py-3 text-sm font-medium text-ink outline-none transition focus:border-amber";

function monthOptions() {
  const out: { v: string; l: string }[] = [];
  const d = new Date();
  d.setDate(1);
  for (let i = 0; i < 12; i++) {
    out.push({ v: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`, l: d.toLocaleDateString("en-GB", { month: "long", year: "numeric" }) });
    d.setMonth(d.getMonth() + 1);
  }
  return out;
}

/** Trip finder form: where from, where to (city or country), when (flexible month or exact dates), how long. */
export default function TripForm({ initial }: { initial?: TripInitial }) {
  const router = useRouter();
  const months = monthOptions();
  const today = new Date().toISOString().slice(0, 10);
  const [from, setFrom] = useState<City | null>(initial?.from ?? null);
  const [to, setTo] = useState<City | null>(initial?.to ?? null);
  const [mode, setMode] = useState<"flex" | "exact">(initial?.mode ?? "flex");
  const [month, setMonth] = useState(initial?.month ?? months[1].v);
  const [len, setLen] = useState(initial?.len ?? "");
  const [dep, setDep] = useState(initial?.dep ?? "");
  const [ret, setRet] = useState(initial?.ret ?? "");
  const [err, setErr] = useState("");

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
    if (mode === "exact" && (!dep || !ret || ret <= dep)) return setErr("Pick a departure date and a later return date.");
    setErr("");
    const q = new URLSearchParams({ from: from.code, to: to.code, tn: to.name });
    if (mode === "exact") {
      q.set("dep", dep);
      q.set("ret", ret);
    } else {
      q.set("m", month);
      if (len) q.set("len", len);
    }
    router.push(`/trip-finder?${q}`);
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-2xl border border-mist bg-white p-4 shadow-sm sm:p-5">
      <div className="grid gap-3 md:grid-cols-2">
        <CityField label="From" value={from} onPick={setFrom} placeholder="City or airport" />
        <CityField label="To" value={to} onPick={setTo} placeholder="City or country, e.g. Philippines" withCountries />
      </div>

      <div className="mt-4 inline-flex rounded-full border border-mist p-0.5 text-sm font-semibold" role="tablist" aria-label="Date type">
        {([["flex", "Flexible month"], ["exact", "Exact dates"]] as const).map(([k, l]) => (
          <button key={k} type="button" role="tab" aria-selected={mode === k} onClick={() => setMode(k)} className={`rounded-full px-4 py-1.5 transition ${mode === k ? "bg-ink text-white" : "text-slate hover:text-ink"}`}>{l}</button>
        ))}
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-[1fr_1fr_auto] md:items-end">
        {mode === "flex" ? (
          <>
            <label className="block"><span className={labelCls}>Leaving in</span>
              <select value={month} onChange={(e) => setMonth(e.target.value)} className={input}>
                {months.map((m) => <option key={m.v} value={m.v}>{m.l}</option>)}
              </select>
            </label>
            <label className="block"><span className={labelCls}>Trip length</span>
              <select value={len} onChange={(e) => setLen(e.target.value)} className={input}>
                {LENGTHS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </label>
          </>
        ) : (
          <>
            <label className="block"><span className={labelCls}>Depart</span>
              <input type="date" min={today} value={dep} onChange={(e) => setDep(e.target.value)} className={input} />
            </label>
            <label className="block"><span className={labelCls}>Return</span>
              <input type="date" min={dep || today} value={ret} onChange={(e) => setRet(e.target.value)} className={input} />
            </label>
          </>
        )}
        <button type="submit" className="rounded-xl bg-amber px-6 py-3 font-semibold text-ink transition hover:brightness-105">Find cheapest trips</button>
      </div>
      {err && <p role="alert" className="mt-3 text-sm font-medium text-red-600">{err}</p>}
    </form>
  );
}
