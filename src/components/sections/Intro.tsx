import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { FileText, Mail, MessageCircle } from 'lucide-react';

import { profile } from '@/content/profile';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';
import { pillButton } from '@/components/ui/pillButton';

import { CvButton } from './CvButton';
import { ScrollSpyNav } from './ScrollSpyNav';

/** Left column: sticky beside the content on desktop, the page header on phones. */
export async function Intro() {
  const t = await getTranslations('intro');
  const tc = await getTranslations('common');

  const socials = [
    {
      href: profile.github,
      label: t('github'),
      icon: GithubIcon,
      external: true,
    },
    {
      href: profile.linkedin,
      label: t('linkedin'),
      icon: LinkedinIcon,
      external: true,
    },
    {
      href: `mailto:${profile.email}`,
      label: t('email'),
      icon: Mail,
      external: false,
    },
    {
      href: profile.lineUrl,
      label: t('line'),
      icon: MessageCircle,
      external: true,
    },
  ];

  return (
    <header className="flex flex-col gap-8 lg:sticky lg:top-0 lg:-ml-1 lg:h-dvh lg:w-[360px] lg:shrink-0 lg:[scrollbar-width:none] lg:justify-between lg:gap-10 lg:overflow-y-auto lg:pt-[min(112px,12vh)] lg:pb-14 lg:pl-1 xl:w-[440px]">
      <div className="flex flex-col">
        <Image
          src={profile.avatar}
          alt={t('avatarAlt')}
          width={72}
          height={72}
          preload
          className="size-16 rounded-full object-cover lg:size-[72px]"
        />
        <h1 className="text-text mt-6 text-[34px] leading-[1.25] font-semibold lg:text-[52px]">
          {tc('siteName')}
        </h1>
        <p className="text-text text-lg leading-[1.4] font-medium lg:text-[22px]">{tc('role')}</p>
        <p className="text-muted mt-5 max-w-[400px] text-base leading-[1.7] whitespace-pre-line lg:text-[17px]">
          {t('intent')}
        </p>
        <ul className="mt-7 flex flex-col gap-2.5">
          {[t('statusJob'), t('statusOpen')].map((line) => (
            <li
              key={line}
              className="text-text flex items-center gap-2.5 text-[15px] leading-normal"
            >
              <span aria-hidden className="bg-status size-2 shrink-0 rounded-full" />
              {line}
            </li>
          ))}
        </ul>
        <div className="mt-14 hidden lg:block">
          <ScrollSpyNav />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-3">
          <CvButton className={pillButton('solid')}>
            <FileText className="size-4" aria-hidden />
            {t('viewCv')}
          </CvButton>
          <a href={`mailto:${profile.email}`} className={pillButton('outline')}>
            <Mail className="size-4" aria-hidden />
            {t('emailMe')}
          </a>
        </div>
        <ul className="flex flex-wrap gap-2">
          {socials.map(({ href, label, icon: Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="text-muted hover:text-text hover:bg-surface hit-area flex h-10 items-center gap-2 rounded-full pr-3.5 pl-3 text-sm leading-[1.2] transition-colors"
              >
                <Icon className="size-4" aria-hidden />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
