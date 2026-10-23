"use client";

import { useState } from "react";
import TpWidget from "@/components/TpWidget";
import { WlSearchForm } from "@/components/WhiteLabel";
import { WIDGETS } from "@/lib/config";

const tabs = [
  { id: "flights", label: "Flights", icon: "M21 15.5 13.5 12V5.75a1.5 1.5 0 0 0-3 0V12L3 15.5v2l7.5-2v3.75L8.5 21v1.25L12 21.5l3.5.75V21l-2-1.75V15.5l7.5 2v-2Z" },
  { id: "cars", label: "Cars", icon: "M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11m-14 0h14a2 2 0 0 1 2 2v4h-2.5a2 2 0 1 1-4 0h-5a2 2 0 1 1-4 0H3v-4a2 2 0 0 1 2-2Z" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function SearchTabs() {
  const [active, setActive] = useState<TabId>("flights");

  return (
    <div className="boarding-pass overflow-hidden">
      {/* Pass header — route strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-5 sm:px-7">
        <div role="tablist" aria-label="Search type" className="flex gap-1 rounded-xl bg-cloud p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={active === t.id}
              onClick={() => setActive(t.id)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                active === t.id ? "bg-ink text-white shadow" : "text-slate hover:text-ink"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={t.id === "flights" ? "currentColor" : "none"} stroke="currentColor" strokeWidth={t.id === "flights" ? 0 : 2} strokeLinejoin="round" aria-hidden="true">
                <path d={t.icon} />
              </svg>
              {t.label}
            </button>
          ))}
        </div>
        <p className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-slate sm:block">
          Boarding pass · TJ-{new Date().getFullYear()}
        </p>
      </div>

      <div className="px-5 pb-2 pt-4 sm:px-7">
        {/* نموذج الوايت ليبل يبقى مركّبًا دائمًا (يُخفى فقط) حتى لا يفقد السكربت الحاوية */}
        <div className={active === "flights" ? "" : "hidden"}>
          <WlSearchForm />
        </div>
        {active === "cars" && <TpWidget src={WIDGETS.carsWl} minHeight={230} />}
      </div>

      {/* Perforated stub */}
      <div className="pass-perforation flex flex-wrap items-center justify-between gap-2 bg-cloud/60 px-5 py-3.5 sm:px-7">
        <p className="text-xs font-medium text-slate">
          <span className="font-semibold text-signal">No booking fees.</span> You book directly with the airline or provider.
        </p>
        <p className="font-mono text-[11px] tracking-[0.25em] text-slate/70" aria-hidden="true">|||| 2718 41 TJ ||||</p>
      </div>
    </div>
  );
}
