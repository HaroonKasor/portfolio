# Handoff — สถานะโปรเจกต์ (อัปเดต 2026-08-31)

เอกสารนี้ใช้ส่งต่อบริบทให้ Claude Code session ใหม่ที่เปิดใน `D:\haroon-portfolio` อ่านก่อนเริ่มงานทุกครั้ง

## นี่คืออะไร
เว็บ portfolio ของ ฮารูน กาซอร์ (Haroon Kasor) — Junior Developer @ Learn Tech, นักศึกษา วศ.บ. คอมพิวเตอร์ ม.รามคำแหง (จบ 2026)
สร้างจาก Figma design → โค้ดจริง สเปกเต็มอยู่ที่ `docs/DESIGN_BRIEF.md` (source of truth: tokens, copy TH/EN, layout, กฎ)

- Figma file key: `r4UKtMTrxwOGPs7WNEGrtA` — ใช้ Figma MCP (`use_figma` / `get_screenshot`) เทียบได้
- Stack: Next.js 16 App Router + TS + React 19, Tailwind v4 (tokens ใน `src/styles/tokens.css`), next-intl (EN default ไม่มี prefix, TH ที่ `/th`), next-themes (`data-theme`, **ค่าเริ่มต้น light**), lucide-react, simple-icons, pdfjs-dist (CV + เล่มโครงงาน), framer-motion (hero เท่านั้น)
- ฟอนต์: Outfit (latin/ตัวเลข) + Prompt (ไทย) ผ่าน next/font

## Git
- โฟลเดอร์เดียวที่ใช้: `D:\haroon-portfolio`
- branch งานใหม่: **`redesign`** · remote `origin` = https://github.com/HaroonKasor/portfolio (`origin/main` = เว็บเก่า ห้ามแตะจนกว่าจะ merge)
- Vercel ผูกกับ repo นี้อยู่แล้ว (deploy จาก `main`) → push `redesign` จะได้ preview URL ก่อน, merge เข้า `main` เมื่อพอใจ · URL ที่ตั้งใจใช้: `haroonkasor.vercel.app`
- **commit/push เมื่อผู้ใช้สั่งเท่านั้น** · prefix `feat(scope):` / `fix(scope):` / `chore:` / `docs:`

## คำสั่ง
- `npx next dev -p 3400` (3000 ถูกแอปอื่นใช้) · `npm run lint` · `npm run typecheck` · `npm run build`
- `npm run test` (Vitest, `tests/unit`) · `PLAYWRIGHT_PORT=3200 npm run e2e` (Playwright) — ผลล่าสุด unit 118/118, e2e 217 ผ่าน 0 fail
- ล้างแคชรูปหลังเขียนทับไฟล์รูปชื่อเดิม: `rm -rf .next/dev/cache/images` (ไม่งั้น next/image เสิร์ฟรูปเก่า)
- CI: `.github/workflows/ci.yml`

