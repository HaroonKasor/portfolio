import styles from "./Glitch404.module.css";

/**
 * Glitch "404" numeral: navy base text with blue/pink offset ghost copies
 * (pseudo-elements) plus a clip-path "slice" band shifted right.
 * Motion is disabled under prefers-reduced-motion.
 */
export function Glitch404() {
  return (
    <div className={styles.glitch} data-text="404" role="img" aria-label="404">
      <span aria-hidden="true">404</span>
      <span aria-hidden="true" className={styles.slice}>
        404
      </span>
    </div>
  );
}

export default Glitch404;
