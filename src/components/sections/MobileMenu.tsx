"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight, X } from "lucide-react";
import { LangToggle } from "@/components/ui/LangToggle";
import { GITHUB_URL } from "@/lib/github";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

type MenuItem = {
  index: string;
  key: "about" | "experience" | "work" | "contact" | "github";
  href: string;
  external?: boolean;
};

const ITEMS: MenuItem[] = [
  { index: "01", key: "about", href: "#about" },
  { index: "02", key: "experience", href: "#experience" },
  { index: "03", key: "work", href: "#work" },
  { index: "04", key: "contact", href: "#contact" },
  { index: "05", key: "github", href: GITHUB_URL, external: true },
];

export function MobileMenu({
  open,
  onClose,
  onOpenCv,
}: {
  open: boolean;
  onClose: () => void;
  onOpenCv: () => void;
}) {
  const t = useTranslations("nav");
  const tc = useTranslations("contact");
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    openerRef.current = document.activeElement as HTMLElement | null;
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    return () => openerRef.current?.focus?.();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={t("menu")}
      className="bg-bg fixed inset-0 z-[55] flex flex-col overflow-y-auto lg:hidden"
    >
      <div className="flex items-center justify-between px-5 py-5">
        <span className="text-text text-[15px] font-semibold">Haroon Kasor</span>
        <button
          type="button"
          aria-label={t("close")}
          onClick={onClose}
          className="border-line text-text inline-flex h-11 w-11 items-center justify-center rounded-full border"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col px-5">
        {ITEMS.map((item) => {
          const label = t(item.key);
          const inner = (
            <>
              <span className="text-muted w-10 text-xs font-semibold tracking-widest">
                {item.index}
              </span>
              <span className="text-text flex-1 text-[28px] font-semibold tracking-tight">
                {label}
              </span>
              <ArrowUpRight className="text-muted h-6 w-6" aria-hidden="true" />
            </>
          );
          const cls =
            "border-line flex min-h-[72px] items-center gap-4 border-b py-4";
          return item.external ? (
            <a
              key={item.key}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className={cls}
            >
              {inner}
            </a>
          ) : (
            <a key={item.key} href={item.href} onClick={onClose} className={cls}>
              {inner}
            </a>
          );
        })}

        <div className="flex items-center justify-between gap-3 py-6">
          <LangToggle />
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenCv();
            }}
            className="bg-inverse text-on-inverse inline-flex min-h-11 flex-1 items-center justify-center rounded-full px-5 text-sm font-medium"
          >
            {t("cv")}
          </button>
        </div>
      </nav>

      <div className="text-muted flex flex-col gap-1 px-5 pb-8 text-sm">
        <a href={`mailto:${tc("email")}`} className="hover:text-accent">
          {tc("email")}
        </a>
        <span>{tc("phoneValue")}</span>
        <span>{tc("locationValue")}</span>
      </div>
    </div>
  );
}

export default MobileMenu;
