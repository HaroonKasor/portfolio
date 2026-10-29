'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocale, useTranslations } from 'next-intl';
import { Download, X } from 'lucide-react';

import { profile } from '@/content/profile';
import { lockScroll, pushOverlay } from '@/lib/overlays';
import { cn } from '@/lib/utils';

import { PdfViewer } from './PdfViewer';

type CvLocale = keyof typeof profile.cvFiles;

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** The desktop header and the mobile footer each carry their own download
 * link, one of which is display:none; trapping focus against a hidden node
 * would let Tab escape the dialog. */
function visibleFocusable(root: HTMLElement | null): HTMLElement[] {
  if (!root) return [];
  return [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
    (el) => el.offsetParent !== null || el.getClientRects().length > 0,
  );
}

export function CvPreviewModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const locale = useLocale();
  if (!open) return null;
  // Keyed on locale so the dialog re-picks its default document if the site
  // language changes while it is open. Portaled to <body> so no transformed
  // ancestor can become the containing block of the fixed overlay.
  return createPortal(<CvDialog key={locale} onClose={onClose} />, document.body);
}

function CvDialog({ onClose }: { onClose: () => void }) {
  const t = useTranslations('cv');
  const locale = useLocale();
  const [doc, setDoc] = useState<CvLocale>(locale === 'th' ? 'th' : 'en');
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  // Remember the trigger so focus can be returned when the dialog closes.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    visibleFocusable(panelRef.current)[0]?.focus();
    return () => opener?.focus?.();
  }, []);

  // Escape to close + a focus trap across Tab / Shift+Tab.
  useEffect(() => {
    const overlay = pushOverlay();
    const onKeyDown = (e: KeyboardEvent) => {
      if (!overlay.isTop()) return;
      if (e.key === 'Escape') {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab') return;
      const nodes = visibleFocusable(panelRef.current);
      if (nodes.length === 0) return;
      const index = nodes.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && index <= 0) {
        e.preventDefault();
        nodes[nodes.length - 1].focus();
      } else if (!e.shiftKey && (index === -1 || index >= nodes.length - 1)) {
        e.preventDefault();
        nodes[0].focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      overlay.pop();
    };
  }, []);

  useEffect(() => lockScroll(), []);

  const src = profile.cvFiles[doc];

  const segments = (
    <div
      role="group"
      aria-label={t('language')}
      className="border-line flex gap-0.5 rounded-full border p-[3px] max-sm:w-full"
    >
      {(['th', 'en'] as const).map((value) => (
        <button
          key={value}
          type="button"
          lang={value}
          aria-pressed={doc === value}
          onClick={() => setDoc(value)}
          className={cn(
            'hit-area rounded-full px-3 py-1 text-[13px] leading-[1.3] transition-colors max-sm:flex-1 max-sm:py-1.5 max-sm:text-sm max-sm:leading-normal',
            doc === value ? 'bg-inverse text-on-inverse font-medium' : 'text-muted hover:text-text',
          )}
        >
          {value === 'th' ? t('thai') : t('english')}
        </button>
      ))}
    </div>
  );

  const closeButton = (
    <button
      type="button"
      aria-label={t('close')}
      onClick={onClose}
      className="hit-area border-line text-text hover:bg-bg inline-flex items-center justify-center rounded-full border p-2 transition-colors sm:p-2.5"
    >
      <X className="size-4 sm:size-[18px]" aria-hidden />
    </button>
  );

  return (
    <div
      className="bg-scrim fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-dialog-title"
        className="overlay-in bg-surface flex h-[min(712px,calc(100dvh-40px))] w-full flex-col overflow-hidden rounded-t-[20px] px-5 pt-2.5 pb-5 shadow-[var(--shadow-modal)] sm:h-[min(716px,calc(100dvh-48px))] sm:max-w-[880px] sm:rounded-[20px] sm:p-0"
      >
        {/* Grab handle: bottom-sheet affordance on phones only. */}
        <span
          aria-hidden
          className="bg-line mx-auto block h-1 w-10 shrink-0 rounded-[2px] sm:hidden"
        />

        <div className="sm:border-line flex shrink-0 items-center justify-between py-3.5 sm:border-b sm:py-[18px] sm:pr-[18px] sm:pl-6">
          <div className="flex items-center gap-4">
            <h2 id="cv-dialog-title" className="text-text text-base leading-[1.4] font-semibold">
              {t('title')}
            </h2>
            <div className="max-sm:hidden">{segments}</div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={src}
              download
              className="bg-inverse text-on-inverse inline-flex h-10 items-center gap-2 rounded-full pr-4 pl-3.5 text-sm leading-[1.2] font-medium transition-opacity hover:opacity-85 max-sm:hidden"
            >
              <Download className="size-4" aria-hidden />
              {t('download')}
            </a>
            {closeButton}
          </div>
        </div>

        <div className="shrink-0 sm:hidden">{segments}</div>

        <PdfViewer
          key={src}
          src={src}
          title={t('title')}
          loadingLabel={t('loading')}
          className="sm:bg-bg py-4 sm:px-6 sm:pt-6 sm:pb-6"
        />

        <a
          href={src}
          download
          className="bg-inverse text-on-inverse inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-full text-[15px] leading-[1.2] font-medium sm:hidden"
        >
          <Download className="size-4" aria-hidden />
          {t('download')}
        </a>
      </div>
    </div>
  );
}
