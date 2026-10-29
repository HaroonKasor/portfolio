import { getTranslations } from 'next-intl/server';
import { ArrowUpRight } from 'lucide-react';

import { profile } from '@/content/profile';
import { getRepos } from '@/lib/github';
import { SectionLabel } from '@/components/ui/SectionLabel';

export async function GitHubRepos() {
  const t = await getTranslations('github');
  const repos = await getRepos();

  return (
    <section aria-labelledby="github-title" className="flex flex-col">
      <div className="mb-3">
        <SectionLabel id="github-title">{t('label')}</SectionLabel>
      </div>
      <ul>
        {repos.map((repo) => {
          const details = [repo.description, repo.language].filter(Boolean).join(' · ');
          return (
            <li key={repo.name}>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-0.5 py-3 sm:flex-row sm:items-center sm:gap-4 sm:py-4"
              >
                <span className="text-text group-hover:text-accent text-[15px] leading-[1.4] font-semibold transition-colors sm:w-[200px] sm:shrink-0 sm:truncate">
                  {repo.name}
                </span>
                {details ? (
                  <span className="text-muted text-sm leading-normal sm:hidden">{details}</span>
                ) : null}
                <span className="text-muted hidden min-w-0 flex-1 truncate text-sm leading-normal sm:block">
                  {repo.description}
                </span>
                <span className="text-muted hidden w-[100px] shrink-0 text-right text-[13px] leading-normal sm:block">
                  {repo.language}
                </span>
                <ArrowUpRight
                  className="text-muted group-hover:text-text hidden size-3.5 shrink-0 transition-colors sm:block"
                  aria-hidden
                />
              </a>
            </li>
          );
        })}
      </ul>
      <a
        href={profile.github}
        target="_blank"
        rel="noopener noreferrer"
        className="text-text hover:text-accent hit-area group inline-flex items-center gap-2 self-start pt-3 text-sm leading-[1.4] font-medium transition-colors"
      >
        {t('seeAll')}
        <ArrowUpRight className="size-3.5" aria-hidden />
      </a>
    </section>
  );
}
