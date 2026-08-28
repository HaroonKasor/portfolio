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
  { name: 'SQL Server', slug: 'sqlserver' },
  { name: 'Docker', slug: 'docker' },
  { name: 'Playwright', slug: 'playwright' },
  { name: 'Figma', slug: 'figma' },
  { name: 'GitLab', slug: 'gitlab' },
];

/** Skill group keys — copy lives in `messages/*.json` under `about.groups`. */
export const skillGroups = ['frontend', 'backend', 'tools'] as const;
export type SkillGroupKey = (typeof skillGroups)[number];
