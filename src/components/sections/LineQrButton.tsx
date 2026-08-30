"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ExternalLink, QrCode, X } from "lucide-react";
import { profile } from "@/content/profile";

/**
 * Contact-card LINE entry: the ID is a plain link (opens the LINE app on a
 * phone), and the QR button opens a native <dialog> with an inline SVG code
 * so a desktop visitor can scan it. Closes on Esc, backdrop click or the X.
 */
export function LineQrButton() {
  const t = useTranslations("contact");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const show = useCallback(() => {
    setOpen(true);
    dialogRef.current?.showModal();
  }, []);
  const hide = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    const onClose = () => {
      setOpen(false);
      setLoaded(false);
    };
    el.addEventListener("close", onClose);
    return () => el.removeEventListener("close", onClose);
  }, []);

  return (
    <>
      <span className="inline-flex items-center gap-2">
        <a
          href={profile.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text hover:text-accent text-sm transition-colors"
        >
          {t("lineValue")}
        </a>
        <button
          type="button"
          onClick={show}
          aria-label={t("lineShowQr")}
          className="border-line text-muted hover:border-accent hover:text-accent focus-visible:outline-accent inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <QrCode className="h-4 w-4" />
        </button>
      </span>

      <dialog
        ref={dialogRef}
        onClick={(e) => {
          if (e.target === e.currentTarget) hide();
        }}
        aria-label={t("lineQrTitle")}
        className="overlay-in bg-surface text-text m-auto max-w-none overflow-visible rounded-2xl border-0 p-0 shadow-[var(--shadow-float)] backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        <div className="flex w-[min(360px,90vw)] flex-col items-center gap-4 p-6 text-center">
          <div className="flex w-full items-center justify-between">
            <h3 className="text-base font-semibold">{t("lineQrTitle")}</h3>
            <button
              type="button"
              onClick={hide}
              aria-label={t("close")}
              className="text-muted hover:text-text focus-visible:outline-accent inline-flex h-9 w-9 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="relative h-[220px] w-[220px]">
            {!loaded ? (
              <div
                aria-hidden="true"
                className="skeleton absolute inset-0 rounded-xl"
              />
            ) : null}
            {open ? (
              // Official QR from the LINE app (add-friend link); white
              // frame keeps it scannable in dark mode.
              <Image
                src={profile.lineQr}
                alt={t("lineShowQr")}
                width={220}
                height={220}
                unoptimized
                onLoad={() => setLoaded(true)}
                className={[
                  "rounded-xl bg-white p-3 transition-opacity duration-300",
                  loaded ? "opacity-100" : "opacity-0",
                ].join(" ")}
              />
            ) : null}
          </div>
          <p className="text-muted text-sm">{t("lineQrHint")}</p>
          <a
            href={profile.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-on-accent focus-visible:outline-accent inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-medium hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <ExternalLink className="h-4 w-4" />
            {t("lineOpen")}
          </a>
        </div>
      </dialog>
    </>
  );
}

export default LineQrButton;
