import type { Project } from './types';

/** Copy is taken verbatim from the Figma "Redesign 2026" case frames
 * (TH 179:427 / 181:427 / 181:574, EN 190:427 / 190:568 / 190:713). */
export const projects: Project[] = [
  {
    slug: 'hatch-dev',
    title: 'hatch.dev',
    shortTitle: 'hatch.dev',
    meta: { en: 'Personal project · 2026', th: 'โปรเจกต์ส่วนตัว · 2026' },
    cardMeta: { en: 'Personal project · 2026', th: 'โปรเจกต์ส่วนตัว · 2026' },
    badge: { en: 'Live', th: 'ใช้งานจริง' },
    tagline: { en: 'All-in-one web studio system', th: 'ระบบรับทำเว็บครบวงจร' },
    summary: {
      en: 'An all-in-one system for a web studio. Clients accept quotes, follow progress and pay by PromptPay in a portal, while invoices and receipts are generated as Thai PDFs automatically.',
      th: 'ระบบครบวงจรสำหรับสตูดิโอรับทำเว็บ ลูกค้ายอมรับใบเสนอราคา ติดตามงาน และชำระเงินด้วยพร้อมเพย์ได้ในพอร์ทัล ระบบออกใบแจ้งหนี้และใบเสร็จเป็น PDF ภาษาไทยให้อัตโนมัติ',
    },
    cardRole: {
      en: 'Set the UX/UI direction in Figma, wrote the spec and architecture, and built it with AI coding agents (Claude Code, Codex)',
      th: 'กำหนดทิศทาง UX/UI ใน Figma วางสเปกและสถาปัตยกรรม แล้วพัฒนาร่วมกับ AI coding agents (Claude Code, Codex)',
    },
    tags: ['Next.js 16', 'MySQL', 'Drizzle', 'Better Auth', 'Gotenberg'],
    cover: '/images/hatch/portal.webp',
    demo: { url: 'https://hatchweb.dev', kind: 'site' },
    lede: {
      en: "An all-in-one system for a web studio: from a client's first request to the quote, project tracking, payment and receipt, in a single Next.js app.",
      th: 'ระบบครบวงจรสำหรับสตูดิโอรับทำเว็บ ตั้งแต่ลูกค้าส่งคำขอ รับใบเสนอราคา ติดตามงาน จนจ่ายเงินและได้ใบเสร็จ อยู่ในแอป Next.js ตัวเดียว',
    },
    facts: {
      role: {
        en: 'UX/UI direction, spec and architecture; built with AI agents',
        th: 'กำหนดทิศทาง UX/UI สเปก และสถาปัตยกรรม พัฒนาร่วมกับ AI agents',
      },
      timeline: { en: '2026', th: '2026' },
      stack: { en: 'Next.js 16 · MySQL · Drizzle', th: 'Next.js 16 · MySQL · Drizzle' },
      status: {
        en: 'Feature-complete · live in production',
        th: 'พัฒนาครบ · ขึ้นเซิร์ฟเวอร์ใช้งานจริงแล้ว',
      },
    },
    overview: {
      problem: {
        en: 'A web studio juggles quotes, invoices, receipts, payment slips and withholding tax. Done by hand in chat and Excel, things slip through and document numbers can collide.',
        th: 'งานรับทำเว็บมีเอกสารและการตามงานเยอะ ทั้งใบเสนอราคา ใบแจ้งหนี้ ใบเสร็จ สลิป และหัก ณ ที่จ่าย ถ้าทำมือในแชตกับ Excel จะตกหล่นง่าย และเลขเอกสารซ้ำกันได้',
      },
      solution: {
        en: 'Designed every screen in Figma, then built one app with a public site, a client portal and an admin back office. Work was split between AI agents by folder (UI / server), with shared TypeScript contracts and mock data so both sides could build in parallel.',
        th: 'ออกแบบทุกหน้าใน Figma แล้วสร้างเป็นแอปเดียวที่มีทั้งเว็บไซต์ พอร์ทัลลูกค้า และหลังบ้าน แบ่งงานให้ AI agents ตามโฟลเดอร์ (หน้าจอ / เซิร์ฟเวอร์) โดยมีสัญญา TypeScript กลางและข้อมูล mock ให้ทั้งสองฝั่งทำคู่ขนานกันได้',
      },
      result: {
        en: 'Every module in the spec is done: leads, quotes, projects, billing, handover, yearly care plans and reports, with automated tests on the server (139 Vitest cases) and the UI (Playwright at 1440 / 768 / 390px).',
        th: 'ครบทุกโมดูลตามสเปก: ลูกค้าที่สนใจ ใบเสนอราคา โปรเจกต์ การเงิน ส่งมอบงาน แพ็กดูแลรายปี และรายงาน มีเทสต์อัตโนมัติฝั่งเซิร์ฟเวอร์ (Vitest 139 เคส) และหน้าจอ (Playwright ที่ 1440 / 768 / 390px)',
      },
    },
    features: [
      {
        title: {
          en: "A back office that says what's next",
          th: 'หลังบ้านที่บอกว่าต้องทำอะไรต่อ',
        },
        body: {
          en: "The admin home gathers pending work in one place, like slips to verify and unanswered quotes, alongside the year's received and outstanding totals.",
          th: 'หน้าแรกของแอดมินรวมงานที่ค้างไว้ที่เดียว เช่น สลิปรอตรวจ ใบเสนอราคาที่ลูกค้ายังไม่ตอบ พร้อมยอดรับและยอดค้างของปี',
        },
        image: '/images/hatch/admin.webp',
      },
      {
        title: {
          en: 'Quotes clients accept themselves',
          th: 'ใบเสนอราคาที่ลูกค้ากดยอมรับเองได้',
        },
        body: {
          en: 'Built from package templates and sent as a link the client opens and accepts. Track draft, sent, accepted and expired, and extend when needed.',
          th: 'สร้างจากเทมเพลตแพ็กเกจ ส่งลิงก์ให้ลูกค้าเปิดดูและกดยอมรับ ติดตามสถานะ ร่าง ส่งแล้ว ยอมรับ หมดอายุ และต่ออายุได้',
        },
        image: '/images/hatch/quotes.webp',
      },
      {
        title: {
          en: 'PromptPay payments with withholding tax',
          th: 'จ่ายด้วยพร้อมเพย์ พร้อมหัก ณ ที่จ่าย',
        },
        body: {
          en: 'Clients see each installment, scan an EMVCo-standard PromptPay QR and attach the slip. If their company withholds 3% tax, the system adjusts the amount and requests the withholding certificate.',
          th: 'ลูกค้าเห็นงวดที่ต้องจ่าย สแกน QR พร้อมเพย์ที่สร้างตามมาตรฐาน EMVCo แล้วแนบสลิป ถ้าบริษัทหักภาษี 3% ระบบคำนวณยอดและขอหนังสือรับรอง 50 ทวิ ให้',
        },
        image: '/images/hatch/billing.webp',
      },
      {
        title: { en: 'Revenue and tax reports', th: 'รายงานรายได้และภาษี' },
        body: {
          en: "Monthly revenue, a receipt register and the year's withholding tax, exportable as CSV or PDF for the accountant.",
          th: 'สรุปรายรับรายเดือน ทะเบียนใบเสร็จ และภาษีหัก ณ ที่จ่ายของปี ส่งออกเป็น CSV หรือ PDF ให้นักบัญชีได้',
        },
        image: '/images/hatch/reports.webp',
      },
    ],
    designProcess: {
      intro: {
        en: "Every screen started with research on real sites, was designed in Figma, then went straight to code to be checked on the live site at three screen sizes. Anything that didn't hold up went back to the design. Below: first drafts next to the final versions.",
        th: 'ทุกหน้าเริ่มจากค้นตัวอย่างบนเว็บจริง ออกแบบใน Figma แล้วลงโค้ดทันทีเพื่อตรวจบนเว็บจริงทั้ง 3 ขนาดจอ ถ้ายังไม่ผ่านก็กลับไปแก้ที่ดีไซน์ ด้านล่างคือดีไซน์รอบแรกเทียบกับรอบสุดท้าย',
      },
      pairs: [
        {
          title: { en: 'Sign-in page', th: 'หน้าเข้าสู่ระบบ' },
          body: {
            en: "The first draft was a plain form beside a product preview. The final version follows Gemini for Business's sign-in: the form centred in the left half, a product slideshow in an equal-width right half.",
            th: 'รอบแรกเป็นฟอร์มธรรมดากับภาพตัวอย่างระบบ รอบสุดท้ายอ้างอิงหน้า login ของ Gemini for Business ฟอร์มอยู่กลางครึ่งซ้าย สไลด์อธิบายระบบอยู่ครึ่งขวาที่กว้างเท่ากัน',
          },
          draft: '/images/process/login-draft.webp',
          final: '/images/process/login-final.webp',
        },
        {
          title: { en: 'Home hero', th: 'Hero หน้าแรก' },
          body: {
            en: 'The first draft leaned on gradient cards and generic graphics and read like a template. After fresh research it became four scenes of the systems the studio builds, with realistic photos and data.',
            th: 'รอบแรกใช้การ์ดไล่สีและกราฟิกทั่วไปจนดูเหมือนเทมเพลต จึงค้นตัวอย่างจากเว็บจริงใหม่ แล้วเปลี่ยนเป็น 4 ฉากของระบบที่รับทำ ใช้ภาพและข้อมูลสมจริง',
          },
          draft: '/images/process/hero-draft.webp',
          final: '/images/process/hero-final.webp',
        },
      ],
    },
    engineering: [
      {
        title: { en: 'Gapless, unique document numbers', th: 'เลขเอกสารไม่ข้าม ไม่ซ้ำ' },
        body: {
          en: 'A counter table is row-locked with SELECT … FOR UPDATE in the same transaction that creates the document, with concurrent-request tests. Voided documents keep their numbers.',
          th: 'ตารางตัวนับล็อกแถวด้วย SELECT … FOR UPDATE ในทรานแซกชันเดียวกับการสร้างเอกสาร และมีเทสต์ยิงคำขอพร้อมกันหลายตัว เอกสารที่ยกเลิกยังเก็บเลขเดิมไว้',
        },
      },
      {
        title: { en: 'Thai PDFs that render correctly', th: 'PDF ภาษาไทยที่สระไม่เพี้ยน' },
        body: {
          en: 'Documents are rendered to HTML with React and converted by Gotenberg (Chromium), because typical PDF libraries misplace Thai vowels and tone marks.',
          th: 'เรนเดอร์เอกสารเป็น HTML ด้วย React แล้วให้ Gotenberg (Chromium) แปลงเป็น PDF เพราะไลบรารี PDF ทั่วไปวางสระและวรรณยุกต์ไทยไม่ถูก',
        },
      },
      {
        title: { en: 'Slip checks before confirming payment', th: 'ตรวจสลิปก่อนยืนยันรับเงิน' },
        body: {
          en: 'Amount, payee, transfer date and reference are matched against the invoice, and reused slips are rejected before an admin confirms and issues a receipt.',
          th: 'เทียบยอดเงิน ผู้รับ วันที่โอน และเลขที่รายการกับใบแจ้งหนี้ กันสลิปที่เคยใช้แล้ว ก่อนแอดมินกดยืนยันและออกใบเสร็จ',
        },
      },
      {
        title: { en: 'Access and security', th: 'สิทธิ์และความปลอดภัย' },
        body: {
          en: 'Google or magic-link sign-in for invited users only, every client query scoped to their own company, real file-type checks on upload, and an audit log for every money action.',
          th: 'ล็อกอินด้วย Google หรือ magic link เฉพาะคนที่ได้รับเชิญ ทุก query ฝั่งลูกค้ากรองตามบริษัทของตัวเอง ตรวจชนิดไฟล์จริงก่อนเก็บ และมี audit log ทุกการกระทำเรื่องเงิน',
        },
      },
    ],
    stack: [
      {
        name: 'Next.js 16 · React 19',
        note: {
          en: 'App Router, Server Actions, Cache Components',
          th: 'App Router, Server Actions, Cache Components',
        },
      },
      {
        name: 'TypeScript · Tailwind 4',
        note: { en: 'design tokens from Figma', th: 'ดีไซน์โทเคนจาก Figma' },
      },
      {
        name: 'MySQL 8 · Drizzle ORM',
        note: { en: 'migrations, transactions', th: 'migrations, ทรานแซกชัน' },
      },
      {
        name: 'Better Auth',
        note: { en: 'Google, magic link, 3 roles', th: 'Google, magic link, บทบาท 3 ระดับ' },
      },
      { name: 'Gotenberg', note: { en: 'HTML → Thai PDF', th: 'HTML → PDF ภาษาไทย' } },
      {
        name: 'React Email · Resend',
        note: { en: '15 notification emails', th: 'อีเมลแจ้งเตือน 15 แบบ' },
      },
      { name: 'Cloudflare R2', note: { en: 'file and slip storage', th: 'เก็บไฟล์และสลิป' } },
      {
        name: 'Vitest · Playwright',
        note: { en: 'server and UI tests', th: 'เทสต์เซิร์ฟเวอร์และหน้าจอ' },
      },
    ],
    next: 'goskillup-lms',
  },
  {
    slug: 'goskillup-lms',
    title: 'GoSkillUp LMS',
    shortTitle: 'GoSkillUp',
    meta: {
      en: 'Final-year project · 2025 — Present',
      th: 'โปรเจกต์จบการศึกษา · 2025 — ปัจจุบัน',
    },
    cardMeta: { en: 'Final-year project · 2025 — Present', th: 'โปรเจกต์จบ · 2025 — ปัจจุบัน' },
    tagline: { en: 'Learning platform', th: 'ระบบเรียนออนไลน์' },
    summary: {
      en: 'A complete learning platform. Learners watch lessons and ask an AI assistant on the same page; admins build courses and quizzes and issue certificates automatically.',
      th: 'ระบบเรียนออนไลน์ครบวงจร ผู้เรียนดูบทเรียนพร้อมถามผู้ช่วย AI ได้ในหน้าเดียว ส่วนแอดมินสร้างคอร์ส แบบทดสอบ และออกใบประกาศอัตโนมัติ',
    },
    cardRole: {
      en: 'Designed and built the front end, back end and Docker deployment',
      th: 'ออกแบบและพัฒนาตั้งแต่ front-end, back-end จนถึง deploy ด้วย Docker',
    },
    tags: ['Next.js', 'Prisma', 'MySQL', 'xAPI', 'Docker'],
    cover: '/images/goskillup/skillbot.webp',
    demo: { url: 'https://lms.hatchweb.dev', login: 'demo_learner · demo1234' },
    lede: {
      en: 'A complete learning platform: build courses, enroll learners, run quizzes, issue certificates, play xAPI content, and get answers from an AI assistant while learning.',
      th: 'ระบบเรียนออนไลน์ครบวงจร สร้างคอร์ส ลงทะเบียน ทำแบบทดสอบ ออกใบประกาศ เล่นเนื้อหา xAPI และมีผู้ช่วย AI ตอบคำถามระหว่างเรียน',
    },
    facts: {
      role: {
        en: 'Designed and built the whole system, from front end and back end to deployment',
        th: 'ออกแบบและพัฒนาทั้งระบบ ตั้งแต่ front-end, back-end จนถึง deploy',
      },
      timeline: { en: '2025 — Present', th: '2025 — ปัจจุบัน' },
      stack: { en: 'Next.js 16 · Prisma · MySQL', th: 'Next.js 16 · Prisma · MySQL' },
      status: {
        en: 'Live demo · still in development',
        th: 'มีเดโมให้ลอง · ยังพัฒนาต่อ',
      },
    },
    overview: {
      problem: {
        en: "A small training team needed an all-in-one learning platform, but off-the-shelf systems charged per user, couldn't run the xAPI packages the team already had, and gave admins little visibility into who had actually completed what.",
        th: 'ทีมฝึกอบรมขนาดเล็กต้องการแพลตฟอร์มเรียนรู้ครบวงจร แต่ระบบสำเร็จรูปคิดราคาต่อผู้ใช้ รองรับแพ็กเกจ xAPI ที่ทีมมีอยู่แล้วไม่ได้ และแอดมินแทบมองไม่เห็นว่าใครเรียนจบอะไรจริงบ้าง',
      },
      solution: {
        en: 'Built on Next.js 16, Prisma and MySQL: a course builder for video, document, quiz or xAPI lessons; enrollment by self sign-up, bulk import or QR code; automatic certificates on completion; and an AI assistant that answers from a knowledge base plus the current lesson.',
        th: 'พัฒนาบน Next.js 16, Prisma และ MySQL มีตัวสร้างคอร์สที่ใส่บทเรียนเป็นวิดีโอ เอกสาร แบบทดสอบ หรือแพ็กเกจ xAPI ลงทะเบียนได้ทั้งสมัครเอง นำเข้าเป็นชุด หรือสแกน QR ออกใบประกาศอัตโนมัติเมื่อเรียนจบ และมีผู้ช่วย AI ที่ตอบจากฐานความรู้ร่วมกับบริบทบทเรียน',
      },
      result: {
        en: 'Admins get 11 reports covering quiz results, learner status, certificates, xAPI statements, chat statistics and the audit log. The whole stack runs from a single docker compose file, and a public demo is online. Development continues, with a redesign that adds a video library and transcripts.',
        th: 'แอดมินมีรายงาน 11 แบบ ครอบคลุมผลสอบ สถานะผู้เรียน ใบประกาศ xAPI statement สถิติการแชต และ audit log ทั้งระบบรันจาก docker compose ไฟล์เดียว และมีเดโมเปิดให้ลองใช้ ตอนนี้ยังพัฒนาต่อ กำลังรีดีไซน์และเพิ่มคลังวิดีโอกับระบบถอดข้อความ',
      },
    },
    features: [
      {
        title: { en: 'Course builder', th: 'ตัวสร้างคอร์ส' },
        body: {
          en: 'Admins create courses by category, add video, document, quiz or xAPI lessons, and switch between draft, published and archived. Groups and roles control who can see and manage what.',
          th: 'แอดมินสร้างคอร์สตามหมวดหมู่ เพิ่มบทเรียนเป็นวิดีโอ เอกสาร แบบทดสอบ หรือแพ็กเกจ xAPI และสลับสถานะร่าง เผยแพร่ หรือเก็บถาวรได้ ระบบกลุ่มและบทบาทกำหนดว่าใครเห็นและจัดการอะไรได้',
        },
        image: '/images/goskillup/courses.webp',
      },
      {
        title: { en: 'Enrollment & progress', th: 'ลงทะเบียนและติดตามความคืบหน้า' },
        body: {
          en: 'Learners self-enroll, are imported in bulk, or scan a QR code. Progress is saved per lesson so they resume where they left off, and a cron job emails a reminder before access expires.',
          th: 'ผู้เรียนสมัครเอง ถูกนำเข้าเป็นชุด หรือสแกน QR เพื่อลงทะเบียน ระบบเก็บความคืบหน้ารายบทเรียนให้เปิดต่อจากจุดที่หยุดได้ และมี cron ส่งอีเมลเตือนก่อนสิทธิ์เรียนหมดอายุ',
        },
        image: '/images/goskillup/progress.webp',
      },
      {
        title: { en: 'Quiz engine', th: 'ระบบแบบทดสอบ' },
        body: {
          en: 'Single-choice questions with a percentage pass mark, on a schema that also supports multiple choice, true/false, short answer and essay. Every attempt stores the score and time for reporting.',
          th: 'คำถามแบบเลือกตอบพร้อมเกณฑ์ผ่านเป็นเปอร์เซ็นต์ บน schema ที่รองรับแบบหลายข้อ ถูก/ผิด ตอบสั้น และอัตนัยไว้ด้วย ทุกครั้งที่ทำจะเก็บคะแนนและเวลาไว้ใช้ในรายงาน',
        },
        image: '/images/goskillup/quiz.webp',
      },
      {
        title: { en: 'Automatic certificates', th: 'ใบประกาศอัตโนมัติ' },
        body: {
          en: 'On completion the system issues a certificate, notifies the learner and renders it on a print-ready PDF template. Admins can issue or revoke certificates and see them all in one report.',
          th: 'เมื่อเรียนจบ ระบบออกใบประกาศ แจ้งเตือนผู้เรียน และแสดงบนเทมเพลตที่พิมพ์เป็น PDF ได้สะอาด แอดมินออกหรือเพิกถอนใบประกาศได้และดูทั้งหมดในรายงานเดียว',
        },
        image: '/images/goskillup/certificates.webp',
      },
      {
        title: {
          en: 'xAPI player and statement store',
          th: 'xAPI player และระบบเก็บ statement',
        },
        body: {
          en: "Uploaded TinCan (.zip) packages are extracted with path and size checks and played in the lesson player. Every statement is stored in the platform's own xAPI endpoint, so imported content counts toward the same progress and reports.",
          th: 'แพ็กเกจ TinCan (.zip) ที่อัปโหลดจะถูกแตกไฟล์พร้อมตรวจ path และขนาด แล้วเปิดในหน้าเล่นบทเรียน statement ทุกรายการเก็บใน xAPI endpoint ของระบบเอง จึงนับรวมในความคืบหน้าและรายงานเดียวกัน',
        },
        image: '/images/goskillup/lrs.webp',
      },
    ],
    engineering: [
      {
        title: {
          en: 'An AI assistant with provider fallback',
          th: 'ผู้ช่วย AI ที่สลับผู้ให้บริการได้',
        },
        body: {
          en: 'SkillBot answers from an admin-curated knowledge base plus lesson context, summarizes YouTube lessons from transcripts, and falls back from Gemini to OpenRouter or Groq when needed.',
          th: 'SkillBot ตอบจากฐานความรู้ที่แอดมินดูแลร่วมกับบริบทบทเรียน สรุปวิดีโอ YouTube จาก transcript และสลับจาก Gemini ไป OpenRouter หรือ Groq ได้เมื่อจำเป็น',
        },
      },
      {
        title: { en: 'A built-in xAPI statement store', th: 'เก็บ xAPI statement เอง' },
        body: {
          en: 'No external LRS. Uploaded packages are checked for path and size before extraction, blocking files that try to write outside their folder.',
          th: 'ไม่พึ่ง LRS ภายนอก แพ็กเกจที่อัปโหลดถูกตรวจ path และขนาดก่อนแตกไฟล์ เพื่อกันไฟล์ที่พยายามเขียนออกนอกโฟลเดอร์',
        },
      },
      {
        title: { en: 'Security and PDPA', th: 'ความปลอดภัยและ PDPA' },
        body: {
          en: 'Rate limiting on auth pages and public forms, recorded cookie consent, and an audit log with configurable retention.',
          th: 'rate limiting บนหน้า auth และฟอร์มสาธารณะ บันทึกความยินยอมคุกกี้ และ audit log ที่กำหนดอายุเก็บได้',
        },
      },
      {
        title: { en: 'One compose file to deploy', th: 'Deploy ด้วย compose ไฟล์เดียว' },
        body: {
          en: 'Web, MySQL, a cron container and Caddy with automatic TLS, plus backup/restore scripts and a health endpoint that checks the database connection.',
          th: 'web, MySQL, คอนเทนเนอร์ cron และ Caddy ทำ TLS อัตโนมัติ มีสคริปต์ backup/restore และ health endpoint ที่ตรวจการเชื่อมต่อฐานข้อมูล',
        },
      },
    ],
    stack: [
      {
        name: 'Next.js 16 · React 19',
        note: { en: '56 pages, 50+ route handlers', th: '56 หน้า, route handler 50+ เส้น' },
      },
      { name: 'Prisma', note: { en: 'typed data model', th: 'data model แบบ typed' } },
      {
        name: 'MySQL 8.4',
        note: { en: 'backup/restore, health check', th: 'backup/restore, health check' },
      },
      { name: 'Tailwind · Recharts', note: { en: 'admin reports', th: 'หน้ารายงานแอดมิน' } },
      { name: 'Docker Compose · Caddy', note: { en: 'automatic TLS', th: 'TLS อัตโนมัติ' } },
      { name: 'Gemini · OpenRouter · Groq', note: { en: 'AI assistant', th: 'ผู้ช่วย AI' } },
      {
        name: 'xAPI / TinCan',
        note: { en: 'standard e-learning content', th: 'เนื้อหามาตรฐาน e-learning' },
      },
      { name: 'Google OAuth', note: { en: 'sign-in', th: 'เข้าสู่ระบบ' } },
    ],
    next: 'workcatch',
  },
  {
    slug: 'workcatch',
    title: 'WorkCatch',
    shortTitle: 'WorkCatch',
    meta: {
      en: 'Personal product · 2026 — Present',
      th: 'โปรดักส์ส่วนตัว · 2026 — ปัจจุบัน',
    },
    cardMeta: {
      en: 'Personal product · 2026 — Present',
      th: 'โปรดักส์ส่วนตัว · 2026 — ปัจจุบัน',
    },
    badge: { en: 'In development', th: 'กำลังพัฒนา' },
    tagline: { en: 'Thai task-capture app', th: 'แอปจดงานภาษาไทย' },
    summary: {
      en: 'A Thai task-capture app. Work that arrives by chat, email or in meetings lands in one place, with dates parsed from plain sentences.',
      th: 'แอปจดงานภาษาไทย งานที่เข้ามาทางแชต อีเมล หรือในห้องประชุมมารวมที่เดียว แยกวันเวลาให้จากประโยคธรรมดา',
    },
    cardRole: {
      en: 'Designed and built the API, web app and LINE integration',
      th: 'ออกแบบและพัฒนา API, เว็บแอป และการเชื่อมต่อ LINE',
    },
    tags: ['Spring Boot', 'React', 'MySQL'],
    cover: '/images/workcatch/board.webp',
    demo: { url: 'https://workcatch.hatchweb.dev' },
    lede: {
      en: 'A Thai task-capture app. Work that arrives by chat, email or in meetings lands in one place: type a plain sentence and it parses the date, with LINE reminders before the deadline by design.',
      th: 'แอปจดงานภาษาไทย งานที่เข้ามาทางแชต อีเมล หรือในห้องประชุมมารวมที่เดียว พิมพ์เป็นประโยคธรรมดาแล้วระบบแยกวันเวลาให้ และออกแบบให้เตือนผ่าน LINE ก่อนถึงกำหนด',
    },
    facts: {
      role: {
        en: 'Designed and built the API, web app and LINE integration',
        th: 'ออกแบบและพัฒนา API, เว็บแอป และการเชื่อมต่อ LINE',
      },
      timeline: { en: '2026 — Present', th: '2026 — ปัจจุบัน' },
      stack: {
        en: 'Spring Boot 3.5 · React 19 · MySQL',
        th: 'Spring Boot 3.5 · React 19 · MySQL',
      },
      status: {
        en: 'Live demo · in development',
        th: 'มีเดโมให้ลอง · กำลังพัฒนา',
      },
    },
    overview: {
      problem: {
        en: "Work reaches one person through many channels: LINE messages, email and things said in meetings. Each promise lives only in memory until someone chases it, and typical to-do apps don't live where Thai work actually arrives.",
        th: 'งานมาถึงคนคนหนึ่งหลายทาง ทั้งข้อความไลน์ อีเมล และคำพูดในห้องประชุม แต่ละคำรับปากอยู่แค่ในความจำจนกว่าจะมีคนทวง และแอป to-do ทั่วไปไม่ได้อยู่ในช่องทางที่งานเข้ามาจริงของคนไทย',
      },
      solution: {
        en: 'Built across every layer: a Spring Boot API that checks ownership on every resource, a Thai parser that turns "remind me to send the report tomorrow at 10" into a draft task, a reminder system that plans, claims and logs every send, and a Thai React web app with an admin console.',
        th: 'พัฒนาครบทุกชั้น: Spring Boot API ที่ตรวจสิทธิ์เจ้าของทุก resource, ตัวแยกวิเคราะห์ภาษาไทยที่แปลง "เตือนส่งรายงานพรุ่งนี้ 10 โมง" เป็นงานฉบับร่าง, ระบบแจ้งเตือนที่วางแผน จอง และบันทึกการส่งทุกครั้ง และเว็บแอป React ภาษาไทยพร้อมคอนโซลแอดมิน',
      },
      result: {
        en: 'So far: 22 entities, 59 endpoints, 26 screens and 25 backend test classes. The LINE integration is written and tested against a stub, not yet connected to a real channel.',
        th: 'ตอนนี้มี entity 22 ตัว endpoint 59 เส้น หน้าจอ 26 หน้า และ test class ฝั่ง backend 25 ชุด การเชื่อม LINE เขียนและทดสอบกับ stub แล้ว ยังไม่ได้ต่อกับ channel จริง',
      },
    },
    features: [
      {
        title: { en: 'Natural Thai capture', th: 'จดงานด้วยภาษาไทยธรรมชาติ' },
        body: {
          en: 'Reads phrases like "tomorrow at 10" and creates a draft task. For ambiguous words like "five o\'clock" (morning or evening) it leaves the deadline empty and offers the possible meanings instead of guessing.',
          th: 'อ่านวลีอย่าง "พรุ่งนี้ 10 โมง" แล้วสร้างงานฉบับร่าง ถ้าเจอคำกำกวมอย่าง "ห้าโมง" จะสร้างร่างที่ยังไม่ใส่กำหนด พร้อมให้เลือกความหมายที่เป็นไปได้ แทนการเดา',
        },
        image: '/images/workcatch/inbox.webp',
      },
      {
        title: { en: 'Reminders through LINE', th: 'เตือนผ่าน LINE' },
        body: {
          en: 'Plans reminders ahead of each deadline, claims them so each is sent at most once, and logs every attempt. Without a channel token the sender falls back to a stub that only writes logs.',
          th: 'วางแผนการเตือนล่วงหน้าก่อนกำหนดส่ง จองรายการให้ส่งได้ไม่เกินหนึ่งครั้ง และบันทึกทุกความพยายาม ถ้ายังไม่ตั้งค่า token ตัวส่งจะสลับเป็น stub ที่เขียน log แทน',
        },
        image: '/images/workcatch/reminders.webp',
      },
      {
        title: { en: 'Knowledge attached to the work', th: 'ความรู้ติดอยู่กับงาน' },
        body: {
          en: 'Every task can carry a "how this is done" note: block content with version history, tags, pins, trash with restore, and full-text search.',
          th: 'งานทุกชิ้นแนบโน้ต "งานนี้ทำยังไง" ได้ เนื้อหาแบบบล็อก มีเวอร์ชันย้อนกลับได้ ติดแท็ก ปักหมุด ถังขยะพร้อมกู้คืน และค้นหาเต็มรูปแบบ',
        },
        image: '/images/workcatch/note.webp',
      },
      {
        title: {
          en: 'Encrypted secrets with audited reveal',
          th: 'ข้อมูลลับเข้ารหัสพร้อมบันทึกการเปิดดู',
        },
        body: {
          en: 'Task passwords live in an encrypted block. Revealing one requires an unlock code, and every reveal is written to an audit trail.',
          th: 'รหัสผ่านของงานเก็บในบล็อกที่เข้ารหัส การเปิดดูต้องยืนยันด้วย unlock code และทุกการเปิดดูถูกบันทึกลง audit trail',
        },
        image: '/images/workcatch/secrets.webp',
      },
      {
        title: { en: 'Security from day one', th: 'ความปลอดภัยตั้งแต่วันแรก' },
        body: {
          en: "LINE Login verifies signatures against LINE's JWKS with a pinned algorithm, and the webhook checks HMAC on raw bytes so Thai messages verify correctly.",
          th: 'LINE Login ตรวจลายเซ็นกับ JWKS ของ LINE โดยล็อกอัลกอริทึมไว้ และ webhook ตรวจ HMAC บนไบต์ดิบเพื่อให้ข้อความไทยตรวจผ่านถูกต้อง',
        },
        image: '/images/workcatch/login.webp',
      },
    ],
    engineering: [
      {
        title: { en: 'A Thai date parser', th: 'ตัวแยกวันเวลาภาษาไทย' },
        body: {
          en: 'About 500 hand-written lines handling phrases like "tomorrow", "2 p.m." and "10 o\'clock", asking back when the meaning is ambiguous instead of guessing a wrong time.',
          th: 'เขียนเองราว 500 บรรทัด รองรับวลีอย่าง "พรุ่งนี้" "บ่ายสอง" "10 โมง" และเลือกถามกลับเมื่อความหมายกำกวม แทนการเดาแล้วตั้งเวลาผิด',
        },
      },
      {
        title: { en: 'An AI assistant with limits', th: 'ผู้ช่วย AI ที่มีขอบเขต' },
        body: {
          en: "An AI side panel answers from the user's own tasks and projects, and suggests each day's priorities. Habit memory is opt-in, every user has a daily quota, and suggestion outcomes (accepted, edited, dismissed) are logged and purged after 90 days.",
          th: 'แผงผู้ช่วย AI ด้านข้างตอบจากงานและโปรเจกต์ของผู้ใช้เอง และแนะนำงานที่ควรทำก่อนในแต่ละวัน การจำพฤติกรรมเปิดใช้เมื่อผู้ใช้ยินยอม มีโควตารายวันต่อคน และบันทึกผลคำแนะนำ (รับ แก้ ปัด) แล้วลบทิ้งหลัง 90 วัน',
        },
      },
      {
        title: { en: 'At-most-once reminders', th: 'ส่งเตือนไม่เกินหนึ่งครั้ง' },
        body: {
          en: 'The scheduler claims each item before sending, preventing duplicates across workers, and records every attempt for later review.',
          th: 'ตัวจัดตารางจองรายการก่อนส่ง กันการส่งซ้ำเมื่อมีหลาย worker และบันทึกผลทุกความพยายามไว้ตรวจย้อนหลัง',
        },
      },
      {
        title: {
          en: 'No cross-user access on any endpoint',
          th: 'กันข้ามผู้ใช้ทุก endpoint',
        },
        body: {
          en: 'Every resource uses a public UUID, and a test walks every owner-bound endpoint from the request mappings, asserting a 404 for non-owners.',
          th: 'ทุก resource อ้างด้วย UUID สาธารณะ มีเทสต์ที่ไล่ทุก endpoint ที่ผูกกับเจ้าของจาก request mapping และยืนยันว่าได้ 404 เมื่อไม่ใช่เจ้าของ',
        },
      },
      {
        title: { en: 'Separated database privileges', th: 'สิทธิ์ฐานข้อมูลแยกกัน' },
        body: {
          en: 'Flyway uses a dedicated DDL account while the running app only has CRUD rights, and migrations are tested with Testcontainers.',
          th: 'Flyway ใช้บัญชีแยกสำหรับ DDL ส่วนแอปตอนรันมีสิทธิ์แค่ CRUD และทดสอบ migration ด้วย Testcontainers',
        },
      },
    ],
    stack: [
      {
        name: 'Spring Boot 3.5 · Java 17',
        note: { en: 'JPA 25 entity, 85 endpoint', th: 'JPA 25 entity, 85 endpoint' },
      },
      { name: 'MySQL 8 · Flyway', note: { en: '19 migrations', th: 'migration 19 ชุด' } },
      {
        name: 'React 19 · Vite',
        note: { en: '26 screens, fully Thai', th: '26 หน้า ภาษาไทยทั้งหมด' },
      },
      {
        name: 'TanStack Query · React Router',
        note: { en: 'data fetching and routing', th: 'ข้อมูลและ routing' },
      },
      {
        name: 'LINE Login · Messaging API',
        note: { en: 'OIDC + PKCE, webhook HMAC', th: 'OIDC + PKCE, webhook HMAC' },
      },
      {
        name: 'Testcontainers',
        note: { en: 'migration tests on real MySQL', th: 'เทสต์ migration กับ MySQL จริง' },
      },
      { name: 'JUnit', note: { en: '42 test classes', th: 'test class 42 ชุด' } },
      { name: 'Docker', note: { en: 'local database', th: 'ฐานข้อมูลตอนพัฒนา' } },
    ],
    next: 'hatch-dev',
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
