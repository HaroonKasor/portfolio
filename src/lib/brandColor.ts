/**
 * Fill for a simple-icons brand mark. Brand colours are data (they ship with
 * the icon), so they are applied inline rather than through tokens. Marks
 * that are near-black (Next.js, GitHub, Prisma, OpenJDK, Unity, …) would
 * vanish on the dark theme, so those fall back to `currentColor` and follow
 * the text colour instead.
 */
export function brandFill(hex: string): string {
  const n = parseInt(hex.replace("#", ""), 16);
  if (Number.isNaN(n)) return "currentColor";
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  // Relative luminance (sRGB, un-gamma'd is fine for a threshold this coarse).
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return lum < 0.3 ? "currentColor" : `#${hex.replace("#", "")}`;
}
