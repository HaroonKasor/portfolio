import type { ReactNode } from 'react';

import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export type NavLinkProps = {
  href: string;
  active?: boolean;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function NavLink({
  href,
  active = false,
  children,
  className,
  onClick,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium transition-colors',
        active ? 'bg-accent-soft text-accent' : 'text-text hover:text-accent',
        className,
      )}
    >
      {children}
    </Link>
  );
}
