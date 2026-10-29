'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

import { currentSection, NAV_SECTIONS, type NavSection } from './navSections';

export function ScrollSpyNav() {
  const t = useTranslations('nav');
  const [active, setActive] = useState<NavSection>(NAV_SECTIONS[0]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setActive(currentSection()));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <nav aria-label={t('label')}>
      <ul className="flex flex-col gap-2.5">
        {NAV_SECTIONS.map((id) => {
          const isActive = id === active;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? 'location' : undefined}
                className="group flex items-center gap-4 py-0.5 text-sm leading-[1.4]"
              >
                <span
                  aria-hidden
                  className={cn(
                    'h-px transition-[width,background-color] duration-300 motion-reduce:transition-none',
                    isActive
                      ? 'bg-text w-16'
                      : 'bg-line group-hover:bg-muted w-8 group-hover:w-12',
                  )}
                />
                <span
                  className={cn(
                    'transition-colors',
                    isActive ? 'text-text font-semibold' : 'text-muted group-hover:text-text',
                  )}
                >
                  {t(id)}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
