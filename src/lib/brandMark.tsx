import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { OG_COLORS } from './og';

/** Geometry from the Figma "Favicon options" frame, option B (node 212:445), drawn on a 512 grid. */
const GRID = 512;

export async function brandMarkFont() {
  return readFile(path.join(process.cwd(), 'src', 'assets', 'fonts', 'Outfit-SemiBold.woff'));
}

/** Lowercase "h" with the green "open to work" dot on a navy tile; one glyph stays legible at 16px. */
export function BrandMark({ size }: { size: number }) {
  const k = size / GRID;
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: OG_COLORS.text,
        borderRadius: 112 * k,
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 142 * k,
          top: 50 * k,
          fontFamily: 'Outfit',
          fontWeight: 600,
          fontSize: 380 * k,
          lineHeight: 1,
          color: OG_COLORS.bg,
        }}
      >
        h
      </div>
      <div
        style={{
          position: 'absolute',
          left: 338 * k,
          top: 296 * k,
          width: 72 * k,
          height: 72 * k,
          borderRadius: 999,
          background: OG_COLORS.status,
        }}
      />
    </div>
  );
}
