// STUB (Agent A owns this file)
"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LangToggle() {
  const t = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const next = locale === "en" ? "th" : "en";

  return (
    <button
      type="button"
      aria-label={t("toggleLanguage")}
      onClick={() => router.replace(pathname, { locale: next })}
      className="inline-flex h-11 items-center rounded-full border border-line px-4 text-sm text-muted hover:text-text"
    >
      {next.toUpperCase()}
    </button>
  );
}

export default LangToggle;
