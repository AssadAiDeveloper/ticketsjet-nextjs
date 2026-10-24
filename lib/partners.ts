// Partner redirects. Visitors only ever see /go/<partner>; the real URL lives here (server side).
export const PARTNERS: Record<string, string> = {
  airalo: "https://airalo.tpo.mx/65u3Jtb1",
  kiwitaxi: "https://kiwitaxi.tpo.mx/LKRJWQkc",
  airhelp: "https://airhelp.tpo.mx/FIWy6xaF",
};
export const goHref = (p: keyof typeof PARTNERS) => `/go/${p}`;
