# Haroon Kasor — Portfolio

Personal portfolio site. Bilingual (EN default, TH), light/dark themed, no backend.

## Stack

- **Next.js 16** (App Router, Turbopack, React Compiler) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — design tokens in `src/styles/tokens.css`, no raw hex in components
- **next-intl v4** — `en` unprefixed at `/`, `th` under `/th` (`localePrefix: 'as-needed'`)
- **next-themes** — dark mode via `html[data-theme="dark"]`
- **lucide-react** (UI icons), **simple-icons** (brand marks), **framer-motion** (hero / 404)

Content is static in `src/content/*.ts`. GitHub repos are fetched server-side and revalidated hourly.

## Scripts

| command | what it does |
| --- | --- |
| `npm run dev` | dev server |
| `npm run build` | production build |
| `npm run start` | serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` | Prettier |

## Structure

```
messages/            en.json + th.json — every UI string, mirror-keyed
src/
  app/
    layout.tsx       root layout — passes children through only
    [locale]/        locale layout (html/body, fonts, providers) + pages
    globals.css      imports tailwind + tokens, sets body/focus/reduced-motion
  components/ui/     Button, Tag, TechChip, NavLink, SectionHead, Container,
                     ThemeToggle, LangToggle, BackToTop (barrel: index.ts)
  content/           types.ts, profile.ts, skills.ts, experience.ts, projects.ts
  i18n/              routing.ts, request.ts, navigation.ts
  lib/               github.ts (repo fetch + fallback), utils.ts (cn), useMounted.ts
  styles/tokens.css  CSS variables + Tailwind @theme mapping
  proxy.ts           next-intl locale routing (Next 16 renamed middleware → proxy)
```

## Adding a project

1. Append a `Project` to `projects` in `src/content/projects.ts`. Every text field is a
   `Localized` object (`{ en, th }`), so both languages are filled in at the same time.
2. Give it a unique `slug`, the next `index` (`"06"`), a `cover` gradient and `tags`.
3. Point the previous project's `next` at your new slug, and set the new project's `next`
   back to the first slug to keep the ring closed.
4. Section headings and labels come from `messages/*.json` under `projects` and `detail` —
   only per-project prose lives in `projects.ts`.

## Adding a locale

1. Add the code to `locales` in `src/i18n/routing.ts`.
2. Copy `messages/en.json` to `messages/<code>.json` and translate the values, keeping every
   key identical — the app reads the same key paths for all locales.
3. Fill in the matching sibling for each `Localized` field in `src/content/*.ts`
   (widen the `Localized` type in `src/content/types.ts` first).
4. If the locale needs a different script, add its font subset in `src/app/[locale]/layout.tsx`.

`LangToggle` picks up new locales automatically from `routing.locales`.

## Conventions

- **No hardcoded UI strings** — everything goes through next-intl messages.
- **No raw hex in components** — use the token utilities (`bg-bg`, `text-muted`,
  `border-line`, `text-accent`, …) defined in `src/styles/tokens.css`.
- Icon-only buttons carry an `aria-label`; interactive targets are at least 44px on mobile.
- `prefers-reduced-motion` is honoured globally in `globals.css`.
