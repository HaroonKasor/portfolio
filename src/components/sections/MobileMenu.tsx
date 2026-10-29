'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FileText, Mail, Menu, X } from 'lucide-react';

import { profile } from '@/content/profile';
import { lockScroll, pushOverlay } from '@/lib/overlays';
import { cn } from '@/lib/utils';
import { IconButton } from '@/components/ui/IconButton';
import { LangToggle } from '@/components/ui/LangToggle';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { pillButton } from '@/components/ui/pillButton';

import { CvButton } from './CvButton';
import { currentSection, NAV_SECTIONS, type NavSection } from './navSections';

const FOCUSABLE = 'a[href], button:not([disabled])';

/** Menu button plus the full-screen menu (Figma 206:427). Phones and tablets only. */
export function MobileMenu() {
  const t = useTranslations('nav');
  const [open, setOpen] = useState<NavSection | null>(null);

  return (
    <>
      <IconButton
        label={t('openMenu')}
        expanded={open !== null}
        controls="mobile-menu"
        onClick={() => setOpen(currentSection())}
        className="lg:hidden"
      >
        <Menu className="size-4" aria-hidden />
      </IconButton>
      {open !== null
        ? createPortal(<MenuSheet active={open} onClose={() => setOpen(null)} />, document.body)
        : null}
    </>
  );
}

function MenuSheet({ active, onClose }: { active: NavSection; onClose: () => void }) {
  const t = useTranslations('nav');
  const ti = useTranslations('intro');
  const tc = useTranslations('common');
  const panelRef = useRef<HTMLDivElement>(null);
  // Section to focus after a link is chosen, instead of returning to the opener.
  const targetRef = useRef<NavSection | null>(null);
  // Latest onClose without re-running the effect below: re-running would
  // re-register this overlay above any dialog opened on top of it.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    const close = () => onCloseRef.current();
    const opener = document.activeElement as HTMLElement | null;
    panelRef.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus();

    const unlock = lockScroll();
    // Leaving phone layout while open would strand a locked, invisible page.
    const desktop = window.matchMedia('(min-width: 1024px)');
    const overlay = pushOverlay(() => desktop.matches && close());

    const onKeyDown = (e: KeyboardEvent) => {
      // The CV dialog can open on top of the menu; the top-most overlay owns the keys.
      if (!overlay.isTop()) return;
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const nodes = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      const index = nodes.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && index <= 0) {
        e.preventDefault();
        nodes[nodes.length - 1]?.focus();
      } else if (!e.shiftKey && (index === -1 || index >= nodes.length - 1)) {
        e.preventDefault();
        nodes[0]?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    // While the CV dialog is above the menu, it closing re-runs this check.
    const onBreakpoint = () => desktop.matches && overlay.isTop() && close();
    desktop.addEventListener('change', onBreakpoint);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onBreakpoint);
      overlay.pop();
      unlock();
      const target = targetRef.current && document.getElementById(targetRef.current);
      if (target) target.focus({ preventScroll: true });
      // The menu button is hidden at desktop width; focus the page instead of losing focus to <body>.
      else if (opener && opener.getClientRects().length > 0) opener.focus();
      else document.getElementById('content')?.focus({ preventScroll: true });
    };
  }, []);

  const externals = [
    { href: profile.github, label: ti('github') },
    { href: profile.linkedin, label: ti('linkedin') },
    { href: profile.lineUrl, label: ti('line') },
  ];

  return (
    <div
      ref={panelRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label={t('label')}
      className="overlay-in bg-bg fixed inset-0 z-50 flex flex-col overflow-y-auto px-5 pt-4 pb-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Image
            src={profile.avatar}
            alt=""
            width={32}
            height={32}
            className="size-8 rounded-full object-cover"
          />
          <p className="text-text text-[15px] leading-normal font-semibold">{tc('siteName')}</p>
        </div>
        <button
          type="button"
          data-autofocus
          aria-label={t('closeMenu')}
          onClick={onClose}
          className="hit-area border-line bg-surface text-text inline-flex items-center justify-center rounded-full border p-2"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>

      <nav aria-label={t('label')} className="mt-12">
        <ul>
          {NAV_SECTIONS.map((id) => (
            <li key={id} className="border-line border-b">
              <a
                href={`#${id}`}
                onClick={() => {
                  targetRef.current = id;
                  onClose();
                }}
                aria-current={id === active ? 'location' : undefined}
                className={cn(
                  'flex items-center justify-between py-4 text-[28px] leading-[1.3] font-semibold transition-colors',
                  id === active ? 'text-text' : 'text-muted hover:text-text',
                )}
              >
                {t(id)}
                {id === active ? (
                  <span aria-hidden className="bg-accent size-2 rounded-full" />
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto flex flex-col gap-3 pt-10">
        <CvButton className={pillButton('solid', 'w-full')}>
          <FileText className="size-4" aria-hidden />
          {ti('viewCv')}
        </CvButton>
        <a href={`mailto:${profile.email}`} className={pillButton('outline', 'w-full')}>
          <Mail className="size-4" aria-hidden />
          {ti('emailMe')}
        </a>
        <div className="mt-8 flex items-center justify-between gap-4">
          <p className="text-muted text-sm leading-normal">
            {externals.map(({ href, label }, i) => (
              <span key={label}>
                {i > 0 ? <span aria-hidden> · </span> : null}
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-text hit-area inline-block transition-colors"
                >
                  {label}
                </a>
              </span>
            ))}
          </p>
          <div className="flex items-center gap-2">
            <LangToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
