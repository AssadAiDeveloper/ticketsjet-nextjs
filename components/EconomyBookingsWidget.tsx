"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useLocale, useTranslations } from "next-intl";
import { ECONOMYBOOKINGS_WIDGET_URL, ECONOMYBOOKINGS_FALLBACK_URL } from "@/lib/affiliates";

const SUPPORTED_LANGS = new Set(["en", "pl"]);

const EN_KEYS = ["Pick-up location", "Drop-off location", "Pick-up date", "Drop-off date", "Same drop-off location", "Driver's age between 30-65", "Search", "Airport, city or station", "Time"];

// The widget only ships English and Polish, so for the other languages we translate its labels in place.
const LABELS: Record<string, string[]> = {
  ar: ["موقع الاستلام", "موقع التسليم", "تاريخ الاستلام", "تاريخ التسليم", "التسليم في نفس الموقع", "عمر السائق بين 30 و65", "بحث", "مطار أو مدينة أو محطة", "الوقت"],
  fa: ["محل تحویل خودرو", "محل بازگرداندن", "تاریخ تحویل", "تاریخ بازگرداندن", "بازگرداندن در همان محل", "سن راننده بین ۳۰ تا ۶۵", "جست‌وجو", "فرودگاه، شهر یا ایستگاه", "ساعت"],
  he: ["מקום איסוף", "מקום החזרה", "תאריך איסוף", "תאריך החזרה", "החזרה באותו מקום", "גיל הנהג בין 30 ל-65", "חיפוש", "שדה תעופה, עיר או תחנה", "שעה"],
  nl: ["Ophaallocatie", "Inleverlocatie", "Ophaaldatum", "Inleverdatum", "Inleveren op dezelfde locatie", "Leeftijd bestuurder tussen 30-65", "Zoeken", "Luchthaven, stad of station", "Tijd"],
  es: ["Lugar de recogida", "Lugar de devolución", "Fecha de recogida", "Fecha de devolución", "Devolver en el mismo lugar", "Edad del conductor entre 30 y 65", "Buscar", "Aeropuerto, ciudad o estación", "Hora"],
  fr: ["Lieu de prise en charge", "Lieu de restitution", "Date de prise en charge", "Date de restitution", "Restituer au même endroit", "Âge du conducteur entre 30 et 65 ans", "Rechercher", "Aéroport, ville ou gare", "Heure"],
  de: ["Abholort", "Rückgabeort", "Abholdatum", "Rückgabedatum", "Rückgabe am selben Ort", "Fahreralter zwischen 30 und 65", "Suchen", "Flughafen, Stadt oder Bahnhof", "Zeit"],
  it: ["Luogo di ritiro", "Luogo di riconsegna", "Data di ritiro", "Data di riconsegna", "Riconsegna nello stesso luogo", "Età del conducente tra 30 e 65 anni", "Cerca", "Aeroporto, città o stazione", "Ora"],
  pt: ["Local de levantamento", "Local de devolução", "Data de levantamento", "Data de devolução", "Devolver no mesmo local", "Idade do condutor entre 30 e 65", "Pesquisar", "Aeroporto, cidade ou estação", "Hora"],
  tr: ["Teslim alma yeri", "Teslim etme yeri", "Teslim alma tarihi", "Teslim etme tarihi", "Aynı yerde teslim et", "Sürücü yaşı 30-65 arası", "Ara", "Havalimanı, şehir veya istasyon", "Saat"],
  ru: ["Место получения", "Место возврата", "Дата получения", "Дата возврата", "Вернуть в том же месте", "Возраст водителя 30–65 лет", "Поиск", "Аэропорт, город или станция", "Время"],
};

function localizeWidget(host: HTMLElement, locale: string) {
  const labels = LABELS[locale];
  if (!labels) return;
  const map = new Map<string, string>(EN_KEYS.map((k, i) => [k, labels[i]]));
  const tr = (s: string) => {
    const t = s.trim();
    const hit = map.get(t);
    if (hit) return s.replace(t, hit);
    return s
      .replace("Pick-up date", labels[2])
      .replace("Drop-off date", labels[3])
      .replace(/Time$/, labels[8]);
  };
  const apply = (root: ShadowRoot) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let n: Node | null;
    while ((n = walker.nextNode())) {
      const v = n.nodeValue ?? "";
      if (!v.trim() || /^\s*\d\d:\d\d\s*$/.test(v)) continue;
      const out = map.get(v.trim()) ? tr(v) : v;
      if (out !== v) n.nodeValue = out;
    }
    root.querySelectorAll("[placeholder],[aria-label],[title]").forEach((el) => {
      for (const a of ["placeholder", "aria-label", "title"]) {
        const v = el.getAttribute(a);
        if (!v) continue;
        const out = tr(v);
        if (out !== v) el.setAttribute(a, out);
      }
    });
  };
  let tries = 0;
  const iv = window.setInterval(() => {
    const sr = host.shadowRoot;
    if (sr) {
      window.clearInterval(iv);
      apply(sr);
      new MutationObserver(() => apply(sr)).observe(sr, { childList: true, subtree: true, characterData: true });
    } else if (++tries > 60) {
      window.clearInterval(iv);
    }
  }, 150);
}

export default function EconomyBookingsWidget() {
  const t = useTranslations("cars");
  const locale = useLocale();
  const widgetLang = SUPPORTED_LANGS.has(locale) ? locale : "en";
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const initialized = useRef(false);

  const initWidget = () => {
    if (initialized.current) return;
    const EB = (window as any).EBWidget;
    if (!EB || !containerRef.current) return;
    try {
      EB.init({
        container: "#eb-widget",
        trackingLink: ECONOMYBOOKINGS_FALLBACK_URL,
        defaults: { lang: widgetLang },
        theme: {
          layout: "horizontal",
          backgroundColor: "#ffffff",
          borderColor: "transparent",
          borderRadius: "12px",
          textColor: "#0b1b2b",
          textFontFamily: "Inter, sans-serif",
          textFontWeight: "400",
          textFontSize: "14px",
          fieldTextColor: "#0b1b2b",
          fieldBackgroundColor: "#ffffff",
          fieldBorderColor: "#e2e8f0",
          fieldBorderRadius: "12px",
          fieldFontFamily: "Inter, sans-serif",
          buttonTextColor: "#0b1b2b",
          buttonBackgroundColor: "#fbbf24",
          buttonBorderColor: "#fbbf24",
          buttonBorderRadius: "8px",
          buttonFontFamily: "Inter, sans-serif",
          buttonFontWeight: "700",
        },
      });
      initialized.current = true;
      localizeWidget(containerRef.current, locale);
      setLoaded(true);
    } catch (e) {
      console.warn("[EconomyBookingsWidget] init failed:", e);
      setFailed(true);
    }
  };

  useEffect(() => {
    // handle case where script already loaded (client-side nav)
    if ((window as any).EBWidget) initWidget();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Script
        src="https://cdn.targetcircle.com/vendors/economybookings/eb-widget.js"
        strategy="afterInteractive"
        onLoad={() => initWidget()}
        onReady={() => initWidget()}
        onError={() => { console.warn("[EconomyBookingsWidget] script failed to load"); setFailed(true); }}
      />
      <div
        id="eb-widget"
        ref={containerRef}
        className="w-full min-h-[430px] md:min-h-[230px]"
      />
      {!loaded && !failed && (
        <div className="w-full min-h-[430px] md:min-h-[230px] animate-pulse rounded-xl bg-cloud" />
      )}
    </div>
  );
}
