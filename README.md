# Haroon Kasor — Portfolio

Personal portfolio site. Bilingual (EN default, TH), light/dark themed, no backend.

## Stack

- **Next.js 16** (App Router, Turbopack, React Compiler) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — design tokens in `src/styles/tokens.css`, no raw hex in components
- **next-intl v4** — `en` unprefixed at `/`, `th` under `/th` (`localePrefix: 'as-needed'`)
- **next-themes** — dark mode via `html[data-theme="dark"]`
- **lucide-react** (UI icons), local SVG brand marks in `components/ui/BrandIcons.tsx`
- **pdfjs-dist** — canvas CV viewer (worker served from `public/pdf.worker.min.mjs`)

Content is static in `src/content/*.ts`. GitHub repos are fetched server-side and revalidated
hourly (featured repos `lms`, `workcatch-frontend`, `portfolio` are listed first).

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
public/
  cv/                CV PDFs (en, th)
  images/            profile, project covers and screenshots
  pdf.worker.min.mjs pdf.js worker
src/
  app/
    layout.tsx       root layout — passes children through only
    [locale]/        locale layout (html/body, fonts, providers), home page,
                     projects/[slug] case studies, not-found, [...rest] catch-all
    icon, manifest, opengraph-image, twitter-image, robots, sitemap
    globals.css      imports tailwind + tokens, focus, hit-area, reduced-motion
  components/
    sections/        home sections (Intro, About, Experience, Work, InHouse,
                     GitHubRepos, Contact), SiteFooter, TopBar, MobileMenu,
                     CvButton + CvPreviewModal + PdfViewer, ScrollSpyNav
    case/            case-study sections (CaseHeader, CaseOverview, CaseFeatures,
                     DesignProcess, CaseEngineering, CaseStack, NextProject, ZoomImage)
    ui/              IconButton, LangToggle, ThemeToggle, Pill (TechTags, StatusPill),
                     pillButton, SectionLabel, Reveal, BrandIcons
  content/           types.ts, profile.ts, skills.ts, experience.ts, projects.ts
  i18n/              routing.ts, request.ts, navigation.ts
  lib/               github.ts (repo fetch + fallback), seo.ts (metadata builder),
                     og.ts (OG image helpers), overlays.ts (scroll lock + overlay stack),
                     utils.ts (cn), useMounted.ts
  styles/tokens.css  CSS variables + Tailwind @theme mapping
  proxy.ts           next-intl locale routing (Next 16 renamed middleware → proxy)
```

## Content model

`src/content/types.ts` defines `Project`, `Localized` (`{ en, th }`) and friends. Per-project
prose (meta, lede, facts, overview, features, engineering notes, stack) lives in
`projects.ts`; a project's `next` slug links the case studies in a ring. Home-page
experience, in-house work and the daily stack live in `experience.ts` and `skills.ts`;
contact details and CV paths in `profile.ts`.

## Message namespaces

`messages/*.json` is split by surface; every key exists in both files.

| namespace | used by |
| --- | --- |
| `common`, `meta` | site name, role, tagline, toggle labels (`langName.*`), default metadata |
| `nav` | section nav, mobile menu, `tools` landmark label |
| `intro`, `about`, `experience`, `work`, `inhouse`, `github`, `contact`, `footer` | home sections |
| `cv` | CV dialog and PDF viewer (`page`, `pages` labels) |
| `case` | case-study labels, `coverAlt`, `ogAlt`, zoom labels |
| `notFound` | localized 404 |

## Adding a project

1. Append a `Project` to `projects` in `src/content/projects.ts`; every text field is a
   `Localized` object so both languages are filled in together.
2. Add its slug to `ProjectSlug` in `src/content/types.ts`, put images in
   `public/images/`, and point the previous project's `next` at it (close the ring).
3. Section labels come from `messages/*.json` under `case`; only per-project prose lives
   in `projects.ts`.

## Adding a locale

1. Add the code to `locales` in `src/i18n/routing.ts`.
2. Copy `messages/en.json` to `messages/<code>.json` and translate the values, keeping every
   key identical — the app reads the same key paths for all locales.
3. Fill in the matching sibling for each `Localized` field in `src/content/*.ts`
   (widen the `Localized` type in `src/content/types.ts` first).
4. If the locale needs a different script, add its font subset in `src/app/[locale]/layout.tsx`.

`LangToggle` renders buttons from its own `ORDER` constant (TH before EN, as in Figma), not
from `routing.locales`: add the new locale to `ORDER` and a `common.langName.<code>` message.

## Conventions

- **No hardcoded UI strings** — everything goes through next-intl messages (except the root 404 outside a locale and the OG images, which render without the next-intl context).
- **No raw hex in components** — use the token utilities (`bg-bg`, `text-muted`,
  `border-line`, `text-accent`, …) defined in `src/styles/tokens.css`.
- Icon-only buttons carry an `aria-label`; interactive targets are at least 44px on mobile.
- `prefers-reduced-motion` is honoured globally in `globals.css`.
