"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import TpWidget from "@/components/TpWidget";
import HeroFlightForm from "@/components/HeroFlightForm";
import StaysForm from "@/components/StaysForm";
import { WIDGETS } from "@/lib/config";

const tabs = [
  { id: "flights", icon: "M21 15.5 13.5 12V5.75a1.5 1.5 0 0 0-3 0V12L3 15.5v2l7.5-2v3.75L8.5 21v1.25L12 21.5l3.5.75V21l-2-1.75V15.5l7.5 2v-2Z" },
  { id: "stays", icon: "M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 15h18M7 9V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" },
  { id: "cars", icon: "M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11m-14 0h14a2 2 0 0 1 2 2v4h-2.5a2 2 0 1 1-4 0h-5a2 2 0 1 1-4 0H3v-4a2 2 0 0 1 2-2Z" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function SearchTabs() {
  const t = useTranslations("tabs");
  const [active, setActive] = useState<TabId>("flights");

  return (
    <div className="boarding-pass">
      {/* Pass header — route strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-5 sm:px-7">
        <div role="tablist" aria-label={t("aria")} className="flex flex-wrap gap-1 rounded-xl bg-cloud p-1 min-w-0 w-full sm:w-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={active === tab.id}
              onClick={() => setActive(tab.id)}
              className={`flex min-w-0 flex-1 items-center justify-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold transition sm:flex-none sm:px-4 ${
                active === tab.id ? "bg-ink text-white shadow" : "text-slate hover:text-ink"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={tab.id === "flights" ? "currentColor" : "none"} stroke="currentColor" strokeWidth={tab.id === "flights" ? 0 : 2} strokeLinejoin="round" aria-hidden="true">
                <path d={tab.icon} />
              </svg>
              {t(tab.id)}
            </button>
          ))}
        </div>
        <p className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-slate sm:block">
          {t("pass")} · TJ-{new Date().getFullYear()}
        </p>
      </div>

      <div className="px-5 pb-2 pt-4 sm:px-7">
        {active === "flights" && <HeroFlightForm />}
        {active === "stays" && <StaysForm />}
        {active === "cars" && (
          <>
            <TpWidget src={WIDGETS.carsSearch} minHeight={150} />
            <p className="pb-2 text-xs text-slate">{t("carsNote")}</p>
          </>
        )}
      </div>

      {/* Perforated stub */}
      <div className="pass-perforation rounded-b-[20px] flex flex-wrap items-center justify-between gap-2 bg-cloud/60 px-5 py-3.5 sm:px-7">
        <p className="text-xs font-medium text-slate">
          <span className="font-semibold text-signal">{t("noFees")}</span> {t("directly")}
        </p>
        <p className="font-mono text-[11px] tracking-[0.25em] text-slate/70" aria-hidden="true">|||| 2718 41 TJ ||||</p>
      </div>
    </div>
  );
}
