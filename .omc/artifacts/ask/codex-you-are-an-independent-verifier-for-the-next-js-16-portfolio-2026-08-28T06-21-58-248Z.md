# codex advisor artifact

- Provider: codex
- Exit code: 0
- Created at: 2026-08-28T06:21:58.249Z

## Original task

You are an independent verifier for the Next.js 16 portfolio repo in the current directory (branch master). Do NOT modify source files. Read docs/DESIGN_BRIEF.md for the spec. Then: (1) run 'npm run lint', 'npm run typecheck', 'npm run build' and confirm the build output marks /[locale] and /[locale]/projects/[slug] as prerendered (SSG); (2) run 'npm run test'; (3) run e2e with PLAYWRIGHT_PORT=3300 set in the environment: 'npm run e2e' (port 3000 is used by another app; do not kill anything); (4) review the last 7 commits (git log -7 --stat, git show) for regressions, hacks, skipped/weakened tests, hardcoded strings/hex, and anything that contradicts the brief; (5) check src/proxy.ts matcher, src/app/not-found.tsx, src/app/[locale]/[...rest]/page.tsx, src/lib/seo.ts and metadata for correctness (canonical, hreflang en/th, og:image on / and /th, /icon and /opengraph-image returning 200). Report: exact command outputs summary (pass/fail counts), a verdict PASS/FAIL, and a numbered list of any remaining defects with file:line and severity. Be concrete and skeptical.

## Final prompt

You are an independent verifier for the Next.js 16 portfolio repo in the current directory (branch master). Do NOT modify source files. Read docs/DESIGN_BRIEF.md for the spec. Then: (1) run 'npm run lint', 'npm run typecheck', 'npm run build' and confirm the build output marks /[locale] and /[locale]/projects/[slug] as prerendered (SSG); (2) run 'npm run test'; (3) run e2e with PLAYWRIGHT_PORT=3300 set in the environment: 'npm run e2e' (port 3000 is used by another app; do not kill anything); (4) review the last 7 commits (git log -7 --stat, git show) for regressions, hacks, skipped/weakened tests, hardcoded strings/hex, and anything that contradicts the brief; (5) check src/proxy.ts matcher, src/app/not-found.tsx, src/app/[locale]/[...rest]/page.tsx, src/lib/seo.ts and metadata for correctness (canonical, hreflang en/th, og:image on / and /th, /icon and /opengraph-image returning 200). Report: exact command outputs summary (pass/fail counts), a verdict PASS/FAIL, and a numbered list of any remaining defects with file:line and severity. Be concrete and skeptical.

## Raw output

```text
## Verdict: FAIL

All requested automated checks pass, and SSG/SEO behavior is correct. The failure is for remaining design-brief violations.

| Command | Result |
|---|---|
| `npm run lint` | PASS — 0 diagnostics |
| `npm run typecheck` | PASS — 0 diagnostics |
| `npm run build` | PASS — `/en`, `/th`, and all 10 localized project pages marked `●` SSG |
| `npm run test` | PASS — 5 files, 130/130 tests; non-failing Vite future-compat warning |
| `PLAYWRIGHT_PORT=3300 npm run e2e` | PASS — 217 passed, 11 viewport-specific skips, 0 failed |

Production HTTP verification also passed: `/`, `/th`, `/icon`, and `/opengraph-image` return 200; the images are `image/png`. Both home pages emit correct canonical URLs, `en`/`th` hreflang alternates, and `og:image`.

Last-seven-commit review found no test deletion or unjustified skip; the 11 skips are appropriately conditional on desktop/mobile-only UI.

Remaining defects:

1. **Medium — token value contradicts the brief.** `src/styles/tokens.css:13` sets the light accent to `#1565D8`; the source-of-truth brief specifies `#1C70E6`. The related accent shadow was changed too.

2. **Medium — root 404 is not the specified/i18n-driven 404.** `src/app/not-found.tsx:14` intentionally uses plain hardcoded English; it omits the required terminal and glitch presentation, and its body copy differs from the brief. This violates the “all UI strings through next-intl messages” rule, even if normal unknown routes currently reach the localized catch-all page.

3. **Low — raw hex in a React UI route.** `src/app/icon.tsx:17` and `:18` hardcode `#0F2A4A` and `#FFFFFF`, contrary to the token rule. Reuse centralized OG/token constants instead.

4. **Low — future test-runner compatibility warning.** `vitest.config.ts:1` uses ESM syntax under a CommonJS-loaded config. Vitest warns this is unsupported by its planned native config loader default; tests pass today but a future major upgrade may break configuration loading.

The worktree is clean; no source files were modified during verification.


2026-08-28T06:17:38.700415Z ERROR codex_models_manager::manager: failed to load models cache: missing field `supports_parallel_tool_calls` at line 97 column 5
OpenAI Codex v0.147.0
--------
workdir: D:\haroon-portfolio
model: gpt-5.6-terra
provider: openai
approval: never
sandbox: danger-full-access
reasoning effort: high
reasoning summaries: none
session id: 01a04704-4c9e-7d92-919b-45800ea1fa3a
--------
user
You are an independent verifier for the Next.js 16 portfolio repo in the current directory (branch master). Do NOT modify source files. Read docs/DESIGN_BRIEF.md for the spec. Then: (1) run 'npm run lint', 'npm run typecheck', 'npm run build' and confirm the build output marks /[locale] and /[locale]/projects/[slug] as prerendered (SSG); (2) run 'npm run test'; (3) run e2e with PLAYWRIGHT_PORT=3300 set in the environment: 'npm run e2e' (port 3000 is used by another app; do not kill anything); (4) review the last 7 commits (git log -7 --stat, git show) for regressions, hacks, skipped/weakened tests, hardcoded strings/hex, and anything that contradicts the brief; (5) check src/proxy.ts matcher, src/app/not-found.tsx, src/app/[locale]/[...rest]/page.tsx, src/lib/seo.ts and metadata for correctness (canonical, hreflang en/th, og:image on / and /th, /icon and /opengraph-image returning 200). Report: exact command outputs summary (pass/fail counts), a verdict PASS/FAIL, and a numbered list of any remaining defects with file:line and severity. Be concrete and skeptical.
codex
I’ll perform a read-only verification against the design brief, then run the requested checks on port 3300 without touching the other app.
exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command 'Get-Content docs/DESIGN_BRIEF.md; git status --short; Get-ChildItem -Force | Select-Object -ExpandProperty Name' in D:\haroon-portfolio
 succeeded in 548ms:
# Haroon Kasor Portfolio — Design & Engineering Brief

Source of truth: Figma file `r4UKtMTrxwOGPs7WNEGrtA` (frames: Home, Home — Dark, Home — Mobile, Home — Mobile Menu (open),
Home — CV Preview (modal), Home — Mobile CV Preview (sheet), 404, 404 — Mobile, Project Detail — GoSkillUp LMS,
Project Detail — LMS Learn Tech, OG Image 1200×630, section 🧩 Components).

## Stack
Next.js 16 App Router + TS + React 19 · Tailwind v4 · next-intl (en default, th) · next-themes · lucide-react · simple-icons · framer-motion (hero/404 only).
No backend, no DB, no CMS. Static content in `src/content/*.ts`. GitHub repos fetched server-side (`next: { revalidate: 3600 }`).

## Rules for coding agents
- Do NOT write tests or review your own code. Only requirement: `npm run build`, `npm run lint`, `npm run typecheck` pass.
- No hardcoded UI strings — everything through next-intl messages (`messages/en.json`, `messages/th.json`). EN is the default locale with no prefix; Thai lives under `/th` (`localePrefix: "as-needed"`).
- Use tokens (CSS variables) — never raw hex in components.
- Fonts: Outfit (latin/digits) + Prompt (thai). Global: `font-family: var(--font-outfit), var(--font-prompt), sans-serif`.
- Accessible: visible focus ring (2px accent outline, offset 2px), `aria-label` on icon-only buttons, min 44px touch targets on mobile, `prefers-reduced-motion` respected.
- Commit small with prefix `feat(scope):`. Work only inside the files assigned to you; if you need something owned by another agent, create a minimal local stub matching the contract below and say so in your final report.

