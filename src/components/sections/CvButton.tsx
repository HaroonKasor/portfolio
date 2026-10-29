'use client';

import { useState, type ReactNode } from 'react';

import { CvPreviewModal } from './CvPreviewModal';

/** Any control that opens the CV preview. Each trigger owns its dialog; the
 * dialog only mounts while open, so several triggers on a page cost nothing. */
export function CvButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        className={className}
        onClick={() => setOpen(true)}
      >
        {children}
      </button>
      <CvPreviewModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
