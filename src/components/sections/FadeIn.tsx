"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Hero entrance animation; collapses to a plain render under reduced motion. */
export function FadeIn({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default FadeIn;
