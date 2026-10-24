"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PHOTOS } from "@/lib/destinations";
import type { Deal } from "@/lib/deals";

const GRADS = ["from-[#16324a] to-[#0b1b2b]", "from-[#3b2f5c] to-[#0b1b2b]", "from-[#0f4a55] to-[#0b1b2b]", "from-[#5a3a1c] to-[#0b1b2b]", "from-[#1f4d3a] to-[#0b1b2b]", "from-[#4a2438] to-[#0b1b2b]"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const when = (iso: string | null) => (iso ? `${Number(iso.slice(8, 10))} ${MONTHS[Number(iso.slice(5, 7)) - 1]}` : null);

export default function DealsGrid({ origin, items }: { origin: { code: string; name: string }; items: Deal[] }) {
  const [filter, setFilter] = useState<string>("all"); // all | direct | YYYY-MM
  const months = useMemo(() => [...new Set(items.map((d) => d.month).filter((m): m is string => !!m))].sort().slice(0, 3), [items]);
  const shown = items.filter((d) => (filter === "all" ? true : filter === "direct" ? d.stops === 0 : d.month === filter));
  const chips = [
    { id: "all", label: "All" },
    { id: "direct", label: "Direct only" },
    ...months.map((m) => ({ id: m, label: `${MONTHS_LONG[Number(m.slice(5, 7)) - 1]}` })),
  ];

  return (
    <section aria-label={`Flight deals from ${origin.name}`}>
      <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">Flight deals from {origin.name}</h2>
      <p className="mt-2 max-w-2xl text-sm text-slate">Lowest return fares found recently. Prices change often — the search shows today&apos;s price.</p>

      <div role="group" aria-label="Filter deals" className="mt-5 flex flex-wrap gap-2">
        {chips.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={filter === c.id}
            onClick={() => setFilter(c.id)}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${filter === c.id ? "border-ink bg-ink text-white" : "border-mist bg-white text-slate hover:border-amber hover:text-ink"}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-mist bg-white p-6 text-sm text-slate">No deals match this filter right now. Try another one.</p>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((d, i) => {
            const photo = PHOTOS[d.code];
            return (
              <li key={d.code}>
                <Link
                  href={d.href}
                  className={`group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${GRADS[i % GRADS.length]} p-5 text-white shadow-md transition hover:-translate-y-1 hover:shadow-xl`}
                  style={photo ? { backgroundImage: `linear-gradient(to top, rgba(11,27,43,.85), rgba(11,27,43,.1)), url(${photo})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
                >
                  <span className="flex items-start justify-between">
                    <span className="font-display select-none text-5xl font-extrabold leading-none tracking-tight text-white/10 transition group-hover:text-amber/30" aria-hidden="true">{d.code}</span>
                    {d.stops === 0 && <span className="rounded-full bg-signal/20 px-2.5 py-1 text-[11px] font-semibold text-signal">Direct</span>}
                  </span>
                  <span>
                    <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">{origin.code} → {d.code}</span>
                    <span className="font-display mt-1 block text-2xl font-bold leading-tight">{d.name}</span>
                    <span className="block text-sm text-white/60">{d.country}</span>
                    <span className="mt-3 flex items-end justify-between border-t border-white/15 pt-3">
                      <span>
                        <span className="block text-[11px] text-white/50">from</span>
                        <span className="font-display text-2xl font-extrabold text-amber">${d.price}</span>
                      </span>
                      {when(d.depart) && <span className="text-xs text-white/60">{when(d.depart)}</span>}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
