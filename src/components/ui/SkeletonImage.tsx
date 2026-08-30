"use client";

import { useState, type ComponentProps } from "react";
import Image from "next/image";

/**
 * `next/image` (fill) with a shimmer placeholder until the bitmap arrives,
 * then a short fade-in. Parent must be `position: relative` with a size.
 */
export function SkeletonImage({
  alt,
  className = "",
  ...props
}: Omit<ComponentProps<typeof Image>, "fill" | "onLoad">) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded ? (
        <span aria-hidden="true" className="skeleton absolute inset-0" />
      ) : null}
      <Image
        {...props}
        alt={alt}
        fill
        onLoad={() => setLoaded(true)}
        className={[
          className,
          "transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />
    </>
  );
}

export default SkeletonImage;
