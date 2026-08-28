"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import styles from "./ErrorTerminal.module.css";

type Row = { key: "home" | "work" | "experience" | "contact"; path: string; href: string };

const ROWS: Row[] = [
  { key: "home", path: "~/", href: "/" },
  { key: "work", path: "~/projects", href: "/#work" },
  { key: "experience", path: "~/experience", href: "/#experience" },
  { key: "contact", path: "~/contact", href: "/#contact" },
];

/** `cd ~/<name>` typed into the last line navigates to the matching row. */
function matchRow(typed: string): Row | undefined {
  // Collapse whitespace and ignore a trailing slash so both `cd ~/` and `cd ~`
  // reach the home row.
  const normalized = typed
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\/$/, "")
    .toLowerCase();

  return ROWS.find(
    (row) => normalized === `cd ${row.path.toLowerCase()}`.replace(/\/$/, ""),
  );
}

export function ErrorTerminal() {
  const t = useTranslations("notFound");
  const router = useRouter();
  const [typed, setTyped] = useState<string | null>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      // Never steal keys from form fields or a focused control — Enter and
      // Space must keep activating whatever the user has tabbed to.
      const tag = target?.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        tag === "BUTTON" ||
        tag === "A" ||
        target?.isContentEditable
      ) {
        return;
      }

      if (event.key === "Enter") {
        const row = matchRow(typed ?? "");
        if (row) router.push(row.href);
        return;
      }

      if (event.key === "Backspace") {
        // Only swallow Backspace once the user is actually typing a command.
        if (typed === null) return;
        event.preventDefault();
        setTyped((prev) => (prev === null ? "" : prev.slice(0, -1)));
        return;
      }

      // Printable characters only; Space is left alone so it still scrolls
      // until a command is in progress.
      if (event.key.length === 1 && (event.key !== " " || typed !== null)) {
        setTyped((prev) => `${prev ?? ""}${event.key}`);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [typed, router]);

  const lastLine = typed ?? t("cmdCd");

  return (
    <div className="overflow-hidden rounded-2xl border border-terminal-line bg-terminal shadow-[var(--shadow-float)]">
      <div className="flex items-center gap-3 border-b border-terminal-line px-4 py-3">
        <div aria-hidden="true" className="flex shrink-0 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-terminal-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-terminal-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-terminal-line" />
        </div>
        <span className="font-mono text-xs text-muted">{t("terminalFile")}</span>
      </div>

      <div className="p-5 font-mono text-[13px] leading-relaxed md:p-6 md:text-sm">
        <p className="text-text">
          <span aria-hidden="true" className="mr-2 text-muted">
            $
          </span>
          {t("cmdOpen")}
        </p>
        <p className="mt-1 text-danger">{t("errorLine")}</p>

        <p className="mt-4 text-text">
          <span aria-hidden="true" className="mr-2 text-muted">
            $
          </span>
          {t("cmdLs")}
        </p>

        <ul className="mt-2">
          {ROWS.map((row) => (
            <li key={row.key}>
              <Link
                href={row.href}
                className="-mx-2 flex items-center gap-4 rounded-md px-2 py-1.5 transition-colors hover:bg-accent-soft"
              >
                <span className="w-32 shrink-0 text-term-path">{row.path}</span>
                <span className="text-muted">{t(`rows.${row.key}`)}</span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-text">
          <span aria-hidden="true" className="mr-2 text-muted">
            $
          </span>
          {lastLine}
          <span aria-hidden="true" className={styles.cursor}>
            ▌
          </span>
        </p>
      </div>
    </div>
  );
}

export default ErrorTerminal;
