"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { pickerDate } from "@/lib/format";

export type City = { code: string; name: string; country: string; kind?: "country" | "everywhere" };
type CountryGroup = { code: string; name: string; cities: City[]; afterExact?: number };
type Option = { key: string; label: string; code: string; country: string; pick: City; kind: "everywhere" | "group" | "groupCity" | "city" };

/** Autocomplete city field backed by /api/cities */
export function CityField({ label, value, onPick, placeholder, withCountries, compact, allowEverywhere, onTyped, hideCode }: { label: string; value: City | null; onPick: (c: City | null) => void; placeholder: string; withCountries?: boolean; compact?: boolean; allowEverywhere?: boolean; onTyped?: (s: string) => void; hideCode?: boolean }) {
  const t = useTranslations("form");
  const locale = useLocale();
  const uid = useId();
  const [text, setText] = useState("");
  const [list, setList] = useState<City[]>([]);
  const [group, setGroup] = useState<CountryGroup | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const everywhereCity: City = { code: "", name: t("everywhere"), country: "", kind: "everywhere" };

  useEffect(() => {
    if (value || text.trim().length < 2) {
      setList([]);
      setGroup(null);
      setActive(-1);
      return;
    }
    const timer = setTimeout(() => {
      fetch(`/api/cities?v=2&q=${encodeURIComponent(text.trim())}${withCountries ? "&countries=1" : ""}&locale=${locale}`)
        .then((r) => r.json())
        .then((j: { cities: City[]; country?: CountryGroup }) => {
          setList(j.cities ?? []);
          setGroup(withCountries ? null : (j.country ?? null));
          setActive(-1);
        })
        .catch(() => {
          setList([]);
          setGroup(null);
          setActive(-1);
        });
    }, 180);
    return () => clearTimeout(timer);
  }, [text, value, withCountries, locale]);

  const options = useMemo<Option[]>(() => {
    const out: Option[] = [];
    if (allowEverywhere) {
      out.push({ key: "everywhere", label: t("everywhere"), code: "", country: "", pick: everywhereCity, kind: "everywhere" });
    }
    const exact = group?.afterExact ?? 0;
    const cityOption = (c: City, key: string, kind: Option["kind"]): Option => ({ key, label: c.name, code: c.code, country: c.country, pick: c, kind });
    list.slice(0, exact).forEach((c, i) => out.push(cityOption(c, `exact-${i}`, "city")));
    if (group && group.cities.length) {
      out.push({ key: `group-${group.code}`, label: group.name, code: group.code, country: "", pick: group.cities[0], kind: "group" });
      group.cities.forEach((c, i) => out.push(cityOption(c, `group-${group.code}-${i}`, "groupCity")));
    }
    list.slice(exact).forEach((c, i) => out.push(cityOption(c, `city-${i}`, "city")));
    return out;
  }, [allowEverywhere, everywhereCity, group, list, t]);

  useEffect(() => {
    if (active >= options.length) setActive(-1);
  }, [active, options.length]);

  const choose = (o: Option) => {
    onPick(o.pick);
    setText("");
    setList([]);
    setGroup(null);
    setActive(-1);
    setOpen(false);
  };

  const onKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setOpen(false);
      setActive(-1);
      return;
    }
    if (options.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (i + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (i <= 0 ? options.length - 1 : i - 1));
    } else if (e.key === "Enter" && open && active >= 0) {
      e.preventDefault();
      choose(options[active]);
    }
  };

  const show = open && (allowEverywhere || options.length > 0);
  const listId = `${uid}-listbox`;

  return (
    <div className="relative">
      <label className="block font-mono text-[10px] uppercase tracking-widest text-slate">{label}</label>
      <input
        value={value ? (value.kind === "everywhere" ? `\u{1F30D} ${value.name}` : value.kind === "country" ? `${value.name} - ${t("anyCity")}` : hideCode ? value.name : `${value.name} (${value.code})`) : text}
        onChange={(e) => {
          onPick(null);
          setText(e.target.value);
          onTyped?.(e.target.value);
          setActive(-1);
          setOpen(true);
        }}
        onFocus={(e) => {
          setOpen(true);
          if (value) e.currentTarget.select();
        }}
        onBlur={() => {
          setTimeout(() => {
            setOpen(false);
            setActive(-1);
          }, 150);
        }}
        onKeyDown={onKeyDown}
        role="combobox"
        aria-expanded={show}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={show && active >= 0 ? `${uid}-opt-${active}` : undefined}
        placeholder={placeholder}
        autoComplete="off"
        className={`${compact ? "mt-0.5 rounded-lg py-2" : "mt-1 rounded-xl py-3"} w-full border border-mist bg-white px-3 text-sm font-medium text-ink outline-none transition focus:border-amber`}
      />
      {show && (
        <ul id={listId} role="listbox" aria-label={label} className="absolute z-50 mt-1 max-h-72 w-full overflow-hidden overflow-y-auto rounded-xl border border-mist bg-white shadow-xl">
          {options.map((o, i) => (
            <li
              key={o.key}
              id={`${uid}-opt-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseEnter={() => setActive(i)}
            >
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(o)}
                className={`flex w-full min-w-0 items-center justify-between gap-2 px-3 py-1.5 text-left text-sm hover:bg-cloud ${i === active ? "bg-cloud" : ""} ${o.kind === "group" ? "bg-cloud/70" : ""} ${o.kind === "groupCity" ? "ps-7" : ""}`}
              >
                <span className="flex min-w-0 items-center gap-2 text-ink">
                  {o.kind === "everywhere" && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>
                  )}
                  <bdi className={`truncate ${o.kind === "group" ? "font-semibold" : ""}`}>{o.label}</bdi>
                  {o.code && <span dir="ltr" className="shrink-0 font-mono text-xs text-slate">({o.code})</span>}
                </span>
                {o.kind !== "everywhere" && (
                  <span className="shrink-0 font-mono text-xs text-slate">
                    {o.kind === "group" || o.pick.kind === "country" ? t("country") : (o.country || o.code)}
                  </span>
                )}
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
  "mt-1 flex w-full items-center justify-between gap-2 rounded-xl border border-mist bg-white px-3 py-3 text-left text-sm font-medium text-ink outline-none transition hover:border-slate/40 focus:border-amber";
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
