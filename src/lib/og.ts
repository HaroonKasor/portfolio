import { readFile } from "node:fs/promises";
import path from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/** Literal palette for OG rendering — satori resolves no CSS variables. */
export const OG_COLORS = {
  text: "#0F2A4A",
  muted: "#6B6B73",
  accent: "#1C70E6",
  surface: "#FFFFFF",
  gradient: "linear-gradient(100deg, #FDE8F0 0%, #EBE8FF 50%, #E3F7F2 100%)",
};

const FONT_DIR = path.join(process.cwd(), "src", "assets", "fonts");

async function loadFont(file: string) {
  return readFile(path.join(FONT_DIR, file));
}

/**
 * Outfit (latin) + Prompt (thai) loaded from bundled woff files so the build
 * never depends on network access.
 */
export async function ogFonts() {
  const [outfitBold, outfitSemi, outfitRegular, promptBold, promptRegular] =
    await Promise.all([
      loadFont("Outfit-Bold.woff"),
      loadFont("Outfit-SemiBold.woff"),
      loadFont("Outfit-Regular.woff"),
      loadFont("Prompt-Bold.woff"),
      loadFont("Prompt-Regular.woff"),
    ]);

  const style = "normal" as const;
  return [
    { name: "Outfit", data: outfitBold, weight: 700 as const, style },
    { name: "Outfit", data: outfitSemi, weight: 600 as const, style },
    { name: "Outfit", data: outfitRegular, weight: 400 as const, style },
    { name: "Prompt", data: promptBold, weight: 700 as const, style },
    { name: "Prompt", data: promptRegular, weight: 400 as const, style },
  ];
}
