import { getLocale, getTranslations } from 'next-intl/server';

import { inHouseWork } from '@/content/experience';
import type { Locale } from '@/i18n/routing';
import { SectionLabel } from '@/components/ui/SectionLabel';

export async function InHouse() {
  const t = await getTranslations('inhouse');
  const locale = (await getLocale()) as Locale;

  return (
    <section aria-labelledby="inhouse-title" className="flex flex-col">
      <SectionLabel id="inhouse-title">{t('label')}</SectionLabel>
      <ul className="border-line mt-4 border-b">
        {inHouseWork.map((item) => (
          <li
            key={item.title.en}
            className="border-line flex flex-col gap-2 border-t py-[22px] sm:flex-row sm:items-start sm:gap-6"
          >
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <h3 className="text-text text-base leading-normal font-semibold lg:text-[17px]">
                {item.title[locale]}
              </h3>
              <p className="text-muted text-sm leading-[1.7]">{item.body[locale]}</p>
            </div>
            {/* Phones join stack and period on one line, as in the mobile frame. */}
            <p className="text-text text-[13px] leading-[1.8] font-medium sm:hidden">
              {item.stack}
              {'  ·  '}
              {item.period}
            </p>
            <p className="text-text hidden w-[132px] shrink-0 text-sm leading-[1.8] font-medium sm:block">
              {item.stack}
            </p>
            <p className="text-muted hidden w-[88px] shrink-0 text-right text-[13px] leading-[1.9] sm:block">
              {item.period}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
