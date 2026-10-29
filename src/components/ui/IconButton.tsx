import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/** Round 34px outlined icon button (theme, menu, close). */
export function IconButton({
  label,
  onClick,
  children,
  className,
  expanded,
  controls,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  className?: string;
  expanded?: boolean;
  controls?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-expanded={expanded}
      aria-controls={controls}
      onClick={onClick}
      className={cn(
        'hit-area border-line bg-surface text-text hover:bg-bg inline-flex items-center justify-center rounded-full border p-2 transition-colors',
        className,
      )}
    >
      {children}
    </button>
  );
}
