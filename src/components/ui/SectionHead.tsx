import { cn } from '@/lib/utils';

export type SectionHeadProps = {
  index: string;
  label: string;
  title: string;
  className?: string;
};

export function SectionHead({
  index,
  label,
  title,
  className,
}: SectionHeadProps) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="text-muted flex items-center gap-3 text-xs font-medium tracking-[0.2em]">
        <span className="text-accent">{index}</span>
        <span>{label}</span>
      </div>
      <h2 className="text-text text-[32px] leading-tight font-semibold lg:text-[56px]">
        {title}
      </h2>
    </div>
  );
}
