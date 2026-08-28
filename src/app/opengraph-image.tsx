import { ImageResponse } from "next/og";
import { OG_COLORS, OG_SIZE, OG_CONTENT_TYPE, ogFonts } from "@/lib/og";

export const alt = "Haroon Kasor — Full-stack Developer";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OpengraphImage() {
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

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Prompt",
              fontSize: 88,
              fontWeight: 700,
              color: OG_COLORS.text,
              lineHeight: 1.1,
            }}
          >
            ฮารูน กาซอร์
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 88,
              fontWeight: 700,
              color: OG_COLORS.text,
              lineHeight: 1.1,
            }}
          >
            Full-stack Developer
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 400,
            color: OG_COLORS.muted,
          }}
        >
          Junior Developer @ Learn Tech · Next.js, React, Spring Boot · Bangkok
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
