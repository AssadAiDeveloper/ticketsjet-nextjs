import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { bookingUrl } from "@/lib/config";

type Props = { city: string; depart: string; back: string | null };

/** Services related to this trip, shown under the search. */
export default async function TripExtras({ city, depart, back }: Props) {
  const t = await getTranslations("extras");
  const arrow = (await getLocale()) === "ar" ? "←" : "→";
  // Booking.com needs a check-out date; for one-way searches we leave dates empty.
  const hotel = bookingUrl({ city, checkin: back ? depart : undefined, checkout: back ?? undefined });
  const cards = [
    { t: t("hotelsIn", { city }), d: back ? t("sameDates") : t("searchBooking"), href: hotel, external: true, label: t("searchStays") },
    { t: t("transfer"), d: t("transferD"), href: "/services/airport-transfers", label: t("learnMore") },
    { t: t("esim"), d: t("esimD"), href: "/services/esim", label: t("learnMore") },
    { t: t("delay"), d: t("delayD"), href: "/services/flight-compensation", label: t("learnMore") },
  ];
  return (
    <section aria-label={t("title")} className="pt-10">
      <h2 className="font-display text-lg font-bold text-ink">{t("title")}</h2>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <li key={c.t}>
            {c.external ? (
              <a href={c.href} target="_blank" rel="nofollow noopener" className="block h-full rounded-2xl border border-mist bg-white p-4 transition hover:border-amber hover:shadow">
                <p className="font-semibold text-ink">{c.t}</p>
                <p className="mt-1 text-sm text-slate">{c.d}</p>
                <p className="mt-3 text-sm font-semibold text-amber-deep">{c.label} {arrow}</p>
              </a>
            ) : (
              <Link href={c.href} className="block h-full rounded-2xl border border-mist bg-white p-4 transition hover:border-amber hover:shadow">
                <p className="font-semibold text-ink">{c.t}</p>
                <p className="mt-1 text-sm text-slate">{c.d}</p>
                <p className="mt-3 text-sm font-semibold text-amber-deep">{c.label} {arrow}</p>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
