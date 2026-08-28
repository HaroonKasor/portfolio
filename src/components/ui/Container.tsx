import type { ElementType, ReactNode } from 'react';

import { cn } from '@/lib/utils';

export type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

export function Container({
  children,
  className,
  as: Tag = 'div',
}: ContainerProps) {
  return (
    <Tag className={cn('mx-auto max-w-[1440px] px-5 md:px-10 lg:px-20', className)}>
      {children}
    </Tag>
  );
}
