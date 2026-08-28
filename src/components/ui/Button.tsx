/* STUB (Agent A owns the real file) — matches the brief's prop contract. */
import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type ButtonProps = {
  variant: "accent" | "ghost" | "dark";
  size?: "md" | "lg";
  href?: string;
  icon?: ReactNode;
  iconRight?: boolean;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  "aria-label"?: string;
  children?: ReactNode;
};

const variants: Record<ButtonProps["variant"], string> = {
  accent: "bg-accent text-white shadow-[var(--shadow-accent)] hover:opacity-90",
  ghost: "border border-line text-text hover:border-accent hover:text-accent",
  dark: "bg-inverse text-on-inverse hover:opacity-90",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

export function Button({
  variant,
  size = "md",
  href,
  icon,
  iconRight = false,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const cls = [
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all",
    "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
    variants[variant],
    sizes[size],
    className,
  ].join(" ");

  const inner = (
    <>
      {icon && !iconRight ? icon : null}
      {children}
      {icon && iconRight ? icon : null}
    </>
  );

  if (href) {
    const external = /^(https?:|mailto:|#)/.test(href);
    if (external) {
      return (
        <a href={href} className={cls} {...rest}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }

  return (
    <button className={cls} type="button" {...rest}>
      {inner}
    </button>
  );
}

export default Button;
