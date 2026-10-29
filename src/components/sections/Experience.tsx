import { getLocale, getTranslations } from 'next-intl/server';
import { ArrowUpRight } from 'lucide-react';

import { experience } from '@/content/experience';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { TechTags } from '@/components/ui/Pill';
import { SectionLabel } from '@/components/ui/SectionLabel';

import { CvButton } from './CvButton';

export async function Experience() {
  const t = await getTranslations('experience');
  const locale = (await getLocale()) as Locale;

  return (
    <section
      id="experience"
      tabIndex={-1}
      aria-labelledby="experience-title"
      className="flex scroll-mt-20 flex-col gap-2 outline-none lg:scroll-mt-8"
    >
      <div className="mb-3">
        <SectionLabel id="experience-title">{t('label')}</SectionLabel>
      </div>
      <ol className="flex flex-col gap-2">
        {experience.map((item) => (
          <li
            key={item.id}
            className={cn(
              'flex flex-col gap-2.5 rounded-xl border p-5 sm:flex-row sm:gap-6',
              item.highlight ? 'border-line bg-surface' : 'border-transparent',
            )}
          >
            <p className="text-muted shrink-0 text-[13px] leading-[1.9] font-medium sm:w-32">
              {item.period[locale]}
            </p>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <h3 className="text-text text-base leading-normal font-semibold lg:text-[17px]">
                {item.title[locale]}
              </h3>
              <p className="text-muted text-[15px] leading-[1.7]">{item.body[locale]}</p>
              <TechTags tags={item.tags} className="mt-1" />
            </div>
          </li>
        ))}
      </ol>
      <CvButton className="text-text hover:text-accent hit-area group mt-0 inline-flex items-center gap-2 self-start px-5 pt-4 text-[15px] leading-[1.4] font-semibold transition-colors">
        {t('viewCv')}
        <ArrowUpRight
          className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
          aria-hidden
        />
      </CvButton>
    </section>
  );
}
