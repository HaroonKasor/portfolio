import type { ReactNode } from 'react';

/** Section heading: small label followed by a hairline that fills the row. */
export function SectionLabel({
  id,
  children,
  aside,
  heading = true,
}: {
  id?: string;
  children: ReactNode;
  /** Optional muted note at the end of the line. */
  aside?: ReactNode;
  /** False when a larger heading follows directly, so the page keeps one h2. */
  heading?: boolean;
}) {
  const Label = heading ? 'h2' : 'p';
  return (
    <div className="flex items-center gap-4">
      <Label id={id} className="text-text shrink-0 text-sm leading-[1.4] font-semibold">
        {children}
      </Label>
      <span aria-hidden className="bg-line h-px min-w-px flex-1" />
      {aside ? <p className="text-muted shrink-0 text-[13px] leading-[1.4]">{aside}</p> : null}
    </div>
  );
}
