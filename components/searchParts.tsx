"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { pickerDate } from "@/lib/format";

export type City = { code: string; name: string; country: string; kind?: "country" | "everywhere" };

/** Autocomplete city field backed by /api/cities */
export function CityField({ label, value, onPick, placeholder, withCountries, compact, allowEverywhere }: { label: string; value: City | null; onPick: (c: City | null) => void; placeholder: string; withCountries?: boolean; compact?: boolean; allowEverywhere?: boolean }) {
  const t = useTranslations("form");
  const locale = useLocale();
  const [text, setText] = useState("");
  const [list, setList] = useState<City[]>([]);
  const [open, setOpen] = useState(false);
  const everywhereCity: City = { code: "", name: t("everywhere"), country: "", kind: "everywhere" };

  useEffect(() => {
    if (value || text.trim().length < 2) return setList([]);
    const t = setTimeout(() => {
      fetch(`/api/cities?q=${encodeURIComponent(text.trim())}${withCountries ? "&countries=1" : ""}&locale=${locale}`)
        .then((r) => r.json())
        .then((j: { cities: City[] }) => setList(j.cities))
        .catch(() => setList([]));
    }, 180);
    return () => clearTimeout(t);
  }, [text, value, withCountries, locale]);

  return (
    <div className="relative">
      <label className="block font-mono text-[10px] uppercase tracking-widest text-slate">{label}</label>
      <input
        value={value ? (value.kind === "everywhere" ? `\u{1F30D} ${value.name}` : value.kind === "country" ? `${value.name} - ${t("anyCity")}` : `${value.name} (${value.code})`) : text}
        onChange={(e) => {
          onPick(null);
          setText(e.target.value);
          setOpen(true);
        }}
        onFocus={(e) => {
          setOpen(true);
          if (value) e.currentTarget.select();
        }}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder={placeholder}
        autoComplete="off"
        className={`${compact ? "mt-0.5 rounded-lg py-2" : "mt-1 rounded-xl py-3"} w-full border border-mist bg-white px-3 text-sm font-medium text-ink outline-none transition focus:border-amber`}
      />
      {open && (allowEverywhere || (!value && list.length > 0)) && (
        <ul className="absolute z-50 mt-1 w-full overflow-hidden rounded-xl border border-mist bg-white shadow-xl">
          {allowEverywhere && (
            <li>
              <button
                type="button"
                data-everywhere
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onPick(everywhereCity);
                  setText("");
                  setOpen(false);
                }}
                aria-label={`${t("everywhere")}, ${t("everywhereSubtitle")}`}
                className="flex w-full items-center justify-between gap-2 px-3 py-1.5 text-left text-sm hover:bg-cloud"
              >
                <span className="flex items-center gap-2 text-ink">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>
                  <bdi>{t("everywhere")}</bdi>
                </span>
                <span className="font-mono text-xs text-slate">{t("everywhereSubtitle")}</span>
              </button>
            </li>
          )}
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
                className="flex w-full items-center justify-between px-3 py-1.5 text-left text-sm hover:bg-cloud"
              >
                <span className="text-ink"><bdi>{c.name}</bdi> <span dir="ltr" className="text-slate">({c.code})</span></span>
                <span className="font-mono text-xs text-slate">{c.kind === "country" ? t("country") : c.code}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export const two = (n: number) => String(n).padStart(2, "0");
export const ddmm = (d: Date) => two(d.getDate()) + two(d.getMonth() + 1);
export const fmt = (d: Date | undefined, locale = "en") => (d ? pickerDate(d, locale) : "");

/** Closes a popover when the user clicks outside of it */
export function usePopover() {
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

export const fieldBtn =
  "mt-1 flex w-full items-center justify-between gap-2 rounded-xl border border-mist bg-white px-3 py-1.5 text-left text-sm font-medium text-ink outline-none transition hover:border-slate/40 focus:border-amber";
export const labelCls = "block font-mono text-[10px] uppercase tracking-widest text-slate";

export function Stepper({ label, hint, value, min, max, onChange }: { label: string; hint: string; value: number; min: number; max: number; onChange: (n: number) => void }) {
  const t = useTranslations("form");
  const btn = "grid h-10 w-10 place-items-center rounded-full border border-mist text-lg leading-none text-ink transition hover:border-amber disabled:cursor-not-allowed disabled:opacity-30";
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-sm font-semibold text-ink">{label}</p>
        <p className="text-xs text-slate">{hint}</p>
      </div>
      <div className="flex items-center gap-2">
        <button type="button" className={btn} disabled={value <= min} onClick={() => onChange(value - 1)} aria-label={t("fewer", { label })}>−</button>
        <span className="w-4 text-center text-sm font-bold text-ink" dir="ltr">{value}</span>
        <button type="button" className={btn} disabled={value >= max} onClick={() => onChange(value + 1)} aria-label={t("more", { label })}>+</button>
      </div>
    </div>
  );
}

import { ar, nl, enGB, es, fr, de, it, pt, tr, ru, pl, faIR, he } from "react-day-picker/locale";

const DP = { ar, nl, es, fr, de, it, pt, tr, ru, pl, fa: faIR, he } as const;

/** Calendar language and first weekday for the current site language. */
export function dayPickerLocale(locale: string) {
  return { locale: DP[locale as keyof typeof DP] ?? enGB, weekStartsOn: (locale === "ar" || locale === "fa" ? 6 : 1) as 0 | 1 | 6 };
}
