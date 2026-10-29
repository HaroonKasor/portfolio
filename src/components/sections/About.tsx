import { getTranslations } from 'next-intl/server';

import { dailyStack } from '@/content/skills';
import { SectionLabel } from '@/components/ui/SectionLabel';

export async function About() {
  const t = await getTranslations('about');

  return (
    <section
      id="about"
      tabIndex={-1}
      aria-labelledby="about-title"
      className="flex scroll-mt-20 flex-col gap-7 outline-none lg:scroll-mt-8"
    >
      <SectionLabel id="about-title">{t('label')}</SectionLabel>
      <p className="text-muted text-base leading-[1.8] lg:text-[17px]">{t('p1')}</p>
      <p className="text-muted text-base leading-[1.8] lg:text-[17px]">{t('p2')}</p>
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-baseline sm:gap-4">
        <p className="text-muted shrink-0 text-sm leading-[1.6]">{t('dailyStack')}</p>
        <p className="text-text text-[15px] leading-normal font-medium">{dailyStack.join(' · ')}</p>
      </div>
    </section>
  );
}
