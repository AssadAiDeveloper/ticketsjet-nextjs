import { isRtl } from "@/i18n/routing";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Price from "@/components/Price";
import { dayMonth } from "@/lib/format";
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
  const when = (iso: string | null) => (iso ? dayMonth(iso, locale) : null);
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
          const photo = PHOTOS[d.code];
          const hasPhoto = !!photos[d.code];
          return (
            <li key={d.code} className="relative">
              <Link
                href={d.href}
                className={`group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-2xl p-5 text-white shadow-md transition hover:-translate-y-1 hover:shadow-xl ${hasPhoto ? "" : `bg-gradient-to-br ${GRADS[i % GRADS.length]}`}`}
                style={!hasPhoto && photo ? { backgroundImage: `linear-gradient(to top, rgba(11,27,43,.85), rgba(11,27,43,.1)), url(${photo})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
              >
                {hasPhoto && <DestPhoto code={d.code} photo={photos[d.code]} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" alt={`${d.name}, ${d.country}`} className="z-0" />}
                {hasPhoto && <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" aria-hidden="true" />}
                {hasPhoto && <div className="absolute inset-x-0 top-0 z-[1] h-1/4 bg-gradient-to-b from-black/35 to-transparent pointer-events-none" aria-hidden="true" />}
                {hasPhoto && (
                  <span className="absolute start-3 top-3 z-10 rounded-md bg-black/40 px-2 py-0.5 font-mono text-[11px] font-semibold text-white/90 backdrop-blur-sm">
                    {d.code}
                  </span>
                )}
                {!hasPhoto && (
                  <span className="font-display select-none text-6xl font-extrabold leading-none tracking-tight text-white/10 transition group-hover:text-amber/30" aria-hidden="true">
                    {d.code}
                  </span>
                )}
                <span className="relative z-10 mt-auto">
                  <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                    <span dir="ltr">{origin.code} ? {d.code}</span>
                  </span>
                  <span className="font-display mt-1 block text-xl font-bold leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"><bdi>{d.name}</bdi></span>
                  <span className="block text-sm text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">{d.country}</span>
                  <span className="mt-3 flex items-end justify-between border-t border-white/15 pt-3">
                    <span>
                      <span className="block text-[11px] text-white/50">{t("from")}</span>
                      <span className="inline-block rounded-lg bg-black/55 px-2.5 py-1 backdrop-blur-sm">
                        <Price usd={d.price} className="font-display text-2xl font-extrabold text-amber drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]" />
                      </span>
                    </span>
                    {when(d.depart) && <span className="text-xs text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">{when(d.depart)}</span>}
                  </span>
                </span>
              </Link>
              {photos[d.code]?.author && (
                <span className="absolute bottom-2 end-2 z-20 text-[10px] text-white/70 opacity-70">
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
