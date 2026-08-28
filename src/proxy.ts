// STUB (Agent A owns this file) — Next 16 renamed the middleware convention to proxy.
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Metadata image routes (icon, opengraph-image, twitter-image) are excluded so
  // they are served directly instead of being redirected to a locale prefix.
  matcher:
    "/((?!api|_next|_vercel|cv|icon|apple-icon|opengraph-image|twitter-image|.*\\..*).*)",
};
