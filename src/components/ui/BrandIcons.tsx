import type { SVGProps } from 'react';

// lucide-react v1 dropped its brand icons; these are the same outline marks
// the Figma file uses, drawn on lucide's stroke grid so they sit next to the
// other lucide icons without looking heavier.
type IconProps = SVGProps<SVGSVGElement>;

function OutlineIcon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function GithubIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M10 14.6667V12C10.0927 11.1649 9.85329 10.3267 9.33333 9.66667C11.3333 9.66667 13.3333 8.33333 13.3333 6C13.3867 5.16667 13.1533 4.34667 12.6667 3.66667C12.8533 2.9 12.8533 2.1 12.6667 1.33333C12.6667 1.33333 12 1.33333 10.6667 2.33333C8.90667 2 7.09333 2 5.33333 2.33333C4 1.33333 3.33333 1.33333 3.33333 1.33333C3.13333 2.1 3.13333 2.9 3.33333 3.66667C2.84792 4.34392 2.61231 5.16852 2.66667 6C2.66667 8.33333 4.66667 9.66667 6.66667 9.66667C6.40667 9.99333 6.21333 10.3667 6.1 10.7667C5.98667 11.1667 5.95333 11.5867 6 12V14.6667" />
      <path d="M6 12C2.99333 13.3333 2.66667 10.6667 1.33333 10.6667" />
    </OutlineIcon>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M10.6667 5.33333C11.7275 5.33333 12.7449 5.75476 13.4951 6.50491C14.2452 7.25505 14.6667 8.27247 14.6667 9.33333V14H12V9.33333C12 8.97971 11.8595 8.64057 11.6095 8.39052C11.3594 8.14048 11.0203 8 10.6667 8C10.313 8 9.97391 8.14048 9.72386 8.39052C9.47381 8.64057 9.33333 8.97971 9.33333 9.33333V14H6.66667V9.33333C6.66667 8.27247 7.08809 7.25505 7.83824 6.50491C8.58839 5.75476 9.6058 5.33333 10.6667 5.33333Z" />
      <path d="M1.33333 6H4V14H1.33333V6Z" />
      <path d="M4 2.66667C4 3.40305 3.40305 4 2.66667 4C1.93029 4 1.33333 3.40305 1.33333 2.66667C1.33333 1.93029 1.93029 1.33333 2.66667 1.33333C3.40305 1.33333 4 1.93029 4 2.66667Z" />
    </OutlineIcon>
  );
}
