import { ImageResponse } from "next/og";

import { BrandMark, brandMarkFont } from "@/lib/brandMark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** iOS adds its own rounded mask, but the tile keeps its radius so it also reads well when shared. */
export default async function AppleIcon() {
  return new ImageResponse(<BrandMark size={180} />, {
    ...size,
    fonts: [{ name: "Outfit", data: await brandMarkFont(), weight: 600, style: "normal" }],
  });
}
