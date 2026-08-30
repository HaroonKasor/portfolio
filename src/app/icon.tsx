import { ImageResponse } from "next/og";
import { OG_COLORS } from "@/lib/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** HK favicon mark. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: OG_COLORS.text,
          color: OG_COLORS.surface,
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: -0.5,
          borderRadius: 7,
        }}
      >
        HK
      </div>
    ),
    size,
  );
}
