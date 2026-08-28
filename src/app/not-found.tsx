import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page not found — Haroon Kasor",
  robots: { index: false, follow: true },
};

/**
 * Root fallback for requests that never resolve a locale segment.
 *
 * Deliberately self-contained: plain English literals, no
 * NextIntlClientProvider and no import of the `[locale]` not-found. Pulling
 * either of those in here opts the whole `[locale]` tree into dynamic (`f`)
 * rendering, which costs the home and project pages their prerendering.
 * Unknown paths *under* a valid locale are handled by `[locale]/[...rest]`,
 * which routes them to the localized 404 with the correct `lang`.
 *
 * The root layout is a passthrough, so this page owns <html>/<body>.
 */
export default function RootNotFound() {
  return (
    <html lang="en" className="h-full">
      <body className="bg-bg text-text flex min-h-full flex-col">
        <main
          id="content"
          className="mx-auto flex w-full max-w-[720px] flex-1 flex-col justify-center px-5 py-20"
        >
          <p className="text-accent font-mono text-xs font-semibold tracking-[0.18em] uppercase">
            ERROR 404 &middot; PAGE NOT FOUND
          </p>

          <p className="text-text mt-6 text-[96px] leading-none font-bold tracking-tight">
            404
          </p>

          <h1 className="text-text mt-8 text-[32px] leading-tight font-semibold md:text-[44px]">
            This page doesn&apos;t exist
            <br />
            (or hasn&apos;t been pushed yet)
          </h1>

          <p className="text-muted mt-5 max-w-lg leading-relaxed">
            The link may be mistyped or the page moved. Use the buttons below to
            get back on track.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="bg-accent inline-flex min-h-11 items-center rounded-full px-6 text-sm font-medium text-white"
            >
              Back home
            </Link>
            <Link
              href="/#work"
              className="border-line text-text inline-flex min-h-11 items-center rounded-full border px-6 text-sm font-medium"
            >
              View work
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
