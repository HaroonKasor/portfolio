import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

/**
 * Catch-all for unmatched paths under a valid locale, e.g. `/th/nope`.
 *
 * Without it those requests fall through to the *root* not-found, which is
 * English-only and would serve `lang="en"` for a `/th/...` URL. Calling
 * `notFound()` here hands them to `[locale]/not-found.tsx` instead, so the
 * Thai 404 renders inside the Thai layout with `lang="th"`.
 */
export default async function LocaleCatchAll({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (hasLocale(routing.locales, locale)) setRequestLocale(locale);
  notFound();
}
