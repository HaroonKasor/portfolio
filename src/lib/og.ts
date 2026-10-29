import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

/** Literal light-theme palette for OG rendering: satori resolves no CSS
 * variables, so these mirror the values in src/styles/tokens.css. */
export const OG_COLORS = {
  bg: '#FAF9F6',
  line: '#E3E0DB',
  text: '#0F2A4A',
  muted: '#6B6B73',
  status: '#21B866',
  shadow: '0 24px 56px -12px rgba(15, 26, 64, 0.10)',
};

const ASSET_DIR = path.join(process.cwd(), 'src', 'assets');

async function loadFont(file: string) {
  return readFile(path.join(ASSET_DIR, 'fonts', file));
}

/**
 * Outfit (latin) + Prompt (thai) loaded from bundled woff files so the build
 * never depends on network access.
 */
export async function ogFonts() {
  const [outfitBold, outfitSemi, outfitRegular, promptBold, promptRegular] = await Promise.all([
    loadFont('Outfit-Bold.woff'),
    loadFont('Outfit-SemiBold.woff'),
    loadFont('Outfit-Regular.woff'),
    loadFont('Prompt-Bold.woff'),
    loadFont('Prompt-Regular.woff'),
  ]);

  const style = 'normal' as const;
  return [
    { name: 'Outfit', data: outfitBold, weight: 700 as const, style },
    { name: 'Outfit', data: outfitSemi, weight: 600 as const, style },
    { name: 'Outfit', data: outfitRegular, weight: 400 as const, style },
    { name: 'Prompt', data: promptBold, weight: 700 as const, style },
    { name: 'Prompt', data: promptRegular, weight: 400 as const, style },
  ];
}

/** satori cannot decode WebP, so the OG card uses JPEG copies of the avatar
 * and the hatch.dev portal screenshot kept in src/assets/og. */
export async function ogImage(file: 'avatar.jpg' | 'hatch-portal.jpg') {
  const data = await readFile(path.join(ASSET_DIR, 'og', file));
  return `data:image/jpeg;base64,${data.toString('base64')}`;
}
