export type Localized = { en: string; th: string };

export type ProjectSlug = 'hatch-dev' | 'goskillup-lms' | 'workcatch';

export type ProjectFeature = {
  title: Localized;
  body: Localized;
  /** Public path of the screenshot. */
  image: string;
};

export type DesignPair = {
  title: Localized;
  body: Localized;
  /** Public paths of the first-draft and as-shipped screenshots. */
  draft: string;
  final: string;
};

export type Project = {
  slug: ProjectSlug;
  /** Product names are brand names, identical in both languages. */
  title: string;
  /** Shorter name used inside "Read the … case study". */
  shortTitle: string;
  /** Meta line above the case-page title, e.g. "Personal project · 2026". */
  meta: Localized;
  /** Meta line on the home card; the Thai card copy is shorter than the page. */
  cardMeta: Localized;
  /** Small outlined pill next to the meta line. */
  badge?: Localized;
  /** One-line descriptor used by the 404 work list. */
  tagline: Localized;
  /** Home card paragraph. */
  summary: Localized;
  /** Home card "Role" line. */
  cardRole: Localized;
  /** Home card tags. */
  tags: string[];
  /** Public path; also the home card screenshot. */
  cover: string;
  lede: Localized;
  facts: {
    role: Localized;
    timeline: Localized;
    stack: Localized;
    status: Localized;
  };
  overview: { problem: Localized; solution: Localized; result: Localized };
  features: ProjectFeature[];
  engineering: { title: Localized; body: Localized }[];
  stack: { name: string; note: Localized }[];
  /** Public demo shown under the case-page lede, with an optional sign-in hint. */
  demo?: { url: string; login?: string; kind?: 'demo' | 'site' };
  /** Only hatch.dev documents its Figma-to-code iterations. */
  designProcess?: { intro: Localized; pairs: DesignPair[] };
  next: ProjectSlug;
};

export type ExperienceEntry = {
  id: 'learntech' | 'goskillup' | 'degree';
  period: Localized;
  title: Localized;
  body: Localized;
  tags: string[];
  /** The current job is shown as a raised card. */
  highlight?: boolean;
};

export type InHouseWork = {
  title: Localized;
  body: Localized;
  stack: string;
  period: string;
};

export type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  url: string;
};
