import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Price from "@/components/Price";
import { monthYear, weekday } from "@/lib/format";

export type CalendarMonth = { month: string; prices: Record<string, { p: number; b: string | null }> }; // month = YYYY-MM

/** Server component: month grids coloured by price, each priced day links to a search. */
export default async function PriceCalendar({ months, hrefFor }: { months: CalendarMonth[]; hrefFor: (iso: string, back: string | null) => string }) {
  const locale = await getLocale();
  const t = await getTranslations("cal");
  // 2024-01-01 is a Monday
  const DOW = Array.from({ length: 7 }, (_, i) => weekday(`2024-01-0${i + 1}`, locale));
  const all = months.flatMap((m) => Object.values(m.prices).map((v) => v.p));
  if (all.length === 0) return null;
  const lo = Math.min(...all);
  const hi = Math.max(...all);
  const tier = (p: number) => {
    const t = hi === lo ? 0 : (p - lo) / (hi - lo);
    return t <= 0.33 ? "bg-[#FFE08A] text-ink font-semibold" : t <= 0.66 ? "bg-[#FFF3CC] text-ink" : "bg-cloud text-slate";
  };

  return (
    <section>
      <h2 className="font-display text-2xl font-bold text-ink">{t("title")}</h2>
      <p className="mt-1 text-sm text-slate">{t("sub")}</p>
      <div className="mt-5 grid gap-6 lg:grid-cols-3">
        {months.map(({ month, prices }) => {
          const [y, m] = month.split("-").map(Number);
          const first = (new Date(Date.UTC(y, m - 1, 1)).getUTCDay() + 6) % 7; // Monday = 0
          const days = new Date(Date.UTC(y, m, 0)).getUTCDate();
          return (
            <div key={month} className="rounded-2xl border border-mist bg-white p-4">
              <h3 className="mb-3 font-semibold text-ink">
                {monthYear(`${month}-01`, locale)}
              </h3>
              <div dir="ltr" className="grid grid-cols-7 gap-1 text-center text-[11px] text-slate">
                {DOW.map((d) => (
                  <div key={d} className="pb-1">{d}</div>
                ))}
                {Array.from({ length: first }).map((_, i) => (
                  <div key={`b${i}`} />
                ))}
                {Array.from({ length: days }).map((_, i) => {
                  const day = i + 1;
                  const iso = `${month}-${String(day).padStart(2, "0")}`;
                  const e = prices[iso];
                  const p = e?.p;
                  return e === undefined || p === undefined ? (
                    <div key={iso} className="rounded-md py-1.5 text-slate/50">{day}</div>
                  ) : (
                    <Link key={iso} href={hrefFor(iso, e.b)} className={`rounded-md py-1 leading-tight hover:ring-2 hover:ring-amber ${tier(p)}`}>
                      <span className="block text-[10px] opacity-60">{day}</span>
                      <Price usd={p} className="block text-xs" />
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
