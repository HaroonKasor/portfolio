import type { ExperienceEntry, InHouseWork } from './types';

export const experience: ExperienceEntry[] = [
  {
    id: 'learntech',
    highlight: true,
    period: { en: 'Aug 2024 — Present', th: 'ส.ค. 2024 — ปัจจุบัน' },
    title: { en: 'Junior Developer · Learn Tech', th: 'Junior Developer · Learn Tech' },
    body: {
      en: 'Build and maintain the company LMS and client systems across Next.js and Java: an xAPI learning record store, an AI chat that answers from lesson videos, an exam bank, and a member website for a client organization.',
      th: 'พัฒนาและดูแล LMS ของบริษัทและระบบของลูกค้า ทั้งฝั่ง Next.js และ Java: ระบบเก็บข้อมูลการเรียน (xAPI) แชต AI ที่ตอบจากวิดีโอบทเรียน ระบบคลังข้อสอบ และเว็บสมาชิกขององค์กรลูกค้า',
    },
    tags: ['Java', 'Spring Boot', 'Next.js', 'MySQL', 'xAPI'],
  },
  {
    id: 'goskillup',
    period: { en: '2025 — Present', th: '2025 — ปัจจุบัน' },
    title: {
      en: 'Final-year project · GoSkillUp LMS',
      th: 'โปรเจกต์จบ · GoSkillUp LMS',
    },
    body: {
      en: 'A complete learning platform: course builder, enrollment, quizzes, automatic certificates, xAPI content and an AI assistant. Designed and built from UI to deployment.',
      th: 'ระบบเรียนออนไลน์ครบวงจร: สร้างคอร์ส ลงทะเบียน แบบทดสอบ ใบประกาศอัตโนมัติ เนื้อหา xAPI และผู้ช่วย AI ออกแบบและพัฒนาตั้งแต่หน้าจอจนถึง deploy',
    },
    tags: ['Next.js', 'Prisma', 'MySQL', 'Docker'],
  },
  {
    id: 'degree',
    period: { en: '2022 — 2027 (expected)', th: '2022 — 2027 (คาดว่าจบ)' },
    title: {
      en: 'B.Eng. Computer & Electronics Engineering',
      th: 'วศ.บ. วิศวกรรมคอมพิวเตอร์และอิเล็กทรอนิกส์',
    },
    body: {
      en: 'Ramkhamhaeng University · Bangkok',
      th: 'มหาวิทยาลัยรามคำแหง · กรุงเทพฯ',
    },
    tags: [],
  },
];

/** Client work at Learn Tech. Client names are withheld on purpose; only the
 * industry is named. */
export const inHouseWork: InHouseWork[] = [
  {
    title: {
      en: 'Core LMS & Learning Record Store',
      th: 'LMS หลักและ Learning Record Store',
    },
    body: {
      en: 'The company LMS front end in Next.js and an xAPI learning record store in Java: audit log, trash and PDPA anonymization',
      th: 'หน้าเว็บ LMS ของบริษัทด้วย Next.js และระบบเก็บข้อมูลการเรียน (xAPI) ด้วย Java: audit log, ถังขยะและ anonymize ตาม PDPA',
    },
    stack: 'Next.js · Java',
    period: '2024 —',
  },
  {
    title: { en: 'AI Q&A from lesson videos', th: 'AI ถามตอบจากวิดีโอบทเรียน' },
    body: {
      en: 'Petrochemical manufacturer · an AI chat grounded in video transcripts, and certificate templates previewed with real data',
      th: 'องค์กรอุตสาหกรรมปิโตรเคมี · แชต AI ที่ตอบโดยอ้างอิงคำถอดเสียงของวิดีโอ และเทมเพลตใบประกาศที่พรีวิวด้วยข้อมูลจริง',
    },
    stack: 'Java · Python',
    period: '2026',
  },
  {
    title: { en: 'Exam bank', th: 'ระบบคลังข้อสอบ' },
    body: {
      en: 'Answer autosave, review and submit flows, and retry-safe result delivery to the LMS, with unit tests',
      th: 'บันทึกคำตอบอัตโนมัติ ทบทวนและส่งข้อสอบ และส่งผลสอบเข้า LMS ซ้ำได้อย่างปลอดภัยเมื่อล้มเหลว พร้อม unit test',
    },
    stack: 'Java · Next.js',
    period: '2026',
  },
  {
    title: {
      en: 'Expert network site for a research institute',
      th: 'เว็บเครือข่ายผู้เชี่ยวชาญของสถาบันวิจัย',
    },
    body: {
      en: 'Environmental health · GA4 cookie consent, interest selection at sign-up, and a visitor counter',
      th: 'ด้านอนามัยสิ่งแวดล้อม · ระบบยินยอมคุกกี้ GA4, เลือกหัวข้อที่สนใจตอนสมัครสมาชิก, ตัวนับผู้เข้าชม',
    },
    stack: 'React · Strapi',
    period: '2026',
  },
];
