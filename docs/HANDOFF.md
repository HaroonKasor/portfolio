# Handoff — สถานะโปรเจกต์ (อัปเดต 2026-08-30)

เอกสารนี้ใช้ส่งต่อบริบทให้ Claude Code session ใหม่ที่เปิดใน `D:\haroon-portfolio` อ่านก่อนเริ่มงานทุกครั้ง

## นี่คืออะไร
เว็บ portfolio ของ ฮารูน กาซอร์ (Haroon Kasor) — Junior Developer @ Learn Tech, นักศึกษา วศ.บ. คอมพิวเตอร์ ม.รามคำแหง (จบ 2026)
สร้างจาก Figma design → โค้ดจริง สเปกเต็มอยู่ที่ `docs/DESIGN_BRIEF.md` (source of truth: tokens, copy TH/EN, layout, กฎ)

- Figma file key: `r4UKtMTrxwOGPs7WNEGrtA` (เฟรม: Home, Home — Dark, Home — Mobile, Mobile Menu, CV Preview modal/sheet, 404 ×2, Project Detail ×2, OG Image, section 🧩 Components) — ใช้ Figma MCP (`use_figma` / `get_screenshot`) เทียบได้
- Stack: Next.js 16 App Router + TS + React 19, Tailwind v4 (tokens ใน `src/styles/tokens.css`), next-intl (EN default ไม่มี prefix, TH ที่ `/th`), next-themes (`data-theme`), lucide-react, simple-icons, pdfjs-dist (CV viewer), framer-motion (hero เท่านั้น)
- ฟอนต์: Outfit (latin/ตัวเลข) + Prompt (ไทย) ผ่าน next/font

## Git
- โฟลเดอร์เดียวที่ใช้: `D:\haroon-portfolio` (worktree `-a/-b/-c` ของเอเจนลบแล้ว)
- branch งานใหม่: **`redesign`** (local, ยังไม่ push) · remote `origin` = https://github.com/HaroonKasor/portfolio (`origin/main` = เว็บเก่า ห้ามแตะ)
- push เมื่อผู้ใช้สั่งเท่านั้น: `git push -u origin redesign`
- commit message prefix: `feat(scope):` / `fix(scope):` / `chore:`

## คำสั่ง
- `npm run dev` (dev มักเปิดที่ port 3400 เพราะ 3000 ถูกแอปอื่นในเครื่องใช้: `npx next dev -p 3400`)
- `npm run lint` · `npm run typecheck` · `npm run build` (ต้องเห็น `●` SSG ที่ `/[locale]` และ `/[locale]/projects/[slug]`)
- `npm run test` (Vitest, `tests/unit`) · `PLAYWRIGHT_PORT=3200 npm run e2e` (Playwright, `tests/e2e`) — ผลล่าสุด unit 130/130, e2e 217 ผ่าน 0 fail
- CI: `.github/workflows/ci.yml`

## โครงสร้างสำคัญ
- `src/app/[locale]/page.tsx` Home · `projects/[slug]/page.tsx` Detail · `not-found.tsx` 404 terminal · `[...rest]/page.tsx` catch-all → 404
- `src/components/sections/*` (Navbar, Hero, TerminalCard, Stats, About, Experience, Projects, GitHub, Testimonial, Contact, Footer, MobileMenu, CvPreviewModal, PdfViewer)
- `src/components/ui/*` (Button, Tag, TechChip, NavLink, SectionHead, Container, ThemeToggle, LangToggle, BackToTop, ProjectCard, RepoCard)
- `src/components/detail/*`, `src/components/notfound/*`
- `src/content/` — `projects.ts` (5 โปรเจกต์ TH/EN), `profile.ts`, `skills.ts`, `experience.ts`, `testimonials.ts` (ว่าง = ซ่อน section 05)
- `messages/en.json`, `messages/th.json` — ทุกข้อความ UI (ห้าม hardcode)
- `public/cv/haroon-kasor-{en,th}.pdf` — เรซูเม่ (มีรูปโปรไฟล์แล้ว) ต้นฉบับ .docx อยู่ `D:\Doc\`
- `src/lib/github.ts` ดึง repo จริงจาก GitHub API (fallback ในตัว), `src/lib/seo.ts` metadata/OG

## กฎการทำงานที่ผู้ใช้กำหนด
- งาน UI → Claude ทำเอง; งาน non-UI/verify → ให้ Codex ช่วยได้ (`omc ask codex "..."`)
- ผู้เขียนโค้ดไม่รีวิว/เทสต์งานตัวเอง — แยก reviewer/tester
- ไม่เอา AI-slop: ไม่มี em dash ฟุ่มเฟือย, ไม่มี placeholder ที่ผู้ใช้เห็น, ข้อความเฉพาะเจาะจงจาก CV
- เทียบกับ Figma ทีละ section เมื่อผู้ใช้ส่ง screenshot มา (ล่าสุดเทียบแล้ว: Hero, About, Experience, Projects, GitHub, Testimonial, Detail, CV modal, terminal card)
- อีเมลที่ถูกต้อง: `haroonkasor.dev@gmail.com` · โทร 062-496-9217 · GitHub HaroonKasor

## สิ่งที่ยังค้าง / รอผู้ใช้
1. ใส่ screenshot โปรเจกต์จริง (ช่อง cover/feature slots รอรับ `image`) และรูปโปรไฟล์ในเว็บ (ยังไม่มีในหน้า Home)
2. ข้อความ testimonial จริง → `src/content/testimonials.ts`
3. โดเมนจริง → env `NEXT_PUBLIC_SITE_URL` (ตอนนี้ default `https://haroonkasor.dev`)
4. Live demo URL ของ GoSkillUp → `links.demo` ใน `projects.ts`
5. ยังไม่ได้เทียบ Figma: หน้า 404, Contact, Mobile
6. push branch `redesign` + deploy Vercel (ผู้ใช้ทำเอง/สั่งเมื่อพร้อม)
7. (ทางเลือก) ตัด "Personal information" (วันเกิด/สถานภาพ) ออกจากเรซูเม่ EN
