import { profile } from '@/content/profile';
import type { Repo } from '@/content/types';

type GitHubRepo = {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  fork: boolean;
};

const EXCLUDED = new Set([`${profile.githubUser}.github.io`.toLowerCase()]);

/** Shown when the GitHub API is unreachable or rate-limited. */
export const fallbackRepos: Repo[] = [
  {
    name: 'portfolio',
    description: null,
    language: 'TypeScript',
    stars: 2,
    url: `${profile.github}/portfolio`,
  },
  {
    name: 'ru-elearning',
    description: null,
    language: 'HTML',
    stars: 0,
    url: `${profile.github}/ru-elearning`,
  },
  {
    name: 'expense-notify',
    description: null,
    language: 'YAML',
    stars: 0,
    url: `${profile.github}/expense-notify`,
  },
  {
    name: 'quake-alert',
    description: null,
    language: 'Python',
    stars: 0,
    url: `${profile.github}/quake-alert`,
  },
];

export async function getRepos(): Promise<Repo[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${profile.githubUser}/repos?sort=updated&per_page=6`,
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
      .slice(0, 4)
      .map<Repo>((repo) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        url: repo.html_url,
      }));

    return repos.length > 0 ? repos : fallbackRepos;
  } catch {
    return fallbackRepos;
  }
}
