import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import { projects, getProject } from "@/content/projects";
import { OG_COLORS, OG_SIZE, OG_CONTENT_TYPE, ogFonts } from "@/lib/og";

export const alt = "Haroon Kasor — project";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectOpengraphImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const typedLocale: Locale = hasLocale(routing.locales, locale)
    ? (locale as Locale)
    : routing.defaultLocale;

  const project = getProject(slug);
  const title = project?.title[typedLocale] ?? "Haroon Kasor";
  const summary = project?.summary[typedLocale] ?? "";
  const tags = project?.tags.join(" · ") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: OG_COLORS.gradient,
          fontFamily: "Outfit",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 16,
              background: OG_COLORS.text,
              color: OG_COLORS.surface,
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            HK
          </div>
          <div style={{ display: "flex", fontSize: 26, color: OG_COLORS.muted }}>
            haroonkasor.dev
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {tags ? (
            <div
              style={{
                display: "flex",
                fontSize: 24,
                fontWeight: 600,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: OG_COLORS.accent,
              }}
            >
              {tags}
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              fontFamily: "Prompt",
              fontSize: 76,
              fontWeight: 700,
              color: OG_COLORS.text,
              lineHeight: 1.12,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Prompt",
            fontSize: 28,
            fontWeight: 400,
            color: OG_COLORS.muted,
            lineHeight: 1.4,
          }}
        >
          {summary.length > 150 ? `${summary.slice(0, 150)}…` : summary}
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
