import { profile } from '@/content/profile';
import type { Repo } from '@/content/types';

type GitHubRepo = {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  fork: boolean;
};

const EXCLUDED = new Set([`${profile.githubUser}.github.io`.toLowerCase()]);

/** Repos whose GitHub description is empty get the project name instead, so
 * the row says what the code belongs to. */
const DESCRIPTIONS: Record<string, string> = {
  lms: 'GoSkillUp LMS',
  'workcatch-frontend': 'WorkCatch',
};

/** The design shows three rows. */
const LIMIT = 3;

/** Featured repos come first, in this order; anything else follows by recency. */
const ORDER = ['lms', 'workcatch-frontend', 'portfolio'];
const rank = (name: string) => {
  const index = ORDER.indexOf(name.toLowerCase());
  return index === -1 ? ORDER.length : index;
};

/** Shown when the GitHub API is unreachable or rate-limited. */
const fallbackRepos: Repo[] = [
  {
    name: 'lms',
    description: 'GoSkillUp LMS',
    language: 'TypeScript',
    url: `${profile.github}/lms`,
  },
  {
    name: 'workcatch-frontend',
    description: 'WorkCatch',
    language: 'TypeScript',
    url: `${profile.github}/workcatch-frontend`,
  },
  {
    name: 'portfolio',
    description: 'My personal portfolio website',
    language: 'JavaScript',
    url: `${profile.github}/portfolio`,
  },
];

export async function getRepos(): Promise<Repo[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${profile.githubUser}/repos?sort=updated&per_page=100`,
      {
        headers: { Accept: 'application/vnd.github+json' },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) return fallbackRepos;

    const data: unknown = await response.json();
    if (!Array.isArray(data)) return fallbackRepos;

    const repos = (data as GitHubRepo[])
      .filter((repo) => !repo.fork && !EXCLUDED.has(repo.name.toLowerCase()))
      // Array.prototype.sort is stable, so equal ranks keep GitHub's recency order.
      .sort((a, b) => rank(a.name) - rank(b.name))
      .slice(0, LIMIT)
      .map<Repo>((repo) => ({
        name: repo.name,
        description: repo.description || DESCRIPTIONS[repo.name] || null,
        language: repo.language,
        url: repo.html_url,
      }));

    return repos.length > 0 ? repos : fallbackRepos;
  } catch {
    return fallbackRepos;
  }
}
