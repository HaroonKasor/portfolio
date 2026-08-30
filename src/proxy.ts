import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Skip Next internals, API routes, the CV PDFs and any file with an extension.
  // NOTE: the backslash MUST be doubled. This is a JS string literal, so a
  // single backslash before the dot is silently dropped and the lookahead
  // degrades into `.*..*` (any path of 2+ characters), which stops the proxy
  // matching almost every route. Next also rejects `String.raw` here.
  //
  // `icon`, `opengraph-image` and `twitter-image` are extensionless
  // file-based metadata routes living at the app root, outside `[locale]`.
  // Without excluding them the proxy rewrites /icon -> /en/icon, which does
  // not exist, so the favicon and OG image 404 at runtime and no og:image
  // meta tag is emitted.
  matcher: [
    '/((?!api|_next|cv|icon|opengraph-image|twitter-image|manifest\\.webmanifest|.*\\..*).*)',
  ],
};
