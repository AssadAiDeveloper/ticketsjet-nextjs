import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { isLocale } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const asked = await requestLocale;
  const locale = asked && isLocale(asked) ? asked : routing.defaultLocale;
  return { locale, messages: (await import(`../messages/${locale}.json`)).default };
});
