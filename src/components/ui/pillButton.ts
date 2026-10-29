import { cn } from '@/lib/utils';

export type PillVariant = 'solid' | 'outline';

const base =
  'inline-flex h-12 items-center justify-center gap-2 rounded-full pr-5 pl-[18px] text-[15px] leading-[1.2] font-medium whitespace-nowrap transition-[opacity,background-color,border-color]';

const variants: Record<PillVariant, string> = {
  solid: 'bg-inverse text-on-inverse hover:opacity-85',
  outline: 'border-line bg-surface text-text hover:border-muted border',
};

/** Class string for the 48px pill buttons; shared by <a> and <button>. */
export function pillButton(variant: PillVariant, className?: string) {
  return cn(base, variants[variant], className);
}
