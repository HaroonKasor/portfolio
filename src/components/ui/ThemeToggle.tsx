'use client';

import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { useMounted } from '@/lib/useMounted';
import { cn } from '@/lib/utils';

export type ThemeToggleProps = { className?: string };

export function ThemeToggle({ className }: ThemeToggleProps) {
  const t = useTranslations('common');
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <button
      type="button"
      aria-label={t('themeToggle')}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'border-line text-text hover:bg-accent-soft hover:text-accent inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors',
        className,
      )}
    >
      {/* Rendered only after mount so server and client markup agree. */}
      {mounted ? (
        isDark ? (
          <Sun className="h-4 w-4" aria-hidden />
        ) : (
          <Moon className="h-4 w-4" aria-hidden />
        )
      ) : (
        <span className="h-4 w-4" aria-hidden />
      )}
    </button>
  );
}
