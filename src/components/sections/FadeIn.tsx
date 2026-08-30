import type { ReactNode } from "react";
import styles from "./FadeIn.module.css";

/**
 * Hero entrance animation.
 *
 * Deliberately CSS-only and server-rendered. A framer-motion
 * `initial={{ opacity: 0 }}` leaves the server HTML at `opacity: 0`, so with
 * JS disabled — or in the window before hydration — the whole hero is
 * invisible. A keyframe that *starts* hidden and finishes opaque animates the
 * same way, but the element's resting style is fully visible, so the markup is
 * readable without JS and the animation simply never plays.
 *
 * `prefers-reduced-motion` disables it in the stylesheet.
 */
export function FadeIn({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <div
      className={styles.fadeIn}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

export default FadeIn;
