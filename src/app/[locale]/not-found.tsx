import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { ArrowRight, House } from 'lucide-react';

import { projects } from '@/content/projects';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { pillButton } from '@/components/ui/pillButton';
import { TopBar } from '@/components/sections/TopBar';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'notFound' });
  const tc = await getTranslations({ locale, namespace: 'common' });
  return { title: `${t('title')} — ${tc('siteName')}`, robots: { index: false, follow: true } };
}

export default async function LocaleNotFound() {
  const t = await getTranslations('notFound');
  const tc = await getTranslations('common');
  const locale = (await getLocale()) as Locale;

  return (
    <>
      {/* generateMetadata only reaches the server HTML for not-found; React hoists this so the tab title survives hydration. */}
      <title>{`${t('title')} — ${tc('siteName')}`}</title>
      <TopBar />
      <main
        id="content"
        className="mx-auto flex w-full max-w-[560px] flex-1 flex-col items-center px-5 pt-[72px] pb-20 text-center lg:pt-[150px]"
      >
        <p className="text-accent text-[15px] leading-[1.4] font-medium">{t('code')}</p>
        <h1 className="text-text mt-3 text-[34px] leading-[1.3] font-semibold lg:text-5xl">
          {t('title')}
        </h1>
        <p className="text-muted mt-3 text-base leading-[1.75] whitespace-pre-line lg:text-[17px]">
          {t('body')}
        </p>
        <Link href="/" className={pillButton('solid', 'mt-8')}>
          <House className="size-4" aria-hidden />
          {t('backHome')}
        </Link>

        <nav aria-labelledby="notfound-work" className="mt-14 w-full text-left">
          <h2 id="notfound-work" className="text-text pb-3 text-sm leading-[1.4] font-semibold">
            {t('work')}
          </h2>
          <ul>
            {projects.map((project) => (
              <li key={project.slug} className="border-line border-t">
                <Link
                  href={`/projects/${project.slug}`}
                  className="group flex items-center justify-between gap-4 py-4"
                >
                  <span className="flex min-w-0 items-center gap-4 leading-[1.4]">
                    <span className="text-text group-hover:text-accent shrink-0 text-base font-semibold transition-colors">
                      {project.title}
                    </span>
                    <span className="text-muted truncate text-sm">{project.tagline[locale]}</span>
                  </span>
                  <ArrowRight
                    className="text-muted group-hover:text-text size-4 shrink-0 transition-[color,transform] group-hover:translate-x-0.5 motion-reduce:transition-none"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>
    </>
  );
}
