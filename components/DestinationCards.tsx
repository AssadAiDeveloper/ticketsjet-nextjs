import { isRtl } from "@/i18n/routing";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Price from "@/components/Price";
import { PHOTOS } from "@/lib/destinations";
import { allPhotos } from "@/lib/destinationPhotos";
import DestPhoto from "@/components/DestPhoto";
import PhotoCredit from "@/components/PhotoCredit";

export type Dest = { code: string; name: string; country: string; price: number; href: string; depart: string | null };

const GRADS = [
  "from-[#16324a] to-[#0b1b2b]",
  "from-[#3b2f5c] to-[#0b1b2b]",
  "from-[#0f4a55] to-[#0b1b2b]",
  "from-[#5a3a1c] to-[#0b1b2b]",
  "from-[#1f4d3a] to-[#0b1b2b]",
  "from-[#4a2438] to-[#0b1b2b]",
];

export default async function DestinationCards({ origin, items }: { origin: { code: string; name: string }; items: Dest[] }) {
  const t = await getTranslations("dest");
  const locale = await getLocale();
  const photos = allPhotos();
  const arrow = isRtl(locale) ? "\u2192" : "\u2192";
  const when = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString(locale, { day: "numeric", month: "short" }) : null);
  return (
    <section className="mx-auto max-w-6xl px-4 pt-16">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber-deep">{t("trending")}</p>
          <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t("title", { city: origin.name })}</h2>
          <p className="mt-2 text-sm text-slate">{t("sub")}</p>
        </div>
        <Link href="/explore" className="text-sm font-semibold text-ink underline-offset-4 hover:underline">
          {t("seeMap")} {arrow}
        </Link>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((d, i) => {
          const hasPhoto = !!photos[d.code];
          const routeLabel = `${origin.code} to ${d.code}`;
          const dateLabel = when(d.depart) ? `, departing ${when(d.depart)}` : "";
          return (
            <li key={d.code} className="relative">
              <Link
                href={d.href}
                title={`${d.name}, ${d.country} — from ${d.price} USD${dateLabel}`}
                aria-label={`${d.name}, ${d.country}. ${routeLabel}${dateLabel}. From ${d.price} dollars.`}
                className={`group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-2xl p-5 text-white shadow-md transition hover:-translate-y-1 hover:shadow-xl ${hasPhoto ? "" : `bg-gradient-to-br ${GRADS[i % GRADS.length]}`}`}
                style={!hasPhoto && PHOTOS[d.code] ? { backgroundImage: `linear-gradient(to top, rgba(11,27,43,.85), rgba(11,27,43,.1)), url(${PHOTOS[d.code]})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
              >
                {hasPhoto && <DestPhoto code={d.code} photo={photos[d.code]} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" alt={`${d.name}, ${d.country}`} className="z-0" />}
                {hasPhoto && <div className="absolute inset-x-0 bottom-0 z-[1] h-1/2 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" aria-hidden="true" />}
                <span className="absolute start-3 top-3 z-10 rounded-lg bg-white/90 px-2.5 py-1 text-xs font-bold text-ink backdrop-blur-sm">
                  {t("from")} <Price usd={d.price} className="text-xs font-bold text-ink" />
                </span>
                <span className="relative z-10 mt-auto">
                  <span className="font-display block text-xl font-semibold leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"><bdi>{d.name}</bdi></span>
                  <span className="block text-sm text-white/80 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">{d.country}</span>
                </span>
                {photos[d.code]?.author && <PhotoCredit author={photos[d.code].author || ""} authorUrl={photos[d.code].photoUrl || ""} photoUrl={photos[d.code].photoUrl || ""} />}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}