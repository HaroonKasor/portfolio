'use client';

import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { useMounted } from '@/lib/useMounted';

import { IconButton } from './IconButton';

export type ThemeToggleProps = { className?: string };

export function ThemeToggle({ className }: ThemeToggleProps) {
  const t = useTranslations('common');
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <IconButton
      label={t('themeToggle')}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={className}
    >
      {/* Rendered only after mount so server and client markup agree. */}
      {mounted ? (
        isDark ? (
          <Sun className="size-4" aria-hidden />
        ) : (
          <Moon className="size-4" aria-hidden />
        )
      ) : (
        <span className="size-4" aria-hidden />
      )}
    </IconButton>
  );
}
