import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { isLocale } from "./routing";

type Messages = { [k: string]: string | Messages };
function merge(base: Messages, over: Messages): Messages {
  const out: Messages = { ...base };
  for (const [k, v] of Object.entries(over)) {
    const b = base[k];
    out[k] = typeof v === "object" && typeof b === "object" ? merge(b, v) : v;
  }
  return out;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const asked = await requestLocale;
  const locale = asked && isLocale(asked) ? asked : routing.defaultLocale;
  const en = (await import("../messages/en.json")).default as Messages;
  const own = locale === "en" ? en : ((await import(`../messages/${locale}.json`)).default as Messages);
  // Anything not yet translated falls back to English instead of breaking the page.
  return { locale, messages: merge(en, own) };
});
