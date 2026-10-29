import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';

import { projects } from '@/content/projects';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { StatusPill, TechTags } from '@/components/ui/Pill';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Reveal } from '@/components/ui/Reveal';

export async function Work() {
  const t = await getTranslations('work');
  const locale = (await getLocale()) as Locale;

  return (
    <section
      id="work"
      tabIndex={-1}
      aria-labelledby="work-title"
      className="flex scroll-mt-20 flex-col gap-[72px] outline-none lg:scroll-mt-8"
    >
      <SectionLabel id="work-title">{t('label')}</SectionLabel>
      {projects.map((project) => {
        const href = `/projects/${project.slug}`;
        return (
          <Reveal as="article" key={project.slug} className="flex flex-col">
            {/* Duplicate of the text link below, so it is skipped by keyboard
                and screen readers. */}
            <Link
              href={href}
              tabIndex={-1}
              aria-hidden
              className="border-line group relative block aspect-[640/391] overflow-hidden rounded-xl border"
            >
              <Image
                src={project.cover}
                alt=""
                fill
                sizes="(min-width: 1024px) 640px, (min-width: 640px) calc(100vw - 80px), calc(100vw - 40px)"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.015] motion-reduce:transition-none"
              />
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <p className="text-muted text-[13px] leading-normal">{project.cardMeta[locale]}</p>
              {project.badge ? <StatusPill>{project.badge[locale]}</StatusPill> : null}
            </div>
            <h3 className="text-text mt-2 text-2xl leading-[1.3] font-semibold lg:text-[28px]">
              <Link href={href} className="hit-area hover:text-accent transition-colors">
                {project.title}
              </Link>
            </h3>
            <p className="text-muted mt-2.5 text-base leading-[1.75] lg:max-w-[600px]">
              {project.summary[locale]}
            </p>
            <dl className="mt-3 flex flex-col gap-2.5 text-sm leading-[1.6] sm:flex-row sm:gap-3 lg:max-w-[600px]">
              <dt className="text-text shrink-0 font-medium">{t('role')}</dt>
              <dd className="text-muted">{project.cardRole[locale]}</dd>
            </dl>
            <TechTags tags={project.tags} className="mt-4" />
            <Link
              href={href}
              className="text-accent hit-area group mt-5 inline-flex items-center gap-2 self-start text-[15px] leading-[1.4] font-semibold"
            >
              {t('readCase', { name: project.shortTitle })}
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                aria-hidden
              />
            </Link>
          </Reveal>
        );
      })}
    </section>
  );
}
