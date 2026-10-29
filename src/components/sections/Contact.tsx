import { getLocale, getTranslations } from 'next-intl/server';
import { FileText } from 'lucide-react';

import { profile } from '@/content/profile';
import type { Locale } from '@/i18n/routing';
import { pillButton } from '@/components/ui/pillButton';
import { SectionLabel } from '@/components/ui/SectionLabel';

import { CopyEmailButton } from './CopyEmailButton';

export async function Contact() {
  const t = await getTranslations('contact');
  const locale = (await getLocale()) as Locale;
  // The CV in the page language is the primary download; the other is offered beside it.
  const other: Locale = locale === 'th' ? 'en' : 'th';

  const channels = [
    { label: t('line'), value: profile.lineId, href: profile.lineUrl },
    { label: t('github'), value: profile.githubUser, href: profile.github },
    {
      label: t('linkedin'),
      value: profile.linkedinHandle,
      href: profile.linkedin,
    },
    { label: t('location'), value: t('locationValue') },
  ];

  return (
    <section
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-title"
      className="flex scroll-mt-20 flex-col gap-7 outline-none lg:scroll-mt-8"
    >
      <SectionLabel heading={false}>{t('label')}</SectionLabel>
      <h2
        id="contact-title"
        className="text-text text-[28px] leading-[1.35] font-semibold whitespace-pre-line lg:text-4xl"
      >
        {t('title')}
      </h2>
      <p className="text-muted max-w-[560px] text-base leading-[1.75] lg:text-[17px]">
        {t('lede')}
      </p>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <a
          href={`mailto:${profile.email}`}
          className="text-text hover:text-accent hit-area text-xl leading-[1.3] font-medium break-all underline decoration-from-font underline-offset-[3px] transition-colors lg:text-2xl"
        >
          {profile.email}
        </a>
        <CopyEmailButton email={profile.email} />
      </div>
      <div className="flex flex-wrap gap-3">
        <a href={profile.cvFiles[locale]} download className={pillButton('solid')}>
          <FileText className="size-4" aria-hidden />
          {t('cvPrimary')}
        </a>
        <a href={profile.cvFiles[other]} download className={pillButton('outline')}>
          <FileText className="size-4" aria-hidden />
          {t('cvSecondary')}
        </a>
      </div>
      <dl className="flex flex-wrap gap-x-8 gap-y-2 leading-normal">
        {channels.map(({ label, value, href }) => (
          <div key={label} className="flex flex-col gap-0.5">
            <dt className="text-muted text-xs">{label}</dt>
            <dd className="text-text text-[15px] font-medium">
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hit-area hover:text-accent transition-colors"
                >
                  {value}
                </a>
              ) : (
                value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
