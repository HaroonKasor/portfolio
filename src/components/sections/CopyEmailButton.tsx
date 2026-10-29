'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check, Copy } from 'lucide-react';

export function CopyEmailButton({ email }: { email: string }) {
  const t = useTranslations('contact');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={t('copyLabel')}
      className="hit-area border-line text-muted hover:text-text hover:border-muted inline-flex items-center gap-1.5 rounded-full border py-1.5 pr-3 pl-2.5 text-[13px] leading-[1.3] transition-colors"
    >
      {copied ? (
        <Check className="size-3.5" aria-hidden />
      ) : (
        <Copy className="size-3.5" aria-hidden />
      )}
      <span aria-live="polite">{copied ? t('copied') : t('copy')}</span>
    </button>
  );
}
