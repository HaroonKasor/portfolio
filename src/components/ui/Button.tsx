import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export type ButtonVariant = 'accent' | 'ghost' | 'dark';
export type ButtonSize = 'md' | 'lg';

export type ButtonProps = {
  variant: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  icon?: ReactNode;
  iconRight?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  'aria-label'?: string;
  /** Only used when `href` is external; defaults are applied automatically. */
  target?: string;
  rel?: string;
};

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-medium transition-colors transition-shadow disabled:pointer-events-none disabled:opacity-50';

const sizes: Record<ButtonSize, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-14 px-7 text-base',
};

const variants: Record<ButtonVariant, string> = {
  accent:
    'bg-accent text-on-accent shadow-accent hover:brightness-110 focus-visible:outline-accent',
  ghost:
    'border border-line bg-transparent text-text hover:bg-accent-soft hover:border-accent focus-visible:outline-accent',
  dark: 'bg-inverse text-on-inverse hover:opacity-90 focus-visible:outline-accent',
};

export function Button({
  variant,
  size = 'md',
  href,
  icon,
  iconRight = false,
  className,
  children,
  onClick,
  type = 'button',
  disabled,
  'aria-label': ariaLabel,
  target,
  rel,
}: ButtonProps) {
  const classes = cn(base, sizes[size], variants[variant], className);

  const content = (
    <>
      {icon && !iconRight ? <span aria-hidden>{icon}</span> : null}
      <span>{children}</span>
      {icon && iconRight ? <span aria-hidden>{icon}</span> : null}
    </>
  );

  if (href) {
    const external = /^(https?:|mailto:|tel:)/.test(href);

    if (external) {
      return (
        <a
          href={href}
          className={classes}
          aria-label={ariaLabel}
          {...(href.startsWith('http')
            ? { target: target ?? '_blank', rel: rel ?? 'noopener noreferrer' }
            : { target, rel })}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
