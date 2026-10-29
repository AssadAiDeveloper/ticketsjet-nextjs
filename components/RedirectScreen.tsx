"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { isRtl } from "@/i18n/routing";

const TEXT: Record<string, { title: string; sub: string; fallback: string }> = {
  en: { title: "Taking you to our partner", sub: "You'll finish your booking directly with the provider. Prices and availability are confirmed there.", fallback: "Not redirected? Continue" },
  ar: { title: "ننقلك إلى شريكنا", sub: "ستُكمل الحجز مباشرة مع المزوّد، وهناك يتأكد السعر والتوفر.", fallback: "لم يتم التحويل؟ تابع" },
  nl: { title: "We brengen je naar onze partner", sub: "Je rondt je boeking rechtstreeks af bij de aanbieder. Prijs en beschikbaarheid worden daar bevestigd.", fallback: "Niet doorgestuurd? Ga verder" },
  es: { title: "Te llevamos con nuestro socio", sub: "Completarás la reserva directamente con el proveedor, que confirmará precio y disponibilidad.", fallback: "¿No te redirige? Continuar" },
  fr: { title: "Nous vous redirigeons vers notre partenaire", sub: "Vous finalisez la réservation directement auprès du fournisseur, qui confirme prix et disponibilité.", fallback: "Pas de redirection ? Continuer" },
  de: { title: "Wir leiten dich zu unserem Partner weiter", sub: "Du schließt die Buchung direkt beim Anbieter ab. Preis und Verfügbarkeit werden dort bestätigt.", fallback: "Keine Weiterleitung? Weiter" },
  it: { title: "Ti portiamo dal nostro partner", sub: "Completerai la prenotazione direttamente con il fornitore, che conferma prezzo e disponibilità.", fallback: "Nessun reindirizzamento? Continua" },
  pt: { title: "Estamos a levá-lo ao nosso parceiro", sub: "Conclui a reserva diretamente com o fornecedor, que confirma preço e disponibilidade.", fallback: "Não foi redirecionado? Continuar" },
  tr: { title: "Sizi ortağımıza yönlendiriyoruz", sub: "Rezervasyonu doğrudan sağlayıcıyla tamamlarsınız; fiyat ve uygunluk orada doğrulanır.", fallback: "Yönlendirilmediniz mi? Devam et" },
  ru: { title: "Переводим вас к нашему партнёру", sub: "Бронирование вы завершите напрямую у поставщика, там же подтверждаются цена и наличие.", fallback: "Не перенаправило? Продолжить" },
  pl: { title: "Przekierowujemy do naszego partnera", sub: "Rezerwację dokończysz bezpośrednio u dostawcy, który potwierdzi cenę i dostępność.", fallback: "Brak przekierowania? Kontynuuj" },
  fa: { title: "در حال انتقال شما به شریک ما", sub: "رزرو را مستقیم نزد ارائه‌دهنده کامل می‌کنید؛ قیمت و موجودی همان‌جا تأیید می‌شود.", fallback: "منتقل نشدید؟ ادامه" },
  he: { title: "מעבירים אותך לשותף שלנו", sub: "תשלים את ההזמנה ישירות מול הספק, שם יאושרו המחיר והזמינות.", fallback: "לא הועברת? המשך" },
};

function safeTarget(raw: string | null): string | null {
  if (!raw) return null;
  try {
    const u = new URL(raw);
    if (u.protocol === "https:" && u.hostname === "tpwgts.com" && u.pathname.startsWith("/wl/redirect")) return u.toString();
  } catch {}
  return null;
}

export default function RedirectScreen() {
  const locale = useLocale();
  const t = TEXT[locale] ?? TEXT.en;
  const [target, setTarget] = useState<string | null>(null);

  useEffect(() => {
    const url = safeTarget(new URLSearchParams(window.location.search).get("u"));
    if (!url) {
      window.location.replace(locale === "en" ? "/flights" : `/${locale}/flights`);
      return;
    }
    setTarget(url);
    const id = window.setTimeout(() => window.location.replace(url), 1800);
    return () => window.clearTimeout(id);
  }, [locale]);

  return (
    <div dir={isRtl(locale) ? "rtl" : "ltr"} lang={locale} className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-ink px-6 text-center text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,rgba(255,183,3,0.16),transparent_70%)]" />
      <div className="relative flex flex-col items-center">
        <img src="/logo.svg" alt="TicketsJet" width={132} height={96} className="h-20 w-auto" />
        <div className="relative mt-10 h-1 w-56 overflow-hidden rounded-full bg-white/15" role="progressbar" aria-label={t.title}>
          <div className="tj-redirect-bar absolute inset-y-0 w-1/3 rounded-full bg-amber" />
        </div>
        <h1 className="font-display mt-8 text-2xl font-semibold sm:text-3xl">{t.title}</h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65">{t.sub}</p>
        {target && (
          <a href={target} className="mt-8 text-xs text-white/45 underline-offset-4 transition hover:text-amber hover:underline">
            {t.fallback}
          </a>
        )}
      </div>
      <style>{`@keyframes tjslide{0%{inset-inline-start:-35%}100%{inset-inline-start:100%}}.tj-redirect-bar{animation:tjslide 1.1s ease-in-out infinite}`}</style>
    </div>
  );
}
