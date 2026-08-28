import type { SkillChip } from './types';

/** Tech chips shown in the About section. `slug` is a simple-icons slug;
 * unknown slugs fall back to a lettermark inside `TechChip`. */
export const techChips: SkillChip[] = [
  { name: 'Next.js', slug: 'nextdotjs' },
  { name: 'React', slug: 'react' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'Tailwind', slug: 'tailwindcss' },
  { name: 'Java', slug: 'openjdk' },
  { name: 'Spring Boot', slug: 'springboot' },
  { name: 'MySQL', slug: 'mysql' },
  // simple-icons ships no SQL Server or Playwright mark, so both carry an
  // explicit lettermark rather than the derived initials ("SS" / "PL").
  { name: 'SQL Server', slug: 'sqlserver', mark: 'SQL' },
  { name: 'Docker', slug: 'docker' },
  { name: 'Playwright', slug: 'playwright', mark: 'PW' },
  { name: 'Figma', slug: 'figma' },
  { name: 'GitLab', slug: 'gitlab' },
];

/** Skill group keys — copy lives in `messages/*.json` under `about.groups`. */
export const skillGroups = ['frontend', 'backend', 'tools'] as const;
export type SkillGroupKey = (typeof skillGroups)[number];