## โครงสร้างสำคัญ
- `src/app/[locale]/page.tsx` Home · `projects/[slug]/page.tsx` Detail · `not-found.tsx` 404 · `[...rest]/page.tsx` catch-all → 404 (**ห้ามเพิ่ม `loading.tsx`** ทำให้ 404 ตอบ 200)
- `src/components/sections/*` (Navbar + NavLinks scroll-spy, Hero, Stats + CountUp, About, Experience, Projects, GitHub, Testimonial, Contact + LineQrButton, Footer, MobileMenu, CvPreviewModal, PdfViewer แบบ lazy render)
- `src/components/ui/*` (Button, Tag, TechChip, NavLink, SectionHead, Container, ThemeToggle, LangToggle, BackToTop, ProjectCard, RepoCard, **Reveal** scroll-reveal, **SkeletonImage**, **CountUp**)
- `src/components/detail/*` (ProjectHeader + ReportModalButton, FactsStrip, ProjectCover, OverviewCards, FeatureRows + ShotLightbox, TechStackGrid, NextProject)
- `src/lib/brandColor.ts` สี simple-icons (โลโก้เกือบดำ → currentColor ในโหมดมืด)
- `src/content/projects.ts` — **4 โปรเจกต์**: `goskillup-lms`, `learntech-lms`, `membership-booking`, `obec-vr-learning` (ทุก entry เขียนจากโค้ด/commit จริงและผ่าน reviewer ตรวจแล้ว ห้ามเดาตัวเลข)
- `messages/en.json`, `messages/th.json` — ทุกข้อความ UI (ห้าม hardcode)
- `public/images/` ปก 3 โปรเจกต์ + `goskillup/*.webp` screenshot feature 6 รูป + `line-qr.png` · `public/docs/goskillup-project-report.pdf` เล่มโครงงาน (4.5 MB, re-encode แล้ว) · `public/cv/*.pdf` เรซูเม่ (ต้นฉบับ `.docx` ใน `D:\Doc\`, backup ก่อนแก้ที่ `D:\Doc\_backup_2026-08-30_pre-fact-check\`)

## กฎการทำงานที่ผู้ใช้กำหนด
- งาน UI → Claude ทำเอง; งาน non-UI/verify → ให้ Codex ช่วยได้ (`omc ask codex "..."`)
- ผู้เขียนโค้ด/เนื้อหาไม่รีวิวงานตัวเอง — ส่งให้ agent `critic`/`verifier` ตรวจแยก (ใช้แล้วกับทุก entry โปรเจกต์)
- ไม่เอา AI-slop: ไม่มี placeholder ที่ผู้ใช้เห็น, ตัวเลข/ข้อความต้องมีหลักฐานจากโค้ดหรือเอกสารจริง
- **ห้ามใช้คำว่า "solo / ทำคนเดียว"** ในเนื้อหา
- ไม่ระบุชื่อลูกค้าเอกชน (NPC = "corporate safety-training client") · OBEC ระบุได้ (ผู้ใช้อนุญาต) · ห้ามใส่ hostname/credential/PII จาก repo ลูกค้า
- อีเมล `haroonkasor.dev@gmail.com` · โทร 062-496-9217 · GitHub HaroonKasor · LINE ID `harunfy` (ลิงก์เพิ่มเพื่อน `https://line.me/ti/p/g2zxCyDgt1`)

## แหล่งข้อมูลโปรเจกต์ (สำหรับตรวจข้อเท็จจริง)
- GoSkillUp: https://github.com/HaroonKasor/lms (public) · live https://goskillup.me
- Learn Tech LMS: `D:\product\lrs-fujitsu-demo-gitlab` (Java LRS), `D:\product\product_frontend_gitlab` (Next.js 15), `D:\product\product_extract_service_gitlab` (Spring Boot 4 transcript service)
- สมาชิก/จองคอร์ส: `D:\npc\npc-api-roon`, `npc-frontend-roon`, `npc-backoffice`
- OBEC: backend ใหม่ `E:\obac\code\obec-springboot-main` (130 endpoints), React portal `E:\obac\code\obec-web-main`, Unity `E:\obac\source code vr\ProjectScience02` (18 เกม), เอกสาร `E:\obac\code\OBEC-API-Document-All-129.docx`
- ⚠️ repo เหล่านี้มี credential/PII ค้างอยู่ (แจ้งผู้ใช้แล้ว) ห้ามนำสิ่งใดจาก `.env`, `application.properties`, `users.csv`, `*.sql` dump มาใช้

## สิ่งที่ยังค้าง / รอผู้ใช้
1. ยืนยัน 3 ข้อที่โค้ดตอบไม่ได้: GoSkillUp `period 2025 — 2026` + ย่อหน้า Problem ตรงโจทย์จริงไหม · Learn Tech: งาน purge (`task.UserPurgeTask.run`) เปิดบน production ไหม
2. รูปปกโปรเจกต์ `membership-booking` (ตอนนี้ gradient) และรูป feature ของ 3 โปรเจกต์ที่เหลือ (ตอนนี้ placeholder "Screenshot coming soon")
3. ข้อความ testimonial จริง → `src/content/testimonials.ts`
4. โดเมนจริง → env `NEXT_PUBLIC_SITE_URL` (default `https://haroonkasor.dev`) ตั้งบน Vercel ให้ตรง URL ที่ใช้
5. ยังไม่ได้เทียบ Figma: หน้า 404, Contact, Mobile
6. เล่มโครงงานหน้า 1-2 เป็นหน้าว่างในไฟล์สแกน (ถ้าอยากตัดต้องส่งไฟล์ใหม่)
