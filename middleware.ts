import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Everything except API routes, partner redirects, Next internals and files with an extension.
  matcher: ["/((?!api|go|_next|_vercel|.*\\..*).*)"],
};
