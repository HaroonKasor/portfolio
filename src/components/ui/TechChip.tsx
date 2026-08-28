import * as simpleIcons from 'simple-icons';

import { cn } from '@/lib/utils';

export type TechChipProps = { name: string; slug: string; className?: string };

type SimpleIcon = { title: string; slug: string; path: string; hex: string };

/** Monochrome brand marks that would vanish against the opposite theme —
 * render these with `currentColor` so they invert in dark mode. */
const ADAPTIVE = new Set([
  'nextdotjs',
  'github',
  'prisma',
  // Same problem as the three above: simple-icons gives openjdk #000000,
  // which disappears against the dark background.
  'openjdk',
]);

function toIconKey(slug: string): string {
  return `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
}

function getIcon(slug: string): SimpleIcon | undefined {
  const icons = simpleIcons as unknown as Record<string, SimpleIcon | undefined>;
  return icons[toIconKey(slug)];
}

function lettermark(name: string): string {
  const words = name.replace(/[^\p{L}\p{N} ]/gu, ' ').split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.replace(/[^\p{L}\p{N}]/gu, '').slice(0, 2).toUpperCase();
}

export function TechChip({ name, slug, className }: TechChipProps) {
  const icon = getIcon(slug);
  const adaptive = ADAPTIVE.has(slug);

  return (
    <span
      className={cn(
        'border-line bg-surface text-text inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium',
        className,
      )}
    >
      {icon ? (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0"
          fill={adaptive ? 'currentColor' : `#${icon.hex}`}
          aria-hidden
        >
          <path d={icon.path} />
        </svg>
      ) : (
        <span
          className="bg-accent-soft text-accent flex h-4 w-4 shrink-0 items-center justify-center rounded-sm text-[8px] leading-none font-bold"
          aria-hidden
        >
          {lettermark(name)}
        </span>
      )}
      {name}
    </span>
  );
}
