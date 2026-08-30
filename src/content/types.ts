export type Localized = { en: string; th: string };

export type Project = {
  slug: string;
  index: string;
  title: Localized;
  summary: Localized;
  badge: string;
  tags: string[];
  /** Gradient fallback; `image` (public path) replaces it when present. */
  cover: { from: string; to: string; image?: string };
  role: Localized;
  period: Localized;
  kind: Localized;
  stack: { name: string; slug?: string; note: Localized }[];
  links?: { demo?: string; repo?: string; report?: string; internal?: boolean };
  overview: { problem: Localized; solution: Localized; result: Localized };
  /** `image` is a public path; when absent the slot renders the gradient placeholder. */
  features: { title: Localized; body: Localized; shot: Localized; image?: string }[];
  /** slug of the next project */
  next?: string;
};

export type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  url: string;
};

export type SkillChip = {
  name: string;
  slug: string;
  /** Explicit lettermark for brands simple-icons has no entry for. */
  mark?: string;
};

export type ExperienceItem = {
  /** message key under `experience.items` */
  key: 'learntech' | 'goskillup' | 'degree';
};
