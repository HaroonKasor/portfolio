import { ImageResponse } from 'next/og';
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { getProject, projects } from '@/content/projects';
import { routing, type Locale } from '@/i18n/routing';
import { OG_COLORS, OG_CONTENT_TYPE, OG_SIZE, ogFonts, ogImage } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

/** Declared here (rather than `export const alt`) so the alt text follows the
 * page locale. */
export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const typedLocale: Locale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const t = await getTranslations({ locale: typedLocale, namespace: 'case' });
  const project = getProject(slug);
  return [
    {
      id: 'default',
      alt: t('ogAlt', { name: project?.title ?? slug }),
      size,
      contentType,
    },
  ];
}

export default async function ProjectOpengraphImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const typedLocale: Locale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const project = getProject(slug);
  const [fonts, avatar] = await Promise.all([ogFonts(), ogImage('avatar.jpg')]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: OG_COLORS.bg,
          fontFamily: 'Outfit',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- satori renders plain <img> */}
          <img src={avatar} alt="" width={56} height={56} style={{ borderRadius: 999 }} />
          <div style={{ fontSize: 26, fontWeight: 600, color: OG_COLORS.text }}>Haroon Kasor</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {project ? (
            <div style={{ fontFamily: 'Prompt', fontSize: 24, color: OG_COLORS.muted }}>
              {project.meta[typedLocale]}
            </div>
          ) : null}
          <div style={{ fontSize: 88, fontWeight: 600, lineHeight: 1.1, color: OG_COLORS.text }}>
            {project?.title ?? 'Haroon Kasor'}
          </div>
          {project ? (
            <div
              style={{
                fontFamily: 'Prompt',
                fontSize: 28,
                lineHeight: 1.5,
                color: OG_COLORS.muted,
              }}
            >
              {project.lede[typedLocale]}
            </div>
          ) : null}
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
