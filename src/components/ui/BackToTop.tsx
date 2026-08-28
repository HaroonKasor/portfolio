// STUB (Agent A owns this file)
"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

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
      className="fixed right-5 bottom-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full bg-inverse text-on-inverse shadow-[var(--shadow-float)]"
    >
      <ArrowUp aria-hidden="true" className="h-4 w-4" />
    </button>
  );
}

export default BackToTop;
