"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Download, ExternalLink, X } from "lucide-react";

const FILES = {
  th: "/cv/haroon-kasor-th.pdf",
  en: "/cv/haroon-kasor-en.pdf",
} as const;

type CvLocale = keyof typeof FILES;

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Only nodes that are actually rendered can hold focus. The header's
 * "Open in new tab"/"Download" actions are `hidden sm:inline-flex` and their
 * footer twins are `sm:hidden`, so half the matches are invisible at any
 * viewport; trapping against those makes Tab wrap to a dead element and the
 * focus escape the dialog.
 */
function visibleFocusable(root: HTMLElement | null): HTMLElement[] {
  if (!root) return [];
  return [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
    (el) => el.offsetParent !== null || el.getClientRects().length > 0,
  );
}

export function CvPreviewModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const locale = useLocale();
  if (!open) return null;
  // Keyed on locale so the dialog remounts (and re-picks its default document)
  // if the site language changes while it is open.
  return <CvDialog key={locale} onClose={onClose} />;
}

function CvDialog({ onClose }: { onClose: () => void }) {
  const t = useTranslations("cv");
  const locale = useLocale();
  const [doc, setDoc] = useState<CvLocale>(locale === "th" ? "th" : "en");
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const handleClose = useCallback(() => onClose(), [onClose]);

  // Remember the trigger so focus can be returned when the dialog closes.
  useEffect(() => {
    openerRef.current = document.activeElement as HTMLElement | null;
    visibleFocusable(panelRef.current)[0]?.focus();
    return () => openerRef.current?.focus?.();
  }, []);

  // Escape to close + a basic focus trap across Tab / Shift+Tab.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        handleClose();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = visibleFocusable(panelRef.current);
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const index = active ? nodes.indexOf(active) : -1;

      // Focus can sit *inside* the PDF iframe, where activeElement is the
      // <iframe> itself but comparing against `last` is not enough: once the
      // embedded document takes over, Tab walks the PDF's own controls and
      // then leaves the dialog entirely. Driving the wrap from the index (and
      // treating "not in the list" as outside) keeps the cycle closed.
      if (e.shiftKey) {
        if (index <= 0) {
          e.preventDefault();
          last.focus();
        }
        return;
      }

      if (index === -1 || index >= nodes.length - 1) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [handleClose]);

  // Body scroll lock while the dialog is open.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const src = FILES[doc];

  const segment = (value: CvLocale, label: string) => (
    <button
      key={value}
      type="button"
      aria-pressed={doc === value}
      onClick={() => setDoc(value)}
      className={[
        "min-h-11 rounded-full px-4 text-sm font-medium transition-colors",
        doc === value
          ? "bg-accent-soft text-accent"
          : "text-muted hover:text-text",
      ].join(" ")}
    >
      {label}
    </button>
  );

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t("title")}
        className="bg-surface flex h-[92vh] w-full max-w-[900px] flex-col overflow-hidden rounded-t-[24px] shadow-[var(--shadow-float)] sm:h-[88vh] sm:rounded-[20px]"
      >
        {/* Grab handle — bottom-sheet affordance on mobile only. */}
        <div className="flex justify-center pt-3 sm:hidden" aria-hidden="true">
          <span className="bg-line h-1 w-10 rounded-full" />
        </div>

        <div className="border-line flex flex-wrap items-center gap-3 border-b px-5 py-4 sm:px-6">
          <h2 className="text-text mr-auto text-base font-semibold sm:text-lg">
            {t("title")}
          </h2>

          <div className="border-line inline-flex items-center rounded-full border p-1">
            {segment("th", t("thai"))}
            {segment("en", t("english"))}
          </div>

          <button
            type="button"
            aria-label={t("openNewTab")}
            onClick={() => window.open(src, "_blank", "noopener,noreferrer")}
            className="border-line text-text hover:text-accent hover:border-accent hidden min-h-11 items-center gap-2 rounded-full border px-4 text-sm transition-colors sm:inline-flex"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            {t("openNewTab")}
          </button>

          <a
            href={src}
            download
            className="bg-accent hidden min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium text-on-accent transition-opacity hover:opacity-90 sm:inline-flex"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {t("download")}
          </a>

          <button
            type="button"
            aria-label={t("close")}
            onClick={handleClose}
            className="border-line text-text hover:text-accent hover:border-accent inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* tabIndex -1: the PDF viewer is its own browsing context, so once Tab
            moves inside it the trap's keydown listener stops firing and focus
            leaves the dialog on the following Tab. The document stays reachable
            via "Open in new tab" / "Download". */}
        <iframe
          key={src}
          src={src}
          title={t("title")}
          tabIndex={-1}
          className="bg-bg min-h-0 flex-1 w-full border-0"
        />

        <div className="border-line flex flex-col gap-3 border-t px-5 py-4 sm:flex-row sm:items-center sm:px-6">
          <span className="text-muted text-xs">
            {t("page", { current: 1, total: 2 })}
          </span>
          {/* Mobile: the two actions become full-width buttons in the footer. */}
          <div className="flex flex-col gap-2 sm:hidden">
            <button
              type="button"
              onClick={() => window.open(src, "_blank", "noopener,noreferrer")}
              className="border-line text-text inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border text-sm"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              {t("openNewTab")}
            </button>
            <a
              href={src}
              download
              className="bg-accent inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-medium text-on-accent"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              {t("download")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CvPreviewModal;
