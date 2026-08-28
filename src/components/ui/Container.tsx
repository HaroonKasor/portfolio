/* STUB (Agent A owns the real file). */
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-20 ${className}`}>
      {children}
    </div>
  );
}

export default Container;
