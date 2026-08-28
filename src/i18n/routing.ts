/* STUB (Agent A owns the real file) — minimal next-intl routing. */
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "th"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
