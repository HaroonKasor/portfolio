import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export type TagProps = { children: ReactNode; className?: string };

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        'border-line text-muted inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium',
        className,
      )}
    >
      {children}
    </span>
  );
}
