"use client";

import { useEffect, useState } from "react";

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

const ddmm = (iso: string) => iso.slice(8, 10) + iso.slice(5, 7); // YYYY-MM-DD → DDMM

/**
 * Home-page flight search. It doesn't show results itself: it sends the visitor to /flights,
 * where the search widget reads the route from the URL, runs the search and shows the results.
 */
export default function HeroFlightForm() {
  const [trip, setTrip] = useState<"round" | "oneway">("round");
  const [from, setFrom] = useState<City | null>(null);
  const [to, setTo] = useState<City | null>(null);
  const [depart, setDepart] = useState("");
  const [back, setBack] = useState("");
  const [pax, setPax] = useState(1);
  const [err, setErr] = useState("");
  const today = new Date().toISOString().slice(0, 10);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!from || !to) return setErr("Choose your departure and arrival cities from the list.");
    if (!depart) return setErr("Pick a departure date.");
    if (trip === "round" && !back) return setErr("Pick a return date, or switch to one way.");
    if (trip === "round" && back < depart) return setErr("The return date is before the departure date.");
    setErr("");

    // Search code in the widget's own format: ORIGIN DDMM DEST [DDMM] PASSENGERS
    const code = `${from.code}${ddmm(depart)}${to.code}${trip === "round" ? ddmm(back) : ""}${pax}`;
    const q = new URLSearchParams({ flightSearch: code, origin_iata: from.code, destination_iata: to.code, depart_date: depart, adults: String(pax) });
    if (trip === "round") q.set("return_date", back);
    // full page load so the search widget on /flights starts fresh
    window.location.href = `/flights?${q.toString()}`;
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

      <div className="grid gap-3 md:grid-cols-[1.25fr_1.25fr_1fr_1fr_0.7fr_auto] md:items-end">
        <CityField label="From" value={from} onPick={setFrom} placeholder="City or airport" />
        <CityField label="To" value={to} onPick={setTo} placeholder="City or airport" />
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-slate" htmlFor="hf-dep">Depart</label>
          <input id="hf-dep" type="date" min={today} value={depart} onChange={(e) => { setDepart(e.target.value); if (back && back < e.target.value) setBack(""); }} className="mt-1 w-full rounded-xl border border-mist bg-white px-3 py-3 text-sm font-medium text-ink outline-none focus:border-amber" />
        </div>
        <div className={trip === "oneway" ? "opacity-40" : ""}>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-slate" htmlFor="hf-ret">Return</label>
          <input id="hf-ret" type="date" min={depart || today} value={back} disabled={trip === "oneway"} onChange={(e) => setBack(e.target.value)} className="mt-1 w-full rounded-xl border border-mist bg-white px-3 py-3 text-sm font-medium text-ink outline-none focus:border-amber disabled:cursor-not-allowed" />
        </div>
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-slate" htmlFor="hf-pax">Travellers</label>
          <select id="hf-pax" value={pax} onChange={(e) => setPax(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-mist bg-white px-3 py-3 text-sm font-medium text-ink outline-none focus:border-amber">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="rounded-xl bg-amber px-6 py-3 text-sm font-bold text-ink transition hover:bg-amber-deep md:py-[13px]">
          Search flights
        </button>
      </div>
      {err && <p role="alert" className="mt-3 text-sm font-medium text-red-600">{err}</p>}
    </form>
  );
}