## Tokens (`src/styles/tokens.css`)
| token | light | dark |
|---|---|---|
| --color-bg | #FAF9F6 | #0B0E17 |
| --color-surface | #FFFFFF | #131826 |
| --color-line | #E3E0DB | #29303F |
| --color-text | #0F2A4A | #F2F3F7 |
| --color-muted | #6B6B73 | #9EA8BD |
| --color-accent | #1C70E6 | #5994FF |
| --color-accent-soft | #E3F0FF | #1F335C |
| --color-inverse | #121214 | #F2F3F7 |
| --color-on-inverse | #FFFFFF | #0B0E17 |
| --color-footer | #121214 | #080A12 |
| --gradient-hero | linear-gradient(100deg,#FDE8F0 0%,#EBE8FF 50%,#E3F7F2 100%) | linear-gradient(100deg,#291433 0%,#0F1433 50%,#0A2429 100%) |
| --gradient-band | linear-gradient(105deg,#1766E0,#2A9EF2) | linear-gradient(105deg,#1247B3,#1F73D9) |

Dark mode selector: `html[data-theme="dark"]` (next-themes `attribute="data-theme"`, `defaultTheme="system"`).
Radii: sm 6 · md 10 · lg 16 · xl 20 · 2xl 24 · full 999. Container max 1440, gutter 80px desktop / 20px mobile.
Type: headline 96px desktop / 56px mobile (Prompt Bold for the Thai line, Outfit Regular + Bold for latin lines), section title 56/32 SemiBold, body 16–20.
Shadows: card `0 2px 8px rgba(0,0,0,.04)` · float `0 24px 56px -12px rgba(26,38,102,.10)` · accent button `0 8px 24px rgba(28,112,230,.30)`.

## Shared prop contracts (`src/components/ui`)
```ts
Button:      { variant: "accent" | "ghost" | "dark"; size?: "md" | "lg"; href?: string; icon?: ReactNode; iconRight?: boolean; className?: string; children } // renders Link when href
Tag:         { children }
TechChip:    { name: string; slug: string }   // slug = simple-icons slug (e.g. "nextdotjs"); unknown slug → 2-letter lettermark
NavLink:     { href: string; active?: boolean; children }
ThemeToggle: {}   LangToggle: {}   BackToTop: {}
SectionHead: { index: string; label: string; title: string }
```

Data types (`src/content/types.ts`):
```ts
export type Localized = { en: string; th: string };
export type Project = {
  slug: string; index: string; title: Localized; summary: Localized; badge: string; tags: string[];
  cover: { from: string; to: string }; role: Localized; period: Localized; kind: Localized;
  stack: { name: string; slug?: string; note: Localized }[];
  links?: { demo?: string; repo?: string; internal?: boolean };
  overview: { problem: Localized; solution: Localized; result: Localized };
  features: { title: Localized; body: Localized; shot: Localized }[];
  next?: string; // slug of next project
};
export type Repo = { name: string; description: string | null; language: string | null; stars: number; url: string };
```

## Copy (EN / TH) — use exactly
- nav: About / เกี่ยวกับ · Experience / ประสบการณ์ · Work / ผลงาน · Contact / ติดต่อ · CV button "View CV" / "ดู CV"
- hero.tag: `JUNIOR DEVELOPER @ LEARN TECH · LMS & WEB APPS`
- hero.headline: EN ["Haroon Kasor", "Full-stack", "Developer"] · TH ["ฮารูน กาซอร์", "Full-stack", "Developer"] — line 1 Bold, line 2 Regular, line 3 Bold accent with gradient underline
- hero.subtitle: `Junior Developer @ Learn Tech · Next.js, React, Spring Boot · Bangkok`
- hero.cta: "View work →" / "ดูผลงาน →" · ghost: `github.com/HaroonKasor` (GitHub logo)
- terminal `haroon.ts`:
  `const haroon = {` / `role: "Junior Developer",` / `company: "Learn Tech",` / `frontend: ["Next.js", "React", "TypeScript"],` / `backend: ["Java", "Spring Boot", "MySQL"],` / `education: "CoE @ Ramkhamhaeng, 2026",` / `status: "open_to_work",` / `};`
- stats: **1+** "years as a working developer" / "ปีทำงานจริงตำแหน่ง Developer" · **10+** "projects delivered to real clients" / "โปรเจกต์ที่ส่งมอบให้ลูกค้าจริง" · **129** "API endpoints designed & documented" / "API endpoints ที่ออกแบบและเขียนเอกสาร"
- about (01 ABOUT / เกี่ยวกับผม): title "Turning requirements into features that actually ship" / "แปลงความต้องการให้เป็นฟีเจอร์ที่ใช้งานได้จริง"
  - EN p1: "I'm a Junior Developer at Learn Tech since August 2024, responsible for the company's main LMS platform across the full stack — from audit logging and PDPA-compliant user data management to social learning features, admin reporting and SCORM/xAPI content."
  - EN p2: "In parallel I'm finishing a B.Eng. in Computer and Electronics Engineering at Ramkhamhaeng University. My final-year project is GoSkillUp LMS, built with Next.js, Prisma and Docker."
  - TH p1: "ผมเป็น Junior Developer ที่ Learn Tech ตั้งแต่สิงหาคม 2024 รับผิดชอบแพลตฟอร์ม LMS หลักของบริษัทแบบ full stack ตั้งแต่ระบบ audit log การจัดการข้อมูลผู้ใช้ตาม PDPA ฟีเจอร์ social learning ไปจนถึงรายงานสำหรับแอดมินและสื่อ SCORM/xAPI"
  - TH p2: "ควบคู่กันกำลังศึกษาวิศวกรรมคอมพิวเตอร์และอิเล็กทรอนิกส์ที่มหาวิทยาลัยรามคำแหง โปรเจกต์จบคือ GoSkillUp LMS พัฒนาด้วย Next.js, Prisma และ Docker"
  - tech chips (name → simple-icons slug): Next.js→nextdotjs, React→react, TypeScript→typescript, Tailwind→tailwindcss, Java→openjdk, Spring Boot→springboot, MySQL→mysql, SQL Server→(lettermark "SQL"), Docker→docker, Playwright→playwright, Figma→figma, GitLab→gitlab
  - skill groups: FRONT-END "React · Next.js · TypeScript · JavaScript · Tailwind CSS" · BACK-END / DATA "Java · Spring Boot · MySQL · SQL Server · API Integration" · TOOLS & AI "GitHub · GitLab · Docker · Figma · Playwright · Claude Code · Codex"
- experience (02 EXPERIENCE / ประสบการณ์): "The road so far" / "เส้นทางที่ผ่านมา"
  1. `2024 — NOW` · "Junior Developer" · "Learn Tech · Bangkok" / "Learn Tech · กรุงเทพฯ" · EN: "Build and maintain the company's main LMS platform across the full stack, plus client LMS systems, a membership & course-booking site, a government e-learning platform (129 documented API endpoints), 13 VR games, SCORM/xAPI content and production database operations." TH: "พัฒนาและดูแลแพลตฟอร์ม LMS หลักของบริษัทแบบ full stack รวมถึงระบบ LMS ของลูกค้า เว็บสมาชิก/จองคอร์ส ระบบ e-learning ภาครัฐ (เอกสาร API 129 endpoints) เกม VR 13 เกม สื่อ SCORM/xAPI และงานดูแลฐานข้อมูล production"
  2. `2026` · "Final Year Project — GoSkillUp LMS" · "Ramkhamhaeng University" / "มหาวิทยาลัยรามคำแหง" · EN: "An end-to-end LMS: course management, enrollment, quizzes, certificates and reporting with Next.js, React, Tailwind and Prisma; SCORM/xAPI support; deployed with Docker." TH: "ระบบ LMS ครบวงจร: จัดการคอร์ส ลงทะเบียน แบบทดสอบ ใบประกาศ รายงาน ด้วย Next.js, React, Tailwind, Prisma รองรับ SCORM/xAPI และ deploy ด้วย Docker"
  3. `2022 — 2026` · "B.Eng. Computer & Electronics Engineering" · "Ramkhamhaeng University · Bangkok" / "มหาวิทยาลัยรามคำแหง · กรุงเทพฯ" · EN: "Bachelor of Engineering, Computer and Electronics Engineering." TH: "วิศวกรรมศาสตรบัณฑิต สาขาวิศวกรรมคอมพิวเตอร์และอิเล็กทรอนิกส์"
- projects (03 WORK / ผลงาน): "Work I actually shipped" / "งานที่ผมลงมือทำจริง" — 5 cards, order & data:
  1. `goskillup-lms` 01 badge NEXT.JS cover #3B47FF→#262EBF tags [Next.js, Prisma, Tailwind, Docker] · title "GoSkillUp LMS Platform" · EN "Final-year project: an end-to-end LMS with course management, enrollment, quizzes, certificates and reporting; SCORM/xAPI support; Docker deployment." TH "โปรเจกต์จบ ระบบ LMS ครบวงจร จัดการคอร์ส ลงทะเบียน แบบทดสอบ ใบประกาศ รายงาน รองรับ SCORM/xAPI และ deploy ด้วย Docker" (large card)
  2. `learntech-lms` 02 badge REACT cover #FF9E6B→#E65233 tags [React, Spring Boot, MySQL] · EN title "Learn Tech LMS" / TH "LMS ของ Learn Tech" · EN "My main responsibility: audit logging with export, PDPA soft-delete/restore, social learning and admin reporting." TH "งานหลักที่รับผิดชอบ audit log พร้อม export, soft delete/กู้คืนตาม PDPA, social learning และรายงานแอดมิน"
  3. `membership-booking` 03 badge NEXT.JS cover #33BF99→#0D7366 tags [Next.js, SQL Server] · EN "Membership & Course Booking" / TH "ระบบสมาชิกและจองคอร์สอบรม" · EN "Course booking for a client with VIP membership, discount coupons and automatic invoicing." TH "ระบบจองคอร์สสำหรับลูกค้า พร้อมสมาชิก VIP คูปองส่วนลด และออกใบแจ้งหนี้อัตโนมัติ"
  4. `gov-elearning` 04 badge SPRING BOOT cover #8C73FF→#4D33B3 tags [Spring Boot, API Docs] · EN "Government E-learning Platform" / TH "E-learning ภาครัฐ" · EN "Bootstrapped backend and frontend from scratch, documented 129 API endpoints and wrote API test scripts." TH "วางโครง backend + frontend ตั้งแต่ต้น เขียนเอกสาร API 129 endpoints และสคริปต์ทดสอบ API"
  5. `vr-science-games` 05 badge VR cover #FF80A6→#BF3373 tags [VR, Integration] · EN "VR Science Games ×13" / TH "เกม VR วิทยาศาสตร์ ×13" · EN "Connected 13 VR games to the backend to record gameplay results and produced game builds for delivery." TH "เชื่อมต่อเกม VR 13 เกมกับ backend เพื่อบันทึกผลการเล่น และ build ตัวเกมส่งมอบ"
- github (04 GITHUB): "Code you can read" / "โค้ดที่เปิดให้ดูได้" · link "All repos on github.com/HaroonKasor →" / "ดู repo ทั้งหมดที่ github.com/HaroonKasor →" · fallback repos if API fails: portfolio (TypeScript, ★2), ru-elearning (HTML), expense-notify (YAML), quake-alert (Python)
- testimonial (05 TESTIMONIAL / คำรับรอง): "From people I've worked with" / "จากคนที่เคยร่วมงาน" — content flag `SHOW_TESTIMONIAL = false` hides the section until real text exists
- contact (06 CONTACT / ติดต่อ): "Open for\nFull-stack Developer roles" / "เปิดรับงานตำแหน่ง\nFull-stack Developer" · email `haroonkasor.dev@gmail.com` (mailto + copy button "Copy" / "คัดลอก" → "Copied" / "คัดลอกแล้ว") · GITHUB github.com/HaroonKasor · PHONE 062-496-9217 · LOCATION Bangkok, Thailand
- footer: `© 2026 HAROON KASOR` · `BANGKOK, THAILAND`
- 404: eyebrow `ERROR 404 · PAGE NOT FOUND` · title EN "This page doesn't exist\n(or hasn't been pushed yet)" / TH "หน้านี้ไม่มีอยู่จริง\n(หรือยังไม่ได้ push ขึ้นมา)" · body EN "The link may be mistyped or the page moved. Pick a destination from the terminal or use the buttons." / TH "ลิงก์อาจพิมพ์ผิดหรือหน้าถูกย้ายไปแล้ว เลือกปลายทางจาก terminal หรือกดปุ่มด้านล่าง" · terminal `error.log`: `$ open /projcts` → red `bash: /projcts: No such file or directory` → `$ ls ~` → rows `~/` Home/หน้าแรก, `~/projects` Work/ผลงาน, `~/experience` Experience/ประสบการณ์, `~/contact` Contact/ติดต่อ → `$ cd ~/projects▌` (blinking) · buttons "Back home" / "กลับหน้าแรก", "View work" / "ดูผลงาน" · glitch numeral 404 (RGB split blue/pink + shifted slice band)
- CV modal: title "Resume — Haroon Kasor" · segmented ไทย / English · buttons "Open in new tab" / "เปิดในแท็บใหม่", "Download PDF" / "ดาวน์โหลด PDF" · footer "Page 1 / 2" · files `/cv/haroon-kasor-en.pdf`, `/cv/haroon-kasor-th.pdf`
- Project detail (both): back link "Back to work" / "กลับไปหน้าผลงาน" · facts labels ROLE/บทบาท, PERIOD/ระยะเวลา, STACK/เทคโนโลยี, TYPE/ประเภท · sections 01 OVERVIEW/ภาพรวม (Problem/ปัญหา · What I did/สิ่งที่ทำ · Result/ผลลัพธ์), 02 KEY FEATURES/ฟีเจอร์หลัก, 03 TECH STACK/เทคโนโลยีที่ใช้, "Next project"/"โปรเจกต์ถัดไป" · learntech-lms shows badge "Internal client system" / "ระบบภายในของลูกค้า" instead of links. Detailed overview/feature text: see `src/content/projects.ts` (Agent A writes from Figma frames).

## Layout
Home: Navbar (transparent over hero gradient; desktop: brand, pill links, TH/EN + theme toggle + View CV; mobile: brand, theme toggle, hamburger) → Hero (2-col desktop, stacked mobile; terminal card right) → Stats card overlapping hero bottom (margin-top −110px desktop / −70px mobile) → About (label column 300px + content on desktop) → Experience band (gradient, white text, entries with date column) → Projects (bento: row 1 = large card fill + fixed 420px; row 2 = 3 equal; mobile single column, cover 200px) → GitHub (4 cards / stacked) → Testimonial (hidden by flag) → Contact → Footer. Floating Back-to-top (bottom-right, appears after 600px scroll).
Mobile menu (open): full-screen sheet; items 01–05 with numbers, arrow; TH/EN toggle + View CV row; contact lines.
Breakpoints: mobile <768, tablet 768–1023, desktop ≥1024 (Figma 1440 canvas, use `max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20`).
.git
.github
.next
docs
messages
node_modules
public
src
test-results
tests
.env.example
.gitignore
.prettierrc
AGENTS.md
CLAUDE.md
eslint.config.mjs
next-env.d.ts
next.config.ts
package-lock.json
package.json
playwright.config.ts
postcss.config.mjs
README.md
tsconfig.json
tsconfig.tsbuildinfo
vitest.config.ts

exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command 'npm run lint' in D:\haroon-portfolio
 succeeded in 5531ms:

> haroon-portfolio@0.1.0 lint
> eslint


exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command 'npm run typecheck' in D:\haroon-portfolio
 succeeded in 3424ms:

> haroon-portfolio@0.1.0 typecheck
> tsc --noEmit


2026-08-28T06:18:02.438761Z ERROR codex_models_manager::manager: failed to renew cache TTL: missing field `supports_parallel_tool_calls` at line 97 column 5
exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command 'npm run build' in D:\haroon-portfolio
2026-08-28T06:18:15.893429Z ERROR codex_models_manager::manager: failed to renew cache TTL: missing field `supports_parallel_tool_calls` at line 97 column 5
codex
Lint and TypeScript checks pass cleanly. The production build is still running; I’ll use its route table to verify static prerendering.
 succeeded in 13783ms:

> haroon-portfolio@0.1.0 build
> next build

▲ Next.js 16.3.3 (Turbopack)
✓ Running next.config.ts took 56ms

  Creating an optimized production build ...
✓ Compiled successfully in 2.7s
  Running TypeScript ...
  Finished TypeScript in 3.6s ...
  Collecting page data using 11 workers ...
  Generating static pages using 11 workers (0/20) ...
  Generating static pages using 11 workers (5/20) 
  Generating static pages using 11 workers (10/20) 
  Generating static pages using 11 workers (15/20) 
✓ Generating static pages using 11 workers (20/20) in 1615ms
  Finalizing page optimization ...

Route (app)
┌ ○ /_not-found
├   /[locale]
│ ├ ● /en
│ └ ● /th
├ ƒ /[locale]/[...rest]
├   /[locale]/projects/[slug]
│ ├ ● /en/projects/goskillup-lms
│ ├ ● /en/projects/learntech-lms
│ ├ ● /en/projects/membership-booking
│ └ ● [+7 more paths]
├ ● /[locale]/projects/[slug]/opengraph-image
├ ● /[locale]/projects/[slug]/twitter-image
├ ○ /icon
├ ○ /manifest.webmanifest
├ ○ /opengraph-image
├ ○ /robots.txt
├ ○ /sitemap.xml
└ ○ /twitter-image


ƒ Proxy (Middleware)

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand


2026-08-28T06:18:18.618689Z ERROR codex_models_manager::manager: failed to renew cache TTL: missing field `supports_parallel_tool_calls` at line 97 column 5
exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command 'npm run test' in D:\haroon-portfolio
 succeeded in 3717ms:

> haroon-portfolio@0.1.0 test
> vitest run


 RUN  v4.1.11 D:/haroon-portfolio


 Test Files  5 passed (5)
      Tests  130 passed (130)
   Start at  13:18:21
   Duration  2.47s (transform 399ms, setup 1.41s, import 671ms, tests 458ms, environment 6.55s)

[33m(!) Your Vite config uses features that are unsupported by `configLoader: 'native'`, which is planned to become the default in a future major version of Vite:
  - ESM syntax in a file loaded as CommonJS (vitest.config.ts:1:1). Use a `.mjs` extension or set `"type": "module"` in the closest package.json
Set `VITE_CONFIG_NATIVE_IGNORE_WARNING=true` to suppress this warning.[39m

2026-08-28T06:18:24.491196Z ERROR codex_models_manager::manager: failed to renew cache TTL: missing field `supports_parallel_tool_calls` at line 97 column 5
exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command '$env:PLAYWRIGHT_PORT='"'3300'; npm run e2e" in D:\haroon-portfolio
2026-08-28T06:18:37.299611Z ERROR codex_models_manager::manager: failed to renew cache TTL: missing field `supports_parallel_tool_calls` at line 97 column 5
2026-08-28T06:19:10.806825Z ERROR codex_models_manager::manager: failed to renew cache TTL: missing field `supports_parallel_tool_calls` at line 97 column 5
codex
Unit tests pass: 5 files and 130 tests. The Playwright suite is running against its requested isolated port (3300).
 succeeded in 60205ms:

> haroon-portfolio@0.1.0 e2e
> playwright test


Running 228 tests using 6 workers

  ok   5 [desktop] › tests\e2e\seo.spec.ts:12:7 › sitemap.xml › responds 200 with XML (98ms)
  ok   7 [desktop] › tests\e2e\seo.spec.ts:18:7 › sitemap.xml › lists home plus the five projects for both locales (254ms)
  ok   8 [desktop] › tests\e2e\seo.spec.ts:28:7 › sitemap.xml › includes every project slug for both locales (171ms)
  ok   9 [desktop] › tests\e2e\seo.spec.ts:37:7 › sitemap.xml › includes both locale home pages (165ms)
  ok  10 [desktop] › tests\e2e\seo.spec.ts:50:7 › robots.txt › responds 200 (192ms)
  ok  11 [desktop] › tests\e2e\seo.spec.ts:54:7 › robots.txt › points at the sitemap (52ms)
  ok   2 [desktop] › tests\e2e\cv-modal.spec.ts:18:7 › CV preview dialog › opens a dialog when View CV is activated (1.3s)
  ok   3 [desktop] › tests\e2e\home.spec.ts:16:7 › English home page › serves the document with lang=en (1.3s)
  ok   6 [desktop] › tests\e2e\a11y.spec.ts:26:7 › accessible names › every icon-only control on / has an accessible name (962ms)
  ok   4 [desktop] › tests\e2e\not-found.spec.ts:4:7 › unknown route › responds with HTTP 404 (1.3s)
  ok   1 [desktop] › tests\e2e\navigation.spec.ts:4:7 › project card navigation › opens the first project from the English home page (1.6s)
  ok  12 [desktop] › tests\e2e\seo.spec.ts:62:7 › generated images › /opengraph-image returns a PNG (832ms)
  ok  13 [desktop] › tests\e2e\cv-modal.spec.ts:29:7 › CV preview dialog › shows the Resume title (887ms)
  ok  16 [desktop] › tests\e2e\not-found.spec.ts:9:7 › unknown route › shows the ERROR 404 eyebrow (789ms)
  ok  14 [desktop] › tests\e2e\home.spec.ts:20:7 › English home page › renders the three hero headline lines (936ms)
  ok  15 [desktop] › tests\e2e\a11y.spec.ts:34:7 › accessible names › every icon-only control on /th has an accessible name (906ms)
  ok  18 [desktop] › tests\e2e\seo.spec.ts:68:7 › generated images › /icon responds 200 (806ms)
  ok  19 [desktop] › tests\e2e\cv-modal.spec.ts:35:7 › CV preview dialog › embeds an iframe pointing at the English CV by default on / (806ms)
  ok  22 [desktop] › tests\e2e\a11y.spec.ts:42:7 › accessible names › every icon-only control on a project page has an accessible name (747ms)
  ok  21 [desktop] › tests\e2e\home.spec.ts:27:7 › English home page › renders the hero eyebrow tag (781ms)
  ok  20 [desktop] › tests\e2e\not-found.spec.ts:14:7 › unknown route › shows the glitch 404 numeral (1.0s)
  ok  17 [desktop] › tests\e2e\navigation.spec.ts:19:7 › project card navigation › opens the first project from the Thai home page under /th (2.1s)
  ok  23 [desktop] › tests\e2e\seo.spec.ts:74:7 › generated images › a project opengraph image responds 200 (894ms)
  ok  25 [desktop] › tests\e2e\a11y.spec.ts:50:7 › accessible names › the theme toggle names itself (1.5s)
  ok  26 [desktop] › tests\e2e\home.spec.ts:33:7 › English home page › renders the three stats with their values (1.5s)
  ok  24 [desktop] › tests\e2e\cv-modal.spec.ts:48:7 › CV preview dialog › defaults to the Thai CV when opened from /th (1.5s)
  ok  27 [desktop] › tests\e2e\not-found.spec.ts:19:7 › unknown route › shows the error.log terminal with the failing command (1.4s)
  ok  31 [desktop] › tests\e2e\home.spec.ts:40:7 › English home page › renders the English stat labels (756ms)
  ok  33 [desktop] › tests\e2e\not-found.spec.ts:30:7 › unknown route › lists the four terminal destination rows (790ms)
  ok  30 [desktop] › tests\e2e\a11y.spec.ts:57:7 › accessible names › the language toggle group names itself (858ms)
  ok  32 [desktop] › tests\e2e\cv-modal.spec.ts:61:7 › CV preview dialog › switches the iframe to the Thai PDF via the ไทย segment (951ms)
  ok  29 [desktop] › tests\e2e\seo.spec.ts:84:7 › page titles › the English home page has a non-empty title (1.1s)
  ok  35 [desktop] › tests\e2e\not-found.spec.ts:40:7 › unknown route › offers the Back home and View work buttons (672ms)
  ok  34 [desktop] › tests\e2e\home.spec.ts:52:7 › English home page › exposes a skip link to the main content (732ms)
  ok  36 [desktop] › tests\e2e\a11y.spec.ts:68:7 › images and decorative graphics › every <img> on / is labelled or explicitly decorative (702ms)
  ok  37 [desktop] › tests\e2e\cv-modal.spec.ts:80:7 › CV preview dialog › switches back to the English PDF via the English segment (1.1s)
  ok  39 [desktop] › tests\e2e\not-found.spec.ts:48:7 › terminal row navigation › navigates to /#work when the ~/projects row is clicked (763ms)
  ok  41 [desktop] › tests\e2e\a11y.spec.ts:85:7 › images and decorative graphics › every inline <svg> on / is hidden or titled (970ms)
  ok  38 [desktop] › tests\e2e\seo.spec.ts:91:7 › page titles › the Thai home page has a non-empty title (1.1s)
  ok  40 [desktop] › tests\e2e\home.spec.ts:59:7 › English home page › has every section anchor the nav points at (1.0s)
  ok  42 [desktop] › tests\e2e\cv-modal.spec.ts:100:7 › CV preview dialog › marks the active language segment with aria-pressed (955ms)
  ok  43 [desktop] › tests\e2e\not-found.spec.ts:58:7 › terminal row navigation › navigates to /#contact when the ~/contact row is clicked (961ms)
  ok  44 [desktop] › tests\e2e\a11y.spec.ts:110:7 › keyboard tab order › Tab from the top reaches the skip link first (721ms)
  ok  28 [desktop] › tests\e2e\navigation.spec.ts:34:7 › project card navigation › renders all five project cards in the work section (4.1s)
  ok  46 [desktop] › tests\e2e\home.spec.ts:68:7 › English home page › renders the contact email as a mailto link (724ms)
  ok  45 [desktop] › tests\e2e\seo.spec.ts:96:7 › page titles › a project page titles itself after the project (852ms)
  ok  50 [desktop] › tests\e2e\navigation.spec.ts:46:7 › project detail page › shows the project title as the h1 (858ms)
  ok  48 [desktop] › tests\e2e\not-found.spec.ts:67:7 › terminal row navigation › navigates home when the ~/ row is clicked (955ms)
  ok  51 [desktop] › tests\e2e\home.spec.ts:83:7 › English navigation labels › shows About/Experience/Work/Contact in the desktop pill nav (960ms)
  ok  47 [desktop] › tests\e2e\cv-modal.spec.ts:117:7 › CV preview dialog › shows the page indicator in the footer (1.3s)
  ok  52 [desktop] › tests\e2e\seo.spec.ts:101:7 › page titles › every page exposes a meta description (964ms)
  ok  49 [desktop] › tests\e2e\a11y.spec.ts:122:7 › keyboard tab order › tabbing reaches the nav links and the CV button (1.2s)
  -   55 [desktop] › tests\e2e\home.spec.ts:96:7 › English navigation labels › shows the same labels inside the mobile sheet
  ok  53 [desktop] › tests\e2e\navigation.spec.ts:52:7 › project detail page › shows the four facts-strip labels (906ms)
  ok  57 [desktop] › tests\e2e\seo.spec.ts:111:7 › hreflang alternates › a project page declares en and th alternates (749ms)
  ok  56 [desktop] › tests\e2e\cv-modal.spec.ts:125:7 › CV dialog download link › offers a download link carrying the download attribute (955ms)
  ok  54 [desktop] › tests\e2e\not-found.spec.ts:76:7 › terminal keyboard command › navigates to /#contact after typing `cd ~/contact` and Enter (1.2s)
  ok  58 [desktop] › tests\e2e\a11y.spec.ts:145:7 › keyboard tab order › every focused control shows a visible focus indicator (980ms)
  ok  59 [desktop] › tests\e2e\home.spec.ts:116:7 › Thai home page › serves the document with lang=th (998ms)
  ok  60 [desktop] › tests\e2e\navigation.spec.ts:61:7 › project detail page › shows a value for every facts-strip label (738ms)
  ok  61 [desktop] › tests\e2e\seo.spec.ts:122:7 › hreflang alternates › the th alternate points at the /th path (988ms)
  ok  64 [desktop] › tests\e2e\a11y.spec.ts:171:7 › document structure › has exactly one h1 on the home page (922ms)
  ok  66 [desktop] › tests\e2e\navigation.spec.ts:69:7 › project detail page › renders exactly three overview cards (872ms)
  ok  62 [desktop] › tests\e2e\cv-modal.spec.ts:139:7 › CV dialog download link › repoints the download link when the language segment changes (1.4s)
  ok  63 [desktop] › tests\e2e\not-found.spec.ts:91:7 › terminal keyboard command › navigates to /#work after typing `cd ~/projects` and Enter (1.4s)
  ok  67 [desktop] › tests\e2e\seo.spec.ts:131:7 › hreflang alternates › a project page declares a canonical URL (1.2s)
  ok  65 [desktop] › tests\e2e\home.spec.ts:120:7 › Thai home page › renders the Thai hero name (1.5s)
  ok  68 [desktop] › tests\e2e\a11y.spec.ts:176:7 › document structure › has exactly one h1 on a project page (1.0s)
  ok  69 [desktop] › tests\e2e\navigation.spec.ts:73:7 › project detail page › titles the overview cards Problem / What I did / Result (932ms)
  ok  70 [desktop] › tests\e2e\cv-modal.spec.ts:155:7 › CV dialog dismissal › closes on Escape and returns focus to the trigger (1.2s)
  ok  72 [desktop] › tests\e2e\seo.spec.ts:140:7 › hreflang alternates › the home page declares en and th alternates (676ms)
  ok  74 [desktop] › tests\e2e\a11y.spec.ts:181:7 › document structure › wraps the page content in a <main> landmark (775ms)
  ok  71 [desktop] › tests\e2e\not-found.spec.ts:103:7 › terminal keyboard command › stays put when an unknown command is entered (1.8s)
  ok  77 [desktop] › tests\e2e\seo.spec.ts:153:7 › open graph metadata › declares og:title and og:description on the home page (663ms)
  ok  75 [desktop] › tests\e2e\navigation.spec.ts:82:7 › project detail page › shows a back link to the work section (1.2s)
  ok  73 [desktop] › tests\e2e\home.spec.ts:126:7 › Thai home page › renders the Thai nav label เกี่ยวกับ (1.6s)
  ok  76 [desktop] › tests\e2e\cv-modal.spec.ts:175:7 › CV dialog dismissal › closes when the close button is used (1.2s)
  ok  80 [desktop] › tests\e2e\seo.spec.ts:169:7 › open graph metadata › declares the th_TH og:locale on the Thai project page (804ms)
  ok  79 [desktop] › tests\e2e\not-found.spec.ts:114:7 › terminal keyboard command › removes the last character on Backspace (983ms)
  ok  82 [desktop] › tests\e2e\home.spec.ts:139:7 › Thai home page › renders the Thai stat labels (1.0s)
  ok  81 [desktop] › tests\e2e\navigation.spec.ts:89:7 › project detail page › navigates to the next project via the next-project link (1.1s)
  ok  85 [desktop] › tests\e2e\not-found.spec.ts:126:7 › Thai 404 › responds 404 and renders the Thai copy under /th (986ms)
  ok  83 [desktop] › tests\e2e\cv-modal.spec.ts:186:7 › CV dialog dismissal › traps focus inside the dialog while open (1.6s)
  ok  86 [desktop] › tests\e2e\home.spec.ts:144:7 › Thai home page › has the same section anchors as the English page (974ms)
  ok  84 [desktop] › tests\e2e\theme.spec.ts:28:7 › theme toggle › switches html[data-theme] to dark on the first click (1.4s)
  ok  87 [desktop] › tests\e2e\navigation.spec.ts:104:7 › project detail page › keeps the locale when following the next-project link from /th (929ms)
  -   88 [desktop] › tests\e2e\cv-modal.spec.ts:215:7 › mobile navigation sheet › opens the hamburger menu as a dialog
  -   92 [desktop] › tests\e2e\cv-modal.spec.ts:226:7 › mobile navigation sheet › lists the five numbered destinations
  ok  78 [desktop] › tests\e2e\a11y.spec.ts:193:7 › axe scan › reports no serious or critical violations on / (3.3s)
  ok  91 [desktop] › tests\e2e\navigation.spec.ts:119:7 › internal-only project › shows the internal badge instead of demo/repo links (571ms)
  ok  89 [desktop] › tests\e2e\home.spec.ts:152:7 › locale routing › redirects /en to the prefix-free default locale (622ms)
  ok  90 [desktop] › tests\e2e\theme.spec.ts:36:7 › theme toggle › switches back to light on the second click (800ms)
  -   93 [desktop] › tests\e2e\cv-modal.spec.ts:237:7 › mobile navigation sheet › closes via the close button
  ok  96 [desktop] › tests\e2e\home.spec.ts:158:7 › locale routing › switches from / to /th via the language toggle (746ms)
  ok  95 [desktop] › tests\e2e\navigation.spec.ts:128:7 › unknown project slug › returns a 404 status (821ms)
  -   98 [desktop] › tests\e2e\cv-modal.spec.ts:247:7 › mobile navigation sheet › closes on Escape
  ok  97 [desktop] › tests\e2e\theme.spec.ts:45:7 › theme toggle › has an accessible name on the icon-only trigger (904ms)
  -  101 [desktop] › tests\e2e\cv-modal.spec.ts:259:7 › mobile navigation sheet › closes when a destination is followed
  ok 100 [desktop] › tests\e2e\navigation.spec.ts:133:7 › unknown project slug › renders the 404 page body (535ms)
  -  103 [desktop] › tests\e2e\cv-modal.spec.ts:268:7 › mobile navigation sheet › renders the CV dialog as a bottom sheet variant on mobile
  ok  99 [desktop] › tests\e2e\home.spec.ts:171:7 › locale routing › switches back from /th to / via the language toggle (815ms)
  ok 102 [desktop] › tests\e2e\theme.spec.ts:53:7 › theme persistence › keeps dark mode after a reload (1.1s)
  ok 104 [desktop] › tests\e2e\home.spec.ts:185:7 › locale routing › preserves the path when switching locale on a project page (618ms)
  ok  94 [desktop] › tests\e2e\a11y.spec.ts:214:7 › axe scan › reports no serious or critical violations on /th (2.4s)
  ok 105 [desktop] › tests\e2e\theme.spec.ts:62:7 › theme persistence › keeps dark mode when navigating to another page (762ms)
  ok 106 [desktop] › tests\e2e\home.spec.ts:200:9 › no horizontal overflow › the document does not scroll sideways at / (1.1s)
  ok 108 [desktop] › tests\e2e\theme.spec.ts:71:7 › theme persistence › keeps dark mode across the locale switch (743ms)
  ok 109 [desktop] › tests\e2e\home.spec.ts:200:9 › no horizontal overflow › the document does not scroll sideways at /th (1.1s)
  ok 110 [desktop] › tests\e2e\theme.spec.ts:85:7 › theme visual effect › changes the body background colour between light and dark (660ms)
  ok 107 [desktop] › tests\e2e\a11y.spec.ts:235:7 › axe scan › reports no serious or critical violations on a project page (2.2s)
  ok 112 [desktop] › tests\e2e\theme.spec.ts:100:7 › theme visual effect › renders the light background as the near-white token (539ms)
  ok 113 [mobile] › tests\e2e\cv-modal.spec.ts:18:7 › CV preview dialog › opens a dialog when View CV is activated (801ms)
  ok 111 [desktop] › tests\e2e\home.spec.ts:200:9 › no horizontal overflow › the document does not scroll sideways at /projects/goskillup-lms (1.3s)
  ok 115 [desktop] › tests\e2e\theme.spec.ts:108:7 › theme visual effect › renders the dark background as the deep navy token (887ms)
  ok 116 [mobile] › tests\e2e\a11y.spec.ts:26:7 › accessible names › every icon-only control on / has an accessible name (637ms)
  ok 114 [mobile] › tests\e2e\home.spec.ts:16:7 › English home page › serves the document with lang=en (931ms)
  ok 117 [mobile] › tests\e2e\cv-modal.spec.ts:29:7 › CV preview dialog › shows the Resume title (875ms)
  ok 119 [mobile] › tests\e2e\a11y.spec.ts:34:7 › accessible names › every icon-only control on /th has an accessible name (706ms)
  ok 120 [mobile] › tests\e2e\home.spec.ts:20:7 › English home page › renders the three hero headline lines (809ms)
  ok 122 [mobile] › tests\e2e\a11y.spec.ts:42:7 › accessible names › every icon-only control on a project page has an accessible name (484ms)
  ok 121 [mobile] › tests\e2e\cv-modal.spec.ts:35:7 › CV preview dialog › embeds an iframe pointing at the English CV by default on / (805ms)
  ok 123 [mobile] › tests\e2e\home.spec.ts:27:7 › English home page › renders the hero eyebrow tag (584ms)
  ok 124 [mobile] › tests\e2e\a11y.spec.ts:50:7 › accessible names › the theme toggle names itself (704ms)
  ok 118 [desktop] › tests\e2e\home.spec.ts:212:7 › no horizontal overflow › stays within the viewport after scrolling to the bottom (2.2s)
  ok 125 [mobile] › tests\e2e\cv-modal.spec.ts:48:7 › CV preview dialog › defaults to the Thai CV when opened from /th (681ms)
  ok 126 [mobile] › tests\e2e\home.spec.ts:33:7 › English home page › renders the three stats with their values (737ms)
  ok 127 [mobile] › tests\e2e\a11y.spec.ts:57:7 › accessible names › the language toggle group names itself (554ms)
  ok 129 [mobile] › tests\e2e\home.spec.ts:40:7 › English home page › renders the English stat labels (567ms)
  ok 130 [mobile] › tests\e2e\a11y.spec.ts:68:7 › images and decorative graphics › every <img> on / is labelled or explicitly decorative (457ms)
  ok 128 [mobile] › tests\e2e\cv-modal.spec.ts:61:7 › CV preview dialog › switches the iframe to the Thai PDF via the ไทย segment (824ms)
  ok 131 [mobile] › tests\e2e\home.spec.ts:52:7 › English home page › exposes a skip link to the main content (500ms)
  ok 132 [mobile] › tests\e2e\a11y.spec.ts:85:7 › images and decorative graphics › every inline <svg> on / is hidden or titled (507ms)
  ok 135 [mobile] › tests\e2e\a11y.spec.ts:110:7 › keyboard tab order › Tab from the top reaches the skip link first (473ms)
  ok 134 [mobile] › tests\e2e\home.spec.ts:59:7 › English home page › has every section anchor the nav points at (561ms)
  -  136 [mobile] › tests\e2e\a11y.spec.ts:122:7 › keyboard tab order › tabbing reaches the nav links and the CV button
  ok 133 [mobile] › tests\e2e\cv-modal.spec.ts:80:7 › CV preview dialog › switches back to the English PDF via the English segment (1.2s)
  ok 137 [mobile] › tests\e2e\home.spec.ts:68:7 › English home page › renders the contact email as a mailto link (476ms)
  ok 138 [mobile] › tests\e2e\a11y.spec.ts:145:7 › keyboard tab order › every focused control shows a visible focus indicator (481ms)
  -  140 [mobile] › tests\e2e\home.spec.ts:83:7 › English navigation labels › shows About/Experience/Work/Contact in the desktop pill nav
  ok 139 [mobile] › tests\e2e\cv-modal.spec.ts:100:7 › CV preview dialog › marks the active language segment with aria-pressed (706ms)
  ok 141 [mobile] › tests\e2e\a11y.spec.ts:171:7 › document structure › has exactly one h1 on the home page (443ms)
  ok 142 [mobile] › tests\e2e\home.spec.ts:96:7 › English navigation labels › shows the same labels inside the mobile sheet (574ms)
  ok 144 [mobile] › tests\e2e\a11y.spec.ts:176:7 › document structure › has exactly one h1 on a project page (392ms)
  ok 143 [mobile] › tests\e2e\cv-modal.spec.ts:117:7 › CV preview dialog › shows the page indicator in the footer (636ms)
  ok 145 [mobile] › tests\e2e\home.spec.ts:116:7 › Thai home page › serves the document with lang=th (569ms)
  ok 146 [mobile] › tests\e2e\a11y.spec.ts:181:7 › document structure › wraps the page content in a <main> landmark (494ms)
  ok 148 [mobile] › tests\e2e\home.spec.ts:120:7 › Thai home page › renders the Thai hero name (493ms)
  ok 147 [mobile] › tests\e2e\cv-modal.spec.ts:125:7 › CV dialog download link › offers a download link carrying the download attribute (825ms)
  ok 151 [mobile] › tests\e2e\cv-modal.spec.ts:139:7 › CV dialog download link › repoints the download link when the language segment changes (814ms)
  ok 150 [mobile] › tests\e2e\home.spec.ts:126:7 › Thai home page › renders the Thai nav label เกี่ยวกับ (1.0s)
  -  153 [mobile] › tests\e2e\cv-modal.spec.ts:155:7 › CV dialog dismissal › closes on Escape and returns focus to the trigger
  ok 154 [mobile] › tests\e2e\home.spec.ts:139:7 › Thai home page › renders the Thai stat labels (609ms)
  ok 152 [mobile] › tests\e2e\navigation.spec.ts:4:7 › project card navigation › opens the first project from the English home page (765ms)
  ok 156 [mobile] › tests\e2e\seo.spec.ts:12:7 › sitemap.xml › responds 200 with XML (475ms)
  ok 149 [mobile] › tests\e2e\a11y.spec.ts:193:7 › axe scan › reports no serious or critical violations on / (2.8s)
  ok 157 [mobile] › tests\e2e\home.spec.ts:144:7 › Thai home page › has the same section anchors as the English page (774ms)
  ok 159 [mobile] › tests\e2e\seo.spec.ts:18:7 › sitemap.xml › lists home plus the five projects for both locales (414ms)
  ok 158 [mobile] › tests\e2e\navigation.spec.ts:19:7 › project card navigation › opens the first project from the Thai home page under /th (879ms)
  ok 155 [mobile] › tests\e2e\cv-modal.spec.ts:175:7 › CV dialog dismissal › closes when the close button is used (1.9s)
  ok 163 [mobile] › tests\e2e\seo.spec.ts:28:7 › sitemap.xml › includes every project slug for both locales (457ms)
  ok 160 [mobile] › tests\e2e\not-found.spec.ts:4:7 › unknown route › responds with HTTP 404 (597ms)
  -  165 [mobile] › tests\e2e\cv-modal.spec.ts:186:7 › CV dialog dismissal › traps focus inside the dialog while open
  ok 166 [mobile] › tests\e2e\seo.spec.ts:37:7 › sitemap.xml › includes both locale home pages (86ms)
  ok 164 [mobile] › tests\e2e\navigation.spec.ts:34:7 › project card navigation › renders all five project cards in the work section (670ms)
  ok 169 [mobile] › tests\e2e\seo.spec.ts:50:7 › robots.txt › responds 200 (175ms)
  ok 167 [mobile] › tests\e2e\not-found.spec.ts:9:7 › unknown route › shows the ERROR 404 eyebrow (590ms)
  ok 171 [mobile] › tests\e2e\seo.spec.ts:54:7 › robots.txt › points at the sitemap (178ms)
  ok 168 [mobile] › tests\e2e\cv-modal.spec.ts:215:7 › mobile navigation sheet › opens the hamburger menu as a dialog (729ms)
  ok 170 [mobile] › tests\e2e\navigation.spec.ts:46:7 › project detail page › shows the project title as the h1 (495ms)
  ok 173 [mobile] › tests\e2e\seo.spec.ts:62:7 › generated images › /opengraph-image returns a PNG (162ms)
  ok 162 [mobile] › tests\e2e\home.spec.ts:152:7 › locale routing › redirects /en to the prefix-free default locale (1.6s)
  ok 172 [mobile] › tests\e2e\not-found.spec.ts:14:7 › unknown route › shows the glitch 404 numeral (501ms)
  ok 176 [mobile] › tests\e2e\seo.spec.ts:68:7 › generated images › /icon responds 200 (274ms)
  ok 174 [mobile] › tests\e2e\cv-modal.spec.ts:226:7 › mobile navigation sheet › lists the five numbered destinations (651ms)
  ok 175 [mobile] › tests\e2e\navigation.spec.ts:52:7 › project detail page › shows the four facts-strip labels (665ms)
  ok 179 [mobile] › tests\e2e\seo.spec.ts:74:7 › generated images › a project opengraph image responds 200 (571ms)
  ok 178 [mobile] › tests\e2e\not-found.spec.ts:19:7 › unknown route › shows the error.log terminal with the failing command (783ms)
  ok 161 [mobile] › tests\e2e\a11y.spec.ts:214:7 › axe scan › reports no serious or critical violations on /th (2.8s)
  ok 181 [mobile] › tests\e2e\navigation.spec.ts:61:7 › project detail page › shows a value for every facts-strip label (707ms)
  ok 177 [mobile] › tests\e2e\home.spec.ts:158:7 › locale routing › switches from / to /th via the language toggle (1.4s)
  ok 180 [mobile] › tests\e2e\cv-modal.spec.ts:237:7 › mobile navigation sheet › closes via the close button (849ms)
  ok 185 [mobile] › tests\e2e\navigation.spec.ts:69:7 › project detail page › renders exactly three overview cards (591ms)
  ok 183 [mobile] › tests\e2e\not-found.spec.ts:30:7 › unknown route › lists the four terminal destination rows (925ms)
  ok 187 [mobile] › tests\e2e\cv-modal.spec.ts:247:7 › mobile navigation sheet › closes on Escape (843ms)
  ok 188 [mobile] › tests\e2e\navigation.spec.ts:73:7 › project detail page › titles the overview cards Problem / What I did / Result (787ms)
  ok 189 [mobile] › tests\e2e\not-found.spec.ts:40:7 › unknown route › offers the Back home and View work buttons (812ms)
  ok 182 [mobile] › tests\e2e\seo.spec.ts:84:7 › page titles › the English home page has a non-empty title (1.5s)
  ok 186 [mobile] › tests\e2e\home.spec.ts:171:7 › locale routing › switches back from /th to / via the language toggle (1.9s)
  ok 191 [mobile] › tests\e2e\navigation.spec.ts:82:7 › project detail page › shows a back link to the work section (936ms)
  ok 192 [mobile] › tests\e2e\not-found.spec.ts:48:7 › terminal row navigation › navigates to /#work when the ~/projects row is clicked (1.1s)
  ok 184 [mobile] › tests\e2e\a11y.spec.ts:235:7 › axe scan › reports no serious or critical violations on a project page (2.9s)
  ok 193 [mobile] › tests\e2e\seo.spec.ts:91:7 › page titles › the Thai home page has a non-empty title (1.3s)
  ok 190 [mobile] › tests\e2e\cv-modal.spec.ts:259:7 › mobile navigation sheet › closes when a destination is followed (2.0s)
  ok 195 [mobile] › tests\e2e\navigation.spec.ts:89:7 › project detail page › navigates to the next project via the next-project link (862ms)
  ok 198 [mobile] › tests\e2e\seo.spec.ts:96:7 › page titles › a project page titles itself after the project (505ms)
  ok 196 [mobile] › tests\e2e\not-found.spec.ts:58:7 › terminal row navigation › navigates to /#contact when the ~/contact row is clicked (853ms)
  ok 194 [mobile] › tests\e2e\home.spec.ts:185:7 › locale routing › preserves the path when switching locale on a project page (1.6s)
  ok 197 [mobile] › tests\e2e\theme.spec.ts:28:7 › theme toggle › switches html[data-theme] to dark on the first click (888ms)
  ok 201 [mobile] › tests\e2e\seo.spec.ts:101:7 › page titles › every page exposes a meta description (639ms)
  ok 200 [mobile] › tests\e2e\navigation.spec.ts:104:7 › project detail page › keeps the locale when following the next-project link from /th (1.1s)
  ok 199 [mobile] › tests\e2e\cv-modal.spec.ts:268:7 › mobile navigation sheet › renders the CV dialog as a bottom sheet variant on mobile (1.4s)
  ok 202 [mobile] › tests\e2e\not-found.spec.ts:67:7 › terminal row navigation › navigates home when the ~/ row is clicked (1.0s)
  ok 205 [mobile] › tests\e2e\seo.spec.ts:111:7 › hreflang alternates › a project page declares en and th alternates (722ms)
  ok 204 [mobile] › tests\e2e\theme.spec.ts:36:7 › theme toggle › switches back to light on the second click (1.2s)
  ok 206 [mobile] › tests\e2e\navigation.spec.ts:119:7 › internal-only project › shows the internal badge instead of demo/repo links (661ms)
  ok 208 [mobile] › tests\e2e\seo.spec.ts:122:7 › hreflang alternates › the th alternate points at the /th path (535ms)
  ok 207 [mobile] › tests\e2e\not-found.spec.ts:76:7 › terminal keyboard command › navigates to /#contact after typing `cd ~/contact` and Enter (1.0s)
  ok 210 [mobile] › tests\e2e\navigation.spec.ts:128:7 › unknown project slug › returns a 404 status (624ms)
  ok 209 [mobile] › tests\e2e\theme.spec.ts:45:7 › theme toggle › has an accessible name on the icon-only trigger (707ms)
  ok 203 [mobile] › tests\e2e\home.spec.ts:200:9 › no horizontal overflow › the document does not scroll sideways at / (2.1s)
  ok 211 [mobile] › tests\e2e\seo.spec.ts:131:7 › hreflang alternates › a project page declares a canonical URL (606ms)
  ok 213 [mobile] › tests\e2e\navigation.spec.ts:133:7 › unknown project slug › renders the 404 page body (719ms)
  ok 214 [mobile] › tests\e2e\theme.spec.ts:53:7 › theme persistence › keeps dark mode after a reload (916ms)
  ok 212 [mobile] › tests\e2e\not-found.spec.ts:91:7 › terminal keyboard command › navigates to /#work after typing `cd ~/projects` and Enter (1.0s)
  ok 216 [mobile] › tests\e2e\seo.spec.ts:140:7 › hreflang alternates › the home page declares en and th alternates (633ms)
  ok 219 [mobile] › tests\e2e\seo.spec.ts:153:7 › open graph metadata › declares og:title and og:description on the home page (506ms)
  ok 215 [mobile] › tests\e2e\home.spec.ts:200:9 › no horizontal overflow › the document does not scroll sideways at /th (1.6s)
  ok 217 [mobile] › tests\e2e\theme.spec.ts:62:7 › theme persistence › keeps dark mode when navigating to another page (883ms)
  ok 220 [mobile] › tests\e2e\seo.spec.ts:169:7 › open graph metadata › declares the th_TH og:locale on the Thai project page (445ms)
  ok 218 [mobile] › tests\e2e\not-found.spec.ts:103:7 › terminal keyboard command › stays put when an unknown command is entered (1.1s)
  ok 223 [mobile] › tests\e2e\not-found.spec.ts:114:7 › terminal keyboard command › removes the last character on Backspace (504ms)
  ok 221 [mobile] › tests\e2e\home.spec.ts:200:9 › no horizontal overflow › the document does not scroll sideways at /projects/goskillup-lms (1.0s)
  ok 222 [mobile] › tests\e2e\theme.spec.ts:71:7 › theme persistence › keeps dark mode across the locale switch (907ms)
  ok 224 [mobile] › tests\e2e\not-found.spec.ts:126:7 › Thai 404 › responds 404 and renders the Thai copy under /th (469ms)
  ok 226 [mobile] › tests\e2e\theme.spec.ts:85:7 › theme visual effect › changes the body background colour between light and dark (630ms)
  ok 227 [mobile] › tests\e2e\theme.spec.ts:100:7 › theme visual effect › renders the light background as the near-white token (422ms)
  ok 228 [mobile] › tests\e2e\theme.spec.ts:108:7 › theme visual effect › renders the dark background as the deep navy token (488ms)
  ok 225 [mobile] › tests\e2e\home.spec.ts:212:7 › no horizontal overflow › stays within the viewport after scrolling to the bottom (2.1s)

  11 skipped
  217 passed (58.9s)

2026-08-28T06:19:26.530181Z ERROR codex_models_manager::manager: failed to renew cache TTL: missing field `supports_parallel_tool_calls` at line 97 column 5
codex
E2E passed: 217 passed, 11 intentionally skipped (desktop/mobile-inapplicable cases), 0 failed. I’m now auditing the specified routing/SEO files and every change in the last seven commits for brief violations and weakened coverage.
exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command "git log -7 --stat --oneline; git log -7 --format='%H%x09%s'" in D:\haroon-portfolio
 succeeded in 601ms:
d05d133 fix(a11y): raise accent contrast above 4.5:1 in both themes
 src/app/[locale]/layout.tsx                | 2 +-
 src/app/not-found.tsx                      | 2 +-
 src/components/detail/NextProject.tsx      | 2 +-
 src/components/sections/CvPreviewModal.tsx | 4 ++--
 src/components/ui/Button.tsx               | 2 +-
 src/components/ui/LangToggle.tsx           | 2 +-
 src/components/ui/TechChip.tsx             | 2 +-
 src/styles/tokens.css                      | 7 +++++++
 tests/unit/button.test.tsx                 | 4 +++-
 9 files changed, 18 insertions(+), 9 deletions(-)
26e1dd9 fix(a11y): close the CV dialog focus trap and label its close button
 src/components/sections/CvPreviewModal.tsx | 29 ++++++++++++++++++++++++-----
 tests/e2e/cv-modal.spec.ts                 |  7 ++++---
 2 files changed, 28 insertions(+), 8 deletions(-)
b842156 fix(ui): section head geometry, CSS-only hero fade, merge debris cleanup
 src/components/sections/About.tsx         | 32 ++++++------------------
 src/components/sections/Experience.tsx    | 35 ++++++++++++--------------
 src/components/sections/FadeIn.module.css | 23 +++++++++++++++++
 src/components/sections/FadeIn.tsx        | 30 ++++++++++++----------
 src/components/sections/GitHub.tsx        |  8 +++---
 src/components/sections/Projects.tsx      |  8 +++---
 src/components/sections/Testimonial.tsx   | 10 ++++----
 src/components/ui/SectionHead.tsx         | 41 ++++++++++++++++++++++++++++---
 src/components/ui/index.ts                |  9 -------
 src/content/flags.ts                      |  2 --
 src/content/skills.ts                     |  6 +++--
 src/content/types.ts                      |  7 +++++-
 12 files changed, 124 insertions(+), 87 deletions(-)
60b7bf4 fix(seo): stop the proxy rewriting /icon and /opengraph-image into 404s
 src/app/[locale]/projects/[slug]/page.tsx |  2 ++
 src/lib/seo.ts                            | 37 ++++++++++++++++++++++++++++++-
 src/proxy.ts                              | 10 ++++++++-
 3 files changed, 47 insertions(+), 2 deletions(-)
7b7d5f2 fix(seo): resolve metadata from buildMetadata and set a root metadataBase
 src/app/[locale]/layout.tsx                | 24 ++++++++++++++++++++++--
 src/app/[locale]/not-found.tsx             |  2 +-
 src/app/[locale]/page.tsx                  | 27 ++++++++++-----------------
 src/app/[locale]/projects/[slug]/page.tsx  |  2 +-
 src/app/layout.tsx                         | 12 ++++++++++++
 src/app/not-found.tsx                      |  1 +
 src/components/detail/ProjectCover.tsx     |  8 ++------
 src/components/notfound/ErrorTerminal.tsx  | 22 +++++++++++-----------
 src/components/sections/About.tsx          | 15 +++++++++++----
 src/components/sections/CvPreviewModal.tsx | 27 +++++++++++++++++++++------
 src/components/sections/Hero.tsx           |  2 +-
 src/components/ui/TechChip.tsx             | 15 +++++++++++----
 src/styles/tokens.css                      | 28 +++++++++++++++++++++++++---
 13 files changed, 129 insertions(+), 56 deletions(-)
8816ac9 fix(routing): make the root 404 static so the locale tree prerenders
 src/app/[locale]/[...rest]/page.tsx | 22 ++++++++++
 src/app/not-found.tsx               | 85 +++++++++++++++++++++----------------
 2 files changed, 70 insertions(+), 37 deletions(-)
68889f0 fix(i18n): resolve hero headline keys and add the real contact email
 messages/en.json                       | 15 +++++++--------
 messages/th.json                       | 15 +++++++--------
 src/components/sections/Contact.tsx    |  2 +-
 src/components/sections/Hero.tsx       |  6 +++---
 src/components/sections/MobileMenu.tsx |  4 ++--
 5 files changed, 20 insertions(+), 22 deletions(-)
d05d1339e5ff4ebd6fd3172c7ca3e9c8c7a9c26c	fix(a11y): raise accent contrast above 4.5:1 in both themes
26e1dd9f4a48c8542e9b654f95c585283f552089	fix(a11y): close the CV dialog focus trap and label its close button
b84215609efce516648149e8f366313a6c058aba	fix(ui): section head geometry, CSS-only hero fade, merge debris cleanup
60b7bf4b69ab643de12ff2d8f67e63beeb1ae573	fix(seo): stop the proxy rewriting /icon and /opengraph-image into 404s
7b7d5f24e2206dcb596b848e15c06b48715ef4fe	fix(seo): resolve metadata from buildMetadata and set a root metadataBase
8816ac9dd5e3843f40b5af0b334c9cf116ec5a4e	fix(routing): make the root 404 static so the locale tree prerenders
68889f0df2b90b0acb8b1ffc9cb2668de3e95408	fix(i18n): resolve hero headline keys and add the real contact email

2026-08-28T06:19:31.205557Z ERROR codex_models_manager::manager: failed to renew cache TTL: missing field `supports_parallel_tool_calls` at line 97 column 5
exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command 'git show --format=fuller --find-renames --find-copies --stat --patch d05d133 26e1dd9 b842156 60b7bf4 7b7d5f2 8816ac9 68889f0' in D:\haroon-portfolio
 succeeded in 308ms:
commit d05d1339e5ff4ebd6fd3172c7ca3e9c8c7a9c26c
Author:     Haroon Kasor <haroonkasor.dev@gmail.com>
AuthorDate: Fri Aug 28 13:13:37 2026 +0700
Commit:     Haroon Kasor <haroonkasor.dev@gmail.com>
CommitDate: Fri Aug 28 13:13:37 2026 +0700

    fix(a11y): raise accent contrast above 4.5:1 in both themes
    
    Light --color-accent #1C70E6 gave 4.42:1 on the page background. Move it
    to #1565D8 (5.13:1 on #FAF9F6, 5.41:1 on white).
    
    An axe pass in dark mode also flagged two contrast failures the default
    scan misses: white on the lighter dark-mode accent is only 2.96:1, and
    the chip lettermark (accent on accent-soft) 4.21:1. Add --token-on-accent
    (white in light, near-black in dark: 6.52:1) for text sitting on the
    accent fill, and --token-accent-strong for small text on accent-soft
    (5.82:1 light, 6.92:1 dark). The lettermark also goes from 8px bold to
    10px semibold.
    
    axe now reports 0 serious/critical on /, /th, a project page and the 404
    in BOTH colour schemes. The Button unit test asserted the literal
    text-white, which the brief's "tokens, never raw hex" rule disallows;
    it now asserts the token class.
    
    Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
---
 src/app/[locale]/layout.tsx                | 2 +-
 src/app/not-found.tsx                      | 2 +-
 src/components/detail/NextProject.tsx      | 2 +-
 src/components/sections/CvPreviewModal.tsx | 4 ++--
 src/components/ui/Button.tsx               | 2 +-
 src/components/ui/LangToggle.tsx           | 2 +-
 src/components/ui/TechChip.tsx             | 2 +-
 src/styles/tokens.css                      | 7 +++++++
 tests/unit/button.test.tsx                 | 4 +++-
 9 files changed, 18 insertions(+), 9 deletions(-)

diff --git a/src/app/[locale]/layout.tsx b/src/app/[locale]/layout.tsx
index a9a33b7..1fd666c 100644
--- a/src/app/[locale]/layout.tsx
+++ b/src/app/[locale]/layout.tsx
@@ -75,7 +75,7 @@ export default async function LocaleLayout({
           <NextIntlClientProvider>
             <a
               href="#content"
-              className="bg-accent sr-only rounded-full px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[70]"
+              className="bg-accent text-on-accent sr-only rounded-full px-4 py-2 text-sm font-medium focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[70]"
             >
               {t('skipToContent')}
             </a>
diff --git a/src/app/not-found.tsx b/src/app/not-found.tsx
index 881e33a..3fdfada 100644
--- a/src/app/not-found.tsx
+++ b/src/app/not-found.tsx
@@ -50,7 +50,7 @@ export default function RootNotFound() {
           <div className="mt-8 flex flex-wrap gap-3">
             <Link
               href="/"
-              className="bg-accent inline-flex min-h-11 items-center rounded-full px-6 text-sm font-medium text-white"
+              className="bg-accent text-on-accent inline-flex min-h-11 items-center rounded-full px-6 text-sm font-medium"
             >
               Back home
             </Link>
diff --git a/src/components/detail/NextProject.tsx b/src/components/detail/NextProject.tsx
index ca720a9..9df2433 100644
--- a/src/components/detail/NextProject.tsx
+++ b/src/components/detail/NextProject.tsx
@@ -31,7 +31,7 @@ export function NextProject({
           </div>
           <span
             aria-hidden="true"
-            className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line text-text transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white"
+            className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line text-text transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent"
           >
             <ArrowRight className="h-5 w-5" />
           </span>
diff --git a/src/components/sections/CvPreviewModal.tsx b/src/components/sections/CvPreviewModal.tsx
index 150d91a..bf01f1d 100644
--- a/src/components/sections/CvPreviewModal.tsx
+++ b/src/components/sections/CvPreviewModal.tsx
@@ -167,7 +167,7 @@ function CvDialog({ onClose }: { onClose: () => void }) {
           <a
             href={src}
             download
-            className="bg-accent hidden min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:inline-flex"
+            className="bg-accent hidden min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium text-on-accent transition-opacity hover:opacity-90 sm:inline-flex"
           >
             <Download className="h-4 w-4" aria-hidden="true" />
             {t("download")}
@@ -212,7 +212,7 @@ function CvDialog({ onClose }: { onClose: () => void }) {
             <a
               href={src}
               download
-              className="bg-accent inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-medium text-white"
+              className="bg-accent inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-medium text-on-accent"
             >
               <Download className="h-4 w-4" aria-hidden="true" />
               {t("download")}
diff --git a/src/components/ui/Button.tsx b/src/components/ui/Button.tsx
index ef5900c..5b29d1d 100644
--- a/src/components/ui/Button.tsx
+++ b/src/components/ui/Button.tsx
@@ -33,7 +33,7 @@ const sizes: Record<ButtonSize, string> = {
 
 const variants: Record<ButtonVariant, string> = {
   accent:
-    'bg-accent text-white shadow-accent hover:brightness-110 focus-visible:outline-accent',
+    'bg-accent text-on-accent shadow-accent hover:brightness-110 focus-visible:outline-accent',
   ghost:
     'border border-line bg-transparent text-text hover:bg-accent-soft hover:border-accent focus-visible:outline-accent',
   dark: 'bg-inverse text-on-inverse hover:opacity-90 focus-visible:outline-accent',
diff --git a/src/components/ui/LangToggle.tsx b/src/components/ui/LangToggle.tsx
index bcde251..24885a6 100644
--- a/src/components/ui/LangToggle.tsx
+++ b/src/components/ui/LangToggle.tsx
@@ -49,7 +49,7 @@ export function LangToggle({ className }: LangToggleProps) {
           className={cn(
             'inline-flex h-9 min-w-11 items-center justify-center rounded-full px-3 text-xs font-semibold uppercase transition-colors',
             locale === active
-              ? 'bg-accent text-white'
+              ? 'bg-accent text-on-accent'
               : 'text-muted hover:text-accent',
           )}
         >
diff --git a/src/components/ui/TechChip.tsx b/src/components/ui/TechChip.tsx
index 9f54484..8447eb5 100644
--- a/src/components/ui/TechChip.tsx
+++ b/src/components/ui/TechChip.tsx
@@ -63,7 +63,7 @@ export function TechChip({ name, slug, mark, className }: TechChipProps) {
         </svg>
       ) : (
         <span
-          className="bg-accent-soft text-accent flex h-5 min-w-5 shrink-0 items-center justify-center rounded-sm px-1 text-[10px] leading-none font-semibold"
+          className="bg-accent-soft text-accent-strong flex h-5 min-w-5 shrink-0 items-center justify-center rounded-sm px-1 text-[10px] leading-none font-semibold"
           aria-hidden
         >
           {mark ?? lettermark(name)}
diff --git a/src/styles/tokens.css b/src/styles/tokens.css
index 3344ec2..64d41e8 100644
--- a/src/styles/tokens.css
+++ b/src/styles/tokens.css
@@ -12,6 +12,9 @@
   --token-muted: #6b6b73;
   --token-accent: #1565d8;
   --token-accent-soft: #e3f0ff;
+  --token-on-accent: #ffffff;
+  /* Small text on --accent-soft needs more punch than --accent alone. */
+  --token-accent-strong: #1257bd;
   --token-inverse: #121214;
   --token-on-inverse: #ffffff;
   --token-footer: #121214;
@@ -50,6 +53,8 @@ html[data-theme='dark'] {
   --token-muted: #9ea8bd;
   --token-accent: #5994ff;
   --token-accent-soft: #1f335c;
+  --token-on-accent: #0b0e17;
+  --token-accent-strong: #9cc3ff;
   --token-inverse: #f2f3f7;
   --token-on-inverse: #0b0e17;
   --token-footer: #080a12;
@@ -78,6 +83,8 @@ html[data-theme='dark'] {
   --color-muted: var(--token-muted);
   --color-accent: var(--token-accent);
   --color-accent-soft: var(--token-accent-soft);
+  --color-on-accent: var(--token-on-accent);
+  --color-accent-strong: var(--token-accent-strong);
   --color-inverse: var(--token-inverse);
   --color-on-inverse: var(--token-on-inverse);
   --color-footer: var(--token-footer);
diff --git a/tests/unit/button.test.tsx b/tests/unit/button.test.tsx
index 585813d..b09ff79 100644
--- a/tests/unit/button.test.tsx
+++ b/tests/unit/button.test.tsx
@@ -104,7 +104,9 @@ describe("Button variants and sizes", () => {
     render(<Button variant="accent">Accent</Button>);
     const button = screen.getByRole("button", { name: "Accent" });
     expect(button.className).toContain("bg-accent");
-    expect(button.className).toContain("text-white");
+    // Token, not a literal colour: white on the accent fill is only 2.96:1 in
+    // dark mode, so the foreground flips per theme via --token-on-accent.
+    expect(button.className).toContain("text-on-accent");
   });
 
   it("applies ghost variant classes", () => {

commit 26e1dd9f4a48c8542e9b654f95c585283f552089
Author:     Haroon Kasor <haroonkasor.dev@gmail.com>
AuthorDate: Fri Aug 28 13:07:02 2026 +0700
Commit:     Haroon Kasor <haroonkasor.dev@gmail.com>
CommitDate: Fri Aug 28 13:07:02 2026 +0700

    fix(a11y): close the CV dialog focus trap and label its close button
    
    The trap collected nodes that are hidden at the current breakpoint (the
    header actions are hidden sm:inline-flex, their footer twins sm:hidden),
    so it wrapped to elements that cannot take focus. Filter to visible nodes
    and drive the wrap from the active node's index.
    
    The real leak was the PDF iframe: it is a separate browsing context, so
    once Tab moved into it the keydown listener stopped firing and the next
    Tab left the dialog. Take the iframe out of the tab order; the document
    is still reachable via Open in new tab / Download.
    
    Also give the icon-only close button an aria-label naming its action
    (cv.close) instead of reusing the dialog title, and pass the page
    indicator its interpolation values. One e2e selector asserted the old
    title-as-label and is updated to match the brief's icon-button rule.
    
    Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
---
 src/components/sections/CvPreviewModal.tsx | 29 ++++++++++++++++++++++++-----
 tests/e2e/cv-modal.spec.ts                 |  7 ++++---
 2 files changed, 28 insertions(+), 8 deletions(-)

diff --git a/src/components/sections/CvPreviewModal.tsx b/src/components/sections/CvPreviewModal.tsx
index ce7df12..150d91a 100644
--- a/src/components/sections/CvPreviewModal.tsx
+++ b/src/components/sections/CvPreviewModal.tsx
@@ -12,7 +12,7 @@ const FILES = {
 type CvLocale = keyof typeof FILES;
 
 const FOCUSABLE =
-  'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';
+  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
 
 /**
  * Only nodes that are actually rendered can hold focus. The header's
@@ -69,12 +69,26 @@ function CvDialog({ onClose }: { onClose: () => void }) {
       if (e.key !== "Tab") return;
       const nodes = visibleFocusable(panelRef.current);
       if (nodes.length === 0) return;
+
       const first = nodes[0];
       const last = nodes[nodes.length - 1];
-      if (e.shiftKey && document.activeElement === first) {
-        e.preventDefault();
-        last.focus();
-      } else if (!e.shiftKey && document.activeElement === last) {
+      const active = document.activeElement as HTMLElement | null;
+      const index = active ? nodes.indexOf(active) : -1;
+
+      // Focus can sit *inside* the PDF iframe, where activeElement is the
+      // <iframe> itself but comparing against `last` is not enough: once the
+      // embedded document takes over, Tab walks the PDF's own controls and
+      // then leaves the dialog entirely. Driving the wrap from the index (and
+      // treating "not in the list" as outside) keeps the cycle closed.
+      if (e.shiftKey) {
+        if (index <= 0) {
+          e.preventDefault();
+          last.focus();
+        }
+        return;
+      }
+
+      if (index === -1 || index >= nodes.length - 1) {
         e.preventDefault();
         first.focus();
       }
@@ -169,10 +183,15 @@ function CvDialog({ onClose }: { onClose: () => void }) {
           </button>
         </div>
 
+        {/* tabIndex -1: the PDF viewer is its own browsing context, so once Tab
+            moves inside it the trap's keydown listener stops firing and focus
+            leaves the dialog on the following Tab. The document stays reachable
+            via "Open in new tab" / "Download". */}
         <iframe
           key={src}
           src={src}
           title={t("title")}
+          tabIndex={-1}
           className="bg-bg min-h-0 flex-1 w-full border-0"
         />
 
diff --git a/tests/e2e/cv-modal.spec.ts b/tests/e2e/cv-modal.spec.ts
index f81805e..1cbb3ae 100644
--- a/tests/e2e/cv-modal.spec.ts
+++ b/tests/e2e/cv-modal.spec.ts
@@ -176,9 +176,10 @@ test.describe("CV dialog dismissal", () => {
     await page.goto("/");
     const dialog = await openCv(page, isMobile);
 
-    await dialog
-      .getByRole("button", { name: /resume — haroon kasor/i })
-      .click();
+    // The close button is icon-only, so per the brief it carries an aria-label
+    // naming its action ("Close" / "ปิด"). It previously reused the dialog
+    // title, which named the dialog rather than the button.
+    await dialog.getByRole("button", { name: /^(close|ปิด)$/i }).click();
     await expect(dialog).toBeHidden();
   });
 

commit b84215609efce516648149e8f366313a6c058aba
Author:     Haroon Kasor <haroonkasor.dev@gmail.com>
AuthorDate: Fri Aug 28 13:00:57 2026 +0700
Commit:     Haroon Kasor <haroonkasor.dev@gmail.com>
CommitDate: Fri Aug 28 13:00:57 2026 +0700

    fix(ui): section head geometry, CSS-only hero fade, merge debris cleanup
    
    SectionHead stacked the big title inside the 300px label column; per the
    Figma "Section Head" frame the index+label own that column and the title
    runs to its right (max 932px), with a SectionBody spacer lining the
    content up at the same offset. Experience keeps its own white-on-gradient
    head with matching geometry.
    
    FadeIn rendered opacity:0 server-side, so the hero was invisible without
    JS and before hydration. Replace framer-motion with a keyframe whose
    resting state is visible, so no-JS renders read fine.
    
    Delete the flags.ts shim and the stale ui/index.ts barrel; About and
    Experience now read from src/content/{skills,experience}.ts instead of
    keeping inline duplicates.
    
    Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
---
 src/components/sections/About.tsx         | 32 ++++++------------------
 src/components/sections/Experience.tsx    | 35 ++++++++++++--------------
 src/components/sections/FadeIn.module.css | 23 +++++++++++++++++
 src/components/sections/FadeIn.tsx        | 30 ++++++++++++----------
 src/components/sections/GitHub.tsx        |  8 +++---
 src/components/sections/Projects.tsx      |  8 +++---
 src/components/sections/Testimonial.tsx   | 10 ++++----
 src/components/ui/SectionHead.tsx         | 41 ++++++++++++++++++++++++++++---
 src/components/ui/index.ts                |  9 -------
 src/content/flags.ts                      |  2 --
 src/content/skills.ts                     |  6 +++--
 src/content/types.ts                      |  7 +++++-
 12 files changed, 124 insertions(+), 87 deletions(-)

diff --git a/src/components/sections/About.tsx b/src/components/sections/About.tsx
index 1164462..738f7fe 100644
--- a/src/components/sections/About.tsx
+++ b/src/components/sections/About.tsx
@@ -1,26 +1,8 @@
 import { getTranslations } from "next-intl/server";
 import { Container } from "@/components/ui/Container";
-import { SectionHead } from "@/components/ui/SectionHead";
+import { SectionHead, SectionBody } from "@/components/ui/SectionHead";
 import { TechChip } from "@/components/ui/TechChip";
-
-const CHIPS: { name: string; slug: string; mark?: string }[] = [
-  { name: "Next.js", slug: "nextdotjs" },
-  { name: "React", slug: "react" },
-  { name: "TypeScript", slug: "typescript" },
-  { name: "Tailwind", slug: "tailwindcss" },
-  { name: "Java", slug: "openjdk" },
-  { name: "Spring Boot", slug: "springboot" },
-  { name: "MySQL", slug: "mysql" },
-  // simple-icons has no SQL Server mark; "SS" reads wrong, so set it explicitly.
-  { name: "SQL Server", slug: "", mark: "SQL" },
-  { name: "Docker", slug: "docker" },
-  // No simple-icons entry either — "PW" is the deliberate lettermark.
-  { name: "Playwright", slug: "playwright", mark: "PW" },
-  { name: "Figma", slug: "figma" },
-  { name: "GitLab", slug: "gitlab" },
-];
-
-const GROUPS = ["frontend", "backend", "tools"] as const;
+import { techChips, skillGroups } from "@/content/skills";
 
 export async function About() {
   const t = await getTranslations("about");
@@ -28,9 +10,9 @@ export async function About() {
   return (
     <section id="about" className="scroll-mt-24 py-16 lg:py-24">
       <Container>
-        <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
-          <SectionHead index={t("index")} label={t("label")} title={t("title")} />
+        <SectionHead index={t("index")} label={t("label")} title={t("title")} />
 
+        <SectionBody className="mt-10">
           <div>
             <div className="text-muted flex flex-col gap-5 text-base lg:text-lg">
               <p>{t("p1")}</p>
@@ -38,7 +20,7 @@ export async function About() {
             </div>
 
             <div className="mt-10 flex flex-wrap gap-2">
-              {CHIPS.map((chip) => (
+              {techChips.map((chip) => (
                 <TechChip
                   key={chip.name}
                   name={chip.name}
@@ -49,7 +31,7 @@ export async function About() {
             </div>
 
             <div className="mt-12 grid gap-4 md:grid-cols-3">
-              {GROUPS.map((group) => (
+              {skillGroups.map((group) => (
                 <div
                   key={group}
                   className="border-line bg-surface rounded-[16px] border p-6 shadow-[var(--shadow-card)]"
@@ -64,7 +46,7 @@ export async function About() {
               ))}
             </div>
           </div>
-        </div>
+        </SectionBody>
       </Container>
     </section>
   );
diff --git a/src/components/sections/Experience.tsx b/src/components/sections/Experience.tsx
index c2dee76..fca2249 100644
--- a/src/components/sections/Experience.tsx
+++ b/src/components/sections/Experience.tsx
@@ -1,11 +1,6 @@
 import { getTranslations } from "next-intl/server";
 import { Container } from "@/components/ui/Container";
-
-const ITEMS = [
-  { key: "learntech", current: true },
-  { key: "goskillup", current: false },
-  { key: "degree", current: false },
-] as const;
+import { experience } from "@/content/experience";
 
 export async function Experience() {
   const t = await getTranslations("experience");
@@ -16,18 +11,20 @@ export async function Experience() {
       className="scroll-mt-24 bg-[image:var(--gradient-band)] py-16 lg:py-24"
     >
       <Container>
-        <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
-          <div className="flex flex-col gap-3">
-            <span className="text-xs font-semibold tracking-[0.18em] text-white/70">
-              {t("index")} — {t("label")}
-            </span>
-            <h2 className="text-[32px] leading-tight font-semibold text-white lg:text-[56px]">
-              {t("title")}
-            </h2>
-          </div>
+        {/* Same geometry as SectionHead, in the band's white-on-gradient palette. */}
+        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-[300px_1fr] lg:items-start lg:gap-16">
+          <span className="text-xs font-semibold tracking-[0.18em] text-white/70 lg:pt-4">
+            {t("index")} — {t("label")}
+          </span>
+          <h2 className="max-w-[932px] text-[32px] leading-tight font-semibold text-white lg:text-[56px]">
+            {t("title")}
+          </h2>
+        </div>
 
-          <ol className="flex flex-col">
-            {ITEMS.map((item, i) => (
+        <div className="mt-10 lg:grid lg:grid-cols-[300px_1fr] lg:gap-16">
+          <div aria-hidden="true" className="hidden lg:block" />
+          <ol className="flex min-w-0 flex-col">
+            {experience.map((item, i) => (
               <li
                 key={item.key}
                 className={[
@@ -40,13 +37,13 @@ export async function Experience() {
                     aria-hidden="true"
                     className={[
                       "inline-block h-2.5 w-2.5 shrink-0 rounded-full",
-                      item.current ? "bg-band-accent" : "bg-white/50",
+                      i === 0 ? "bg-band-accent" : "bg-white/50",
                     ].join(" ")}
                   />
                   <span
                     className={[
                       "text-sm font-semibold tracking-[0.12em]",
-                      item.current ? "text-band-accent" : "text-white/70",
+                      i === 0 ? "text-band-accent" : "text-white/70",
                     ].join(" ")}
                   >
                     {t(`items.${item.key}.date`)}
diff --git a/src/components/sections/FadeIn.module.css b/src/components/sections/FadeIn.module.css
new file mode 100644
index 0000000..61be3c5
--- /dev/null
+++ b/src/components/sections/FadeIn.module.css
@@ -0,0 +1,23 @@
+/* The resting state is fully visible; the keyframe only rewinds to hidden for
+ * the duration of the entrance. An element that never animates (no JS needed,
+ * reduced motion, older engines) therefore still renders opaque. */
+.fadeIn {
+  animation: fade-in 0.5s ease-out both;
+}
+
+@keyframes fade-in {
+  from {
+    opacity: 0;
+    transform: translateY(16px);
+  }
+  to {
+    opacity: 1;
+    transform: none;
+  }
+}
+
+@media (prefers-reduced-motion: reduce) {
+  .fadeIn {
+    animation: none;
+  }
+}
diff --git a/src/components/sections/FadeIn.tsx b/src/components/sections/FadeIn.tsx
index 4986af2..32b85bd 100644
--- a/src/components/sections/FadeIn.tsx
+++ b/src/components/sections/FadeIn.tsx
@@ -1,9 +1,18 @@
-"use client";
-
 import type { ReactNode } from "react";
-import { motion, useReducedMotion } from "framer-motion";
+import styles from "./FadeIn.module.css";
 
-/** Hero entrance animation; collapses to a plain render under reduced motion. */
+/**
+ * Hero entrance animation.
+ *
+ * Deliberately CSS-only and server-rendered. A framer-motion
+ * `initial={{ opacity: 0 }}` leaves the server HTML at `opacity: 0`, so with
+ * JS disabled — or in the window before hydration — the whole hero is
+ * invisible. A keyframe that *starts* hidden and finishes opaque animates the
+ * same way, but the element's resting style is fully visible, so the markup is
+ * readable without JS and the animation simply never plays.
+ *
+ * `prefers-reduced-motion` disables it in the stylesheet.
+ */
 export function FadeIn({
   children,
   delay = 0,
@@ -11,18 +20,13 @@ export function FadeIn({
   children: ReactNode;
   delay?: number;
 }) {
-  const reduce = useReducedMotion();
-
-  if (reduce) return <>{children}</>;
-
   return (
-    <motion.div
-      initial={{ opacity: 0, y: 16 }}
-      animate={{ opacity: 1, y: 0 }}
-      transition={{ duration: 0.5, delay, ease: "easeOut" }}
+    <div
+      className={styles.fadeIn}
+      style={delay ? { animationDelay: `${delay}s` } : undefined}
     >
       {children}
-    </motion.div>
+    </div>
   );
 }
 
diff --git a/src/components/sections/GitHub.tsx b/src/components/sections/GitHub.tsx
index ddc30ed..c59c1ec 100644
--- a/src/components/sections/GitHub.tsx
+++ b/src/components/sections/GitHub.tsx
@@ -1,6 +1,6 @@
 import { getTranslations } from "next-intl/server";
 import { Container } from "@/components/ui/Container";
-import { SectionHead } from "@/components/ui/SectionHead";
+import { SectionHead, SectionBody } from "@/components/ui/SectionHead";
 import { RepoCard } from "@/components/ui/RepoCard";
 import { getRepos, GITHUB_URL } from "@/lib/github";
 
@@ -11,9 +11,9 @@ export async function GitHub() {
   return (
     <section id="github" className="scroll-mt-24 py-16 lg:py-24">
       <Container>
-        <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
-          <SectionHead index={t("index")} label={t("label")} title={t("title")} />
+        <SectionHead index={t("index")} label={t("label")} title={t("title")} />
 
+        <SectionBody className="mt-10">
           <div>
             <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
               {repos.map((repo) => (
@@ -30,7 +30,7 @@ export async function GitHub() {
               {t("viewAll")}
             </a>
           </div>
-        </div>
+        </SectionBody>
       </Container>
     </section>
   );
diff --git a/src/components/sections/Projects.tsx b/src/components/sections/Projects.tsx
index 7dc7a6f..00cfe17 100644
--- a/src/components/sections/Projects.tsx
+++ b/src/components/sections/Projects.tsx
@@ -1,6 +1,6 @@
 import { getLocale, getTranslations } from "next-intl/server";
 import { Container } from "@/components/ui/Container";
-import { SectionHead } from "@/components/ui/SectionHead";
+import { SectionHead, SectionBody } from "@/components/ui/SectionHead";
 import { ProjectCard } from "@/components/ui/ProjectCard";
 import { projects } from "@/content/projects";
 import type { Locale } from "@/i18n/routing";
@@ -14,9 +14,9 @@ export async function Projects() {
   return (
     <section id="work" className="scroll-mt-24 py-16 lg:py-24">
       <Container>
-        <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
-          <SectionHead index={t("index")} label={t("label")} title={t("title")} />
+        <SectionHead index={t("index")} label={t("label")} title={t("title")} />
 
+        <SectionBody className="mt-10">
           <div className="flex flex-col gap-5">
             {/* Row 1: large card fills, second card is a fixed 420px column. */}
             <div className="grid gap-5 lg:grid-cols-[1fr_420px]">
@@ -35,7 +35,7 @@ export async function Projects() {
               ))}
             </div>
           </div>
-        </div>
+        </SectionBody>
       </Container>
     </section>
   );
diff --git a/src/components/sections/Testimonial.tsx b/src/components/sections/Testimonial.tsx
index b0ec9c8..7d958b6 100644
--- a/src/components/sections/Testimonial.tsx
+++ b/src/components/sections/Testimonial.tsx
@@ -1,7 +1,7 @@
 import { getTranslations } from "next-intl/server";
 import { Container } from "@/components/ui/Container";
-import { SectionHead } from "@/components/ui/SectionHead";
-import { SHOW_TESTIMONIAL } from "@/content/flags";
+import { SectionHead, SectionBody } from "@/components/ui/SectionHead";
+import { SHOW_TESTIMONIAL } from "@/content/profile";
 
 export async function Testimonial() {
   if (!SHOW_TESTIMONIAL) return null;
@@ -11,15 +11,15 @@ export async function Testimonial() {
   return (
     <section className="py-16 lg:py-24">
       <Container>
-        <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
-          <SectionHead index={t("index")} label={t("label")} title={t("title")} />
+        <SectionHead index={t("index")} label={t("label")} title={t("title")} />
 
+        <SectionBody className="mt-10">
           <blockquote className="border-line bg-surface rounded-[20px] border p-8 shadow-[var(--shadow-card)]">
             <p className="text-muted text-lg leading-relaxed">
               {t("placeholder")}
             </p>
           </blockquote>
-        </div>
+        </SectionBody>
       </Container>
     </section>
   );
diff --git a/src/components/ui/SectionHead.tsx b/src/components/ui/SectionHead.tsx
index 58fdc6a..0806e1f 100644
--- a/src/components/ui/SectionHead.tsx
+++ b/src/components/ui/SectionHead.tsx
@@ -7,6 +7,15 @@ export type SectionHeadProps = {
   className?: string;
 };
 
+/**
+ * Figma "Section Head": on desktop the small index + label sit in a fixed
+ * 300px left column and the BIG title runs to the right of it, spanning the
+ * remaining width so long titles wrap in two lines rather than stacking
+ * narrowly inside the 300px column. Below `lg` everything stacks.
+ *
+ * Sections pair this with `<SectionBody>` so their content lines up under the
+ * title at the same 300px offset.
+ */
 export function SectionHead({
   index,
   label,
@@ -14,14 +23,40 @@ export function SectionHead({
   className,
 }: SectionHeadProps) {
   return (
-    <div className={cn('flex flex-col gap-3', className)}>
-      <div className="text-muted flex items-center gap-3 text-xs font-medium tracking-[0.2em]">
+    <div
+      className={cn(
+        'flex flex-col gap-3 lg:grid lg:grid-cols-[300px_1fr] lg:items-start lg:gap-16',
+        className,
+      )}
+    >
+      <div className="text-muted flex items-center gap-3 text-xs font-medium tracking-[0.2em] lg:pt-4">
         <span className="text-accent">{index}</span>
         <span>{label}</span>
       </div>
-      <h2 className="text-text text-[32px] leading-tight font-semibold lg:text-[56px]">
+      <h2 className="text-text max-w-[932px] text-[32px] leading-tight font-semibold lg:text-[56px]">
         {title}
       </h2>
     </div>
   );
 }
+
+/**
+ * Content that follows a `SectionHead`, indented to the same 300px offset on
+ * desktop so it lines up under the title.
+ */
+export function SectionBody({
+  children,
+  className,
+}: {
+  children: React.ReactNode;
+  className?: string;
+}) {
+  return (
+    <div
+      className={cn('lg:grid lg:grid-cols-[300px_1fr] lg:gap-16', className)}
+    >
+      <div aria-hidden="true" className="hidden lg:block" />
+      <div className="min-w-0">{children}</div>
+    </div>
+  );
+}
diff --git a/src/components/ui/index.ts b/src/components/ui/index.ts
deleted file mode 100644
index ca7977a..0000000
--- a/src/components/ui/index.ts
+++ /dev/null
@@ -1,9 +0,0 @@
-export { BackToTop, type BackToTopProps } from './BackToTop';
-export { Button, type ButtonProps, type ButtonSize, type ButtonVariant } from './Button';
-export { Container, type ContainerProps } from './Container';
-export { LangToggle, type LangToggleProps } from './LangToggle';
-export { NavLink, type NavLinkProps } from './NavLink';
-export { SectionHead, type SectionHeadProps } from './SectionHead';
-export { Tag, type TagProps } from './Tag';
-export { TechChip, type TechChipProps } from './TechChip';
-export { ThemeToggle, type ThemeToggleProps } from './ThemeToggle';
diff --git a/src/content/flags.ts b/src/content/flags.ts
deleted file mode 100644
index fe0b8a6..0000000
--- a/src/content/flags.ts
+++ /dev/null
@@ -1,2 +0,0 @@
-/* Feature flags — re-exported from profile so there is one source of truth. */
-export { SHOW_TESTIMONIAL } from "@/content/profile";
diff --git a/src/content/skills.ts b/src/content/skills.ts
index f333a2b..89879ef 100644
--- a/src/content/skills.ts
+++ b/src/content/skills.ts
@@ -10,9 +10,11 @@ export const techChips: SkillChip[] = [
   { name: 'Java', slug: 'openjdk' },
   { name: 'Spring Boot', slug: 'springboot' },
   { name: 'MySQL', slug: 'mysql' },
-  { name: 'SQL Server', slug: 'sqlserver' },
+  // simple-icons ships no SQL Server or Playwright mark, so both carry an
+  // explicit lettermark rather than the derived initials ("SS" / "PL").
+  { name: 'SQL Server', slug: 'sqlserver', mark: 'SQL' },
   { name: 'Docker', slug: 'docker' },
-  { name: 'Playwright', slug: 'playwright' },
+  { name: 'Playwright', slug: 'playwright', mark: 'PW' },
   { name: 'Figma', slug: 'figma' },
   { name: 'GitLab', slug: 'gitlab' },
 ];
diff --git a/src/content/types.ts b/src/content/types.ts
index 5bd6f84..9371e2d 100644
--- a/src/content/types.ts
+++ b/src/content/types.ts
@@ -27,7 +27,12 @@ export type Repo = {
   url: string;
 };
 
-export type SkillChip = { name: string; slug: string };
+export type SkillChip = {
+  name: string;
+  slug: string;
+  /** Explicit lettermark for brands simple-icons has no entry for. */
+  mark?: string;
+};
 
 export type ExperienceItem = {
   /** message key under `experience.items` */

commit 60b7bf4b69ab643de12ff2d8f67e63beeb1ae573
Author:     Haroon Kasor <haroonkasor.dev@gmail.com>
AuthorDate: Fri Aug 28 12:57:19 2026 +0700
Commit:     Haroon Kasor <haroonkasor.dev@gmail.com>
CommitDate: Fri Aug 28 12:57:19 2026 +0700

    fix(seo): stop the proxy rewriting /icon and /opengraph-image into 404s
    
    The proxy matcher did not exclude the extensionless file-based metadata
    routes at the app root, so /icon was rewritten to /en/icon (confirmed via
    x-middleware-rewrite) and both the favicon and the OG image 404'd at
    runtime despite being built.
    
    Declaring an explicit openGraph object also suppresses Next's
    file-convention image inference, so / and /th carried no og:image at all.
    buildMetadata now points at the site image by URL, and the project detail
    pages opt out via siteImage:false so their own sibling opengraph-image
    still wins.
    
    Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
---
 src/app/[locale]/projects/[slug]/page.tsx |  2 ++
 src/lib/seo.ts                            | 37 ++++++++++++++++++++++++++++++-
 src/proxy.ts                              | 10 ++++++++-
 3 files changed, 47 insertions(+), 2 deletions(-)

diff --git a/src/app/[locale]/projects/[slug]/page.tsx b/src/app/[locale]/projects/[slug]/page.tsx
index ec880ba..956b593 100644
--- a/src/app/[locale]/projects/[slug]/page.tsx
+++ b/src/app/[locale]/projects/[slug]/page.tsx
@@ -39,6 +39,8 @@ export async function generateMetadata({
     path: `/projects/${project.slug}`,
     title: project.title[typedLocale],
     description: project.summary[typedLocale],
+    // This route has its own opengraph-image.tsx; let that one win.
+    siteImage: false,
   });
 }
 
diff --git a/src/lib/seo.ts b/src/lib/seo.ts
index 890abff..cf7efe5 100644
--- a/src/lib/seo.ts
+++ b/src/lib/seo.ts
@@ -33,6 +33,12 @@ export type MetadataOverrides = {
   description?: string;
   /** Pass false on the root layout so the template applies to children only. */
   useTemplate?: boolean;
+  /**
+   * Pass false on routes that have their own sibling `opengraph-image.tsx`
+   * (project details) so Next's file-convention image wins instead of the
+   * site-wide one.
+   */
+  siteImage?: boolean;
 };
 
 /**
@@ -44,7 +50,13 @@ export async function buildMetadata(
   overrides: MetadataOverrides = {},
 ): Promise<Metadata> {
   const t = await getTranslations({ locale, namespace: "common" });
-  const { path = "/", title, description, useTemplate = true } = overrides;
+  const {
+    path = "/",
+    title,
+    description,
+    useTemplate = true,
+    siteImage = true,
+  } = overrides;
 
   const siteName = t("siteName");
   const defaultTitle = `${siteName} — ${t("role")}`;
@@ -52,6 +64,27 @@ export async function buildMetadata(
   const resolvedDescription = description ?? t("tagline");
   const url = absoluteUrl(locale, path);
 
+  // The root `opengraph-image.tsx` is only auto-attached to pages that are its
+  // route siblings, which `[locale]/page.tsx` is not — and declaring an
+  // explicit `openGraph` object suppresses that inference anyway. Point at it
+  // by URL so /, /th and any other locale page carry an og:image. Pages with
+  // their own sibling image (project details) override `images` themselves.
+  // Spread-in rather than set to undefined: an explicit `images: undefined`
+  // still counts as declared and suppresses the file-convention inference that
+  // the project pages rely on for their own sibling image.
+  const imageFields = siteImage
+    ? {
+        images: [
+          {
+            url: `${SITE_URL}/opengraph-image`,
+            width: 1200,
+            height: 630,
+            alt: defaultTitle,
+          },
+        ],
+      }
+    : {};
+
   return {
     metadataBase: new URL(SITE_URL),
     title: useTemplate
@@ -69,11 +102,13 @@ export async function buildMetadata(
       description: resolvedDescription,
       url,
       locale: locale === "th" ? "th_TH" : "en_US",
+      ...imageFields,
     },
     twitter: {
       card: "summary_large_image",
       title: resolvedTitle,
       description: resolvedDescription,
+      ...imageFields,
     },
   };
 }
diff --git a/src/proxy.ts b/src/proxy.ts
index 066a93b..7ec931d 100644
--- a/src/proxy.ts
+++ b/src/proxy.ts
@@ -10,5 +10,13 @@ export const config = {
   // single backslash before the dot is silently dropped and the lookahead
   // degrades into `.*..*` (any path of 2+ characters), which stops the proxy
   // matching almost every route. Next also rejects `String.raw` here.
-  matcher: ['/((?!api|_next|cv|.*\\..*).*)'],
+  //
+  // `icon`, `opengraph-image` and `twitter-image` are extensionless
+  // file-based metadata routes living at the app root, outside `[locale]`.
+  // Without excluding them the proxy rewrites /icon -> /en/icon, which does
+  // not exist, so the favicon and OG image 404 at runtime and no og:image
+  // meta tag is emitted.
+  matcher: [
+    '/((?!api|_next|cv|icon|opengraph-image|twitter-image|manifest\\.webmanifest|.*\\..*).*)',
+  ],
 };

commit 7b7d5f24e2206dcb596b848e15c06b48715ef4fe
Author:     Haroon Kasor <haroonkasor.dev@gmail.com>
AuthorDate: Fri Aug 28 12:54:09 2026 +0700
Commit:     Haroon Kasor <haroonkasor.dev@gmail.com>
CommitDate: Fri Aug 28 12:54:09 2026 +0700

    fix(seo): resolve metadata from buildMetadata and set a root metadataBase
    
    The home layout/page hand-rolled their metadata, so they carried no
    canonical, no en/th hreflang alternates and no metadataBase. Route them
    through buildMetadata instead.
    
    The build's metadataBase warning came from the root layout having no
    metadata export at all: /_not-found, /icon, /opengraph-image,
    /twitter-image and /manifest.webmanifest render outside `[locale]` and so
    never inherited one, falling back to localhost:3000. Set metadataBase
    once on the root layout from SITE_URL.
    
    Also hoist the skip link into the locale layout so the project detail and
    404 pages get it, and give all three pages <main id="content">.
    
    Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
---
 src/app/[locale]/layout.tsx                | 24 ++++++++++++++++++++++--
 src/app/[locale]/not-found.tsx             |  2 +-
 src/app/[locale]/page.tsx                  | 27 ++++++++++-----------------
 src/app/[locale]/projects/[slug]/page.tsx  |  2 +-
 src/app/layout.tsx                         | 12 ++++++++++++
 src/app/not-found.tsx                      |  1 +
 src/components/detail/ProjectCover.tsx     |  8 ++------
 src/components/notfound/ErrorTerminal.tsx  | 22 +++++++++++-----------
 src/components/sections/About.tsx          | 15 +++++++++++----
 src/components/sections/CvPreviewModal.tsx | 27 +++++++++++++++++++++------
 src/components/sections/Hero.tsx           |  2 +-
 src/components/ui/TechChip.tsx             | 15 +++++++++++----
 src/styles/tokens.css                      | 28 +++++++++++++++++++++++++---
 13 files changed, 129 insertions(+), 56 deletions(-)

diff --git a/src/app/[locale]/layout.tsx b/src/app/[locale]/layout.tsx
index e80a6ca..a9a33b7 100644
--- a/src/app/[locale]/layout.tsx
+++ b/src/app/[locale]/layout.tsx
@@ -7,6 +7,7 @@ import type { ReactNode } from 'react';
 
 import { ThemeProviders } from '@/app/providers';
 import { routing } from '@/i18n/routing';
+import { buildMetadata } from '@/lib/seo';
 
 const outfit = Outfit({
   subsets: ['latin'],
@@ -28,9 +29,18 @@ export async function generateMetadata({
   params: Promise<{ locale: string }>;
 }): Promise<Metadata> {
   const { locale } = await params;
+  if (!hasLocale(routing.locales, locale)) return {};
+
   const t = await getTranslations({ locale, namespace: 'meta' });
 
-  return { title: t('title'), description: t('description') };
+  // buildMetadata supplies metadataBase, canonical and the en/th hreflang
+  // alternates; the layout only overrides the copy. `useTemplate: false` keeps
+  // the "%s — Haroon Kasor" template from doubling up on the layout's own title.
+  return buildMetadata(locale, {
+    title: t('title'),
+    description: t('description'),
+    useTemplate: false,
+  });
 }
 
 export function generateStaticParams() {
@@ -52,6 +62,8 @@ export default async function LocaleLayout({
 
   setRequestLocale(locale);
 
+  const t = await getTranslations({ locale, namespace: 'common' });
+
   return (
     <html
       lang={locale}
@@ -60,7 +72,15 @@ export default async function LocaleLayout({
     >
       <body className="bg-bg text-text flex min-h-full flex-col font-sans">
         <ThemeProviders>
-          <NextIntlClientProvider>{children}</NextIntlClientProvider>
+          <NextIntlClientProvider>
+            <a
+              href="#content"
+              className="bg-accent sr-only rounded-full px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[70]"
+            >
+              {t('skipToContent')}
+            </a>
+            {children}
+          </NextIntlClientProvider>
         </ThemeProviders>
       </body>
     </html>
diff --git a/src/app/[locale]/not-found.tsx b/src/app/[locale]/not-found.tsx
index 4d68919..71de938 100644
--- a/src/app/[locale]/not-found.tsx
+++ b/src/app/[locale]/not-found.tsx
@@ -13,7 +13,7 @@ export default function LocaleNotFound() {
     <>
       <div className="gradient-hero flex flex-1 flex-col">
         <Navbar />
-        <main className="flex-1 pb-20 md:pb-28">
+        <main id="content" className="flex-1 pb-20 md:pb-28">
           <Container>
             <div className="grid grid-cols-1 items-center gap-12 pt-8 lg:grid-cols-2 lg:gap-16 lg:pt-16">
               <div>
diff --git a/src/app/[locale]/page.tsx b/src/app/[locale]/page.tsx
index 4487597..238b1d9 100644
--- a/src/app/[locale]/page.tsx
+++ b/src/app/[locale]/page.tsx
@@ -1,5 +1,8 @@
 import type { Metadata } from "next";
+import { hasLocale } from "next-intl";
 import { getTranslations, setRequestLocale } from "next-intl/server";
+import { routing } from "@/i18n/routing";
+import { buildMetadata } from "@/lib/seo";
 import { Navbar } from "@/components/sections/Navbar";
 import { Hero } from "@/components/sections/Hero";
 import { Stats } from "@/components/sections/Stats";
@@ -18,35 +21,25 @@ export async function generateMetadata({
   params,
 }: PageProps): Promise<Metadata> {
   const { locale } = await params;
+  if (!hasLocale(routing.locales, locale)) return {};
+
   const t = await getTranslations({ locale, namespace: "meta" });
 
-  return {
+  // Canonical, hreflang alternates and metadataBase all come from buildMetadata;
+  // the OG image itself is picked up from the file-based opengraph-image route.
+  return buildMetadata(locale, {
     title: t("title"),
     description: t("description"),
-    openGraph: {
-      title: t("title"),
-      description: t("description"),
-      locale,
-      type: "website",
-    },
-  };
+    useTemplate: false,
+  });
 }
 
 export default async function HomePage({ params }: PageProps) {
   const { locale } = await params;
   setRequestLocale(locale);
 
-  const t = await getTranslations("common");
-
   return (
     <>
-      <a
-        href="#content"
-        className="bg-accent sr-only rounded-full px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[70]"
-      >
-        {t("skipToContent")}
-      </a>
-
       <Navbar />
 
       <main id="content">
diff --git a/src/app/[locale]/projects/[slug]/page.tsx b/src/app/[locale]/projects/[slug]/page.tsx
index d854c52..ec880ba 100644
--- a/src/app/[locale]/projects/[slug]/page.tsx
+++ b/src/app/[locale]/projects/[slug]/page.tsx
@@ -61,7 +61,7 @@ export default async function ProjectDetailPage({
   return (
     <>
       <Navbar />
-      <main className="flex-1 pb-8">
+      <main id="content" className="flex-1 pb-8">
         <ProjectHeader project={project} locale={typedLocale} />
         <FactsStrip project={project} locale={typedLocale} />
         <ProjectCover
diff --git a/src/app/layout.tsx b/src/app/layout.tsx
index d972d99..2a2b693 100644
--- a/src/app/layout.tsx
+++ b/src/app/layout.tsx
@@ -1,7 +1,19 @@
+import type { Metadata } from 'next';
 import type { ReactNode } from 'react';
 
+import { SITE_URL } from '@/lib/seo';
+
 import './globals.css';
 
+// Only metadataBase is set here so file-based metadata routes (icon,
+// opengraph-image, twitter-image, manifest) and /_not-found — which render
+// under this root layout, outside the `[locale]` segment — can resolve
+// relative/social image URLs without falling back to localhost. Per-locale
+// pages still get their full metadata from `[locale]/layout.tsx`.
+export const metadata: Metadata = {
+  metadataBase: new URL(SITE_URL),
+};
+
 // The `[locale]` layout renders <html>/<body>; this root layout only passes
 // children through, as required by next-intl's App Router setup.
 export default function RootLayout({ children }: { children: ReactNode }) {
diff --git a/src/app/not-found.tsx b/src/app/not-found.tsx
index c10df8a..881e33a 100644
--- a/src/app/not-found.tsx
+++ b/src/app/not-found.tsx
@@ -2,6 +2,7 @@ import type { Metadata } from "next";
 import Link from "next/link";
 import "./globals.css";
 
+// metadataBase is inherited from the root layout.
 export const metadata: Metadata = {
   title: "Page not found — Haroon Kasor",
   robots: { index: false, follow: true },
diff --git a/src/components/detail/ProjectCover.tsx b/src/components/detail/ProjectCover.tsx
index 6376d99..1bd8e71 100644
--- a/src/components/detail/ProjectCover.tsx
+++ b/src/components/detail/ProjectCover.tsx
@@ -53,15 +53,11 @@ export function ProjectCover({
               <div
                 role="img"
                 aria-label={alt}
-                className="flex h-full w-full items-center justify-center"
+                className="h-full w-full"
                 style={{
                   backgroundImage: `linear-gradient(135deg, ${from}, ${to})`,
                 }}
-              >
-                <span className="rounded-full bg-black/20 px-4 py-1.5 font-mono text-xs tracking-wide text-white/90">
-                  {caption ?? t("screenshotSlot")}
-                </span>
-              </div>
+              />
             )}
           </div>
         </div>
diff --git a/src/components/notfound/ErrorTerminal.tsx b/src/components/notfound/ErrorTerminal.tsx
index b508d58..8575a0c 100644
--- a/src/components/notfound/ErrorTerminal.tsx
+++ b/src/components/notfound/ErrorTerminal.tsx
@@ -85,24 +85,24 @@ export function ErrorTerminal() {
     <div className="overflow-hidden rounded-2xl border border-terminal-line bg-terminal shadow-[var(--shadow-float)]">
       <div className="flex items-center gap-3 border-b border-terminal-line px-4 py-3">
         <div aria-hidden="true" className="flex shrink-0 gap-1.5">
-          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
-          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
-          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
+          <span className="h-2.5 w-2.5 rounded-full bg-terminal-line" />
+          <span className="h-2.5 w-2.5 rounded-full bg-terminal-line" />
+          <span className="h-2.5 w-2.5 rounded-full bg-terminal-line" />
         </div>
-        <span className="font-mono text-xs text-white/50">{t("terminalFile")}</span>
+        <span className="font-mono text-xs text-muted">{t("terminalFile")}</span>
       </div>
 
       <div className="p-5 font-mono text-[13px] leading-relaxed md:p-6 md:text-sm">
-        <p className="text-white/80">
-          <span aria-hidden="true" className="mr-2 text-white/40">
+        <p className="text-text">
+          <span aria-hidden="true" className="mr-2 text-muted">
             $
           </span>
           {t("cmdOpen")}
         </p>
         <p className="mt-1 text-danger">{t("errorLine")}</p>
 
-        <p className="mt-4 text-white/80">
-          <span aria-hidden="true" className="mr-2 text-white/40">
+        <p className="mt-4 text-text">
+          <span aria-hidden="true" className="mr-2 text-muted">
             $
           </span>
           {t("cmdLs")}
@@ -116,14 +116,14 @@ export function ErrorTerminal() {
                 className="-mx-2 flex items-center gap-4 rounded-md px-2 py-1.5 transition-colors hover:bg-accent-soft"
               >
                 <span className="w-32 shrink-0 text-term-path">{row.path}</span>
-                <span className="text-white/60">{t(`rows.${row.key}`)}</span>
+                <span className="text-muted">{t(`rows.${row.key}`)}</span>
               </Link>
             </li>
           ))}
         </ul>
 
-        <p className="mt-4 text-white/80">
-          <span aria-hidden="true" className="mr-2 text-white/40">
+        <p className="mt-4 text-text">
+          <span aria-hidden="true" className="mr-2 text-muted">
             $
           </span>
           {lastLine}
diff --git a/src/components/sections/About.tsx b/src/components/sections/About.tsx
index 1cc0f24..1164462 100644
--- a/src/components/sections/About.tsx
+++ b/src/components/sections/About.tsx
@@ -3,7 +3,7 @@ import { Container } from "@/components/ui/Container";
 import { SectionHead } from "@/components/ui/SectionHead";
 import { TechChip } from "@/components/ui/TechChip";
 
-const CHIPS: { name: string; slug: string }[] = [
+const CHIPS: { name: string; slug: string; mark?: string }[] = [
   { name: "Next.js", slug: "nextdotjs" },
   { name: "React", slug: "react" },
   { name: "TypeScript", slug: "typescript" },
@@ -11,9 +11,11 @@ const CHIPS: { name: string; slug: string }[] = [
   { name: "Java", slug: "openjdk" },
   { name: "Spring Boot", slug: "springboot" },
   { name: "MySQL", slug: "mysql" },
-  { name: "SQL Server", slug: "" },
+  // simple-icons has no SQL Server mark; "SS" reads wrong, so set it explicitly.
+  { name: "SQL Server", slug: "", mark: "SQL" },
   { name: "Docker", slug: "docker" },
-  { name: "Playwright", slug: "playwright" },
+  // No simple-icons entry either — "PW" is the deliberate lettermark.
+  { name: "Playwright", slug: "playwright", mark: "PW" },
   { name: "Figma", slug: "figma" },
   { name: "GitLab", slug: "gitlab" },
 ];
@@ -37,7 +39,12 @@ export async function About() {
 
             <div className="mt-10 flex flex-wrap gap-2">
               {CHIPS.map((chip) => (
-                <TechChip key={chip.name} name={chip.name} slug={chip.slug} />
+                <TechChip
+                  key={chip.name}
+                  name={chip.name}
+                  slug={chip.slug}
+                  mark={chip.mark}
+                />
               ))}
             </div>
 
diff --git a/src/components/sections/CvPreviewModal.tsx b/src/components/sections/CvPreviewModal.tsx
index a08ab9a..ce7df12 100644
--- a/src/components/sections/CvPreviewModal.tsx
+++ b/src/components/sections/CvPreviewModal.tsx
@@ -14,6 +14,20 @@ type CvLocale = keyof typeof FILES;
 const FOCUSABLE =
   'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';
 
+/**
+ * Only nodes that are actually rendered can hold focus. The header's
+ * "Open in new tab"/"Download" actions are `hidden sm:inline-flex` and their
+ * footer twins are `sm:hidden`, so half the matches are invisible at any
+ * viewport; trapping against those makes Tab wrap to a dead element and the
+ * focus escape the dialog.
+ */
+function visibleFocusable(root: HTMLElement | null): HTMLElement[] {
+  if (!root) return [];
+  return [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
+    (el) => el.offsetParent !== null || el.getClientRects().length > 0,
+  );
+}
+
 export function CvPreviewModal({
   open,
   onClose,
@@ -40,8 +54,7 @@ function CvDialog({ onClose }: { onClose: () => void }) {
   // Remember the trigger so focus can be returned when the dialog closes.
   useEffect(() => {
     openerRef.current = document.activeElement as HTMLElement | null;
-    const panel = panelRef.current;
-    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
+    visibleFocusable(panelRef.current)[0]?.focus();
     return () => openerRef.current?.focus?.();
   }, []);
 
@@ -54,8 +67,8 @@ function CvDialog({ onClose }: { onClose: () => void }) {
         return;
       }
       if (e.key !== "Tab") return;
-      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
-      if (!nodes || nodes.length === 0) return;
+      const nodes = visibleFocusable(panelRef.current);
+      if (nodes.length === 0) return;
       const first = nodes[0];
       const last = nodes[nodes.length - 1];
       if (e.shiftKey && document.activeElement === first) {
@@ -148,7 +161,7 @@ function CvDialog({ onClose }: { onClose: () => void }) {
 
           <button
             type="button"
-            aria-label={t("title")}
+            aria-label={t("close")}
             onClick={handleClose}
             className="border-line text-text hover:text-accent hover:border-accent inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors"
           >
@@ -164,7 +177,9 @@ function CvDialog({ onClose }: { onClose: () => void }) {
         />
 
         <div className="border-line flex flex-col gap-3 border-t px-5 py-4 sm:flex-row sm:items-center sm:px-6">
-          <span className="text-muted text-xs">{t("page")}</span>
+          <span className="text-muted text-xs">
+            {t("page", { current: 1, total: 2 })}
+          </span>
           {/* Mobile: the two actions become full-width buttons in the footer. */}
           <div className="flex flex-col gap-2 sm:hidden">
             <button
diff --git a/src/components/sections/Hero.tsx b/src/components/sections/Hero.tsx
index 147a795..a033999 100644
--- a/src/components/sections/Hero.tsx
+++ b/src/components/sections/Hero.tsx
@@ -10,7 +10,7 @@ export async function Hero() {
   const t = await getTranslations("hero");
 
   return (
-    <section className="relative pt-10 pb-32 lg:pt-16 lg:pb-44">
+    <section className="relative overflow-x-clip pt-10 pb-32 lg:pt-16 lg:pb-44">
       {/* The gradient starts behind the navbar, so it is pinned to the top of
           the page rather than to this section's own box. */}
       <div
diff --git a/src/components/ui/TechChip.tsx b/src/components/ui/TechChip.tsx
index 34f3ee7..9f54484 100644
--- a/src/components/ui/TechChip.tsx
+++ b/src/components/ui/TechChip.tsx
@@ -2,7 +2,14 @@ import * as simpleIcons from 'simple-icons';
 
 import { cn } from '@/lib/utils';
 
-export type TechChipProps = { name: string; slug: string; className?: string };
+export type TechChipProps = {
+  name: string;
+  slug: string;
+  /** Explicit lettermark, for brands simple-icons has no entry for
+   * (e.g. SQL Server) or where the derived initials read badly. */
+  mark?: string;
+  className?: string;
+};
 
 type SimpleIcon = { title: string; slug: string; path: string; hex: string };
 
@@ -34,7 +41,7 @@ function lettermark(name: string): string {
   return name.replace(/[^\p{L}\p{N}]/gu, '').slice(0, 2).toUpperCase();
 }
 
-export function TechChip({ name, slug, className }: TechChipProps) {
+export function TechChip({ name, slug, mark, className }: TechChipProps) {
   const icon = getIcon(slug);
   const adaptive = ADAPTIVE.has(slug);
 
@@ -56,10 +63,10 @@ export function TechChip({ name, slug, className }: TechChipProps) {
         </svg>
       ) : (
         <span
-          className="bg-accent-soft text-accent flex h-4 w-4 shrink-0 items-center justify-center rounded-sm text-[8px] leading-none font-bold"
+          className="bg-accent-soft text-accent flex h-5 min-w-5 shrink-0 items-center justify-center rounded-sm px-1 text-[10px] leading-none font-semibold"
           aria-hidden
         >
-          {lettermark(name)}
+          {mark ?? lettermark(name)}
         </span>
       )}
       {name}
diff --git a/src/styles/tokens.css b/src/styles/tokens.css
index a52d860..3344ec2 100644
--- a/src/styles/tokens.css
+++ b/src/styles/tokens.css
@@ -10,7 +10,7 @@
   --token-line: #e3e0db;
   --token-text: #0f2a4a;
   --token-muted: #6b6b73;
-  --token-accent: #1c70e6;
+  --token-accent: #1565d8;
   --token-accent-soft: #e3f0ff;
   --token-inverse: #121214;
   --token-on-inverse: #ffffff;
@@ -23,12 +23,21 @@
   /* String literals inside the terminal cards. */
   --token-term-string: #1a7f4b;
 
+  /* 404 error terminal. */
+  --token-terminal: #ffffff;
+  --token-terminal-line: #e3e0db;
+  --token-danger: #d93a46;
+  --token-term-path: #1a7f4b;
+  /* Glitch ghost copies are the same hues in both themes. */
+  --token-glitch-a: #5994ff;
+  --token-glitch-b: #ff6b9e;
+
   --gradient-hero: linear-gradient(100deg, #fde8f0 0%, #ebe8ff 50%, #e3f7f2 100%);
   --gradient-band: linear-gradient(105deg, #1766e0, #2a9ef2);
 
   --shadow-card: 0 2px 8px rgba(0, 0, 0, 0.04);
   --shadow-float: 0 24px 56px -12px rgba(26, 38, 102, 0.1);
-  --shadow-accent: 0 8px 24px rgba(28, 112, 230, 0.3);
+  --shadow-accent: 0 8px 24px rgba(21, 101, 216, 0.3);
 
   --container-max: 1440px;
 }
@@ -50,6 +59,13 @@ html[data-theme='dark'] {
   --token-status: #34d07a;
   --token-term-string: #73d9a0;
 
+  --token-terminal: #0f1420;
+  --token-terminal-line: #29303f;
+  --token-danger: #ff6b75;
+  --token-term-path: #73d9a0;
+  --token-glitch-a: #5994ff;
+  --token-glitch-b: #ff6b9e;
+
   --gradient-hero: linear-gradient(100deg, #291433 0%, #0f1433 50%, #0a2429 100%);
   --gradient-band: linear-gradient(105deg, #1247b3, #1f73d9);
 }
@@ -68,6 +84,12 @@ html[data-theme='dark'] {
   --color-band-accent: var(--token-band-accent);
   --color-status: var(--token-status);
   --color-term-string: var(--token-term-string);
+  --color-terminal: var(--token-terminal);
+  --color-terminal-line: var(--token-terminal-line);
+  --color-danger: var(--token-danger);
+  --color-term-path: var(--token-term-path);
+  --color-glitch-a: var(--token-glitch-a);
+  --color-glitch-b: var(--token-glitch-b);
 
   --radius-sm: 6px;
   --radius-md: 10px;
@@ -78,7 +100,7 @@ html[data-theme='dark'] {
 
   --shadow-card: 0 2px 8px rgba(0, 0, 0, 0.04);
   --shadow-float: 0 24px 56px -12px rgba(26, 38, 102, 0.1);
-  --shadow-accent: 0 8px 24px rgba(28, 112, 230, 0.3);
+  --shadow-accent: 0 8px 24px rgba(21, 101, 216, 0.3);
 
   --font-sans: var(--font-outfit), var(--font-prompt), ui-sans-serif, system-ui, sans-serif;
   --font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

commit 8816ac9dd5e3843f40b5af0b334c9cf116ec5a4e
Author:     Haroon Kasor <haroonkasor.dev@gmail.com>
AuthorDate: Fri Aug 28 12:48:43 2026 +0700
Commit:     Haroon Kasor <haroonkasor.dev@gmail.com>
CommitDate: Fri Aug 28 12:48:43 2026 +0700

    fix(routing): make the root 404 static so the locale tree prerenders
    
    The root not-found mounted NextIntlClientProvider (and imported the locale
    not-found) outside `[locale]`, which opted the entire `[locale]` tree into
    dynamic rendering and served /th/<bad> with lang="en". Make it fully
    self-contained with plain English literals, and add a `[locale]/[...rest]`
    catch-all that calls notFound() so unmatched paths under a valid locale
    still reach the localized 404 with the right lang.
    
    /en, /th and the 10 project pages are now prerendered (SSG).
    
    Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
---
 src/app/[locale]/[...rest]/page.tsx | 22 ++++++++++
 src/app/not-found.tsx               | 85 +++++++++++++++++++++----------------
 2 files changed, 70 insertions(+), 37 deletions(-)

diff --git a/src/app/[locale]/[...rest]/page.tsx b/src/app/[locale]/[...rest]/page.tsx
new file mode 100644
index 0000000..514e273
--- /dev/null
+++ b/src/app/[locale]/[...rest]/page.tsx
@@ -0,0 +1,22 @@
+import { notFound } from "next/navigation";
+import { hasLocale } from "next-intl";
+import { setRequestLocale } from "next-intl/server";
+import { routing } from "@/i18n/routing";
+
+/**
+ * Catch-all for unmatched paths under a valid locale, e.g. `/th/nope`.
+ *
+ * Without it those requests fall through to the *root* not-found, which is
+ * English-only and would serve `lang="en"` for a `/th/...` URL. Calling
+ * `notFound()` here hands them to `[locale]/not-found.tsx` instead, so the
+ * Thai 404 renders inside the Thai layout with `lang="th"`.
+ */
+export default async function LocaleCatchAll({
+  params,
+}: {
+  params: Promise<{ locale: string }>;
+}) {
+  const { locale } = await params;
+  if (hasLocale(routing.locales, locale)) setRequestLocale(locale);
+  notFound();
+}
diff --git a/src/app/not-found.tsx b/src/app/not-found.tsx
index 120e141..c10df8a 100644
--- a/src/app/not-found.tsx
+++ b/src/app/not-found.tsx
@@ -1,55 +1,66 @@
 import type { Metadata } from "next";
-import { NextIntlClientProvider } from "next-intl";
-import { ThemeProvider } from "next-themes";
-import { Outfit, Prompt, JetBrains_Mono } from "next/font/google";
-import { routing } from "@/i18n/routing";
-import { SITE_URL } from "@/lib/seo";
-import LocaleNotFound from "./[locale]/not-found";
-import messages from "../../messages/en.json";
+import Link from "next/link";
 import "./globals.css";
 
-const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });
-const prompt = Prompt({
-  variable: "--font-prompt",
-  subsets: ["thai", "latin"],
-  weight: ["400", "500", "600", "700"],
-});
-const jetbrains = JetBrains_Mono({
-  variable: "--font-jetbrains",
-  subsets: ["latin"],
-});
-
 export const metadata: Metadata = {
-  metadataBase: new URL(SITE_URL),
   title: "Page not found — Haroon Kasor",
   robots: { index: false, follow: true },
 };
 
 /**
  * Root fallback for requests that never resolve a locale segment.
+ *
+ * Deliberately self-contained: plain English literals, no
+ * NextIntlClientProvider and no import of the `[locale]` not-found. Pulling
+ * either of those in here opts the whole `[locale]` tree into dynamic (`f`)
+ * rendering, which costs the home and project pages their prerendering.
+ * Unknown paths *under* a valid locale are handled by `[locale]/[...rest]`,
+ * which routes them to the localized 404 with the correct `lang`.
+ *
  * The root layout is a passthrough, so this page owns <html>/<body>.
  */
 export default function RootNotFound() {
   return (
-    <html
-      lang={routing.defaultLocale}
-      suppressHydrationWarning
-      className={`${outfit.variable} ${prompt.variable} ${jetbrains.variable} h-full antialiased`}
-    >
-      <body className="flex min-h-full flex-col">
-        <ThemeProvider
-          attribute="data-theme"
-          defaultTheme="system"
-          enableSystem
-          disableTransitionOnChange
+    <html lang="en" className="h-full">
+      <body className="bg-bg text-text flex min-h-full flex-col">
+        <main
+          id="content"
+          className="mx-auto flex w-full max-w-[720px] flex-1 flex-col justify-center px-5 py-20"
         >
-          <NextIntlClientProvider
-            locale={routing.defaultLocale}
-            messages={messages}
-          >
-            <LocaleNotFound />
-          </NextIntlClientProvider>
-        </ThemeProvider>
+          <p className="text-accent font-mono text-xs font-semibold tracking-[0.18em] uppercase">
+            ERROR 404 &middot; PAGE NOT FOUND
+          </p>
+
+          <p className="text-text mt-6 text-[96px] leading-none font-bold tracking-tight">
+            404
+          </p>
+
+          <h1 className="text-text mt-8 text-[32px] leading-tight font-semibold md:text-[44px]">
+            This page doesn&apos;t exist
+            <br />
+            (or hasn&apos;t been pushed yet)
+          </h1>
+
+          <p className="text-muted mt-5 max-w-lg leading-relaxed">
+            The link may be mistyped or the page moved. Use the buttons below to
+            get back on track.
+          </p>
+
+          <div className="mt-8 flex flex-wrap gap-3">
+            <Link
+              href="/"
+              className="bg-accent inline-flex min-h-11 items-center rounded-full px-6 text-sm font-medium text-white"
+            >
+              Back home
+            </Link>
+            <Link
+              href="/#work"
+              className="border-line text-text inline-flex min-h-11 items-center rounded-full border px-6 text-sm font-medium"
+            >
+              View work
+            </Link>
+          </div>
+        </main>
       </body>
     </html>
   );

commit 68889f0df2b90b0acb8b1ffc9cb2668de3e95408
Author:     Haroon Kasor <haroonkasor.dev@gmail.com>
AuthorDate: Fri Aug 28 12:47:41 2026 +0700
Commit:     Haroon Kasor <haroonkasor.dev@gmail.com>
CommitDate: Fri Aug 28 12:47:41 2026 +0700

    fix(i18n): resolve hero headline keys and add the real contact email
    
    Hero rendered raw `line1|2|3` keys because the messages nest them under
    `hero.headline`. `contact.email` is the "EMAIL" column label, so the
    mailto/displayed address/copy button were pointing at that literal; add
    `contact.emailValue` and use it in Contact and MobileMenu.
    
    Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
---
 messages/en.json                       | 15 +++++++--------
 messages/th.json                       | 15 +++++++--------
 src/components/sections/Contact.tsx    |  2 +-
 src/components/sections/Hero.tsx       |  6 +++---
 src/components/sections/MobileMenu.tsx |  4 ++--
 5 files changed, 20 insertions(+), 22 deletions(-)

diff --git a/messages/en.json b/messages/en.json
index b5afbc0..7e5a95e 100644
--- a/messages/en.json
+++ b/messages/en.json
@@ -87,8 +87,7 @@
   "projects": {
     "index": "03",
     "label": "WORK",
-    "title": "Work I actually shipped",
-    "viewAll": "All projects →"
+    "title": "Work I actually shipped"
   },
   "github": {
     "index": "04",
@@ -115,7 +114,8 @@
     "email": "EMAIL",
     "githubValue": "github.com/HaroonKasor",
     "phoneValue": "062-496-9217",
-    "locationValue": "Bangkok, Thailand"
+    "locationValue": "Bangkok, Thailand",
+    "emailValue": "haroonkasor.dev@gmail.com"
   },
   "meta": {
     "title": "Haroon Kasor — Full-stack Developer",
@@ -149,7 +149,8 @@
     "english": "English",
     "openNewTab": "Open in new tab",
     "download": "Download PDF",
-    "page": "Page {current} / {total}"
+    "page": "Page {current} / {total}",
+    "close": "Close"
   },
   "detail": {
     "back": "Back to work",
@@ -179,17 +180,15 @@
     "internal": "Internal client system",
     "liveDemo": "Live demo",
     "github": "GitHub",
-    "screenshotSlot": "screenshot slot"
+    "screenshotSlot": "Screenshot coming soon"
   },
   "common": {
     "themeToggle": "Toggle theme",
     "langToggle": "Switch language",
     "backToTop": "Back to top",
     "skipToContent": "Skip to content",
-    "toggleTheme": "Toggle theme",
-    "toggleLanguage": "Switch language",
     "siteName": "Haroon Kasor",
     "role": "Full-stack Developer",
     "tagline": "Junior Developer @ Learn Tech · Next.js, React, Spring Boot · Bangkok"
   }
-}
\ No newline at end of file
+}
diff --git a/messages/th.json b/messages/th.json
index 8417da8..01aff1b 100644
--- a/messages/th.json
+++ b/messages/th.json
@@ -87,8 +87,7 @@
   "projects": {
     "index": "03",
     "label": "ผลงาน",
-    "title": "งานที่ผมลงมือทำจริง",
-    "viewAll": "ดูผลงานทั้งหมด →"
+    "title": "งานที่ผมลงมือทำจริง"
   },
   "github": {
     "index": "04",
@@ -115,7 +114,8 @@
     "email": "EMAIL",
     "githubValue": "github.com/HaroonKasor",
     "phoneValue": "062-496-9217",
-    "locationValue": "กรุงเทพฯ ประเทศไทย"
+    "locationValue": "กรุงเทพฯ ประเทศไทย",
+    "emailValue": "haroonkasor.dev@gmail.com"
   },
   "meta": {
     "title": "ฮารูน กาซอร์ — Full-stack Developer",
@@ -149,7 +149,8 @@
     "english": "English",
     "openNewTab": "เปิดในแท็บใหม่",
     "download": "ดาวน์โหลด PDF",
-    "page": "หน้า {current} / {total}"
+    "page": "หน้า {current} / {total}",
+    "close": "ปิด"
   },
   "detail": {
     "back": "กลับไปหน้าผลงาน",
@@ -179,17 +180,15 @@
     "internal": "ระบบภายในของลูกค้า",
     "liveDemo": "ดูเว็บจริง",
     "github": "GitHub",
-    "screenshotSlot": "screenshot slot"
+    "screenshotSlot": "ภาพหน้าจอเร็วๆ นี้"
   },
   "common": {
     "themeToggle": "สลับธีม",
     "langToggle": "เปลี่ยนภาษา",
     "backToTop": "กลับขึ้นด้านบน",
     "skipToContent": "ข้ามไปยังเนื้อหา",
-    "toggleTheme": "สลับธีม",
-    "toggleLanguage": "เปลี่ยนภาษา",
     "siteName": "ฮารูน กาซอร์",
     "role": "Full-stack Developer",
     "tagline": "Junior Developer @ Learn Tech · Next.js, React, Spring Boot · Bangkok"
   }
-}
\ No newline at end of file
+}
diff --git a/src/components/sections/Contact.tsx b/src/components/sections/Contact.tsx
index 31f1588..03ad13c 100644
--- a/src/components/sections/Contact.tsx
+++ b/src/components/sections/Contact.tsx
@@ -5,7 +5,7 @@ import { CopyEmailButton } from "./CopyEmailButton";
 
 export async function Contact() {
   const t = await getTranslations("contact");
-  const email = t("email");
+  const email = t("emailValue");
 
   return (
     <section id="contact" className="scroll-mt-24 py-16 lg:py-24">
diff --git a/src/components/sections/Hero.tsx b/src/components/sections/Hero.tsx
index 8d2956a..147a795 100644
--- a/src/components/sections/Hero.tsx
+++ b/src/components/sections/Hero.tsx
@@ -30,10 +30,10 @@ export async function Hero() {
             </span>
 
             <h1 className="mt-7 text-[56px] leading-[1.02] tracking-tight lg:text-[96px]">
-              <span className="text-text block font-bold">{t("line1")}</span>
-              <span className="text-text block font-normal">{t("line2")}</span>
+              <span className="text-text block font-bold">{t("headline.line1")}</span>
+              <span className="text-text block font-normal">{t("headline.line2")}</span>
               <span className="text-accent relative inline-block font-bold">
-                {t("line3")}
+                {t("headline.line3")}
                 <span
                   aria-hidden="true"
                   className="absolute -bottom-1 left-0 h-[6px] w-full rounded-full bg-[image:var(--gradient-band)] lg:h-2"
diff --git a/src/components/sections/MobileMenu.tsx b/src/components/sections/MobileMenu.tsx
index 2305939..2f69ae7 100644
--- a/src/components/sections/MobileMenu.tsx
+++ b/src/components/sections/MobileMenu.tsx
@@ -149,8 +149,8 @@ export function MobileMenu({
       </nav>
 
       <div className="text-muted flex flex-col gap-1 px-5 pb-8 text-sm">
-        <a href={`mailto:${tc("email")}`} className="hover:text-accent">
-          {tc("email")}
+        <a href={`mailto:${tc("emailValue")}`} className="hover:text-accent">
+          {tc("emailValue")}
         </a>
         <span>{tc("phoneValue")}</span>
         <span>{tc("locationValue")}</span>

2026-08-28T06:19:34.555111Z ERROR codex_models_manager::manager: failed to renew cache TTL: missing field `supports_parallel_tool_calls` at line 97 column 5
exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command '$targets = @('"'src/proxy.ts','src/app/not-found.tsx','src/app/[locale]/[...rest]/page.tsx','src/lib/seo.ts','src/app/layout.tsx','src/app/[locale]/layout.tsx','src/app/[locale]/page.tsx','src/app/[locale]/projects/[slug]/page.tsx','src/app/opengraph-image.tsx','src/app/icon.tsx'); foreach ("'$target in $targets) { if (Test-Path -LiteralPath $target) { Write-Output "`n===== $target ====="; $line=0; Get-Content -LiteralPath $target | ForEach-Object { $line++; '"'{0,4}: {1}' -f "'$line, $_ } } else { Write-Output "`n===== MISSING: $target =====" } }' in D:\haroon-portfolio
 succeeded in 510ms:

===== src/proxy.ts =====
   1: import createMiddleware from 'next-intl/middleware';
   2: 
   3: import { routing } from './i18n/routing';
   4: 
   5: export default createMiddleware(routing);
   6: 
   7: export const config = {
   8:   // Skip Next internals, API routes, the CV PDFs and any file with an extension.
   9:   // NOTE: the backslash MUST be doubled. This is a JS string literal, so a
  10:   // single backslash before the dot is silently dropped and the lookahead
  11:   // degrades into `.*..*` (any path of 2+ characters), which stops the proxy
  12:   // matching almost every route. Next also rejects `String.raw` here.
  13:   //
  14:   // `icon`, `opengraph-image` and `twitter-image` are extensionless
  15:   // file-based metadata routes living at the app root, outside `[locale]`.
  16:   // Without excluding them the proxy rewrites /icon -> /en/icon, which does
  17:   // not exist, so the favicon and OG image 404 at runtime and no og:image
  18:   // meta tag is emitted.
  19:   matcher: [
  20:     '/((?!api|_next|cv|icon|opengraph-image|twitter-image|manifest\\.webmanifest|.*\\..*).*)',
  21:   ],
  22: };

===== src/app/not-found.tsx =====
   1: import type { Metadata } from "next";
   2: import Link from "next/link";
   3: import "./globals.css";
   4: 
   5: // metadataBase is inherited from the root layout.
   6: export const metadata: Metadata = {
   7:   title: "Page not found — Haroon Kasor",
   8:   robots: { index: false, follow: true },
   9: };
  10: 
  11: /**
  12:  * Root fallback for requests that never resolve a locale segment.
  13:  *
  14:  * Deliberately self-contained: plain English literals, no
  15:  * NextIntlClientProvider and no import of the `[locale]` not-found. Pulling
  16:  * either of those in here opts the whole `[locale]` tree into dynamic (`f`)
  17:  * rendering, which costs the home and project pages their prerendering.
  18:  * Unknown paths *under* a valid locale are handled by `[locale]/[...rest]`,
  19:  * which routes them to the localized 404 with the correct `lang`.
  20:  *
  21:  * The root layout is a passthrough, so this page owns <html>/<body>.
  22:  */
  23: export default function RootNotFound() {
  24:   return (
  25:     <html lang="en" className="h-full">
  26:       <body className="bg-bg text-text flex min-h-full flex-col">
  27:         <main
  28:           id="content"
  29:           className="mx-auto flex w-full max-w-[720px] flex-1 flex-col justify-center px-5 py-20"
  30:         >
  31:           <p className="text-accent font-mono text-xs font-semibold tracking-[0.18em] uppercase">
  32:             ERROR 404 &middot; PAGE NOT FOUND
  33:           </p>
  34: 
  35:           <p className="text-text mt-6 text-[96px] leading-none font-bold tracking-tight">
  36:             404
  37:           </p>
  38: 
  39:           <h1 className="text-text mt-8 text-[32px] leading-tight font-semibold md:text-[44px]">
  40:             This page doesn&apos;t exist
  41:             <br />
  42:             (or hasn&apos;t been pushed yet)
  43:           </h1>
  44: 
  45:           <p className="text-muted mt-5 max-w-lg leading-relaxed">
  46:             The link may be mistyped or the page moved. Use the buttons below to
  47:             get back on track.
  48:           </p>
  49: 
  50:           <div className="mt-8 flex flex-wrap gap-3">
  51:             <Link
  52:               href="/"
  53:               className="bg-accent text-on-accent inline-flex min-h-11 items-center rounded-full px-6 text-sm font-medium"
  54:             >
  55:               Back home
  56:             </Link>
  57:             <Link
  58:               href="/#work"
  59:               className="border-line text-text inline-flex min-h-11 items-center rounded-full border px-6 text-sm font-medium"
  60:             >
  61:               View work
  62:             </Link>
  63:           </div>
  64:         </main>
  65:       </body>
  66:     </html>
  67:   );
  68: }

===== src/app/[locale]/[...rest]/page.tsx =====
   1: import { notFound } from "next/navigation";
   2: import { hasLocale } from "next-intl";
   3: import { setRequestLocale } from "next-intl/server";
   4: import { routing } from "@/i18n/routing";
   5: 
   6: /**
   7:  * Catch-all for unmatched paths under a valid locale, e.g. `/th/nope`.
   8:  *
   9:  * Without it those requests fall through to the *root* not-found, which is
  10:  * English-only and would serve `lang="en"` for a `/th/...` URL. Calling
  11:  * `notFound()` here hands them to `[locale]/not-found.tsx` instead, so the
  12:  * Thai 404 renders inside the Thai layout with `lang="th"`.
  13:  */
  14: export default async function LocaleCatchAll({
  15:   params,
  16: }: {
  17:   params: Promise<{ locale: string }>;
  18: }) {
  19:   const { locale } = await params;
  20:   if (hasLocale(routing.locales, locale)) setRequestLocale(locale);
  21:   notFound();
  22: }

===== src/lib/seo.ts =====
   1: import type { Metadata } from "next";
   2: import { getTranslations } from "next-intl/server";
   3: import { routing, type Locale } from "@/i18n/routing";
   4: 
   5: export const SITE_URL =
   6:   process.env.NEXT_PUBLIC_SITE_URL ?? "https://haroonkasor.dev";
   7: 
   8: export const TITLE_TEMPLATE = "%s — Haroon Kasor";
   9: 
  10: /** Path of a route for a given locale, honouring `localePrefix: "as-needed"`. */
  11: export function localizedPath(locale: Locale, path = "/"): string {
  12:   const normalized = path === "/" ? "" : path.replace(/\/$/, "");
  13:   return locale === routing.defaultLocale
  14:     ? `/${normalized.replace(/^\//, "")}`.replace(/\/$/, "") || "/"
  15:     : `/${locale}${normalized}`;
  16: }
  17: 
  18: export function absoluteUrl(locale: Locale, path = "/"): string {
  19:   const p = localizedPath(locale, path);
  20:   return `${SITE_URL}${p === "/" ? "" : p}`;
  21: }
  22: 
  23: function languageAlternates(path: string): Record<string, string> {
  24:   return Object.fromEntries(
  25:     routing.locales.map((l) => [l, absoluteUrl(l, path)]),
  26:   );
  27: }
  28: 
  29: export type MetadataOverrides = {
  30:   /** Route path without locale prefix, e.g. "/projects/goskillup-lms". */
  31:   path?: string;
  32:   title?: string;
  33:   description?: string;
  34:   /** Pass false on the root layout so the template applies to children only. */
  35:   useTemplate?: boolean;
  36:   /**
  37:    * Pass false on routes that have their own sibling `opengraph-image.tsx`
  38:    * (project details) so Next's file-convention image wins instead of the
  39:    * site-wide one.
  40:    */
  41:   siteImage?: boolean;
  42: };
  43: 
  44: /**
  45:  * Localized metadata defaults shared by every page.
  46:  * Pages spread the result and override individual fields as needed.
  47:  */
  48: export async function buildMetadata(
  49:   locale: Locale,
  50:   overrides: MetadataOverrides = {},
  51: ): Promise<Metadata> {
  52:   const t = await getTranslations({ locale, namespace: "common" });
  53:   const {
  54:     path = "/",
  55:     title,
  56:     description,
  57:     useTemplate = true,
  58:     siteImage = true,
  59:   } = overrides;
  60: 
  61:   const siteName = t("siteName");
  62:   const defaultTitle = `${siteName} — ${t("role")}`;
  63:   const resolvedTitle = title ?? defaultTitle;
  64:   const resolvedDescription = description ?? t("tagline");
  65:   const url = absoluteUrl(locale, path);
  66: 
  67:   // The root `opengraph-image.tsx` is only auto-attached to pages that are its
  68:   // route siblings, which `[locale]/page.tsx` is not — and declaring an
  69:   // explicit `openGraph` object suppresses that inference anyway. Point at it
  70:   // by URL so /, /th and any other locale page carry an og:image. Pages with
  71:   // their own sibling image (project details) override `images` themselves.
  72:   // Spread-in rather than set to undefined: an explicit `images: undefined`
  73:   // still counts as declared and suppresses the file-convention inference that
  74:   // the project pages rely on for their own sibling image.
  75:   const imageFields = siteImage
  76:     ? {
  77:         images: [
  78:           {
  79:             url: `${SITE_URL}/opengraph-image`,
  80:             width: 1200,
  81:             height: 630,
  82:             alt: defaultTitle,
  83:           },
  84:         ],
  85:       }
  86:     : {};
  87: 
  88:   return {
  89:     metadataBase: new URL(SITE_URL),
  90:     title: useTemplate
  91:       ? { default: resolvedTitle, template: TITLE_TEMPLATE }
  92:       : resolvedTitle,
  93:     description: resolvedDescription,
  94:     alternates: {
  95:       canonical: url,
  96:       languages: languageAlternates(path),
  97:     },
  98:     openGraph: {
  99:       type: "website",
 100:       siteName,
 101:       title: resolvedTitle,
 102:       description: resolvedDescription,
 103:       url,
 104:       locale: locale === "th" ? "th_TH" : "en_US",
 105:       ...imageFields,
 106:     },
 107:     twitter: {
 108:       card: "summary_large_image",
 109:       title: resolvedTitle,
 110:       description: resolvedDescription,
 111:       ...imageFields,
 112:     },
 113:   };
 114: }

===== src/app/layout.tsx =====
   1: import type { Metadata } from 'next';
   2: import type { ReactNode } from 'react';
   3: 
   4: import { SITE_URL } from '@/lib/seo';
   5: 
   6: import './globals.css';
   7: 
   8: // Only metadataBase is set here so file-based metadata routes (icon,
   9: // opengraph-image, twitter-image, manifest) and /_not-found — which render
  10: // under this root layout, outside the `[locale]` segment — can resolve
  11: // relative/social image URLs without falling back to localhost. Per-locale
  12: // pages still get their full metadata from `[locale]/layout.tsx`.
  13: export const metadata: Metadata = {
  14:   metadataBase: new URL(SITE_URL),
  15: };
  16: 
  17: // The `[locale]` layout renders <html>/<body>; this root layout only passes
  18: // children through, as required by next-intl's App Router setup.
  19: export default function RootLayout({ children }: { children: ReactNode }) {
  20:   return children;
  21: }

===== src/app/[locale]/layout.tsx =====
   1: import { hasLocale, NextIntlClientProvider } from 'next-intl';
   2: import { getTranslations, setRequestLocale } from 'next-intl/server';
   3: import { Outfit, Prompt } from 'next/font/google';
   4: import { notFound } from 'next/navigation';
   5: import type { Metadata } from 'next';
   6: import type { ReactNode } from 'react';
   7: 
   8: import { ThemeProviders } from '@/app/providers';
   9: import { routing } from '@/i18n/routing';
  10: import { buildMetadata } from '@/lib/seo';
  11: 
  12: const outfit = Outfit({
  13:   subsets: ['latin'],
  14:   weight: ['400', '500', '600', '700'],
  15:   variable: '--font-outfit',
  16:   display: 'swap',
  17: });
  18: 
  19: const prompt = Prompt({
  20:   subsets: ['thai', 'latin'],
  21:   weight: ['400', '500', '600', '700'],
  22:   variable: '--font-prompt',
  23:   display: 'swap',
  24: });
  25: 
  26: export async function generateMetadata({
  27:   params,
  28: }: {
  29:   params: Promise<{ locale: string }>;
  30: }): Promise<Metadata> {
  31:   const { locale } = await params;
  32:   if (!hasLocale(routing.locales, locale)) return {};
  33: 
  34:   const t = await getTranslations({ locale, namespace: 'meta' });
  35: 
  36:   // buildMetadata supplies metadataBase, canonical and the en/th hreflang
  37:   // alternates; the layout only overrides the copy. `useTemplate: false` keeps
  38:   // the "%s — Haroon Kasor" template from doubling up on the layout's own title.
  39:   return buildMetadata(locale, {
  40:     title: t('title'),
  41:     description: t('description'),
  42:     useTemplate: false,
  43:   });
  44: }
  45: 
  46: export function generateStaticParams() {
  47:   return routing.locales.map((locale) => ({ locale }));
  48: }
  49: 
  50: export default async function LocaleLayout({
  51:   children,
  52:   params,
  53: }: {
  54:   children: ReactNode;
  55:   params: Promise<{ locale: string }>;
  56: }) {
  57:   const { locale } = await params;
  58: 
  59:   if (!hasLocale(routing.locales, locale)) {
  60:     notFound();
  61:   }
  62: 
  63:   setRequestLocale(locale);
  64: 
  65:   const t = await getTranslations({ locale, namespace: 'common' });
  66: 
  67:   return (
  68:     <html
  69:       lang={locale}
  70:       suppressHydrationWarning
  71:       className={`${outfit.variable} ${prompt.variable} h-full`}
  72:     >
  73:       <body className="bg-bg text-text flex min-h-full flex-col font-sans">
  74:         <ThemeProviders>
  75:           <NextIntlClientProvider>
  76:             <a
  77:               href="#content"
  78:               className="bg-accent text-on-accent sr-only rounded-full px-4 py-2 text-sm font-medium focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[70]"
  79:             >
  80:               {t('skipToContent')}
  81:             </a>
  82:             {children}
  83:           </NextIntlClientProvider>
  84:         </ThemeProviders>
  85:       </body>
  86:     </html>
  87:   );
  88: }

===== src/app/[locale]/page.tsx =====
   1: import type { Metadata } from "next";
   2: import { hasLocale } from "next-intl";
   3: import { getTranslations, setRequestLocale } from "next-intl/server";
   4: import { routing } from "@/i18n/routing";
   5: import { buildMetadata } from "@/lib/seo";
   6: import { Navbar } from "@/components/sections/Navbar";
   7: import { Hero } from "@/components/sections/Hero";
   8: import { Stats } from "@/components/sections/Stats";
   9: import { About } from "@/components/sections/About";
  10: import { Experience } from "@/components/sections/Experience";
  11: import { Projects } from "@/components/sections/Projects";
  12: import { GitHub } from "@/components/sections/GitHub";
  13: import { Testimonial } from "@/components/sections/Testimonial";
  14: import { Contact } from "@/components/sections/Contact";
  15: import { Footer } from "@/components/sections/Footer";
  16: import { BackToTop } from "@/components/ui/BackToTop";
  17: 
  18: type PageProps = { params: Promise<{ locale: string }> };
  19: 
  20: export async function generateMetadata({
  21:   params,
  22: }: PageProps): Promise<Metadata> {
  23:   const { locale } = await params;
  24:   if (!hasLocale(routing.locales, locale)) return {};
  25: 
  26:   const t = await getTranslations({ locale, namespace: "meta" });
  27: 
  28:   // Canonical, hreflang alternates and metadataBase all come from buildMetadata;
  29:   // the OG image itself is picked up from the file-based opengraph-image route.
  30:   return buildMetadata(locale, {
  31:     title: t("title"),
  32:     description: t("description"),
  33:     useTemplate: false,
  34:   });
  35: }
  36: 
  37: export default async function HomePage({ params }: PageProps) {
  38:   const { locale } = await params;
  39:   setRequestLocale(locale);
  40: 
  41:   return (
  42:     <>
  43:       <Navbar />
  44: 
  45:       <main id="content">
  46:         <Hero />
  47:         <Stats />
  48:         <About />
  49:         <Experience />
  50:         <Projects />
  51:         <GitHub />
  52:         <Testimonial />
  53:         <Contact />
  54:       </main>
  55: 
  56:       <Footer />
  57:       <BackToTop />
  58:     </>
  59:   );
  60: }

===== src/app/[locale]/projects/[slug]/page.tsx =====
   1: import type { Metadata } from "next";
   2: import { notFound } from "next/navigation";
   3: import { hasLocale } from "next-intl";
   4: import { setRequestLocale } from "next-intl/server";
   5: import { routing, type Locale } from "@/i18n/routing";
   6: import { projects, getProject } from "@/content/projects";
   7: import { buildMetadata, SITE_URL } from "@/lib/seo";
   8: import { Navbar } from "@/components/sections/Navbar";
   9: import { Footer } from "@/components/sections/Footer";
  10: import { ProjectHeader } from "@/components/detail/ProjectHeader";
  11: import { FactsStrip } from "@/components/detail/FactsStrip";
  12: import { ProjectCover } from "@/components/detail/ProjectCover";
  13: import { OverviewCards } from "@/components/detail/OverviewCards";
  14: import { FeatureRows } from "@/components/detail/FeatureRows";
  15: import { TechStackGrid } from "@/components/detail/TechStackGrid";
  16: import { NextProject } from "@/components/detail/NextProject";
  17: 
  18: type PageParams = { locale: string; slug: string };
  19: 
  20: export function generateStaticParams() {
  21:   return routing.locales.flatMap((locale) =>
  22:     projects.map((project) => ({ locale, slug: project.slug })),
  23:   );
  24: }
  25: 
  26: export async function generateMetadata({
  27:   params,
  28: }: {
  29:   params: Promise<PageParams>;
  30: }): Promise<Metadata> {
  31:   const { locale, slug } = await params;
  32:   if (!hasLocale(routing.locales, locale)) return {};
  33: 
  34:   const project = getProject(slug);
  35:   if (!project) return {};
  36: 
  37:   const typedLocale = locale as Locale;
  38:   return buildMetadata(typedLocale, {
  39:     path: `/projects/${project.slug}`,
  40:     title: project.title[typedLocale],
  41:     description: project.summary[typedLocale],
  42:     // This route has its own opengraph-image.tsx; let that one win.
  43:     siteImage: false,
  44:   });
  45: }
  46: 
  47: export default async function ProjectDetailPage({
  48:   params,
  49: }: {
  50:   params: Promise<PageParams>;
  51: }) {
  52:   const { locale, slug } = await params;
  53:   if (!hasLocale(routing.locales, locale)) notFound();
  54:   setRequestLocale(locale);
  55: 
  56:   const project = getProject(slug);
  57:   if (!project) notFound();
  58: 
  59:   const typedLocale = locale as Locale;
  60:   const next = project.next ? getProject(project.next) : undefined;
  61:   const coverUrl = `${SITE_URL.replace(/^https?:\/\//, "")}/projects/${project.slug}`;
  62: 
  63:   return (
  64:     <>
  65:       <Navbar />
  66:       <main id="content" className="flex-1 pb-8">
  67:         <ProjectHeader project={project} locale={typedLocale} />
  68:         <FactsStrip project={project} locale={typedLocale} />
  69:         <ProjectCover
  70:           from={project.cover.from}
  71:           to={project.cover.to}
  72:           url={coverUrl}
  73:           alt={project.title[typedLocale]}
  74:         />
  75:         <OverviewCards project={project} locale={typedLocale} />
  76:         <FeatureRows project={project} locale={typedLocale} />
  77:         <TechStackGrid project={project} locale={typedLocale} />
  78:         {next ? <NextProject project={next} locale={typedLocale} /> : null}
  79:       </main>
  80:       <Footer />
  81:     </>
  82:   );
  83: }

===== src/app/opengraph-image.tsx =====
   1: import { ImageResponse } from "next/og";
   2: import { OG_COLORS, OG_SIZE, OG_CONTENT_TYPE, ogFonts } from "@/lib/og";
   3: 
   4: export const alt = "Haroon Kasor — Full-stack Developer";
   5: export const size = OG_SIZE;
   6: export const contentType = OG_CONTENT_TYPE;
   7: 
   8: export default async function OpengraphImage() {
   9:   return new ImageResponse(
  10:     (
  11:       <div
  12:         style={{
  13:           width: "100%",
  14:           height: "100%",
  15:           display: "flex",
  16:           flexDirection: "column",
  17:           justifyContent: "space-between",
  18:           padding: "72px 80px",
  19:           background: OG_COLORS.gradient,
  20:           fontFamily: "Outfit",
  21:         }}
  22:       >
  23:         <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
  24:           <div
  25:             style={{
  26:               display: "flex",
  27:               alignItems: "center",
  28:               justifyContent: "center",
  29:               width: 56,
  30:               height: 56,
  31:               borderRadius: 16,
  32:               background: OG_COLORS.text,
  33:               color: OG_COLORS.surface,
  34:               fontSize: 24,
  35:               fontWeight: 700,
  36:             }}
  37:           >
  38:             HK
  39:           </div>
  40:           <div style={{ display: "flex", fontSize: 26, color: OG_COLORS.muted }}>
  41:             haroonkasor.dev
  42:           </div>
  43:         </div>
  44: 
  45:         <div style={{ display: "flex", flexDirection: "column" }}>
  46:           <div
  47:             style={{
  48:               display: "flex",
  49:               fontFamily: "Prompt",
  50:               fontSize: 88,
  51:               fontWeight: 700,
  52:               color: OG_COLORS.text,
  53:               lineHeight: 1.1,
  54:             }}
  55:           >
  56:             ฮารูน กาซอร์
  57:           </div>
  58:           <div
  59:             style={{
  60:               display: "flex",
  61:               fontSize: 88,
  62:               fontWeight: 700,
  63:               color: OG_COLORS.text,
  64:               lineHeight: 1.1,
  65:             }}
  66:           >
  67:             Full-stack Developer
  68:           </div>
  69:         </div>
  70: 
  71:         <div
  72:           style={{
  73:             display: "flex",
  74:             fontSize: 30,
  75:             fontWeight: 400,
  76:             color: OG_COLORS.muted,
  77:           }}
  78:         >
  79:           Junior Developer @ Learn Tech · Next.js, React, Spring Boot · Bangkok
  80:         </div>
  81:       </div>
  82:     ),
  83:     { ...size, fonts: await ogFonts() },
  84:   );
  85: }

===== src/app/icon.tsx =====
   1: import { ImageResponse } from "next/og";
   2: 
   3: export const size = { width: 32, height: 32 };
   4: export const contentType = "image/png";
   5: 
   6: /** HK favicon mark. */
   7: export default function Icon() {
   8:   return new ImageResponse(
   9:     (
  10:       <div
  11:         style={{
  12:           width: "100%",
  13:           height: "100%",
  14:           display: "flex",
  15:           alignItems: "center",
  16:           justifyContent: "center",
  17:           background: "#0F2A4A",
  18:           color: "#FFFFFF",
  19:           fontSize: 15,
  20:           fontWeight: 700,
  21:           letterSpacing: -0.5,
  22:           borderRadius: 7,
  23:         }}
  24:       >
  25:         HK
  26:       </div>
  27:     ),
  28:     size,
  29:   );
  30: }

2026-08-28T06:19:43.482321Z ERROR codex_models_manager::manager: failed to renew cache TTL: missing field `supports_parallel_tool_calls` at line 97 column 5
2026-08-28T06:20:10.616743Z ERROR codex_core::tools::router: error=`"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command "Get-Content package.json; Get-ChildItem -Force -File -Filter '.env*' | ForEach-Object { \"===== "'$($_.Name) ====="; Get-Content -LiteralPath $_.FullName }; $logDir = Join-Path $env:TEMP '"'haroon-portfolio-verifier'; New-Item -ItemType Directory -Force -Path "'$logDir | Out-Null; $outFile = Join-Path $logDir '"'next-start.out.log'; "'$errFile = Join-Path $logDir '"'next-start.err.log'; "'$server = Start-Process -FilePath '"'npm.cmd' -ArgumentList @('run','start','--','-p','3301') -WorkingDirectory 'D:\\haroon-portfolio' -RedirectStandardOutput "'$outFile -RedirectStandardError $errFile -PassThru -WindowStyle Hidden; try { $ready = $false; for ($i = 0; $i -lt 20; $i++) { Start-Sleep -Milliseconds 500; try { $null = Invoke-WebRequest -UseBasicParsing -Uri '"'http://127.0.0.1:3301/' -TimeoutSec 2; "'$ready = $true; break } catch {} }; if (-not $ready) { throw "Production server did not become ready. Output: $(Get-Content $outFile -Raw) $(Get-Content $errFile -Raw)" }; foreach ($path in @('"'/','/th','/icon','/opengraph-image')) { "'$response = Invoke-WebRequest -UseBasicParsing -Uri "http://127.0.0.1:3301$path" -TimeoutSec 15; "===== $path ====="; "Status: $($response.StatusCode)"; "Content-Type: $($response.Headers['"'Content-Type'])\"; if ("'$path -in @('"'/','/th')) { "'$content = $response.Content; foreach ($label in @('"'canonical','alternate-en','alternate-th','og-image')) { "'$pattern = switch ($label) { '"'canonical' { '<link["'^>]+rel="canonical"[''^>]+href="([''^"]+)"'"' } 'alternate-en' { '<link["'^>]+rel="alternate"[''^>]+hreflang="en"[''^>]+href="([''^"]+)"'"' } 'alternate-th' { '<link["'^>]+rel="alternate"[''^>]+hreflang="th"[''^>]+href="([''^"]+)"'"' } 'og-image' { '<meta["'^>]+property="og:image"[''^>]+content="([''^"]+)"'"' } }; "'$match = [regex]::Match($content, $pattern); "$label`: $(if ($match.Success) { $match.Groups[1].Value } else { '"'MISSING' })\" } } } } finally { if (-not "'$server.HasExited) { Stop-Process -Id $server.Id -Force }; Start-Sleep -Milliseconds 300; "===== next start stderr ====="; if (Test-Path $errFile) { Get-Content $errFile }; "===== next start stdout ====="; if (Test-Path $outFile) { Get-Content $outFile } }'` rejected: blocked by policy
exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command "Get-Content package.json; Get-ChildItem -Force -File -Filter '.env*' | ForEach-Object { \"===== "'$($_.Name) ====="; Get-Content -LiteralPath $_.FullName }; $logDir = Join-Path $env:TEMP '"'haroon-portfolio-verifier'; New-Item -ItemType Directory -Force -Path "'$logDir | Out-Null; $outFile = Join-Path $logDir '"'next-start.out.log'; "'$errFile = Join-Path $logDir '"'next-start.err.log'; "'$server = Start-Process -FilePath '"'npm.cmd' -ArgumentList @('run','start','--','-p','3301') -WorkingDirectory 'D:\\haroon-portfolio' -RedirectStandardOutput "'$outFile -RedirectStandardError $errFile -PassThru -WindowStyle Hidden; try { $ready = $false; for ($i = 0; $i -lt 20; $i++) { Start-Sleep -Milliseconds 500; try { $null = Invoke-WebRequest -UseBasicParsing -Uri '"'http://127.0.0.1:3301/' -TimeoutSec 2; "'$ready = $true; break } catch {} }; if (-not $ready) { throw "Production server did not become ready. Output: $(Get-Content $outFile -Raw) $(Get-Content $errFile -Raw)" }; foreach ($path in @('"'/','/th','/icon','/opengraph-image')) { "'$response = Invoke-WebRequest -UseBasicParsing -Uri "http://127.0.0.1:3301$path" -TimeoutSec 15; "===== $path ====="; "Status: $($response.StatusCode)"; "Content-Type: $($response.Headers['"'Content-Type'])\"; if ("'$path -in @('"'/','/th')) { "'$content = $response.Content; foreach ($label in @('"'canonical','alternate-en','alternate-th','og-image')) { "'$pattern = switch ($label) { '"'canonical' { '<link["'^>]+rel="canonical"[''^>]+href="([''^"]+)"'"' } 'alternate-en' { '<link["'^>]+rel="alternate"[''^>]+hreflang="en"[''^>]+href="([''^"]+)"'"' } 'alternate-th' { '<link["'^>]+rel="alternate"[''^>]+hreflang="th"[''^>]+href="([''^"]+)"'"' } 'og-image' { '<meta["'^>]+property="og:image"[''^>]+content="([''^"]+)"'"' } }; "'$match = [regex]::Match($content, $pattern); "$label`: $(if ($match.Success) { $match.Groups[1].Value } else { '"'MISSING' })\" } } } } finally { if (-not "'$server.HasExited) { Stop-Process -Id $server.Id -Force }; Start-Sleep -Milliseconds 300; "===== next start stderr ====="; if (Test-Path $errFile) { Get-Content $errFile }; "===== next start stdout ====="; if (Test-Path $outFile) { Get-Content $outFile } }' in D:\haroon-portfolio
 declined in 0ms:
`"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command "Get-Content package.json; Get-ChildItem -Force -File -Filter '.env*' | ForEach-Object { \"===== "'$($_.Name) ====="; Get-Content -LiteralPath $_.FullName }; $logDir = Join-Path $env:TEMP '"'haroon-portfolio-verifier'; New-Item -ItemType Directory -Force -Path "'$logDir | Out-Null; $outFile = Join-Path $logDir '"'next-start.out.log'; "'$errFile = Join-Path $logDir '"'next-start.err.log'; "'$server = Start-Process -FilePath '"'npm.cmd' -ArgumentList @('run','start','--','-p','3301') -WorkingDirectory 'D:\\haroon-portfolio' -RedirectStandardOutput "'$outFile -RedirectStandardError $errFile -PassThru -WindowStyle Hidden; try { $ready = $false; for ($i = 0; $i -lt 20; $i++) { Start-Sleep -Milliseconds 500; try { $null = Invoke-WebRequest -UseBasicParsing -Uri '"'http://127.0.0.1:3301/' -TimeoutSec 2; "'$ready = $true; break } catch {} }; if (-not $ready) { throw "Production server did not become ready. Output: $(Get-Content $outFile -Raw) $(Get-Content $errFile -Raw)" }; foreach ($path in @('"'/','/th','/icon','/opengraph-image')) { "'$response = Invoke-WebRequest -UseBasicParsing -Uri "http://127.0.0.1:3301$path" -TimeoutSec 15; "===== $path ====="; "Status: $($response.StatusCode)"; "Content-Type: $($response.Headers['"'Content-Type'])\"; if ("'$path -in @('"'/','/th')) { "'$content = $response.Content; foreach ($label in @('"'canonical','alternate-en','alternate-th','og-image')) { "'$pattern = switch ($label) { '"'canonical' { '<link["'^>]+rel="canonical"[''^>]+href="([''^"]+)"'"' } 'alternate-en' { '<link["'^>]+rel="alternate"[''^>]+hreflang="en"[''^>]+href="([''^"]+)"'"' } 'alternate-th' { '<link["'^>]+rel="alternate"[''^>]+hreflang="th"[''^>]+href="([''^"]+)"'"' } 'og-image' { '<meta["'^>]+property="og:image"[''^>]+content="([''^"]+)"'"' } }; "'$match = [regex]::Match($content, $pattern); "$label`: $(if ($match.Success) { $match.Groups[1].Value } else { '"'MISSING' })\" } } } } finally { if (-not "'$server.HasExited) { Stop-Process -Id $server.Id -Force }; Start-Sleep -Milliseconds 300; "===== next start stderr ====="; if (Test-Path $errFile) { Get-Content $errFile }; "===== next start stdout ====="; if (Test-Path $outFile) { Get-Content $outFile } }'` rejected: blocked by policy
2026-08-28T06:20:10.692882Z ERROR codex_models_manager::manager: failed to renew cache TTL: missing field `supports_parallel_tool_calls` at line 97 column 5
exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command "Get-Content package.json; Get-ChildItem -Force -File -Filter '.env*' | Select-Object -ExpandProperty Name" in D:\haroon-portfolio
 succeeded in 389ms:
{
  "name": "haroon-portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "vitest run",
    "test:watch": "vitest",
    "e2e": "playwright test",
    "format": "prettier --write .",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "framer-motion": "^13.1.1",
    "lucide-react": "^1.34.0",
    "next": "16.3.3",
    "next-intl": "^4.14.0",
    "next-themes": "^0.4.6",
    "react": "19.2.8",
    "react-dom": "19.2.8",
    "simple-icons": "^16.28.0"
  },
  "devDependencies": {
    "@axe-core/playwright": "^4.13.0",
    "@playwright/test": "^1.62.1",
    "@tailwindcss/postcss": "^4",
    "@testing-library/jest-dom": "^7.0.1",
    "@testing-library/react": "^16.3.3",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitejs/plugin-react": "^6.1.1",
    "babel-plugin-react-compiler": "1.0.0",
    "eslint": "^9",
    "eslint-config-next": "16.3.3",
    "jsdom": "^29.1.1",
    "prettier": "^3.9.6",
    "prettier-plugin-tailwindcss": "^0.8.1",
    "tailwindcss": "^4",
    "typescript": "^5",
    "vitest": "^4.1.11"
  }
}
.env.example

2026-08-28T06:20:13.916701Z ERROR codex_models_manager::manager: failed to renew cache TTL: missing field `supports_parallel_tool_calls` at line 97 column 5
exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command '$process = Start-Process -FilePath '"'npm.cmd' -ArgumentList @('run','start','--','-p','3301') -WorkingDirectory 'D:\\haroon-portfolio' -PassThru -WindowStyle Hidden; "'$process.Id' in D:\haroon-portfolio
 succeeded in 818ms:
56824

2026-08-28T06:20:19.480376Z ERROR codex_models_manager::manager: failed to renew cache TTL: missing field `supports_parallel_tool_calls` at line 97 column 5
exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command 'Start-Sleep -Seconds 2; foreach ($path in @('"'/','/th','/icon','/opengraph-image')) { "'$response = Invoke-WebRequest -UseBasicParsing -Uri "http://127.0.0.1:3301$path" -TimeoutSec 15; "===== $path ====="; "Status: $($response.StatusCode)"; "Content-Type: $($response.Headers['"'Content-Type'])\"; if ("'$path -in @('"'/','/th')) { "'$content = $response.Content; foreach ($needle in @('"'rel=\"canonical\"','hreflang=\"en\"','hreflang=\"th\"','property=\"og:image\"')) { "'$match = [regex]::Match($content, "<[''^>]*$needle[''^>]*>"); if (-not $match.Success) { $match = [regex]::Match($content, "<[''^>]*$needle[''^>]*>") }; $match.Value } } }' in D:\haroon-portfolio
 succeeded in 3073ms:
===== / =====
Status: 200
Content-Type: text/html; charset=utf-8
<link rel="canonical" href="https://haroonkasor.dev"/>


<meta property="og:image" content="https://haroonkasor.dev/opengraph-image"/>
===== /th =====
Status: 200
Content-Type: text/html; charset=utf-8
<link rel="canonical" href="https://haroonkasor.dev/th"/>


<meta property="og:image" content="https://haroonkasor.dev/opengraph-image"/>
===== /icon =====
Status: 200
Content-Type: image/png
===== /opengraph-image =====
Status: 200
Content-Type: image/png

2026-08-28T06:20:27.043123Z ERROR codex_models_manager::manager: failed to renew cache TTL: missing field `supports_parallel_tool_calls` at line 97 column 5
exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command '$response = Invoke-WebRequest -UseBasicParsing -Uri '"'http://127.0.0.1:3301/' -TimeoutSec 15; [regex]::Matches("'$response.Content, '"'<link["'^>]+rel="alternate"[''^>]*>'"') | ForEach-Object Value; Stop-Process -Id 56824" in D:\haroon-portfolio
 succeeded in 513ms:
<link rel="alternate" hrefLang="en" href="https://haroonkasor.dev"/>
<link rel="alternate" hrefLang="th" href="https://haroonkasor.dev/th"/>

2026-08-28T06:20:30.681097Z ERROR codex_models_manager::manager: failed to renew cache TTL: missing field `supports_parallel_tool_calls` at line 97 column 5
exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command 'Get-NetTCPConnection -LocalPort 3301 -State Listen -ErrorAction SilentlyContinue | Select-Object LocalAddress,LocalPort,OwningProcess' in D:\haroon-portfolio
 succeeded in 2563ms:

[32;1mLocalAddress[0m[32;1m LocalPort[0m[32;1m OwningProcess[0m
[32;1m------------[0m [32;1m---------[0m [32;1m-------------[0m
::                3301         51196


2026-08-28T06:20:35.595037Z ERROR codex_models_manager::manager: failed to renew cache TTL: missing field `supports_parallel_tool_calls` at line 97 column 5
exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command 'Stop-Process -Id 51196; Start-Sleep -Milliseconds 300; Get-NetTCPConnection -LocalPort 3301 -State Listen -ErrorAction SilentlyContinue | Select-Object LocalAddress,LocalPort,OwningProcess' in D:\haroon-portfolio
2026-08-28T06:20:40.068636Z ERROR codex_core::tools::router: error=Exit code: 1
Wall time: 2 seconds
Output:

 exited 1 in 2016ms:
exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command '$listener = Get-NetTCPConnection -LocalPort 3301 -State Listen -ErrorAction SilentlyContinue; if ($null -eq $listener) { '"'Port 3301 is clear.' } else { "'$listener | Select-Object LocalAddress,LocalPort,OwningProcess }' in D:\haroon-portfolio
 succeeded in 1539ms:
Port 3301 is clear.

exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command "git show --check d05d133 26e1dd9 b842156 60b7bf4 7b7d5f2 8816ac9 68889f0; rg -n '#[0-9A-Fa-f]{3,8}\\b' src --glob '"'!src/styles/**'"'; rg -n 'test\\.skip|\\.skip\\(' tests; git status --short" in D:\haroon-portfolio
 succeeded in 416ms:
commit d05d1339e5ff4ebd6fd3172c7ca3e9c8c7a9c26c
Author: Haroon Kasor <haroonkasor.dev@gmail.com>
Date:   Fri Aug 28 13:13:37 2026 +0700

    fix(a11y): raise accent contrast above 4.5:1 in both themes
    
    Light --color-accent #1C70E6 gave 4.42:1 on the page background. Move it
    to #1565D8 (5.13:1 on #FAF9F6, 5.41:1 on white).
    
    An axe pass in dark mode also flagged two contrast failures the default
    scan misses: white on the lighter dark-mode accent is only 2.96:1, and
    the chip lettermark (accent on accent-soft) 4.21:1. Add --token-on-accent
    (white in light, near-black in dark: 6.52:1) for text sitting on the
    accent fill, and --token-accent-strong for small text on accent-soft
    (5.82:1 light, 6.92:1 dark). The lettermark also goes from 8px bold to
    10px semibold.
    
    axe now reports 0 serious/critical on /, /th, a project page and the 404
    in BOTH colour schemes. The Button unit test asserted the literal
    text-white, which the brief's "tokens, never raw hex" rule disallows;
    it now asserts the token class.
    
    Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>


commit 26e1dd9f4a48c8542e9b654f95c585283f552089
Author: Haroon Kasor <haroonkasor.dev@gmail.com>
Date:   Fri Aug 28 13:07:02 2026 +0700

    fix(a11y): close the CV dialog focus trap and label its close button
    
    The trap collected nodes that are hidden at the current breakpoint (the
    header actions are hidden sm:inline-flex, their footer twins sm:hidden),
    so it wrapped to elements that cannot take focus. Filter to visible nodes
    and drive the wrap from the active node's index.
    
    The real leak was the PDF iframe: it is a separate browsing context, so
    once Tab moved into it the keydown listener stopped firing and the next
    Tab left the dialog. Take the iframe out of the tab order; the document
    is still reachable via Open in new tab / Download.
    
    Also give the icon-only close button an aria-label naming its action
    (cv.close) instead of reusing the dialog title, and pass the page
    indicator its interpolation values. One e2e selector asserted the old
    title-as-label and is updated to match the brief's icon-button rule.
    
    Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>


commit b84215609efce516648149e8f366313a6c058aba
Author: Haroon Kasor <haroonkasor.dev@gmail.com>
Date:   Fri Aug 28 13:00:57 2026 +0700

    fix(ui): section head geometry, CSS-only hero fade, merge debris cleanup
    
    SectionHead stacked the big title inside the 300px label column; per the
    Figma "Section Head" frame the index+label own that column and the title
    runs to its right (max 932px), with a SectionBody spacer lining the
    content up at the same offset. Experience keeps its own white-on-gradient
    head with matching geometry.
    
    FadeIn rendered opacity:0 server-side, so the hero was invisible without
    JS and before hydration. Replace framer-motion with a keyframe whose
    resting state is visible, so no-JS renders read fine.
    
    Delete the flags.ts shim and the stale ui/index.ts barrel; About and
    Experience now read from src/content/{skills,experience}.ts instead of
    keeping inline duplicates.
    
    Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>


commit 60b7bf4b69ab643de12ff2d8f67e63beeb1ae573
Author: Haroon Kasor <haroonkasor.dev@gmail.com>
Date:   Fri Aug 28 12:57:19 2026 +0700

    fix(seo): stop the proxy rewriting /icon and /opengraph-image into 404s
    
    The proxy matcher did not exclude the extensionless file-based metadata
    routes at the app root, so /icon was rewritten to /en/icon (confirmed via
    x-middleware-rewrite) and both the favicon and the OG image 404'd at
    runtime despite being built.
    
    Declaring an explicit openGraph object also suppresses Next's
    file-convention image inference, so / and /th carried no og:image at all.
    buildMetadata now points at the site image by URL, and the project detail
    pages opt out via siteImage:false so their own sibling opengraph-image
    still wins.
    
    Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>


commit 7b7d5f24e2206dcb596b848e15c06b48715ef4fe
Author: Haroon Kasor <haroonkasor.dev@gmail.com>
Date:   Fri Aug 28 12:54:09 2026 +0700

    fix(seo): resolve metadata from buildMetadata and set a root metadataBase
    
    The home layout/page hand-rolled their metadata, so they carried no
    canonical, no en/th hreflang alternates and no metadataBase. Route them
    through buildMetadata instead.
    
    The build's metadataBase warning came from the root layout having no
    metadata export at all: /_not-found, /icon, /opengraph-image,
    /twitter-image and /manifest.webmanifest render outside `[locale]` and so
    never inherited one, falling back to localhost:3000. Set metadataBase
    once on the root layout from SITE_URL.
    
    Also hoist the skip link into the locale layout so the project detail and
    404 pages get it, and give all three pages <main id="content">.
    
    Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>


commit 8816ac9dd5e3843f40b5af0b334c9cf116ec5a4e
Author: Haroon Kasor <haroonkasor.dev@gmail.com>
Date:   Fri Aug 28 12:48:43 2026 +0700

    fix(routing): make the root 404 static so the locale tree prerenders
    
    The root not-found mounted NextIntlClientProvider (and imported the locale
    not-found) outside `[locale]`, which opted the entire `[locale]` tree into
    dynamic rendering and served /th/<bad> with lang="en". Make it fully
    self-contained with plain English literals, and add a `[locale]/[...rest]`
    catch-all that calls notFound() so unmatched paths under a valid locale
    still reach the localized 404 with the right lang.
    
    /en, /th and the 10 project pages are now prerendered (SSG).
    
    Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>


commit 68889f0df2b90b0acb8b1ffc9cb2668de3e95408
Author: Haroon Kasor <haroonkasor.dev@gmail.com>
Date:   Fri Aug 28 12:47:41 2026 +0700

    fix(i18n): resolve hero headline keys and add the real contact email
    
    Hero rendered raw `line1|2|3` keys because the messages nest them under
    `hero.headline`. `contact.email` is the "EMAIL" column label, so the
    mailto/displayed address/copy button were pointing at that literal; add
    `contact.emailValue` and use it in Contact and MobileMenu.
    
    Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

src\app\manifest.ts:11:    background_color: "#FAF9F6",
src\app\manifest.ts:12:    theme_color: "#1C70E6",
src\lib\og.ts:9:  text: "#0F2A4A",
src\lib\og.ts:10:  muted: "#6B6B73",
src\lib\og.ts:11:  accent: "#1C70E6",
src\lib\og.ts:12:  surface: "#FFFFFF",
src\lib\og.ts:13:  gradient: "linear-gradient(100deg, #FDE8F0 0%, #EBE8FF 50%, #E3F7F2 100%)",
src\content\projects.ts:9:    cover: { from: '#3B47FF', to: '#262EBF' },
src\content\projects.ts:130:    cover: { from: '#FF9E6B', to: '#E65233' },
src\content\projects.ts:240:    cover: { from: '#33BF99', to: '#0D7366' },
src\content\projects.ts:321:    cover: { from: '#8C73FF', to: '#4D33B3' },
src\content\projects.ts:402:    cover: { from: '#FF80A6', to: '#BF3373' },
src\app\icon.tsx:17:          background: "#0F2A4A",
src\app\icon.tsx:18:          color: "#FFFFFF",
src\components\ui\TechChip.tsx:22:  // Same problem as the three above: simple-icons gives openjdk #000000,
src\components\ui\RepoCard.tsx:7:  TypeScript: "#3178C6",
src\components\ui\RepoCard.tsx:8:  HTML: "#E34C26",
src\components\ui\RepoCard.tsx:9:  Python: "#3572A5",
src\components\ui\RepoCard.tsx:10:  YAML: "#CB171E",
src\components\ui\RepoCard.tsx:11:  JavaScript: "#F1E05A",
src\components\ui\RepoCard.tsx:12:  Java: "#B07219",
tests\e2e\home.spec.ts:87:    test.skip(!!isMobile, "the pill nav is desktop-only (lg:flex)");
tests\e2e\home.spec.ts:100:    test.skip(!isMobile, "the sheet only exists below lg");
tests\e2e\a11y.spec.ts:126:    test.skip(!!isMobile, "the desktop nav and CV button are lg-only");
tests\e2e\cv-modal.spec.ts:159:    test.skip(
tests\e2e\cv-modal.spec.ts:190:    test.skip(!!isMobile, "focus trapping is verified on desktop");
tests\e2e\cv-modal.spec.ts:216:    test.skip(!isMobile, "the hamburger only exists below lg");
tests\e2e\cv-modal.spec.ts:227:    test.skip(!isMobile, "the sheet only exists below lg");
tests\e2e\cv-modal.spec.ts:238:    test.skip(!isMobile, "the sheet only exists below lg");
tests\e2e\cv-modal.spec.ts:248:    test.skip(!isMobile, "the sheet only exists below lg");
tests\e2e\cv-modal.spec.ts:260:    test.skip(!isMobile, "the sheet only exists below lg");
tests\e2e\cv-modal.spec.ts:272:    test.skip(!isMobile, "the sheet variant is mobile-only");

exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command 'git diff b842156''^ b842156 -- src/components/sections/About.tsx src/components/sections/Experience.tsx src/components/sections/FadeIn.module.css src/components/sections/FadeIn.tsx src/components/sections/GitHub.tsx src/components/sections/Projects.tsx src/components/sections/Testimonial.tsx src/components/ui/SectionHead.tsx src/content/skills.ts src/content/types.ts; git diff 60b7bf4''^ 60b7bf4 -- src/proxy.ts src/lib/seo.ts src/app/[locale]/projects/[slug]/page.tsx; git diff 7b7d5f2''^ 7b7d5f2 -- src/app/layout.tsx src/app/[locale]/layout.tsx src/app/[locale]/page.tsx src/app/[locale]/projects/[slug]/page.tsx src/app/not-found.tsx' in D:\haroon-portfolio
 succeeded in 370ms:
diff --git a/src/components/sections/About.tsx b/src/components/sections/About.tsx
index 1164462..738f7fe 100644
--- a/src/components/sections/About.tsx
+++ b/src/components/sections/About.tsx
@@ -1,26 +1,8 @@
 import { getTranslations } from "next-intl/server";
 import { Container } from "@/components/ui/Container";
-import { SectionHead } from "@/components/ui/SectionHead";
+import { SectionHead, SectionBody } from "@/components/ui/SectionHead";
 import { TechChip } from "@/components/ui/TechChip";
-
-const CHIPS: { name: string; slug: string; mark?: string }[] = [
-  { name: "Next.js", slug: "nextdotjs" },
-  { name: "React", slug: "react" },
-  { name: "TypeScript", slug: "typescript" },
-  { name: "Tailwind", slug: "tailwindcss" },
-  { name: "Java", slug: "openjdk" },
-  { name: "Spring Boot", slug: "springboot" },
-  { name: "MySQL", slug: "mysql" },
-  // simple-icons has no SQL Server mark; "SS" reads wrong, so set it explicitly.
-  { name: "SQL Server", slug: "", mark: "SQL" },
-  { name: "Docker", slug: "docker" },
-  // No simple-icons entry either — "PW" is the deliberate lettermark.
-  { name: "Playwright", slug: "playwright", mark: "PW" },
-  { name: "Figma", slug: "figma" },
-  { name: "GitLab", slug: "gitlab" },
-];
-
-const GROUPS = ["frontend", "backend", "tools"] as const;
+import { techChips, skillGroups } from "@/content/skills";
 
 export async function About() {
   const t = await getTranslations("about");
@@ -28,9 +10,9 @@ export async function About() {
   return (
     <section id="about" className="scroll-mt-24 py-16 lg:py-24">
       <Container>
-        <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
-          <SectionHead index={t("index")} label={t("label")} title={t("title")} />
+        <SectionHead index={t("index")} label={t("label")} title={t("title")} />
 
+        <SectionBody className="mt-10">
           <div>
             <div className="text-muted flex flex-col gap-5 text-base lg:text-lg">
               <p>{t("p1")}</p>
@@ -38,7 +20,7 @@ export async function About() {
             </div>
 
             <div className="mt-10 flex flex-wrap gap-2">
-              {CHIPS.map((chip) => (
+              {techChips.map((chip) => (
                 <TechChip
                   key={chip.name}
                   name={chip.name}
@@ -49,7 +31,7 @@ export async function About() {
             </div>
 
             <div className="mt-12 grid gap-4 md:grid-cols-3">
-              {GROUPS.map((group) => (
+              {skillGroups.map((group) => (
                 <div
                   key={group}
                   className="border-line bg-surface rounded-[16px] border p-6 shadow-[var(--shadow-card)]"
@@ -64,7 +46,7 @@ export async function About() {
               ))}
             </div>
           </div>
-        </div>
+        </SectionBody>
       </Container>
     </section>
   );
diff --git a/src/components/sections/Experience.tsx b/src/components/sections/Experience.tsx
index c2dee76..fca2249 100644
--- a/src/components/sections/Experience.tsx
+++ b/src/components/sections/Experience.tsx
@@ -1,11 +1,6 @@
 import { getTranslations } from "next-intl/server";
 import { Container } from "@/components/ui/Container";
-
-const ITEMS = [
-  { key: "learntech", current: true },
-  { key: "goskillup", current: false },
-  { key: "degree", current: false },
-] as const;
+import { experience } from "@/content/experience";
 
 export async function Experience() {
   const t = await getTranslations("experience");
@@ -16,18 +11,20 @@ export async function Experience() {
       className="scroll-mt-24 bg-[image:var(--gradient-band)] py-16 lg:py-24"
     >
       <Container>
-        <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
-          <div className="flex flex-col gap-3">
-            <span className="text-xs font-semibold tracking-[0.18em] text-white/70">
-              {t("index")} — {t("label")}
-            </span>
-            <h2 className="text-[32px] leading-tight font-semibold text-white lg:text-[56px]">
-              {t("title")}
-            </h2>
-          </div>
+        {/* Same geometry as SectionHead, in the band's white-on-gradient palette. */}
+        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-[300px_1fr] lg:items-start lg:gap-16">
+          <span className="text-xs font-semibold tracking-[0.18em] text-white/70 lg:pt-4">
+            {t("index")} — {t("label")}
+          </span>
+          <h2 className="max-w-[932px] text-[32px] leading-tight font-semibold text-white lg:text-[56px]">
+            {t("title")}
+          </h2>
+        </div>
 
-          <ol className="flex flex-col">
-            {ITEMS.map((item, i) => (
+        <div className="mt-10 lg:grid lg:grid-cols-[300px_1fr] lg:gap-16">
+          <div aria-hidden="true" className="hidden lg:block" />
+          <ol className="flex min-w-0 flex-col">
+            {experience.map((item, i) => (
               <li
                 key={item.key}
                 className={[
@@ -40,13 +37,13 @@ export async function Experience() {
                     aria-hidden="true"
                     className={[
                       "inline-block h-2.5 w-2.5 shrink-0 rounded-full",
-                      item.current ? "bg-band-accent" : "bg-white/50",
+                      i === 0 ? "bg-band-accent" : "bg-white/50",
                     ].join(" ")}
                   />
                   <span
                     className={[
                       "text-sm font-semibold tracking-[0.12em]",
-                      item.current ? "text-band-accent" : "text-white/70",
+                      i === 0 ? "text-band-accent" : "text-white/70",
                     ].join(" ")}
                   >
                     {t(`items.${item.key}.date`)}
diff --git a/src/components/sections/FadeIn.module.css b/src/components/sections/FadeIn.module.css
new file mode 100644
index 0000000..61be3c5
--- /dev/null
+++ b/src/components/sections/FadeIn.module.css
@@ -0,0 +1,23 @@
+/* The resting state is fully visible; the keyframe only rewinds to hidden for
+ * the duration of the entrance. An element that never animates (no JS needed,
+ * reduced motion, older engines) therefore still renders opaque. */
+.fadeIn {
+  animation: fade-in 0.5s ease-out both;
+}
+
+@keyframes fade-in {
+  from {
+    opacity: 0;
+    transform: translateY(16px);
+  }
+  to {
+    opacity: 1;
+    transform: none;
+  }
+}
+
+@media (prefers-reduced-motion: reduce) {
+  .fadeIn {
+    animation: none;
+  }
+}
diff --git a/src/components/sections/FadeIn.tsx b/src/components/sections/FadeIn.tsx
index 4986af2..32b85bd 100644
--- a/src/components/sections/FadeIn.tsx
+++ b/src/components/sections/FadeIn.tsx
@@ -1,9 +1,18 @@
-"use client";
-
 import type { ReactNode } from "react";
-import { motion, useReducedMotion } from "framer-motion";
+import styles from "./FadeIn.module.css";
 
-/** Hero entrance animation; collapses to a plain render under reduced motion. */
+/**
+ * Hero entrance animation.
+ *
+ * Deliberately CSS-only and server-rendered. A framer-motion
+ * `initial={{ opacity: 0 }}` leaves the server HTML at `opacity: 0`, so with
+ * JS disabled — or in the window before hydration — the whole hero is
+ * invisible. A keyframe that *starts* hidden and finishes opaque animates the
+ * same way, but the element's resting style is fully visible, so the markup is
+ * readable without JS and the animation simply never plays.
+ *
+ * `prefers-reduced-motion` disables it in the stylesheet.
+ */
 export function FadeIn({
   children,
   delay = 0,
@@ -11,18 +20,13 @@ export function FadeIn({
   children: ReactNode;
   delay?: number;
 }) {
-  const reduce = useReducedMotion();
-
-  if (reduce) return <>{children}</>;
-
   return (
-    <motion.div
-      initial={{ opacity: 0, y: 16 }}
-      animate={{ opacity: 1, y: 0 }}
-      transition={{ duration: 0.5, delay, ease: "easeOut" }}
+    <div
+      className={styles.fadeIn}
+      style={delay ? { animationDelay: `${delay}s` } : undefined}
     >
       {children}
-    </motion.div>
+    </div>
   );
 }
 
diff --git a/src/components/sections/GitHub.tsx b/src/components/sections/GitHub.tsx
index ddc30ed..c59c1ec 100644
--- a/src/components/sections/GitHub.tsx
+++ b/src/components/sections/GitHub.tsx
@@ -1,6 +1,6 @@
 import { getTranslations } from "next-intl/server";
 import { Container } from "@/components/ui/Container";
-import { SectionHead } from "@/components/ui/SectionHead";
+import { SectionHead, SectionBody } from "@/components/ui/SectionHead";
 import { RepoCard } from "@/components/ui/RepoCard";
 import { getRepos, GITHUB_URL } from "@/lib/github";
 
@@ -11,9 +11,9 @@ export async function GitHub() {
   return (
     <section id="github" className="scroll-mt-24 py-16 lg:py-24">
       <Container>
-        <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
-          <SectionHead index={t("index")} label={t("label")} title={t("title")} />
+        <SectionHead index={t("index")} label={t("label")} title={t("title")} />
 
+        <SectionBody className="mt-10">
           <div>
             <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
               {repos.map((repo) => (
@@ -30,7 +30,7 @@ export async function GitHub() {
               {t("viewAll")}
             </a>
           </div>
-        </div>
+        </SectionBody>
       </Container>
     </section>
   );
diff --git a/src/components/sections/Projects.tsx b/src/components/sections/Projects.tsx
index 7dc7a6f..00cfe17 100644
--- a/src/components/sections/Projects.tsx
+++ b/src/components/sections/Projects.tsx
@@ -1,6 +1,6 @@
 import { getLocale, getTranslations } from "next-intl/server";
 import { Container } from "@/components/ui/Container";
-import { SectionHead } from "@/components/ui/SectionHead";
+import { SectionHead, SectionBody } from "@/components/ui/SectionHead";
 import { ProjectCard } from "@/components/ui/ProjectCard";
 import { projects } from "@/content/projects";
 import type { Locale } from "@/i18n/routing";
@@ -14,9 +14,9 @@ export async function Projects() {
   return (
     <section id="work" className="scroll-mt-24 py-16 lg:py-24">
       <Container>
-        <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
-          <SectionHead index={t("index")} label={t("label")} title={t("title")} />
+        <SectionHead index={t("index")} label={t("label")} title={t("title")} />
 
+        <SectionBody className="mt-10">
           <div className="flex flex-col gap-5">
             {/* Row 1: large card fills, second card is a fixed 420px column. */}
             <div className="grid gap-5 lg:grid-cols-[1fr_420px]">
@@ -35,7 +35,7 @@ export async function Projects() {
               ))}
             </div>
           </div>
-        </div>
+        </SectionBody>
       </Container>
     </section>
   );
diff --git a/src/components/sections/Testimonial.tsx b/src/components/sections/Testimonial.tsx
index b0ec9c8..7d958b6 100644
--- a/src/components/sections/Testimonial.tsx
+++ b/src/components/sections/Testimonial.tsx
@@ -1,7 +1,7 @@
 import { getTranslations } from "next-intl/server";
 import { Container } from "@/components/ui/Container";
-import { SectionHead } from "@/components/ui/SectionHead";
-import { SHOW_TESTIMONIAL } from "@/content/flags";
+import { SectionHead, SectionBody } from "@/components/ui/SectionHead";
+import { SHOW_TESTIMONIAL } from "@/content/profile";
 
 export async function Testimonial() {
   if (!SHOW_TESTIMONIAL) return null;
@@ -11,15 +11,15 @@ export async function Testimonial() {
   return (
     <section className="py-16 lg:py-24">
       <Container>
-        <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
-          <SectionHead index={t("index")} label={t("label")} title={t("title")} />
+        <SectionHead index={t("index")} label={t("label")} title={t("title")} />
 
+        <SectionBody className="mt-10">
           <blockquote className="border-line bg-surface rounded-[20px] border p-8 shadow-[var(--shadow-card)]">
             <p className="text-muted text-lg leading-relaxed">
               {t("placeholder")}
             </p>
           </blockquote>
-        </div>
+        </SectionBody>
       </Container>
     </section>
   );
diff --git a/src/components/ui/SectionHead.tsx b/src/components/ui/SectionHead.tsx
index 58fdc6a..0806e1f 100644
--- a/src/components/ui/SectionHead.tsx
+++ b/src/components/ui/SectionHead.tsx
@@ -7,6 +7,15 @@ export type SectionHeadProps = {
   className?: string;
 };
 
+/**
+ * Figma "Section Head": on desktop the small index + label sit in a fixed
+ * 300px left column and the BIG title runs to the right of it, spanning the
+ * remaining width so long titles wrap in two lines rather than stacking
+ * narrowly inside the 300px column. Below `lg` everything stacks.
+ *
+ * Sections pair this with `<SectionBody>` so their content lines up under the
+ * title at the same 300px offset.
+ */
 export function SectionHead({
   index,
   label,
@@ -14,14 +23,40 @@ export function SectionHead({
   className,
 }: SectionHeadProps) {
   return (
-    <div className={cn('flex flex-col gap-3', className)}>
-      <div className="text-muted flex items-center gap-3 text-xs font-medium tracking-[0.2em]">
+    <div
+      className={cn(
+        'flex flex-col gap-3 lg:grid lg:grid-cols-[300px_1fr] lg:items-start lg:gap-16',
+        className,
+      )}
+    >
+      <div className="text-muted flex items-center gap-3 text-xs font-medium tracking-[0.2em] lg:pt-4">
         <span className="text-accent">{index}</span>
         <span>{label}</span>
       </div>
-      <h2 className="text-text text-[32px] leading-tight font-semibold lg:text-[56px]">
+      <h2 className="text-text max-w-[932px] text-[32px] leading-tight font-semibold lg:text-[56px]">
         {title}
       </h2>
     </div>
   );
 }
+
+/**
+ * Content that follows a `SectionHead`, indented to the same 300px offset on
+ * desktop so it lines up under the title.
+ */
+export function SectionBody({
+  children,
+  className,
+}: {
+  children: React.ReactNode;
+  className?: string;
+}) {
+  return (
+    <div
+      className={cn('lg:grid lg:grid-cols-[300px_1fr] lg:gap-16', className)}
+    >
+      <div aria-hidden="true" className="hidden lg:block" />
+      <div className="min-w-0">{children}</div>
+    </div>
+  );
+}
diff --git a/src/content/skills.ts b/src/content/skills.ts
index f333a2b..89879ef 100644
--- a/src/content/skills.ts
+++ b/src/content/skills.ts
@@ -10,9 +10,11 @@ export const techChips: SkillChip[] = [
   { name: 'Java', slug: 'openjdk' },
   { name: 'Spring Boot', slug: 'springboot' },
   { name: 'MySQL', slug: 'mysql' },
-  { name: 'SQL Server', slug: 'sqlserver' },
+  // simple-icons ships no SQL Server or Playwright mark, so both carry an
+  // explicit lettermark rather than the derived initials ("SS" / "PL").
+  { name: 'SQL Server', slug: 'sqlserver', mark: 'SQL' },
   { name: 'Docker', slug: 'docker' },
-  { name: 'Playwright', slug: 'playwright' },
+  { name: 'Playwright', slug: 'playwright', mark: 'PW' },
   { name: 'Figma', slug: 'figma' },
   { name: 'GitLab', slug: 'gitlab' },
 ];
diff --git a/src/content/types.ts b/src/content/types.ts
index 5bd6f84..9371e2d 100644
--- a/src/content/types.ts
+++ b/src/content/types.ts
@@ -27,7 +27,12 @@ export type Repo = {
   url: string;
 };
 
-export type SkillChip = { name: string; slug: string };
+export type SkillChip = {
+  name: string;
+  slug: string;
+  /** Explicit lettermark for brands simple-icons has no entry for. */
+  mark?: string;
+};
 
 export type ExperienceItem = {
   /** message key under `experience.items` */
diff --git a/src/app/[locale]/projects/[slug]/page.tsx b/src/app/[locale]/projects/[slug]/page.tsx
index ec880ba..956b593 100644
--- a/src/app/[locale]/projects/[slug]/page.tsx
+++ b/src/app/[locale]/projects/[slug]/page.tsx
@@ -39,6 +39,8 @@ export async function generateMetadata({
     path: `/projects/${project.slug}`,
     title: project.title[typedLocale],
     description: project.summary[typedLocale],
+    // This route has its own opengraph-image.tsx; let that one win.
+    siteImage: false,
   });
 }
 
diff --git a/src/lib/seo.ts b/src/lib/seo.ts
index 890abff..cf7efe5 100644
--- a/src/lib/seo.ts
+++ b/src/lib/seo.ts
@@ -33,6 +33,12 @@ export type MetadataOverrides = {
   description?: string;
   /** Pass false on the root layout so the template applies to children only. */
   useTemplate?: boolean;
+  /**
+   * Pass false on routes that have their own sibling `opengraph-image.tsx`
+   * (project details) so Next's file-convention image wins instead of the
+   * site-wide one.
+   */
+  siteImage?: boolean;
 };
 
 /**
@@ -44,7 +50,13 @@ export async function buildMetadata(
   overrides: MetadataOverrides = {},
 ): Promise<Metadata> {
   const t = await getTranslations({ locale, namespace: "common" });
-  const { path = "/", title, description, useTemplate = true } = overrides;
+  const {
+    path = "/",
+    title,
+    description,
+    useTemplate = true,
+    siteImage = true,
+  } = overrides;
 
   const siteName = t("siteName");
   const defaultTitle = `${siteName} — ${t("role")}`;
@@ -52,6 +64,27 @@ export async function buildMetadata(
   const resolvedDescription = description ?? t("tagline");
   const url = absoluteUrl(locale, path);
 
+  // The root `opengraph-image.tsx` is only auto-attached to pages that are its
+  // route siblings, which `[locale]/page.tsx` is not — and declaring an
+  // explicit `openGraph` object suppresses that inference anyway. Point at it
+  // by URL so /, /th and any other locale page carry an og:image. Pages with
+  // their own sibling image (project details) override `images` themselves.
+  // Spread-in rather than set to undefined: an explicit `images: undefined`
+  // still counts as declared and suppresses the file-convention inference that
+  // the project pages rely on for their own sibling image.
+  const imageFields = siteImage
+    ? {
+        images: [
+          {
+            url: `${SITE_URL}/opengraph-image`,
+            width: 1200,
+            height: 630,
+            alt: defaultTitle,
+          },
+        ],
+      }
+    : {};
+
   return {
     metadataBase: new URL(SITE_URL),
     title: useTemplate
@@ -69,11 +102,13 @@ export async function buildMetadata(
       description: resolvedDescription,
       url,
       locale: locale === "th" ? "th_TH" : "en_US",
+      ...imageFields,
     },
     twitter: {
       card: "summary_large_image",
       title: resolvedTitle,
       description: resolvedDescription,
+      ...imageFields,
     },
   };
 }
diff --git a/src/proxy.ts b/src/proxy.ts
index 066a93b..7ec931d 100644
--- a/src/proxy.ts
+++ b/src/proxy.ts
@@ -10,5 +10,13 @@ export const config = {
   // single backslash before the dot is silently dropped and the lookahead
   // degrades into `.*..*` (any path of 2+ characters), which stops the proxy
   // matching almost every route. Next also rejects `String.raw` here.
-  matcher: ['/((?!api|_next|cv|.*\\..*).*)'],
+  //
+  // `icon`, `opengraph-image` and `twitter-image` are extensionless
+  // file-based metadata routes living at the app root, outside `[locale]`.
+  // Without excluding them the proxy rewrites /icon -> /en/icon, which does
+  // not exist, so the favicon and OG image 404 at runtime and no og:image
+  // meta tag is emitted.
+  matcher: [
+    '/((?!api|_next|cv|icon|opengraph-image|twitter-image|manifest\\.webmanifest|.*\\..*).*)',
+  ],
 };
diff --git a/src/app/[locale]/layout.tsx b/src/app/[locale]/layout.tsx
index e80a6ca..a9a33b7 100644
--- a/src/app/[locale]/layout.tsx
+++ b/src/app/[locale]/layout.tsx
@@ -7,6 +7,7 @@ import type { ReactNode } from 'react';
 
 import { ThemeProviders } from '@/app/providers';
 import { routing } from '@/i18n/routing';
+import { buildMetadata } from '@/lib/seo';
 
 const outfit = Outfit({
   subsets: ['latin'],
@@ -28,9 +29,18 @@ export async function generateMetadata({
   params: Promise<{ locale: string }>;
 }): Promise<Metadata> {
   const { locale } = await params;
+  if (!hasLocale(routing.locales, locale)) return {};
+
   const t = await getTranslations({ locale, namespace: 'meta' });
 
-  return { title: t('title'), description: t('description') };
+  // buildMetadata supplies metadataBase, canonical and the en/th hreflang
+  // alternates; the layout only overrides the copy. `useTemplate: false` keeps
+  // the "%s — Haroon Kasor" template from doubling up on the layout's own title.
+  return buildMetadata(locale, {
+    title: t('title'),
+    description: t('description'),
+    useTemplate: false,
+  });
 }
 
 export function generateStaticParams() {
@@ -52,6 +62,8 @@ export default async function LocaleLayout({
 
   setRequestLocale(locale);
 
+  const t = await getTranslations({ locale, namespace: 'common' });
+
   return (
     <html
       lang={locale}
@@ -60,7 +72,15 @@ export default async function LocaleLayout({
     >
       <body className="bg-bg text-text flex min-h-full flex-col font-sans">
         <ThemeProviders>
-          <NextIntlClientProvider>{children}</NextIntlClientProvider>
+          <NextIntlClientProvider>
+            <a
+              href="#content"
+              className="bg-accent sr-only rounded-full px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[70]"
+            >
+              {t('skipToContent')}
+            </a>
+            {children}
+          </NextIntlClientProvider>
         </ThemeProviders>
       </body>
     </html>
diff --git a/src/app/[locale]/page.tsx b/src/app/[locale]/page.tsx
index 4487597..238b1d9 100644
--- a/src/app/[locale]/page.tsx
+++ b/src/app/[locale]/page.tsx
@@ -1,5 +1,8 @@
 import type { Metadata } from "next";
+import { hasLocale } from "next-intl";
 import { getTranslations, setRequestLocale } from "next-intl/server";
+import { routing } from "@/i18n/routing";
+import { buildMetadata } from "@/lib/seo";
 import { Navbar } from "@/components/sections/Navbar";
 import { Hero } from "@/components/sections/Hero";
 import { Stats } from "@/components/sections/Stats";
@@ -18,35 +21,25 @@ export async function generateMetadata({
   params,
 }: PageProps): Promise<Metadata> {
   const { locale } = await params;
+  if (!hasLocale(routing.locales, locale)) return {};
+
   const t = await getTranslations({ locale, namespace: "meta" });
 
-  return {
+  // Canonical, hreflang alternates and metadataBase all come from buildMetadata;
+  // the OG image itself is picked up from the file-based opengraph-image route.
+  return buildMetadata(locale, {
     title: t("title"),
     description: t("description"),
-    openGraph: {
-      title: t("title"),
-      description: t("description"),
-      locale,
-      type: "website",
-    },
-  };
+    useTemplate: false,
+  });
 }
 
 export default async function HomePage({ params }: PageProps) {
   const { locale } = await params;
   setRequestLocale(locale);
 
-  const t = await getTranslations("common");
-
   return (
     <>
-      <a
-        href="#content"
-        className="bg-accent sr-only rounded-full px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[70]"
-      >
-        {t("skipToContent")}
-      </a>
-
       <Navbar />
 
       <main id="content">
diff --git a/src/app/[locale]/projects/[slug]/page.tsx b/src/app/[locale]/projects/[slug]/page.tsx
index d854c52..ec880ba 100644
--- a/src/app/[locale]/projects/[slug]/page.tsx
+++ b/src/app/[locale]/projects/[slug]/page.tsx
@@ -61,7 +61,7 @@ export default async function ProjectDetailPage({
   return (
     <>
       <Navbar />
-      <main className="flex-1 pb-8">
+      <main id="content" className="flex-1 pb-8">
         <ProjectHeader project={project} locale={typedLocale} />
         <FactsStrip project={project} locale={typedLocale} />
         <ProjectCover
diff --git a/src/app/layout.tsx b/src/app/layout.tsx
index d972d99..2a2b693 100644
--- a/src/app/layout.tsx
+++ b/src/app/layout.tsx
@@ -1,7 +1,19 @@
+import type { Metadata } from 'next';
 import type { ReactNode } from 'react';
 
+import { SITE_URL } from '@/lib/seo';
+
 import './globals.css';
 
+// Only metadataBase is set here so file-based metadata routes (icon,
+// opengraph-image, twitter-image, manifest) and /_not-found — which render
+// under this root layout, outside the `[locale]` segment — can resolve
+// relative/social image URLs without falling back to localhost. Per-locale
+// pages still get their full metadata from `[locale]/layout.tsx`.
+export const metadata: Metadata = {
+  metadataBase: new URL(SITE_URL),
+};
+
 // The `[locale]` layout renders <html>/<body>; this root layout only passes
 // children through, as required by next-intl's App Router setup.
 export default function RootLayout({ children }: { children: ReactNode }) {
diff --git a/src/app/not-found.tsx b/src/app/not-found.tsx
index c10df8a..881e33a 100644
--- a/src/app/not-found.tsx
+++ b/src/app/not-found.tsx
@@ -2,6 +2,7 @@ import type { Metadata } from "next";
 import Link from "next/link";
 import "./globals.css";
 
+// metadataBase is inherited from the root layout.
 export const metadata: Metadata = {
   title: "Page not found — Haroon Kasor",
   robots: { index: false, follow: true },

exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command '$targets = @('"'src/styles/tokens.css','src/app/globals.css','src/app/[locale]/not-found.tsx','src/app/[locale]/projects/[slug]/opengraph-image.tsx','tests/e2e/cv-modal.spec.ts','playwright.config.ts'); foreach ("'$target in $targets) { Write-Output "`n===== $target ====="; $line = 0; Get-Content -LiteralPath $target | ForEach-Object { $line++; '"'{0,4}: {1}' -f "'$line, $_ } }' in D:\haroon-portfolio
 succeeded in 493ms:

===== src/styles/tokens.css =====
   1: /* Design tokens — single source of truth. Never hardcode hex in components.
   2:  * Raw values live on --token-*; @theme inline maps them onto Tailwind's
   3:  * --color-* / --radius-* namespaces so utilities like `bg-bg`, `text-muted`,
   4:  * `border-line` and `rounded-2xl` exist. Keeping the raw names distinct from
   5:  * the theme names avoids a self-referential var() cycle. */
   6: 
   7: :root {
   8:   --token-bg: #faf9f6;
   9:   --token-surface: #ffffff;
  10:   --token-line: #e3e0db;
  11:   --token-text: #0f2a4a;
  12:   --token-muted: #6b6b73;
  13:   --token-accent: #1565d8;
  14:   --token-accent-soft: #e3f0ff;
  15:   --token-on-accent: #ffffff;
  16:   /* Small text on --accent-soft needs more punch than --accent alone. */
  17:   --token-accent-strong: #1257bd;
  18:   --token-inverse: #121214;
  19:   --token-on-inverse: #ffffff;
  20:   --token-footer: #121214;
  21: 
  22:   /* Accent used on top of the gradient experience band. */
  23:   --token-band-accent: #ffd966;
  24:   /* "Open to work" status dot. */
  25:   --token-status: #21b866;
  26:   /* String literals inside the terminal cards. */
  27:   --token-term-string: #1a7f4b;
  28: 
  29:   /* 404 error terminal. */
  30:   --token-terminal: #ffffff;
  31:   --token-terminal-line: #e3e0db;
  32:   --token-danger: #d93a46;
  33:   --token-term-path: #1a7f4b;
  34:   /* Glitch ghost copies are the same hues in both themes. */
  35:   --token-glitch-a: #5994ff;
  36:   --token-glitch-b: #ff6b9e;
  37: 
  38:   --gradient-hero: linear-gradient(100deg, #fde8f0 0%, #ebe8ff 50%, #e3f7f2 100%);
  39:   --gradient-band: linear-gradient(105deg, #1766e0, #2a9ef2);
  40: 
  41:   --shadow-card: 0 2px 8px rgba(0, 0, 0, 0.04);
  42:   --shadow-float: 0 24px 56px -12px rgba(26, 38, 102, 0.1);
  43:   --shadow-accent: 0 8px 24px rgba(21, 101, 216, 0.3);
  44: 
  45:   --container-max: 1440px;
  46: }
  47: 
  48: html[data-theme='dark'] {
  49:   --token-bg: #0b0e17;
  50:   --token-surface: #131826;
  51:   --token-line: #29303f;
  52:   --token-text: #f2f3f7;
  53:   --token-muted: #9ea8bd;
  54:   --token-accent: #5994ff;
  55:   --token-accent-soft: #1f335c;
  56:   --token-on-accent: #0b0e17;
  57:   --token-accent-strong: #9cc3ff;
  58:   --token-inverse: #f2f3f7;
  59:   --token-on-inverse: #0b0e17;
  60:   --token-footer: #080a12;
  61: 
  62:   /* Band accent is intentionally identical in both themes. */
  63:   --token-band-accent: #ffd966;
  64:   --token-status: #34d07a;
  65:   --token-term-string: #73d9a0;
  66: 
  67:   --token-terminal: #0f1420;
  68:   --token-terminal-line: #29303f;
  69:   --token-danger: #ff6b75;
  70:   --token-term-path: #73d9a0;
  71:   --token-glitch-a: #5994ff;
  72:   --token-glitch-b: #ff6b9e;
  73: 
  74:   --gradient-hero: linear-gradient(100deg, #291433 0%, #0f1433 50%, #0a2429 100%);
  75:   --gradient-band: linear-gradient(105deg, #1247b3, #1f73d9);
  76: }
  77: 
  78: @theme inline {
  79:   --color-bg: var(--token-bg);
  80:   --color-surface: var(--token-surface);
  81:   --color-line: var(--token-line);
  82:   --color-text: var(--token-text);
  83:   --color-muted: var(--token-muted);
  84:   --color-accent: var(--token-accent);
  85:   --color-accent-soft: var(--token-accent-soft);
  86:   --color-on-accent: var(--token-on-accent);
  87:   --color-accent-strong: var(--token-accent-strong);
  88:   --color-inverse: var(--token-inverse);
  89:   --color-on-inverse: var(--token-on-inverse);
  90:   --color-footer: var(--token-footer);
  91:   --color-band-accent: var(--token-band-accent);
  92:   --color-status: var(--token-status);
  93:   --color-term-string: var(--token-term-string);
  94:   --color-terminal: var(--token-terminal);
  95:   --color-terminal-line: var(--token-terminal-line);
  96:   --color-danger: var(--token-danger);
  97:   --color-term-path: var(--token-term-path);
  98:   --color-glitch-a: var(--token-glitch-a);
  99:   --color-glitch-b: var(--token-glitch-b);
 100: 
 101:   --radius-sm: 6px;
 102:   --radius-md: 10px;
 103:   --radius-lg: 16px;
 104:   --radius-xl: 20px;
 105:   --radius-2xl: 24px;
 106:   --radius-full: 999px;
 107: 
 108:   --shadow-card: 0 2px 8px rgba(0, 0, 0, 0.04);
 109:   --shadow-float: 0 24px 56px -12px rgba(26, 38, 102, 0.1);
 110:   --shadow-accent: 0 8px 24px rgba(21, 101, 216, 0.3);
 111: 
 112:   --font-sans: var(--font-outfit), var(--font-prompt), ui-sans-serif, system-ui, sans-serif;
 113:   --font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
 114: }

===== src/app/globals.css =====
   1: @import 'tailwindcss';
   2: @import '../styles/tokens.css';
   3: 
   4: html {
   5:   scroll-behavior: smooth;
   6: }
   7: 
   8: body {
   9:   background-color: var(--token-bg);
  10:   color: var(--token-text);
  11:   font-family: var(--font-outfit), var(--font-prompt), ui-sans-serif, system-ui, sans-serif;
  12:   -webkit-font-smoothing: antialiased;
  13:   -moz-osx-font-smoothing: grayscale;
  14: }
  15: 
  16: /* Visible focus ring: 2px accent outline, offset 2px */
  17: @utility focus-ring {
  18:   outline: none;
  19: 
  20:   &:focus-visible {
  21:     outline: 2px solid var(--token-accent);
  22:     outline-offset: 2px;
  23:   }
  24: }
  25: 
  26: :where(a, button, input, textarea, select, [tabindex]):focus-visible {
  27:   outline: 2px solid var(--token-accent);
  28:   outline-offset: 2px;
  29: }
  30: 
  31: ::selection {
  32:   background-color: var(--token-accent-soft);
  33:   color: var(--token-text);
  34: }
  35: 
  36: @media (prefers-reduced-motion: reduce) {
  37:   html {
  38:     scroll-behavior: auto;
  39:   }
  40: 
  41:   *,
  42:   *::before,
  43:   *::after {
  44:     animation-duration: 0.01ms !important;
  45:     animation-iteration-count: 1 !important;
  46:     transition-duration: 0.01ms !important;
  47:     scroll-behavior: auto !important;
  48:   }
  49: }

===== src/app/[locale]/not-found.tsx =====
   1: import { useTranslations } from "next-intl";
   2: import { Container } from "@/components/ui/Container";
   3: import { Button } from "@/components/ui/Button";
   4: import { Navbar } from "@/components/sections/Navbar";
   5: import { Footer } from "@/components/sections/Footer";
   6: import { Glitch404 } from "@/components/notfound/Glitch404";
   7: import { ErrorTerminal } from "@/components/notfound/ErrorTerminal";
   8: 
   9: export default function LocaleNotFound() {
  10:   const t = useTranslations("notFound");
  11: 
  12:   return (
  13:     <>
  14:       <div className="gradient-hero flex flex-1 flex-col">
  15:         <Navbar />
  16:         <main id="content" className="flex-1 pb-20 md:pb-28">
  17:           <Container>
  18:             <div className="grid grid-cols-1 items-center gap-12 pt-8 lg:grid-cols-2 lg:gap-16 lg:pt-16">
  19:               <div>
  20:                 <p className="font-mono text-xs font-semibold tracking-[0.18em] text-accent uppercase">
  21:                   {t("eyebrow")}
  22:                 </p>
  23: 
  24:                 <div className="mt-6">
  25:                   <Glitch404 />
  26:                 </div>
  27: 
  28:                 <h1 className="mt-8 text-[32px] leading-tight font-semibold whitespace-pre-line text-text md:text-[44px]">
  29:                   {t("title")}
  30:                 </h1>
  31: 
  32:                 <p className="mt-5 max-w-lg leading-relaxed text-muted">{t("body")}</p>
  33: 
  34:                 <div className="mt-8 flex flex-wrap gap-3">
  35:                   <Button variant="accent" size="lg" href="/">
  36:                     {t("backHome")}
  37:                   </Button>
  38:                   <Button variant="ghost" size="lg" href="/#work">
  39:                     {t("viewWork")}
  40:                   </Button>
  41:                 </div>
  42:               </div>
  43: 
  44:               <ErrorTerminal />
  45:             </div>
  46:           </Container>
  47:         </main>
  48:       </div>
  49:       <Footer />
  50:     </>
  51:   );
  52: }

===== src/app/[locale]/projects/[slug]/opengraph-image.tsx =====
   1: import { ImageResponse } from "next/og";
   2: import { hasLocale } from "next-intl";
   3: import { routing, type Locale } from "@/i18n/routing";
   4: import { projects, getProject } from "@/content/projects";
   5: import { OG_COLORS, OG_SIZE, OG_CONTENT_TYPE, ogFonts } from "@/lib/og";
   6: 
   7: export const alt = "Haroon Kasor — project";
   8: export const size = OG_SIZE;
   9: export const contentType = OG_CONTENT_TYPE;
  10: 
  11: export function generateStaticParams() {
  12:   return projects.map((project) => ({ slug: project.slug }));
  13: }
  14: 
  15: export default async function ProjectOpengraphImage({
  16:   params,
  17: }: {
  18:   params: Promise<{ locale: string; slug: string }>;
  19: }) {
  20:   const { locale, slug } = await params;
  21:   const typedLocale: Locale = hasLocale(routing.locales, locale)
  22:     ? (locale as Locale)
  23:     : routing.defaultLocale;
  24: 
  25:   const project = getProject(slug);
  26:   const title = project?.title[typedLocale] ?? "Haroon Kasor";
  27:   const summary = project?.summary[typedLocale] ?? "";
  28:   const tags = project?.tags.join(" · ") ?? "";
  29: 
  30:   return new ImageResponse(
  31:     (
  32:       <div
  33:         style={{
  34:           width: "100%",
  35:           height: "100%",
  36:           display: "flex",
  37:           flexDirection: "column",
  38:           justifyContent: "space-between",
  39:           padding: "72px 80px",
  40:           background: OG_COLORS.gradient,
  41:           fontFamily: "Outfit",
  42:         }}
  43:       >
  44:         <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
  45:           <div
  46:             style={{
  47:               display: "flex",
  48:               alignItems: "center",
  49:               justifyContent: "center",
  50:               width: 56,
  51:               height: 56,
  52:               borderRadius: 16,
  53:               background: OG_COLORS.text,
  54:               color: OG_COLORS.surface,
  55:               fontSize: 24,
  56:               fontWeight: 700,
  57:             }}
  58:           >
  59:             HK
  60:           </div>
  61:           <div style={{ display: "flex", fontSize: 26, color: OG_COLORS.muted }}>
  62:             haroonkasor.dev
  63:           </div>
  64:         </div>
  65: 
  66:         <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
  67:           {tags ? (
  68:             <div
  69:               style={{
  70:                 display: "flex",
  71:                 fontSize: 24,
  72:                 fontWeight: 600,
  73:                 letterSpacing: 3,
  74:                 textTransform: "uppercase",
  75:                 color: OG_COLORS.accent,
  76:               }}
  77:             >
  78:               {tags}
  79:             </div>
  80:           ) : null}
  81:           <div
  82:             style={{
  83:               display: "flex",
  84:               fontFamily: "Prompt",
  85:               fontSize: 76,
  86:               fontWeight: 700,
  87:               color: OG_COLORS.text,
  88:               lineHeight: 1.12,
  89:             }}
  90:           >
  91:             {title}
  92:           </div>
  93:         </div>
  94: 
  95:         <div
  96:           style={{
  97:             display: "flex",
  98:             fontFamily: "Prompt",
  99:             fontSize: 28,
 100:             fontWeight: 400,
 101:             color: OG_COLORS.muted,
 102:             lineHeight: 1.4,
 103:           }}
 104:         >
 105:           {summary.length > 150 ? `${summary.slice(0, 150)}…` : summary}
 106:         </div>
 107:       </div>
 108:     ),
 109:     { ...size, fonts: await ogFonts() },
 110:   );
 111: }

===== tests/e2e/cv-modal.spec.ts =====
   1: import { expect, test, type Page } from "@playwright/test";
   2: 
   3: /** Opens the CV dialog from whichever entry point the viewport exposes. */
   4: async function openCv(page: Page, isMobile: boolean | undefined) {
   5:   if (isMobile) {
   6:     await page.getByRole("button", { name: /menu|เมนู/i }).click();
   7:     await page
   8:       .getByRole("dialog")
   9:       .getByRole("button", { name: /view cv|ดู cv/i })
  10:       .click();
  11:   } else {
  12:     await page.getByRole("button", { name: /view cv|ดู cv/i }).first().click();
  13:   }
  14:   return page.getByRole("dialog");
  15: }
  16: 
  17: test.describe("CV preview dialog", () => {
  18:   test("opens a dialog when View CV is activated", async ({
  19:     page,
  20:     isMobile,
  21:   }) => {
  22:     await page.goto("/");
  23:     const dialog = await openCv(page, isMobile);
  24: 
  25:     await expect(dialog).toBeVisible();
  26:     await expect(dialog).toHaveAttribute("aria-modal", "true");
  27:   });
  28: 
  29:   test("shows the Resume title", async ({ page, isMobile }) => {
  30:     await page.goto("/");
  31:     const dialog = await openCv(page, isMobile);
  32:     await expect(dialog).toContainText("Resume — Haroon Kasor");
  33:   });
  34: 
  35:   test("embeds an iframe pointing at the English CV by default on /", async ({
  36:     page,
  37:     isMobile,
  38:   }) => {
  39:     await page.goto("/");
  40:     const dialog = await openCv(page, isMobile);
  41: 
  42:     await expect(dialog.locator("iframe")).toHaveAttribute(
  43:       "src",
  44:       /\/cv\/haroon-kasor-en\.pdf/,
  45:     );
  46:   });
  47: 
  48:   test("defaults to the Thai CV when opened from /th", async ({
  49:     page,
  50:     isMobile,
  51:   }) => {
  52:     await page.goto("/th");
  53:     const dialog = await openCv(page, isMobile);
  54: 
  55:     await expect(dialog.locator("iframe")).toHaveAttribute(
  56:       "src",
  57:       /\/cv\/haroon-kasor-th\.pdf/,
  58:     );
  59:   });
  60: 
  61:   test("switches the iframe to the Thai PDF via the ไทย segment", async ({
  62:     page,
  63:     isMobile,
  64:   }) => {
  65:     await page.goto("/");
  66:     const dialog = await openCv(page, isMobile);
  67:     await expect(dialog.locator("iframe")).toHaveAttribute(
  68:       "src",
  69:       /haroon-kasor-en\.pdf/,
  70:     );
  71: 
  72:     await dialog.getByRole("button", { name: "ไทย" }).click();
  73: 
  74:     await expect(dialog.locator("iframe")).toHaveAttribute(
  75:       "src",
  76:       /haroon-kasor-th\.pdf/,
  77:     );
  78:   });
  79: 
  80:   test("switches back to the English PDF via the English segment", async ({
  81:     page,
  82:     isMobile,
  83:   }) => {
  84:     await page.goto("/");
  85:     const dialog = await openCv(page, isMobile);
  86: 
  87:     await dialog.getByRole("button", { name: "ไทย" }).click();
  88:     await expect(dialog.locator("iframe")).toHaveAttribute(
  89:       "src",
  90:       /haroon-kasor-th\.pdf/,
  91:     );
  92: 
  93:     await dialog.getByRole("button", { name: "English" }).click();
  94:     await expect(dialog.locator("iframe")).toHaveAttribute(
  95:       "src",
  96:       /haroon-kasor-en\.pdf/,
  97:     );
  98:   });
  99: 
 100:   test("marks the active language segment with aria-pressed", async ({
 101:     page,
 102:     isMobile,
 103:   }) => {
 104:     await page.goto("/");
 105:     const dialog = await openCv(page, isMobile);
 106: 
 107:     await expect(dialog.getByRole("button", { name: "English" })).toHaveAttribute(
 108:       "aria-pressed",
 109:       "true",
 110:     );
 111:     await expect(dialog.getByRole("button", { name: "ไทย" })).toHaveAttribute(
 112:       "aria-pressed",
 113:       "false",
 114:     );
 115:   });
 116: 
 117:   test("shows the page indicator in the footer", async ({ page, isMobile }) => {
 118:     await page.goto("/");
 119:     const dialog = await openCv(page, isMobile);
 120:     await expect(dialog.getByText(/Page 1 \/ 2/i)).toBeVisible();
 121:   });
 122: });
 123: 
 124: test.describe("CV dialog download link", () => {
 125:   test("offers a download link carrying the download attribute", async ({
 126:     page,
 127:     isMobile,
 128:   }) => {
 129:     await page.goto("/");
 130:     const dialog = await openCv(page, isMobile);
 131: 
 132:     const download = dialog
 133:       .getByRole("link", { name: /download pdf|ดาวน์โหลด pdf/i })
 134:       .first();
 135:     await expect(download).toHaveAttribute("download", /.*/);
 136:     await expect(download).toHaveAttribute("href", /haroon-kasor-en\.pdf/);
 137:   });
 138: 
 139:   test("repoints the download link when the language segment changes", async ({
 140:     page,
 141:     isMobile,
 142:   }) => {
 143:     await page.goto("/");
 144:     const dialog = await openCv(page, isMobile);
 145:     await dialog.getByRole("button", { name: "ไทย" }).click();
 146: 
 147:     const download = dialog
 148:       .getByRole("link", { name: /download pdf|ดาวน์โหลด pdf/i })
 149:       .first();
 150:     await expect(download).toHaveAttribute("href", /haroon-kasor-th\.pdf/);
 151:   });
 152: });
 153: 
 154: test.describe("CV dialog dismissal", () => {
 155:   test("closes on Escape and returns focus to the trigger", async ({
 156:     page,
 157:     isMobile,
 158:   }) => {
 159:     test.skip(
 160:       !!isMobile,
 161:       "the mobile trigger lives inside the sheet, which unmounts on open",
 162:     );
 163:     await page.goto("/");
 164: 
 165:     const trigger = page.getByRole("button", { name: /view cv/i }).first();
 166:     await trigger.click();
 167:     const dialog = page.getByRole("dialog");
 168:     await expect(dialog).toBeVisible();
 169: 
 170:     await page.keyboard.press("Escape");
 171:     await expect(dialog).toBeHidden();
 172:     await expect(trigger).toBeFocused();
 173:   });
 174: 
 175:   test("closes when the close button is used", async ({ page, isMobile }) => {
 176:     await page.goto("/");
 177:     const dialog = await openCv(page, isMobile);
 178: 
 179:     // The close button is icon-only, so per the brief it carries an aria-label
 180:     // naming its action ("Close" / "ปิด"). It previously reused the dialog
 181:     // title, which named the dialog rather than the button.
 182:     await dialog.getByRole("button", { name: /^(close|ปิด)$/i }).click();
 183:     await expect(dialog).toBeHidden();
 184:   });
 185: 
 186:   test("traps focus inside the dialog while open", async ({
 187:     page,
 188:     isMobile,
 189:   }) => {
 190:     test.skip(!!isMobile, "focus trapping is verified on desktop");
 191:     await page.goto("/");
 192:     const dialog = await openCv(page, isMobile);
 193: 
 194:     for (let i = 0; i < 12; i += 1) {
 195:       await page.keyboard.press("Tab");
 196:       const state = await dialog.evaluate((node) => ({
 197:         inside: node.contains(document.activeElement),
 198:         focused: (
 199:           document.activeElement?.getAttribute("aria-label") ||
 200:           document.activeElement?.textContent ||
 201:           ""
 202:         )
 203:           .trim()
 204:           .slice(0, 40),
 205:       }));
 206:       expect(
 207:         state.inside,
 208:         `focus escaped the dialog after ${i + 1} tabs, landing on "${state.focused}"`,
 209:       ).toBe(true);
 210:     }
 211:   });
 212: });
 213: 
 214: test.describe("mobile navigation sheet", () => {
 215:   test("opens the hamburger menu as a dialog", async ({ page, isMobile }) => {
 216:     test.skip(!isMobile, "the hamburger only exists below lg");
 217:     await page.goto("/");
 218: 
 219:     const hamburger = page.getByRole("button", { name: /menu|เมนู/i });
 220:     await expect(hamburger).toHaveAttribute("aria-expanded", "false");
 221: 
 222:     await hamburger.click();
 223:     await expect(page.getByRole("dialog")).toBeVisible();
 224:   });
 225: 
 226:   test("lists the five numbered destinations", async ({ page, isMobile }) => {
 227:     test.skip(!isMobile, "the sheet only exists below lg");
 228:     await page.goto("/");
 229:     await page.getByRole("button", { name: /menu|เมนู/i }).click();
 230: 
 231:     const sheet = page.getByRole("dialog");
 232:     for (const index of ["01", "02", "03", "04", "05"]) {
 233:       await expect(sheet.getByText(index, { exact: true })).toBeVisible();
 234:     }
 235:   });
 236: 
 237:   test("closes via the close button", async ({ page, isMobile }) => {
 238:     test.skip(!isMobile, "the sheet only exists below lg");
 239:     await page.goto("/");
 240:     await page.getByRole("button", { name: /menu|เมนู/i }).click();
 241: 
 242:     const sheet = page.getByRole("dialog");
 243:     await sheet.getByRole("button", { name: /close|ปิด/i }).click();
 244:     await expect(sheet).toBeHidden();
 245:   });
 246: 
 247:   test("closes on Escape", async ({ page, isMobile }) => {
 248:     test.skip(!isMobile, "the sheet only exists below lg");
 249:     await page.goto("/");
 250:     await page.getByRole("button", { name: /menu|เมนู/i }).click();
 251: 
 252:     const sheet = page.getByRole("dialog");
 253:     await expect(sheet).toBeVisible();
 254: 
 255:     await page.keyboard.press("Escape");
 256:     await expect(sheet).toBeHidden();
 257:   });
 258: 
 259:   test("closes when a destination is followed", async ({ page, isMobile }) => {
 260:     test.skip(!isMobile, "the sheet only exists below lg");
 261:     await page.goto("/");
 262:     await page.getByRole("button", { name: /menu|เมนู/i }).click();
 263: 
 264:     await page.getByRole("dialog").getByRole("link", { name: "About" }).click();
 265:     await expect(page.getByRole("dialog")).toBeHidden();
 266:   });
 267: 
 268:   test("renders the CV dialog as a bottom sheet variant on mobile", async ({
 269:     page,
 270:     isMobile,
 271:   }) => {
 272:     test.skip(!isMobile, "the sheet variant is mobile-only");
 273:     await page.goto("/");
 274:     const dialog = await openCv(page, isMobile);
 275: 
 276:     // The mobile variant sits flush with the bottom edge and keeps only the
 277:     // top corners rounded.
 278:     const box = (await dialog.boundingBox())!;
 279:     const viewport = page.viewportSize()!;
 280:     expect(box.y + box.height).toBeGreaterThanOrEqual(viewport.height - 2);
 281: 
 282:     const radii = await dialog.evaluate((node) => {
 283:       const s = getComputedStyle(node);
 284:       return {
 285:         topLeft: s.borderTopLeftRadius,
 286:         bottomLeft: s.borderBottomLeftRadius,
 287:       };
 288:     });
 289:     expect(radii.topLeft).not.toBe(radii.bottomLeft);
 290:   });
 291: });

===== playwright.config.ts =====
   1: import { defineConfig, devices } from "@playwright/test";
   2: 
   3: // Port 3000 is commonly already taken by another local Next.js app. Reusing a
   4: // stranger's server silently runs the whole suite against the wrong site, so the
   5: // port is overridable via PLAYWRIGHT_PORT and the server is never reused.
   6: const PORT = Number(process.env.PLAYWRIGHT_PORT ?? 3000);
   7: const baseURL = `http://localhost:${PORT}`;
   8: 
   9: export default defineConfig({
  10:   testDir: "tests/e2e",
  11:   timeout: 30_000,
  12:   retries: process.env.CI ? 1 : 0,
  13:   reporter: process.env.CI ? "github" : "list",
  14:   use: { baseURL, trace: "retain-on-failure" },
  15:   webServer: {
  16:     command: `npm run build && npm run start -- --port ${PORT}`,
  17:     url: baseURL,
  18:     reuseExistingServer: false,
  19:     timeout: 180_000,
  20:   },
  21:   projects: [
  22:     { name: "desktop", use: { ...devices["Desktop Chrome"] } },
  23:     { name: "mobile", use: { ...devices["Pixel 7"] } },
  24:   ],
  25: });

2026-08-28T06:21:09.762450Z ERROR codex_models_manager::manager: failed to renew cache TTL: missing field `supports_parallel_tool_calls` at line 97 column 5
exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command "rg -n 'framer-motion|motion\\.' src; rg -n 'text-(white|black)|bg-(white|black)' src --glob '*.{tsx,ts}'" in D:\haroon-portfolio
 succeeded in 344ms:
src\components\notfound\Glitch404.tsx:6: * Motion is disabled under prefers-reduced-motion.
src\components\sections\FadeIn.tsx:7: * Deliberately CSS-only and server-rendered. A framer-motion
src\components\ui\ProjectCard.tsx:43:        <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-white backdrop-blur-sm">
src\components\ui\ProjectCard.tsx:49:            "leading-none font-bold text-white/20",
src\components\detail\FeatureRows.tsx:24:      <span className="rounded-full bg-black/20 px-4 py-1.5 font-mono text-xs tracking-wide text-white/90">
src\components\sections\CvPreviewModal.tsx:130:      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center sm:p-6"
src\components\sections\Experience.tsx:16:          <span className="text-xs font-semibold tracking-[0.18em] text-white/70 lg:pt-4">
src\components\sections\Experience.tsx:19:          <h2 className="max-w-[932px] text-[32px] leading-tight font-semibold text-white lg:text-[56px]">
src\components\sections\Experience.tsx:40:                      i === 0 ? "bg-band-accent" : "bg-white/50",
src\components\sections\Experience.tsx:46:                      i === 0 ? "text-band-accent" : "text-white/70",
src\components\sections\Experience.tsx:54:                  <h3 className="text-xl font-semibold text-white lg:text-2xl">
src\components\sections\Experience.tsx:57:                  <p className="mt-1 text-sm text-white/70">
src\components\sections\Experience.tsx:60:                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/80 lg:text-base">
src\components\sections\Footer.tsx:10:        <div className="flex flex-col items-center justify-between gap-3 text-[11px] font-semibold tracking-[0.14em] text-white/60 sm:flex-row">

2026-08-28T06:21:27.414600Z ERROR codex_models_manager::manager: failed to renew cache TTL: missing field `supports_parallel_tool_calls` at line 97 column 5
codex
The production route checks also confirm `200 image/png` for `/icon` and `/opengraph-image`; both `/` and `/th` emit correct canonical, `en`/`th` alternates, and `og:image`. I found a few brief-compliance issues despite the green test suite.
exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command "git status --short; git diff --check; git log -7 --format='%h %s'" in D:\haroon-portfolio
 succeeded in 361ms:
d05d133 fix(a11y): raise accent contrast above 4.5:1 in both themes
26e1dd9 fix(a11y): close the CV dialog focus trap and label its close button
b842156 fix(ui): section head geometry, CSS-only hero fade, merge debris cleanup
60b7bf4 fix(seo): stop the proxy rewriting /icon and /opengraph-image into 404s
7b7d5f2 fix(seo): resolve metadata from buildMetadata and set a root metadataBase
8816ac9 fix(routing): make the root 404 static so the locale tree prerenders
68889f0 fix(i18n): resolve hero headline keys and add the real contact email

2026-08-28T06:21:35.767292Z ERROR codex_models_manager::manager: failed to renew cache TTL: missing field `supports_parallel_tool_calls` at line 97 column 5
codex
## Verdict: FAIL

All requested automated checks pass, and SSG/SEO behavior is correct. The failure is for remaining design-brief violations.

| Command | Result |
|---|---|
| `npm run lint` | PASS — 0 diagnostics |
| `npm run typecheck` | PASS — 0 diagnostics |
| `npm run build` | PASS — `/en`, `/th`, and all 10 localized project pages marked `●` SSG |
| `npm run test` | PASS — 5 files, 130/130 tests; non-failing Vite future-compat warning |
| `PLAYWRIGHT_PORT=3300 npm run e2e` | PASS — 217 passed, 11 viewport-specific skips, 0 failed |

Production HTTP verification also passed: `/`, `/th`, `/icon`, and `/opengraph-image` return 200; the images are `image/png`. Both home pages emit correct canonical URLs, `en`/`th` hreflang alternates, and `og:image`.

Last-seven-commit review found no test deletion or unjustified skip; the 11 skips are appropriately conditional on desktop/mobile-only UI.

Remaining defects:

1. **Medium — token value contradicts the brief.** `src/styles/tokens.css:13` sets the light accent to `#1565D8`; the source-of-truth brief specifies `#1C70E6`. The related accent shadow was changed too.

2. **Medium — root 404 is not the specified/i18n-driven 404.** `src/app/not-found.tsx:14` intentionally uses plain hardcoded English; it omits the required terminal and glitch presentation, and its body copy differs from the brief. This violates the “all UI strings through next-intl messages” rule, even if normal unknown routes currently reach the localized catch-all page.

3. **Low — raw hex in a React UI route.** `src/app/icon.tsx:17` and `:18` hardcode `#0F2A4A` and `#FFFFFF`, contrary to the token rule. Reuse centralized OG/token constants instead.

4. **Low — future test-runner compatibility warning.** `vitest.config.ts:1` uses ESM syntax under a CommonJS-loaded config. Vitest warns this is unsupported by its planned native config loader default; tests pass today but a future major upgrade may break configuration loading.

The worktree is clean; no source files were modified during verification.
tokens used
97,348

```

## Concise summary

Provider completed successfully. Review the raw output for details.

## Action items

- Review the response and extract decisions you want to apply.
- Capture follow-up implementation tasks if needed.
