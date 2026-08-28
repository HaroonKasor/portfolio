import type { ReactNode } from 'react';

import './globals.css';

// The `[locale]` layout renders <html>/<body>; this root layout only passes
// children through, as required by next-intl's App Router setup.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
