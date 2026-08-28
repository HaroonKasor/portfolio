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
| --color-accent | #1565D8 (was #1C70E6; darkened to pass WCAG AA 4.5:1 on bg/surface) | #5994FF |
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
