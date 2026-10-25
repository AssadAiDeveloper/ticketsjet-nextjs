import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Everything except API routes, partner redirects, Next internals, legacy redirects, wp-* paths, feed, and files with an extension.
  matcher: ["/((?!api|go|_next|_vercel|hotels|stay|contact-us|privacy-policy-2|guides|travel-guide|airfare-refund|cruise|bike-bookings|author|wp-|feed|.*\\..*).*)"],
};
