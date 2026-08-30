import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { SITE_URL } from '@/lib/seo';

import './globals.css';

// Only metadataBase is set here so file-based metadata routes (icon,
// opengraph-image, twitter-image, manifest) and /_not-found — which render
// under this root layout, outside the `[locale]` segment — can resolve
// relative/social image URLs without falling back to localhost. Per-locale
// pages still get their full metadata from `[locale]/layout.tsx`.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

// The `[locale]` layout renders <html>/<body>; this root layout only passes
// children through, as required by next-intl's App Router setup.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
