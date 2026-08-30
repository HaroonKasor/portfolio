"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts from 0 to `value` the first time the element scrolls into view.
 * Server HTML carries the final number, so nothing is hidden without JS and
 * `prefers-reduced-motion` simply skips the count.
 */
export function CountUp({
  value,
  duration = 1200,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const target = Number.parseInt(value, 10);
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || Number.isNaN(target)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
        setShown(String(Math.round(target * eased)));
        if (p < 1) raf = requestAnimationFrame(tick);
        else setShown(value);
      };
      setShown("0");
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, value, duration]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      {shown}
    </span>
  );
}

export default CountUp;
