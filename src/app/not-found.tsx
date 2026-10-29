import type { Metadata } from 'next';
import Link from 'next/link';

import { projects } from '@/content/projects';
import './globals.css';

// metadataBase is inherited from the root layout.
export const metadata: Metadata = {
  title: 'Page not found — Haroon Kasor',
  robots: { index: false, follow: true },
};

/**
 * Root fallback for requests that never resolve a locale segment.
 *
 * Deliberately self-contained: plain English literals, no
 * NextIntlClientProvider and no import of the `[locale]` not-found. Pulling
 * either of those in here opts the whole `[locale]` tree into dynamic
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
          className="mx-auto flex w-full max-w-[560px] flex-1 flex-col items-center px-5 pt-[72px] pb-20 text-center lg:pt-[150px]"
        >
          <p className="text-accent text-[15px] leading-[1.4] font-medium">404</p>
          <h1 className="text-text mt-3 text-[34px] leading-[1.3] font-semibold lg:text-5xl">
            Page not found
          </h1>
          <p className="text-muted mt-3 text-base leading-[1.75] lg:text-[17px]">
            The link may be mistyped, or the page has moved.
            <br />
            Head back home or browse my work below.
          </p>
          <Link
            href="/"
            className="bg-inverse text-on-inverse mt-8 inline-flex h-12 items-center rounded-full px-5 text-[15px] font-medium"
          >
            Back to home
          </Link>
          <nav aria-labelledby="notfound-work" className="mt-14 w-full text-left">
            <h2 id="notfound-work" className="text-text pb-3 text-sm font-semibold">
              Work
            </h2>
            <ul>
              {projects.map((project) => (
                <li key={project.slug} className="border-line border-t">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex items-center gap-4 py-4 leading-[1.4]"
                  >
                    <span className="text-text text-base font-semibold">{project.title}</span>
                    <span className="text-muted text-sm">{project.tagline.en}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </main>
      </body>
    </html>
  );
}
