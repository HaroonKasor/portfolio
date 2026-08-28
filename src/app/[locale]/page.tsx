import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

// Placeholder home page — Agent B replaces this with the real sections.
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations('hero');

  return (
    <main className="flex flex-1 flex-col justify-center gap-4 px-5 py-24 md:px-10 lg:px-20">
      <p className="text-muted text-sm tracking-widest">{t('tag')}</p>
      <h1 className="text-text text-5xl font-bold md:text-7xl">
        {t('headline.line1')}
      </h1>
      <p className="text-text text-4xl md:text-6xl">{t('headline.line2')}</p>
      <p className="text-accent text-4xl font-bold md:text-6xl">
        {t('headline.line3')}
      </p>
      <p className="text-muted max-w-xl text-lg">{t('subtitle')}</p>
    </main>
  );
}
