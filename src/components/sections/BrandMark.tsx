import { Link } from "@/i18n/navigation";

/** HK monogram + wordmark used in the navbar and mobile sheet. */
export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="group focus-visible:outline-accent inline-flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <span
        aria-hidden="true"
        className="bg-inverse text-on-inverse inline-flex h-10 w-10 items-center justify-center rounded-[10px] text-sm font-bold tracking-tight"
      >
        HK
      </span>
      {!compact && (
        <span className="text-text text-[15px] font-semibold tracking-tight">
          Haroon Kasor
        </span>
      )}
    </Link>
  );
}

export default BrandMark;
