import { ImageResponse } from 'next/og';

import { OG_COLORS, OG_CONTENT_TYPE, OG_SIZE, ogFonts, ogImage } from '@/lib/og';
import { SITE_URL } from '@/lib/seo';

export const alt = 'Haroon Kasor — Developer';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Social card per Figma 187:481: identity on the left, the hatch.dev client
 * portal bleeding off the right edge. */
export default async function OpengraphImage() {
  const [fonts, avatar, shot] = await Promise.all([
    ogFonts(),
    ogImage('avatar.jpg'),
    ogImage('hatch-portal.jpg'),
  ]);
  const domain = new URL(SITE_URL).host;

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          background: OG_COLORS.bg,
          fontFamily: 'Outfit',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- satori renders plain <img> */}
        <img
          src={shot}
          alt=""
          width={760}
          height={465}
          style={{
            position: 'absolute',
            left: 600,
            top: 110,
            width: 760,
            height: 465,
            objectFit: 'cover',
            objectPosition: 'top',
            borderRadius: 16,
            border: `1px solid ${OG_COLORS.line}`,
            boxShadow: OG_COLORS.shadow,
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: 72,
            top: 96,
            width: 500,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- satori renders plain <img> */}
          <img src={avatar} alt="" width={96} height={96} style={{ borderRadius: 999 }} />
          <div
            style={{
              marginTop: 32,
              fontSize: 64,
              fontWeight: 600,
              lineHeight: 1.1,
              color: OG_COLORS.text,
            }}
          >
            Haroon Kasor
          </div>
          <div
            style={{
              marginTop: 10,
              fontFamily: 'Prompt',
              fontSize: 26,
              lineHeight: 1.4,
              color: OG_COLORS.muted,
            }}
          >
            ฮารูน กาซอร์
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              fontWeight: 600,
              lineHeight: 1.3,
              color: OG_COLORS.text,
            }}
          >
            Developer
          </div>
          <div style={{ fontSize: 20, lineHeight: 1.6, color: OG_COLORS.muted }}>
            Next.js · React · Java Spring Boot · MySQL
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: 72,
            top: 540,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: 999, background: OG_COLORS.status }} />
          <div style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.4, color: OG_COLORS.text }}>
            {domain}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
