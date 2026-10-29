import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/** Tech tag: strong-accent text on the soft accent fill. */
export function TechTag({ children }: { children: ReactNode }) {
  return (
    <li className="bg-accent-soft text-accent-strong rounded-full px-2.5 py-1 text-xs leading-[1.3] font-medium">
      {children}
    </li>
  );
}

export function TechTags({ tags, className }: { tags: readonly string[]; className?: string }) {
  if (tags.length === 0) return null;
  return (
    <ul className={cn('flex flex-wrap gap-x-1.5 gap-y-2', className)}>
      {tags.map((tag) => (
        <TechTag key={tag}>{tag}</TechTag>
      ))}
    </ul>
  );
}

/** Outlined status pill, e.g. "In development". */
export function StatusPill({ children }: { children: ReactNode }) {
  return (
    <span className="border-line text-muted rounded-full border px-2 py-0.5 text-xs leading-[1.4]">
      {children}
    </span>
  );
}
