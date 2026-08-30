import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'th'] as const;
export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = 'en';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});

/** Alias kept for components that import `Locale`. */
export type Locale = AppLocale;
