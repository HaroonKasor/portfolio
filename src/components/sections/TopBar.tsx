import { getTranslations } from 'next-intl/server';
import { ArrowLeft } from 'lucide-react';

import { Link } from '@/i18n/navigation';
import { LangToggle } from '@/components/ui/LangToggle';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

/** "← Haroon Kasor" back link plus the language and theme toggles, used by
 * pages outside the home layout (case studies, 404). */
export async function TopBar() {
  const tc = await getTranslations('common');

  return (
    <header className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-4 lg:py-7 lg:pr-12 lg:pl-[120px]">
      <Link
        href="/"
        className="hit-area text-muted hover:text-text inline-flex items-center gap-2 text-[15px] leading-[1.4] font-medium transition-colors"
      >
        <ArrowLeft className="size-4" aria-hidden />
        {tc('siteName')}
      </Link>
      <div className="flex items-center gap-2">
        <LangToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}
