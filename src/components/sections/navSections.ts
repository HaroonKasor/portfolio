/** Home page anchors, in scroll order. Each id doubles as the `nav.*` message key. */
export const NAV_SECTIONS = ['about', 'experience', 'work', 'contact'] as const;

export type NavSection = (typeof NAV_SECTIONS)[number];

/** Last section whose top has passed the upper third of the viewport; the
 * final section wins once the page is scrolled to the bottom, because a short
 * Contact block can never reach that line on tall screens. Browser only. */
export function currentSection(): NavSection {
  const atBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  if (atBottom) return NAV_SECTIONS[NAV_SECTIONS.length - 1];

  const line = window.innerHeight * 0.35;
  let active: NavSection = NAV_SECTIONS[0];
  for (const id of NAV_SECTIONS) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= line) active = id;
  }
  return active;
}
