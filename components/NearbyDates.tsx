import Link from "next/link";
import { getMonthFares } from "@/lib/routeFares";
import { searchCode } from "@/lib/fares";

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const addDays = (iso: string, n: number) => new Date(new Date(iso + "T00:00:00Z").getTime() + n * 86400000).toISOString().slice(0, 10);

/** Cheapest return fare for each day around the searched departure date. Hidden when there is no data. */
export default async function NearbyDates({ origin, dest, depart }: { origin: string; dest: string; depart: string }) {
  const days = [-3, -2, -1, 0, 1, 2, 3].map((n) => addDays(depart, n));
  const today = new Date().toISOString().slice(0, 10);
  const months = [...new Set(days.map((d) => d.slice(0, 7)))];
  const maps = await Promise.all(months.map((m) => getMonthFares(origin, dest, m)));
  const fares: Record<string, { p: number; b: string | null }> = Object.assign({}, ...maps);
  const shown = days.filter((d) => d >= today);
  if (!shown.some((d) => fares[d])) return null;
  const lo = Math.min(...shown.filter((d) => fares[d]).map((d) => fares[d].p));

  return (
    <section aria-label="Nearby dates" className="pt-8">
      <h2 className="font-display text-lg font-bold text-ink">Flexible on dates?</h2>
      <p className="text-sm text-slate">Lowest round-trip fare found for each departure day, in USD.</p>
      <ul className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {shown.map((d) => {
          const f = fares[d];
          const dt = new Date(d + "T00:00:00Z");
          const current = d === depart;
          const body = (
            <>
              <span className="block text-[11px] uppercase tracking-wider opacity-60">{DOW[dt.getUTCDay()]}</span>
              <span className="block text-sm font-semibold">
                {dt.getUTCDate()} {MONTHS[dt.getUTCMonth()]}
              </span>
              <span className={`mt-1 block text-sm font-bold ${f && f.p === lo ? "text-signal" : ""}`}>{f ? `$${f.p}` : "—"}</span>
            </>
          );
          const base = "block min-w-[88px] rounded-xl border px-3 py-2 text-center transition";
          return (
            <li key={d}>
              {f ? (
                <Link
                  href={`/flights?flightSearch=${searchCode(origin, { code: dest, depart: d, back: f.b })}`}
                  className={`${base} ${current ? "border-ink bg-ink text-white" : "border-mist bg-white text-ink hover:border-amber"}`}
                >
                  {body}
                </Link>
              ) : (
                <div className={`${base} border-mist bg-cloud/60 text-slate/60`}>{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
