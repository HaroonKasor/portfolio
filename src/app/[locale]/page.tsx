import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { routing } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Experience } from '@/components/sections/Experience';
import { GitHubRepos } from '@/components/sections/GitHubRepos';
import { InHouse } from '@/components/sections/InHouse';
import { Intro } from '@/components/sections/Intro';
import { MobileMenu } from '@/components/sections/MobileMenu';
import { SiteFooter } from '@/components/sections/SiteFooter';
import { Work } from '@/components/sections/Work';
import { LangToggle } from '@/components/ui/LangToggle';
import { Reveal } from '@/components/ui/Reveal';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: 'meta' });

  // Canonical, hreflang alternates and metadataBase all come from buildMetadata;
  // the OG image itself is picked up from the file-based opengraph-image route.
  return buildMetadata(locale, {
    title: t('title'),
    description: t('description'),
    useTemplate: false,
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tn = await getTranslations({ locale, namespace: 'nav' });

  return (
    <div className="relative mx-auto w-full max-w-[1440px] px-5 pb-12 sm:px-10 lg:flex lg:gap-16 lg:px-12 lg:py-0 xl:gap-[120px] xl:px-[120px]">
      {/* Sticky on phones/tablets so navigation is always one tap away. */}
      <nav
        aria-label={tn('tools')}
        className="bg-bg sticky top-0 z-30 -mx-5 mb-2.5 flex items-center justify-end gap-2 px-5 py-4 sm:-mx-10 sm:px-10 lg:absolute lg:top-8 lg:right-12 lg:z-10 lg:m-0 lg:bg-transparent lg:p-0"
      >
        <LangToggle />
        <ThemeToggle />
        <MobileMenu />
      </nav>

      <Intro />

      <div className="mt-[72px] flex min-w-0 flex-1 flex-col lg:mt-0 lg:max-w-[640px] lg:pt-[112px] lg:pb-16">
        <main id="content" tabIndex={-1} className="flex flex-col gap-[88px] outline-none lg:gap-[120px]">
          <Reveal>
            <About />
          </Reveal>
          <Reveal>
            <Experience />
          </Reveal>
          <Work />
          <Reveal>
            <InHouse />
          </Reveal>
          <Reveal>
            <GitHubRepos />
          </Reveal>
          <Reveal>
            <Contact />
          </Reveal>
        </main>
        <SiteFooter className="mt-[88px] lg:mt-[120px]" />
      </div>
    </div>
  );
}
