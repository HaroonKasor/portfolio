import { getTranslations } from 'next-intl/server';

import { cn } from '@/lib/utils';

import { LocalTime } from './LocalTime';

export async function SiteFooter({
  className,
  divider = true,
}: {
  className?: string;
  /** Case pages end on the Next-project rule, so they drop the footer's own. */
  divider?: boolean;
}) {
  const t = await getTranslations('footer');

  return (
    <footer
      className={cn(
        'text-muted flex justify-between gap-4 text-[13px] leading-normal',
        divider && 'border-line border-t pt-6',
        className,
      )}
    >
      <p>{t('copyright')}</p>
      <LocalTime />
    </footer>
  );
}
