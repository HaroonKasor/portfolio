import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Outfit, Prompt } from 'next/font/google';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { ThemeProviders } from '@/app/providers';
import { routing } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
});

const prompt = Prompt({
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-prompt',
  display: 'swap',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: 'meta' });

  // buildMetadata supplies metadataBase, canonical and the en/th hreflang
  // alternates; the layout only overrides the copy. `useTemplate: false` keeps
  // the "%s — Haroon Kasor" template from doubling up on the layout's own title.
  return buildMetadata(locale, {
    title: t('title'),
    description: t('description'),
    useTemplate: false,
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'common' });

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${outfit.variable} ${prompt.variable} h-full`}
    >
      <body className="bg-bg text-text flex min-h-full flex-col font-sans">
        <ThemeProviders>
          <NextIntlClientProvider>
            <a
              href="#content"
              className="bg-accent sr-only rounded-full px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[70]"
            >
              {t('skipToContent')}
            </a>
            {children}
          </NextIntlClientProvider>
        </ThemeProviders>
      </body>
    </html>
  );
}
