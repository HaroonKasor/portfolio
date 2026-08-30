import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://haroonkasor.dev";

export const TITLE_TEMPLATE = "%s — Haroon Kasor";

/** Path of a route for a given locale, honouring `localePrefix: "as-needed"`. */
export function localizedPath(locale: Locale, path = "/"): string {
  const normalized = path === "/" ? "" : path.replace(/\/$/, "");
  return locale === routing.defaultLocale
    ? `/${normalized.replace(/^\//, "")}`.replace(/\/$/, "") || "/"
    : `/${locale}${normalized}`;
}

export function absoluteUrl(locale: Locale, path = "/"): string {
  const p = localizedPath(locale, path);
  return `${SITE_URL}${p === "/" ? "" : p}`;
}

function languageAlternates(path: string): Record<string, string> {
  return Object.fromEntries(
    routing.locales.map((l) => [l, absoluteUrl(l, path)]),
  );
}

export type MetadataOverrides = {
  /** Route path without locale prefix, e.g. "/projects/goskillup-lms". */
  path?: string;
  title?: string;
  description?: string;
  /** Pass false on the root layout so the template applies to children only. */
  useTemplate?: boolean;
  /**
   * Pass false on routes that have their own sibling `opengraph-image.tsx`
   * (project details) so Next's file-convention image wins instead of the
   * site-wide one.
   */
  siteImage?: boolean;
};

/**
 * Localized metadata defaults shared by every page.
 * Pages spread the result and override individual fields as needed.
 */
export async function buildMetadata(
  locale: Locale,
  overrides: MetadataOverrides = {},
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "common" });
  const {
    path = "/",
    title,
    description,
    useTemplate = true,
    siteImage = true,
  } = overrides;

  const siteName = t("siteName");
  const defaultTitle = `${siteName} — ${t("role")}`;
  const resolvedTitle = title ?? defaultTitle;
  const resolvedDescription = description ?? t("tagline");
  const url = absoluteUrl(locale, path);

  // The root `opengraph-image.tsx` is only auto-attached to pages that are its
  // route siblings, which `[locale]/page.tsx` is not — and declaring an
  // explicit `openGraph` object suppresses that inference anyway. Point at it
  // by URL so /, /th and any other locale page carry an og:image. Pages with
  // their own sibling image (project details) override `images` themselves.
  // Spread-in rather than set to undefined: an explicit `images: undefined`
  // still counts as declared and suppresses the file-convention inference that
  // the project pages rely on for their own sibling image.
  const imageFields = siteImage
    ? {
        images: [
          {
            url: `${SITE_URL}/opengraph-image`,
            width: 1200,
            height: 630,
            alt: defaultTitle,
          },
        ],
      }
    : {};

  return {
    metadataBase: new URL(SITE_URL),
    title: useTemplate
      ? { default: resolvedTitle, template: TITLE_TEMPLATE }
      : resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: "website",
      siteName,
      title: resolvedTitle,
      description: resolvedDescription,
      url,
      locale: locale === "th" ? "th_TH" : "en_US",
      ...imageFields,
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      ...imageFields,
    },
  };
}
