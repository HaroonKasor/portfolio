'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';

import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, type AppLocale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export type LangToggleProps = { className?: string };

export function LangToggle({ className }: LangToggleProps) {
  const t = useTranslations('common');
  const active = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function switchTo(locale: AppLocale) {
    if (locale === active) return;

    startTransition(() => {
      router.replace(
        // `pathname` is locale-agnostic; dynamic segments come from `params`.
        { pathname, params } as never,
        { locale },
      );
    });
  }

  return (
    <div
      role="group"
      aria-label={t('langToggle')}
      className={cn(
        'border-line inline-flex h-11 items-center rounded-full border p-1',
        isPending && 'opacity-70',
        className,
      )}
    >
      {locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => switchTo(locale)}
          aria-pressed={locale === active}
          className={cn(
            'inline-flex h-9 min-w-11 items-center justify-center rounded-full px-3 text-xs font-semibold uppercase transition-colors',
            locale === active
              ? 'bg-accent text-white'
              : 'text-muted hover:text-accent',
          )}
        >
          {locale}
        </button>
      ))}
    </div>
  );
}
