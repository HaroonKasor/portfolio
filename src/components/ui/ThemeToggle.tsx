// STUB (Agent A owns this file)
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

export function ThemeToggle() {
  const t = useTranslations("common");
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      suppressHydrationWarning
      aria-label={t("toggleTheme")}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted hover:text-text"
    >
      <Moon aria-hidden="true" className="h-4 w-4 dark:hidden" />
      <Sun aria-hidden="true" className="hidden h-4 w-4 dark:block" />
    </button>
  );
}

export default ThemeToggle;
