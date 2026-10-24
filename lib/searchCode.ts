// Parses the widget's search code: ORIGIN DDMM DEST [DDMM] [c] ADULTS [CHILDREN] [INFANTS]
// Multi-city codes (more than one destination) return null.
export type Parsed = {
  origin: string;
  dest: string; // first destination
  depart: string;
  back: string | null;
  business: boolean;
  adults: number;
  children: number;
  infants: number;
  legs?: { dest: string; date: string }[]; // multi-city: every flight in order
};

/** Next occurrence of day/month on or after today, as YYYY-MM-DD (the code has no year). */
function nextDate(dd: number, mm: number, notBefore: Date): string {
  let y = notBefore.getUTCFullYear();
  let d = new Date(Date.UTC(y, mm - 1, dd));
  if (d < notBefore) d = new Date(Date.UTC(++y, mm - 1, dd));
  return d.toISOString().slice(0, 10);
}

export function parseSearchCode(code: string | undefined, now = new Date()): Parsed | null {
  const clean = (code ?? "").toUpperCase().replace(/C(?=\d)/, "c");
  const today0 = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  // Multi-city: ORIGIN then two or more (DDMM DEST) pairs.
  const mc = /^([A-Z]{3})((?:\d{4}[A-Z]{3}){2,})(c)?(\d)(\d)?(\d)?$/.exec(clean);
  if (mc) {
    const legs: { dest: string; date: string }[] = [];
    let after = today0;
    for (const [, dd, mm, dest] of mc[2].matchAll(/(\d{2})(\d{2})([A-Z]{3})/g)) {
      if (Number(mm) < 1 || Number(mm) > 12 || Number(dd) < 1 || Number(dd) > 31) return null;
      const date = nextDate(Number(dd), Number(mm), after);
      legs.push({ dest, date });
      after = new Date(date + "T00:00:00Z");
    }
    return { origin: mc[1], dest: legs[0].dest, depart: legs[0].date, back: null, business: mc[3] === "c", adults: Number(mc[4]), children: Number(mc[5] ?? 0), infants: Number(mc[6] ?? 0), legs };
  }
  const m = /^([A-Z]{3})(\d{2})(\d{2})([A-Z]{3})(?:(\d{2})(\d{2}))?(c)?(\d)(\d)?(\d)?$/.exec(clean);
  if (!m) return null;
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const dd = Number(m[2]);
  const mm = Number(m[3]);
  if (mm < 1 || mm > 12 || dd < 1 || dd > 31) return null;
  const depart = nextDate(dd, mm, today);
  let back: string | null = null;
  if (m[5] && m[6]) {
    const bd = Number(m[5]);
    const bm = Number(m[6]);
    if (bm < 1 || bm > 12 || bd < 1 || bd > 31) return null;
    back = nextDate(bd, bm, new Date(depart + "T00:00:00Z"));
  }
  return { origin: m[1], dest: m[4], depart, back, business: m[7] === "c", adults: Number(m[8]), children: Number(m[9] ?? 0), infants: Number(m[10] ?? 0) };
}
