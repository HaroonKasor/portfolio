/* STUB (Agent A owns the real file). */
"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const t = useTranslations("common");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label={t("backToTop")}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed right-5 bottom-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-inverse text-on-inverse shadow-[var(--shadow-float)] focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 lg:right-10 lg:bottom-10"
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}

export default BackToTop;
