"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SkeletonImage } from "@/components/ui/SkeletonImage";
import { X } from "lucide-react";

type Props = {
  src: string;
  alt: string;
  /** Accessible name for the trigger, e.g. "View full-size screenshot: Course library". */
  openLabel: string;
  closeLabel: string;
};

/**
 * Thumbnail button that opens the same screenshot full-size in a native <dialog>.
 * Closes on Esc (browser default), backdrop click, or the close button.
 */
export function ShotLightbox({ src, alt, openLabel, closeLabel }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const show = useCallback(() => {
    setOpen(true);
    dialogRef.current?.showModal();
  }, []);

  const hide = useCallback(() => {
    dialogRef.current?.close();
  }, []);

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
      <button
        type="button"
        onClick={show}
        aria-label={openLabel}
        className="border-line bg-surface group relative block aspect-[720/440] w-full cursor-zoom-in overflow-hidden rounded-2xl border shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-float)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <SkeletonImage
          src={src}
          alt={alt}
          sizes="(min-width: 768px) 720px, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </button>

      <dialog
        ref={dialogRef}
        onClick={(e) => {
          if (e.target === e.currentTarget) hide();
        }}
        className="overlay-in m-auto max-h-none max-w-none overflow-visible rounded-2xl border-0 bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      >
        <div className="relative">
          {open && !loaded ? (
            <div
              aria-hidden="true"
              className="skeleton absolute inset-0 rounded-2xl"
            />
          ) : null}
          <button
            type="button"
            onClick={hide}
            aria-label={closeLabel}
            className="bg-surface text-text absolute top-3 right-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full shadow-[var(--shadow-float)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <X className="h-5 w-5" />
          </button>
          {open ? (
            <Image
              src={src}
              alt={alt}
              width={1440}
              height={880}
              sizes="94vw"
              onLoad={() => setLoaded(true)}
              className={[
                "border-line block h-auto max-h-[90vh] w-auto max-w-[94vw] rounded-2xl border object-contain transition-opacity duration-300",
                loaded ? "opacity-100" : "opacity-0",
              ].join(" ")}
              priority
            />
          ) : null}
        </div>
      </dialog>
    </>
  );
}

export default ShotLightbox;
