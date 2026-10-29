'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';

import { usePathname, useRouter } from '@/i18n/navigation';
import type { AppLocale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export type LangToggleProps = { className?: string };

// Figma lists TH before EN in every frame.
const ORDER: readonly AppLocale[] = ['th', 'en'];

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
        { locale, scroll: false },
      );
    });
  }

  return (
    <div
      role="group"
      aria-label={t('langToggle')}
      className={cn(
        'border-line bg-surface inline-flex items-center gap-0.5 rounded-full border p-[3px]',
        isPending && 'opacity-70',
        className,
      )}
    >
      {ORDER.map((locale) => (
        <button
          key={locale}
          type="button"
          aria-label={t(`langName.${locale}`)}
          onClick={() => switchTo(locale)}
          aria-pressed={locale === active}
          className={cn(
            'hit-area rounded-full px-2.5 py-[5px] text-xs leading-[1.2] font-semibold uppercase transition-colors',
            locale === active ? 'bg-inverse text-on-inverse' : 'text-muted hover:text-text',
          )}
        >
          {locale}
        </button>
      ))}
    </div>
  );
}
