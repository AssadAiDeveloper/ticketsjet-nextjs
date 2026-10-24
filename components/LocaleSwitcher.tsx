"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LOCALES, LOCALE_NAMES, type Locale } from "@/i18n/routing";
import { CURRENCIES } from "@/lib/currency";
import { useCurrency } from "@/components/CurrencyProvider";
import { usePopover } from "@/components/searchParts";

/** Header control: language and currency in one small popover. Choices apply across the whole site. */
export default function LocaleSwitcher({ align = "end" }: { align?: "start" | "end" }) {
  const t = useTranslations("switcher");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const { currency, setCurrency } = useCurrency();
  const pop = usePopover();
  const names = new Intl.DisplayNames([locale], { type: "currency" });
  const cname = (c: string) => { try { return names.of(c) ?? c; } catch { return c; } };

  function pick(next: Locale) {
    pop.setOpen(false);
    const qs = window.location.search; // keep the current search (e.g. ?flightSearch=…)
    router.replace((qs ? `${pathname}${qs}` : pathname) as never, { locale: next });
  }

  const opt = (on: boolean) => `rounded-lg border px-2.5 py-1.5 text-sm font-semibold transition ${on ? "border-amber bg-amber text-ink" : "border-white/15 text-white/85 hover:border-white/40"}`;

  return (
    <div className="relative" ref={pop.ref}>
      <button
        type="button"
        onClick={() => pop.setOpen(!pop.open)}
        aria-haspopup="dialog"
        aria-expanded={pop.open}
        aria-label={t("label")}
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" /></svg>
        <span dir="ltr">{locale.toUpperCase()} · {currency}</span>
      </button>
      {pop.open && (
        <div role="dialog" aria-label={t("label")} className={`absolute top-full z-50 mt-2 w-72 rounded-2xl border border-white/10 bg-ink-2 p-4 shadow-2xl ${align === "end" ? "end-0" : "start-0"}`}>
          <p className="font-mono text-[10px] uppercase tracking-widest text-amber">{t("language")}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {LOCALES.map((l) => (
              <button key={l} type="button" onClick={() => pick(l)} className={opt(l === locale)} lang={l}>{LOCALE_NAMES[l]}</button>
            ))}
          </div>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-amber">{t("currency")}</p>
          <div className="mt-2 grid grid-cols-4 gap-1.5">
            {CURRENCIES.map((c) => (
              <button key={c} type="button" title={cname(c)} onClick={() => setCurrency(c)} className={opt(c === currency) + " !px-1 text-center text-xs"}>{c}</button>
            ))}
          </div>
          <p className="mt-3 text-[11px] leading-snug text-white/50">{t("note")}</p>
        </div>
      )}
    </div>
  );
}
