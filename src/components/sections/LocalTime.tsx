'use client';

import { useSyncExternalStore } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { profile } from '@/content/profile';

const MINUTE = 60_000;

// Notify at the top of each minute instead of polling every second.
function subscribe(onChange: () => void) {
  let interval: number | undefined;
  const timeout = window.setTimeout(
    () => {
      onChange();
      interval = window.setInterval(onChange, MINUTE);
    },
    MINUTE - (Date.now() % MINUTE),
  );
  return () => {
    window.clearTimeout(timeout);
    window.clearInterval(interval);
  };
}

// Floored to the minute so the snapshot is stable between notifications.
const getSnapshot = () => Math.floor(Date.now() / MINUTE) * MINUTE;
// Server and browser clocks differ by the render delay, so the time is never
// printed during SSR or hydration; only the city shows until mount.
const getServerSnapshot = () => null;

function format(locale: string, timestamp: number) {
  // EN reads "2:32 PM"; Thai uses a 24-hour clock ("14:32") and the "น."
  // suffix comes from the message so it stays translatable.
  return new Intl.DateTimeFormat(locale === 'th' ? 'th-TH' : 'en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hourCycle: locale === 'th' ? 'h23' : 'h12',
    timeZone: profile.timeZone,
  }).format(timestamp);
}

/** "Bangkok · 2:32 PM" in Bangkok time, whatever the visitor's zone. */
export function LocalTime() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <p>
      {t('city')}
      {now !== null ? (
        <>
          {' · '}
          <time dateTime={new Date(now).toISOString()}>
            {t('time', { time: format(locale, now) })}
          </time>
        </>
      ) : null}
    </p>
  );
}
