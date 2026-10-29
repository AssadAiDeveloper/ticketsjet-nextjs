"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LOCALES, LOCALE_NAMES, type Locale } from "@/i18n/routing";
import { CURRENCIES, type Currency } from "@/lib/currency";
import { useCurrency } from "@/components/CurrencyProvider";

/** Header button + regional-settings dialog (language and currency, applied on Save). Lists come from LOCALES / CURRENCIES. */
const POPULAR = ["USD", "EUR", "GBP"] as const;

export default function LocaleSwitcher() {
  const t = useTranslations("switcher");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Locale>(locale);
  const [cur, setCur] = useState<Currency>(currency);
  const [langOpen, setLangOpen] = useState(false);
  const [curOpen, setCurOpen] = useState(false);
  const id = useId();

  function show() {
    setLang(locale);
    setCur(currency);
    setOpen(true);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  function save(nextLang: Locale = lang) {
    setCurrency(cur);
    setOpen(false);
    if (nextLang !== locale) {
      const qs = window.location.search; // keep the current search (e.g. ?flightSearch=…)
      router.replace((qs ? `${pathname}${qs}` : pathname) as never, { locale: nextLang });
    }
  }

  const names = new Intl.DisplayNames([lang], { type: "currency" });
  const cname = (c: string) => { try { return names.of(c) ?? ""; } catch { return ""; } };
  const field = "w-full appearance-none rounded-lg border border-slate/40 bg-white px-3 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-amber";
  const chevron = <svg className="pointer-events-none absolute end-3 top-1/2 h-3 w-3 -translate-y-1/2 text-ink" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 10l5 6 5-6z" /></svg>;

  return (
    <>
      <button
        type="button"
        onClick={show}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={t("label")}
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" /></svg>
        <span dir="ltr">{locale.toUpperCase()} · {currency}</span>
      </button>

      {open && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4" onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div role="dialog" aria-modal="true" aria-labelledby={`${id}-t`} className="w-full max-w-[400px] max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 text-ink shadow-2xl">
            <div className="flex items-center justify-between">
              <button type="button" onClick={() => setOpen(false)} aria-label={t("cancel")} className="flex h-8 w-8 items-center justify-center rounded border border-ink/70 hover:bg-cloud">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19" /></svg>
              </button>
              <h2 id={`${id}-t`} className="font-display text-base font-bold">{t("title")}</h2>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between gap-3">
                {locale !== "en" || lang !== "en" ? (
                  <button type="button" lang="en" dir="ltr" onClick={() => save("en")} className="text-sm underline underline-offset-4 hover:text-ink/70">{t("switchToEnglish")}</button>
                ) : <span />}
                <label htmlFor={`${id}-l`} className="flex items-center gap-1.5 text-sm font-semibold">
                  {t("language")}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H9l-4 4v-4H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" /></svg>
                </label>
              </div>
              <div className="relative mt-2">
                <div className="relative"><button id={id + "-l"} type="button" onClick={() => { setLangOpen((o) => !o); setCurOpen(false); }} aria-haspopup="listbox" aria-expanded={langOpen} className={field + " text-start"}>
                  <span lang={lang}>{LOCALE_NAMES[lang]}</span>
                </button>
                {chevron}</div>
                {langOpen && (
                  <ul role="listbox" className="mt-1 max-h-52 overflow-y-auto rounded-xl border border-mist bg-white p-1.5 shadow-xl">
                    {LOCALES.map((l) => (
                      <li key={l} role="option" aria-selected={l === lang}>
                        <button type="button" lang={l} onClick={() => { setLang(l); setLangOpen(false); }} className={"flex w-full items-center justify-between rounded-lg px-3 py-2 text-start text-sm " + (l === lang ? "bg-amber/20 font-semibold" : "hover:bg-cloud")}>
                          <span>{LOCALE_NAMES[l]}</span>
                          {l === lang && <span aria-hidden>✓</span>}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor={`${id}-c`} className="flex items-center justify-end gap-1.5 text-sm font-semibold">
                {t("currency")}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 9.5c0 1.7 3.6 3 8 3s8-1.3 8-3V13c0 1.7-3.6 3-8 3s-8-1.3-8-3V9.5Zm0 6.5c0 1.7 3.6 3 8 3s8-1.3 8-3v3c0 1.7-3.6 3-8 3s-8-1.3-8-3v-3Z" /></svg>
              </label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {POPULAR.map((c) => (
                  <button key={c} type="button" onClick={() => { setCur(c as Currency); setCurOpen(false); }} aria-pressed={cur === c} className={"rounded-lg border px-3 py-2 text-sm font-semibold " + (cur === c ? "border-amber bg-amber/15 text-ink" : "border-mist bg-white text-ink hover:bg-cloud")}>{c}</button>
                ))}
              </div>
              <div className="relative mt-2">
                <div className="relative"><button id={id + "-c"} type="button" onClick={() => { setCurOpen((o) => !o); setLangOpen(false); }} aria-haspopup="listbox" aria-expanded={curOpen} className={field + " text-start"}>
                  <span>{cur}{cname(cur) ? " - " + cname(cur) : ""}</span>
                </button>
                {chevron}</div>
                {curOpen && (
                  <ul role="listbox" className="mt-1 max-h-52 overflow-y-auto rounded-xl border border-mist bg-white p-1.5 shadow-xl">
                    {[...POPULAR, ...CURRENCIES.filter((c) => !(POPULAR as readonly string[]).includes(c))].map((c) => (
                      <li key={c} role="option" aria-selected={c === cur}>
                        <button type="button" onClick={() => { setCur(c as Currency); setCurOpen(false); }} className={"flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-start text-sm " + (c === cur ? "bg-amber/20 font-semibold" : "hover:bg-cloud")}>
                          <span>{c}{cname(c) ? " - " + cname(c) : ""}</span>
                          {c === cur && <span aria-hidden>✓</span>}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <p className="mt-2 text-[11px] leading-snug text-slate">{t("note")}</p>
            </div>

            <button type="button" onClick={() => save()} className="mt-6 w-full rounded-lg bg-ink px-4 py-3 text-sm font-bold text-white hover:bg-ink-2">{t("save")}</button>
            <button type="button" onClick={() => setOpen(false)} className="mt-2 w-full rounded-lg bg-mist px-4 py-3 text-sm font-bold text-ink hover:brightness-95">{t("cancel")}</button>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
