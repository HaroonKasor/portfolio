"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { CvPreviewModal } from "./CvPreviewModal";
import { MobileMenu } from "./MobileMenu";

/**
 * Owns the two pieces of navbar state that need the client: the CV dialog
 * (triggered from desktop and from inside the mobile sheet) and the sheet itself.
 */
export function NavbarActions() {
  const t = useTranslations("nav");
  const [cvOpen, setCvOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setCvOpen(true)}
        className="bg-inverse text-on-inverse hidden min-h-11 items-center rounded-full px-5 text-sm font-medium transition-opacity hover:opacity-90 lg:inline-flex"
      >
        {t("cv")}
      </button>

      <button
        type="button"
        aria-label={t("menu")}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(true)}
        className="border-line text-text inline-flex h-11 w-11 items-center justify-center rounded-full border lg:hidden"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpenCv={() => setCvOpen(true)}
      />
      <CvPreviewModal open={cvOpen} onClose={() => setCvOpen(false)} />
    </>
  );
}

export default NavbarActions;
