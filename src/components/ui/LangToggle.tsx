/* STUB (Agent A owns the real file). */
"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LangToggle() {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className="inline-flex items-center rounded-full border border-line p-1"
      aria-label={t("langToggle")}
    >
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          aria-current={l === locale ? "true" : undefined}
          onClick={() => router.replace(pathname, { locale: l })}
          className={[
            "min-w-9 rounded-full px-2 py-1 text-xs font-medium uppercase transition-colors",
            "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
            l === locale ? "bg-accent-soft text-accent" : "text-muted hover:text-text",
          ].join(" ")}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export default LangToggle;
