"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { Download, ExternalLink, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PdfViewer } from "@/components/sections/PdfViewer";

type Props = {
  /** Same-origin PDF path (pdf.js cannot fetch cross-origin files). */
  href: string;
  label: string;
  title: string;
  openLabel: string;
  loadingLabel: string;
  closeLabel: string;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function visibleFocusable(root: HTMLElement | null): HTMLElement[] {
  if (!root) return [];
  return [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
    (el) => el.offsetParent !== null || el.getClientRects().length > 0,
  );
}

/**
 * "Project report" button that opens the PDF in the same modal shell as the
 * CV preview: pdf.js pages, page counter, open-in-new-tab and download.
 */
export function ReportModalButton(props: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="ghost"
        size="lg"
        onClick={() => setOpen(true)}
        icon={<FileText aria-hidden="true" className="h-4 w-4" />}
      >
        {props.label}
      </Button>
      {open
        ? createPortal(
            <ReportDialog {...props} onClose={() => setOpen(false)} />,
            document.body,
          )
        : null}
    </>
  );
}

function ReportDialog({
  href,
  title,
  openLabel,
  loadingLabel,
  closeLabel,
  onClose,
}: Props & { onClose: () => void }) {
  const t = useTranslations("cv");
  const td = useTranslations("detail");
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);
  const handlePages = useCallback((n: number) => {
    setPages(n);
    setPage(1);
  }, []);
  const handleClose = useCallback(() => onClose(), [onClose]);

  // Focus management + Esc + Tab trap, mirroring CvPreviewModal.
  useEffect(() => {
    openerRef.current = document.activeElement as HTMLElement | null;
    visibleFocusable(panelRef.current)[0]?.focus();
    return () => openerRef.current?.focus?.();
  }, []);
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
      const active = document.activeElement as HTMLElement | null;
      const index = active ? nodes.indexOf(active) : -1;
      if (e.shiftKey) {
        if (index <= 0) {
          e.preventDefault();
          nodes[nodes.length - 1].focus();
        }
        return;
      }
      if (index === -1 || index >= nodes.length - 1) {
        e.preventDefault();
        nodes[0].focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [handleClose]);
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

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
        aria-label={title}
        className="overlay-in bg-surface flex h-[92vh] w-full max-w-[900px] flex-col overflow-hidden rounded-t-[24px] shadow-[var(--shadow-float)] sm:h-[88vh] sm:rounded-[20px]"
      >
        <div className="flex justify-center pt-3 sm:hidden" aria-hidden="true">
          <span className="bg-line h-1 w-10 rounded-full" />
        </div>

        <div className="border-line flex flex-wrap items-center gap-3 border-b px-5 py-4 sm:px-6">
          <h2 className="text-text mr-auto text-base font-semibold sm:text-lg">
            {title}
          </h2>
          <button
            type="button"
            aria-label={openLabel}
            onClick={() => window.open(href, "_blank", "noopener,noreferrer")}
            className="border-line text-text hover:text-accent hover:border-accent hidden min-h-11 items-center gap-2 rounded-full border px-4 text-sm transition-colors sm:inline-flex"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            {openLabel}
          </button>
          <a
            href={href}
            download
            className="bg-accent hidden min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium text-on-accent transition-opacity hover:opacity-90 sm:inline-flex"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {t("download")}
          </a>
          <button
            type="button"
            aria-label={closeLabel}
            onClick={handleClose}
            className="border-line text-text hover:text-accent hover:border-accent inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <PdfViewer
          src={href}
          title={title}
          loadingLabel={loadingLabel}
          onPages={handlePages}
          onPageChange={setPage}
        />

        <div className="border-line flex flex-col gap-3 border-t px-5 py-4 sm:flex-row sm:items-center sm:px-6">
          <span className="text-text text-sm font-medium">
            {t("page", { current: page, total: pages || 1 })}
          </span>
          <span className="text-muted text-xs sm:ml-auto">
            {td("reportMeta", { size: td("reportSize"), pages })}
          </span>
          <div className="flex flex-col gap-2 sm:hidden">
            <button
              type="button"
              onClick={() => window.open(href, "_blank", "noopener,noreferrer")}
              className="border-line text-text inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border text-sm"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              {openLabel}
            </button>
            <a
              href={href}
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

export default ReportModalButton;
