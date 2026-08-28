'use client';

import { ArrowUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

export type BackToTopProps = { className?: string };

const THRESHOLD = 600;

export function BackToTop({ className }: BackToTopProps) {
  const t = useTranslations('common');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function toTop() {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  }

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label={t('backToTop')}
      className={cn(
        'bg-inverse text-on-inverse shadow-float fixed right-5 bottom-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full transition-opacity hover:opacity-90 lg:right-10 lg:bottom-10',
        className,
      )}
    >
      <ArrowUp className="h-5 w-5" aria-hidden />
    </button>
  );
}
