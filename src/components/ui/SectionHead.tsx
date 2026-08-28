import { cn } from '@/lib/utils';

export type SectionHeadProps = {
  index: string;
  label: string;
  title: string;
  className?: string;
};

/**
 * Figma "Section Head": on desktop the small index + label sit in a fixed
 * 300px left column and the BIG title runs to the right of it, spanning the
 * remaining width so long titles wrap in two lines rather than stacking
 * narrowly inside the 300px column. Below `lg` everything stacks.
 *
 * Sections pair this with `<SectionBody>` so their content lines up under the
 * title at the same 300px offset.
 */
export function SectionHead({
  index,
  label,
  title,
  className,
}: SectionHeadProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 lg:grid lg:grid-cols-[300px_1fr] lg:items-start lg:gap-16',
        className,
      )}
    >
      <div className="text-muted flex items-center gap-3 text-xs font-medium tracking-[0.2em] lg:pt-4">
        <span className="text-accent">{index}</span>
        <span>{label}</span>
      </div>
      <h2 className="text-text max-w-[932px] text-[32px] leading-tight font-semibold lg:text-[56px]">
        {title}
      </h2>
    </div>
  );
}

/**
 * Content that follows a `SectionHead`, indented to the same 300px offset on
 * desktop so it lines up under the title.
 */
export function SectionBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn('lg:grid lg:grid-cols-[300px_1fr] lg:gap-16', className)}
    >
      <div aria-hidden="true" className="hidden lg:block" />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
