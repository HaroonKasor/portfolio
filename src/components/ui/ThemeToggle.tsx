/* STUB (Agent A owns the real file). */
"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const t = useTranslations("common");
  const { resolvedTheme, setTheme } = useTheme();
  // Avoids a hydration mismatch: the server has no resolved theme.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  return (
    <button
      type="button"
      aria-label={t("themeToggle")}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-text transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
    >
      {mounted && resolvedTheme === "dark" ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}

export default ThemeToggle;
