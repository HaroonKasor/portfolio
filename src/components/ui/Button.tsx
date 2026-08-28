// STUB (Agent A owns this file) — contract from DESIGN_BRIEF.md
import Link from "next/link";
import type { ReactNode } from "react";

export type ButtonProps = {
  variant: "accent" | "ghost" | "dark";
  size?: "md" | "lg";
  href?: string;
  icon?: ReactNode;
  iconRight?: boolean;
  className?: string;
  children: ReactNode;
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-medium transition-colors";

const variants: Record<ButtonProps["variant"], string> = {
  accent: "bg-accent text-white shadow-[var(--shadow-accent)] hover:opacity-90",
  ghost: "border border-line bg-surface text-text hover:bg-accent-soft",
  dark: "bg-inverse text-on-inverse hover:opacity-90",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function Button({
  variant,
  size = "md",
  href,
  icon,
  iconRight = false,
  className = "",
  children,
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const content = (
    <>
      {icon && !iconRight ? icon : null}
      {children}
      {icon && iconRight ? icon : null}
    </>
  );

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    if (external) {
      return (
        <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }
    return (
      <Link className={cls} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <button className={cls} type="button">
      {content}
    </button>
  );
}

export default Button;
