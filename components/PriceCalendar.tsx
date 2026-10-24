import { Link } from "@/i18n/navigation";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DOW = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export type CalendarMonth = { month: string; prices: Record<string, { p: number; b: string | null }> }; // month = YYYY-MM

/** Server component: month grids coloured by price, each priced day links to a search. */
export default function PriceCalendar({ months, hrefFor }: { months: CalendarMonth[]; hrefFor: (iso: string, back: string | null) => string }) {
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
      <h2 className="font-display text-2xl font-bold text-ink">Price calendar</h2>
      <p className="mt-1 text-sm text-slate">Lowest round-trip fare found for each departure day, in USD. Darker yellow = cheaper. Blank days had no recent fare.</p>
      <div className="mt-5 grid gap-6 lg:grid-cols-3">
        {months.map(({ month, prices }) => {
          const [y, m] = month.split("-").map(Number);
          const first = (new Date(Date.UTC(y, m - 1, 1)).getUTCDay() + 6) % 7; // Monday = 0
          const days = new Date(Date.UTC(y, m, 0)).getUTCDate();
          return (
            <div key={month} className="rounded-2xl border border-mist bg-white p-4">
              <h3 className="mb-3 font-semibold text-ink">
                {MONTHS[m - 1]} {y}
              </h3>
              <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-slate">
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
                      <span className="block text-xs">${p}</span>
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
