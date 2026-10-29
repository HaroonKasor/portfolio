"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { lockScroll } from "@/lib/overlays";
import { cn } from "@/lib/utils";

/**
 * Bordered screenshot that opens full size in a native <dialog>. The dialog
 * gives focus trapping, Esc to close and a backdrop for free; the large image
 * is only mounted while it is open so it never competes with the page load.
 */
export function ZoomImage({
  src,
  alt,
  sizes,
  aspect,
  preload,
  className,
  openLabel,
  closeLabel,
}: {
  src: string;
  alt: string;
  sizes: string;
  /** Tailwind aspect-ratio class, e.g. `aspect-[680/416]`. */
  aspect: string;
  preload?: boolean;
  className?: string;
  openLabel: string;
  closeLabel: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // showModal() leaves the page scrollable behind the backdrop.
  useEffect(() => (open ? lockScroll() : undefined), [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${openLabel}: ${alt}`}
        className={cn(
          "border-line relative block w-full cursor-zoom-in overflow-hidden rounded-xl border",
          aspect,
          className,
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          preload={preload}
          sizes={sizes}
          className="object-cover object-top"
        />
      </button>
      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
        aria-label={alt}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-scrim"
      >
        {open ? (
          <div className="relative h-[88vh] w-[92vw] max-w-[1600px]">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="92vw"
              className="object-contain"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="hit-area bg-surface text-text absolute top-0 right-0 rounded-full px-4 py-2 text-sm font-medium"
            >
              {closeLabel}
            </button>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
