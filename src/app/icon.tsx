import { ImageResponse } from "next/og";

import { BrandMark, brandMarkFont } from "@/lib/brandMark";

export const contentType = "image/png";

// 32 is the tab icon; 192 and 512 are the manifest sizes Android needs for "Add to home screen".
const SIZES = [32, 192, 512] as const;

export function generateImageMetadata() {
  return SIZES.map((s) => ({ id: String(s), size: { width: s, height: s }, contentType }));
}

export default async function Icon({ id }: { id: Promise<string> }) {
  const s = Number(await id) || 32;
  return new ImageResponse(<BrandMark size={s} />, {
    width: s,
    height: s,
    fonts: [{ name: "Outfit", data: await brandMarkFont(), weight: 600, style: "normal" }],
  });
}
