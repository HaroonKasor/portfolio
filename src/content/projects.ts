import type { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'goskillup-lms',
    index: '01',
    badge: 'NEXT.JS',
    tags: ['Next.js', 'Prisma', 'MySQL', 'Docker'],
    cover: { from: '#3B47FF', to: '#262EBF', image: '/images/goskillup.webp' },
    title: {
      en: 'GoSkillUp LMS Platform',
      th: 'GoSkillUp LMS Platform',
    },
    summary: {
      en: 'Final-year project, live at goskillup.me: course builder, enrollment, quizzes, certificates, xAPI content with a statement store, an AI learning assistant and a full admin reporting suite.',
      th: 'โปรเจกต์จบ ใช้งานจริงที่ goskillup.me มีระบบสร้างคอร์ส ลงทะเบียน แบบทดสอบ ใบประกาศ เนื้อหา xAPI พร้อมระบบเก็บ statement ผู้ช่วย AI และรายงานสำหรับแอดมินครบชุด',
    },
    role: {
      en: 'Developer — design, front-end, back-end, deployment',
      th: 'พัฒนาตั้งแต่ออกแบบ front-end back-end จนถึง deploy',
    },
    period: { en: '2025 — 2026', th: '2025 — 2026' },
    kind: { en: 'Final year project', th: 'โปรเจกต์จบการศึกษา' },
    stack: [
      {
        name: 'Next.js',
        slug: 'nextdotjs',
        note: {
          en: 'Next.js 16 App Router with React 19: 56 pages for learners and admins plus 50+ route handlers under /api.',
          th: 'Next.js 16 App Router กับ React 19 มีหน้าเว็บ 56 หน้าสำหรับผู้เรียนและแอดมิน และ route handler ใต้ /api อีกกว่า 50 เส้น',
        },
      },
      {
        name: 'Prisma',
        slug: 'prisma',
        note: {
          en: 'Typed data model for users, courses, sections, enrollments, quiz attempts, certificates, notifications and xAPI statements.',
          th: 'data model แบบ typed สำหรับผู้ใช้ คอร์ส บทเรียน การลงทะเบียน ผลสอบ ใบประกาศ การแจ้งเตือน และ xAPI statement',
        },
      },
      {
        name: 'MySQL',
        slug: 'mysql',
        note: {
          en: 'MySQL 8.4 behind the Prisma MariaDB adapter, with backup and restore scripts and a health endpoint that checks connectivity.',
          th: 'MySQL 8.4 ผ่าน Prisma MariaDB adapter พร้อมสคริปต์ backup/restore และ health endpoint ที่ตรวจการเชื่อมต่อฐานข้อมูล',
        },
      },
      {
        name: 'Tailwind CSS',
        slug: 'tailwindcss',
        note: {
          en: 'Responsive learner, course player and admin dashboard layouts, with Recharts for the reporting screens.',
          th: 'layout responsive ของหน้าผู้เรียน หน้าเล่นบทเรียน และแดชบอร์ดแอดมิน ใช้ Recharts สำหรับหน้ารายงาน',
        },
      },
      {
        name: 'Docker',
        slug: 'docker',
        note: {
          en: 'Compose stack of web, MySQL, a cron container for enrollment reminders and phpMyAdmin, fronted by Caddy with automatic TLS on goskillup.me.',
          th: 'Compose stack ประกอบด้วย web, MySQL, คอนเทนเนอร์ cron สำหรับแจ้งเตือนการลงทะเบียน และ phpMyAdmin โดยมี Caddy ทำ TLS อัตโนมัติที่ goskillup.me',
        },
      },
    ],
    links: {
      demo: 'https://goskillup.me',
      repo: 'https://github.com/HaroonKasor/lms',
      report: '/docs/goskillup-project-report.pdf',
    },
    overview: {
      problem: {
        en: 'Small training teams need a complete learning platform, but off-the-shelf systems are priced per seat, cannot host the xAPI packages those teams already own, and give admins little visibility into who actually finished what.',
        th: 'ทีมฝึกอบรมขนาดเล็กต้องการแพลตฟอร์มเรียนรู้ครบวงจร แต่ระบบสำเร็จรูปคิดราคาต่อผู้ใช้ รองรับแพ็กเกจ xAPI ที่ทีมมีอยู่แล้วไม่ได้ และแอดมินแทบมองไม่เห็นว่าใครเรียนจบอะไรจริงบ้าง',
      },
      solution: {
        en: 'I built GoSkillUp end to end on Next.js 16, Prisma and MySQL: a course builder with sections of video, documents, quizzes and uploaded xAPI packages; enrollment by self-service, batch import or QR link; a quiz engine with percentage pass marks and stored attempts; certificates issued automatically on completion; an xAPI statement store with an admin viewer; and an AI assistant backed by Gemini that answers from a curated knowledge base plus the current lesson and summarises lesson videos.',
        th: 'ผมพัฒนา GoSkillUp เองทั้งระบบบน Next.js 16, Prisma และ MySQL มีตัวสร้างคอร์สที่ใส่บทเรียนเป็นวิดีโอ เอกสาร แบบทดสอบ หรือแพ็กเกจ xAPI ที่อัปโหลดได้ ลงทะเบียนได้ทั้งแบบสมัครเอง นำเข้าเป็นชุด หรือสแกน QR มี quiz engine กำหนดเกณฑ์ผ่านเป็นเปอร์เซ็นต์และเก็บผลทุกครั้ง ออกใบประกาศอัตโนมัติเมื่อเรียนจบ มีระบบเก็บ xAPI statement พร้อมหน้าดูสำหรับแอดมิน และผู้ช่วย AI ที่ใช้ Gemini ตอบจากฐานความรู้ที่ดูแลไว้ร่วมกับบริบทบทเรียนที่กำลังเรียน และสรุปวิดีโอบทเรียนให้',
      },
      result: {
        en: 'A platform running in production at goskillup.me. Admins get eleven reports covering attempts, exam scores, learner status, certificates, xAPI statements, chat analytics and an audit log with retention, plus rate limiting on auth and public forms, PDPA cookie-consent logging, Google sign-in and email reminders before an enrollment expires. The whole stack starts from one docker compose file.',
        th: 'ได้แพลตฟอร์มที่รันใช้งานจริงที่ goskillup.me แอดมินมีรายงาน 11 แบบ ครอบคลุมการทำแบบทดสอบ คะแนนสอบ สถานะผู้เรียน ใบประกาศ xAPI statement สถิติการแชต และ audit log ที่กำหนดอายุเก็บได้ พร้อม rate limiting บนหน้า auth และฟอร์มสาธารณะ บันทึกความยินยอมคุกกี้ตาม PDPA เข้าระบบด้วย Google และอีเมลเตือนก่อนสิทธิ์เรียนหมดอายุ ทั้งระบบสั่งรันจาก docker compose ไฟล์เดียว',
      },
    },
    features: [
      {
        title: { en: 'Course builder', th: 'ตัวสร้างคอร์ส' },
        body: {
          en: 'Admins create courses by category, add sections of video, document, quiz or xAPI package content, and move a course between draft, published and archived. Groups and roles control who can see and manage what.',
          th: 'แอดมินสร้างคอร์สตามหมวดหมู่ เพิ่มบทเรียนเป็นวิดีโอ เอกสาร แบบทดสอบ หรือแพ็กเกจ xAPI และสลับสถานะร่าง เผยแพร่ หรือเก็บถาวรได้ ระบบกลุ่มและบทบาทกำหนดว่าใครเห็นและจัดการอะไรได้',
        },
        shot: { en: 'Course library', th: 'หน้าจัดการคอร์ส' },
        image: '/images/goskillup/courses.webp',
      },
      {
        title: { en: 'Enrollment & progress', th: 'ลงทะเบียนและติดตามความคืบหน้า' },
        body: {
          en: 'Learners self-enroll, get imported in a batch, or scan a QR enrollment link. Progress is stored per section so the player resumes where they stopped, and a cron job emails learners before an enrollment expires.',
          th: 'ผู้เรียนสมัครเอง ถูกนำเข้าเป็นชุด หรือสแกน QR เพื่อลงทะเบียน ระบบเก็บความคืบหน้ารายบทเรียนให้เปิดต่อจากจุดที่หยุดได้ และมี cron ส่งอีเมลเตือนก่อนสิทธิ์เรียนหมดอายุ',
        },
        shot: { en: 'Training results', th: 'หน้าผลการเรียน' },
        image: '/images/goskillup/progress.webp',
      },
      {
        title: { en: 'Quiz engine', th: 'ระบบแบบทดสอบ' },
        body: {
          en: 'Single-choice questions with a percentage pass mark, on a schema that also models multiple choice, true/false, short answer and essay. Every attempt is stored with its score and time, feeding the attempt and exam score reports.',
          th: 'คำถามแบบเลือกตอบข้อเดียวพร้อมเกณฑ์ผ่านเป็นเปอร์เซ็นต์ บน schema ที่รองรับแบบหลายข้อ ถูก/ผิด ตอบสั้น และอัตนัยไว้ด้วย ทุกครั้งที่ทำจะเก็บคะแนนและเวลาไว้ใช้ในรายงานผลสอบ',
        },
        shot: { en: 'Post-lesson quiz', th: 'แบบทดสอบหลังบท' },
        image: '/images/goskillup/quiz.webp',
      },
      {
        title: { en: 'Automatic certificates', th: 'ใบประกาศอัตโนมัติ' },
        body: {
          en: 'When a learner completes a course the system issues a certificate, notifies them, and renders it on a designed template that prints cleanly to PDF. Admins can issue or revoke certificates and see them all in one report.',
          th: 'เมื่อผู้เรียนเรียนจบ ระบบออกใบประกาศ แจ้งเตือนผู้เรียน และแสดงบนเทมเพลตที่ออกแบบไว้ให้พิมพ์เป็น PDF ได้สะอาด แอดมินออกหรือเพิกถอนใบประกาศได้และดูทั้งหมดในรายงานเดียว',
        },
        shot: { en: 'Certificate preview', th: 'ตัวอย่างใบประกาศ' },
        image: '/images/goskillup/certificates.webp',
      },
      {
        title: { en: 'xAPI player and statement store', th: 'xAPI player และระบบเก็บ statement' },
        body: {
          en: 'Uploaded TinCan zip packages are extracted with path and size checks, launched inside the course player, and every statement they send lands in the platform’s own xAPI endpoint, so imported content counts toward the same progress and reports as native lessons.',
          th: 'แพ็กเกจ TinCan (.zip) ที่อัปโหลดจะถูกแตกไฟล์พร้อมตรวจ path และขนาด แล้วเปิดในหน้าเล่นบทเรียน statement ทุกรายการที่ส่งออกมาจะเก็บใน xAPI endpoint ของระบบเอง เนื้อหาที่นำเข้าจึงนับรวมในความคืบหน้าและรายงานเดียวกับบทเรียนปกติ',
        },
        shot: { en: 'LRS statement viewer', th: 'หน้าดู xAPI statement' },
        image: '/images/goskillup/lrs.webp',
      },
      {
        title: { en: 'AI learning assistant', th: 'ผู้ช่วย AI สำหรับผู้เรียน' },
        body: {
          en: 'SkillBot answers learner questions from an admin-curated knowledge base plus the current lesson’s context, summarises YouTube lessons from their transcripts, and falls back from Gemini to OpenRouter or Groq. Logged-in learners can rate each answer, and the ratings feed chat analytics and a weekly feedback breakdown.',
          th: 'SkillBot ตอบคำถามผู้เรียนจากฐานความรู้ที่แอดมินดูแลเอง ร่วมกับบริบทของบทเรียนที่กำลังเรียน สรุปบทเรียน YouTube จาก transcript และสลับจาก Gemini ไป OpenRouter หรือ Groq ได้เมื่อจำเป็น ผู้เรียนที่ล็อกอินให้คะแนนแต่ละคำตอบได้ และคะแนนถูกนำไปทำสถิติการแชตกับสรุปผลตอบรับรายสัปดาห์',
        },
        shot: { en: 'SkillBot chat', th: 'หน้าแชต SkillBot' },
        image: '/images/goskillup/skillbot.webp',
      },
    ],
    next: 'learntech-lms',
  },
  {
    slug: 'learntech-lms',
    index: '02',
    badge: 'NEXT.JS + JAVA',
    tags: ['Next.js', 'Java', 'MySQL', 'xAPI'],
    cover: { from: '#FF9E6B', to: '#E65233', image: '/images/learntech-lms.webp' },
    title: { en: 'Learn Tech LMS', th: 'LMS ของ Learn Tech' },
    summary: {
      en: 'The company’s main LMS and xAPI learning record store. I own the audit log, PDPA trash and anonymisation, xAPI-tracked video learning, the AI transcript service and the admin dashboard across the Java backend and Next.js frontend.',
      th: 'แพลตฟอร์ม LMS หลักของบริษัทพร้อม xAPI learning record store ผมรับผิดชอบ audit log, ถังขยะและการ anonymize ตาม PDPA, วิดีโอเรียนรู้ที่ติดตามด้วย xAPI, บริการถอดเสียงด้วย AI และแดชบอร์ดแอดมิน ทั้งฝั่ง Java backend และ Next.js frontend',
    },
    role: {
      en: 'Full-stack developer, core platform team',
      th: 'Full-stack developer ทีมแพลตฟอร์มหลัก',
    },
    period: { en: '2024 — now', th: '2024 — ปัจจุบัน' },
    kind: { en: 'Production platform', th: 'ระบบที่ใช้งานจริง' },
    stack: [
      {
        name: 'Next.js',
        slug: 'nextdotjs',
        note: {
          en: 'Next.js 15 App Router with React 19 and TypeScript: 55 admin screens and 87 API routes that act as a proxy layer in front of the Java backend.',
          th: 'Next.js 15 App Router กับ React 19 และ TypeScript หน้าแอดมิน 55 หน้า และ API route 87 เส้นที่ทำหน้าที่เป็นชั้น proxy หน้า Java backend',
        },
      },
      {
        name: 'Java / Spring MVC',
        slug: 'spring',
        note: {
          en: 'The learning record store: Spring MVC and Hibernate on Tomcat, 23 admin API controllers and 127 endpoints implementing xAPI statements, activities, agents and Tin Can launch.',
          th: 'ตัว learning record store: Spring MVC และ Hibernate บน Tomcat มี admin API controller 23 ตัว และ endpoint 127 เส้น รองรับ xAPI statement, activities, agents และการเปิดแพ็กเกจ Tin Can',
        },
      },
      {
        name: 'Spring Boot',
        slug: 'springboot',
        note: {
          en: 'A separate Spring Boot 4 microservice on Java 17 that I wrote: async transcript extraction with yt-dlp, ffmpeg and faster-whisper, delivered by callback.',
          th: 'microservice แยกบน Spring Boot 4 และ Java 17 ที่ผมเขียน ถอดเสียงแบบ async ด้วย yt-dlp, ffmpeg และ faster-whisper แล้วส่งผลกลับผ่าน callback',
        },
      },
      {
        name: 'MySQL',
        slug: 'mysql',
        note: {
          en: 'Thirteen migration scripts I authored: the audit log table with seven indexes, the soft-delete column, transcript tables, ownership scoping and social-content fields.',
          th: 'สคริปต์ migration 13 ชุดที่ผมเขียนเอง: ตาราง audit log พร้อม index 7 ตัว คอลัมน์ soft delete ตาราง transcript การจำกัดสิทธิ์ตามเจ้าของ และฟิลด์ของ social content',
        },
      },
      {
        name: 'xAPI',
        note: {
          en: 'Statements emitted from the video player with standard and custom verbs, stored in the LRS and read back in the admin statement viewer.',
          th: 'statement จาก video player ทั้ง verb มาตรฐานและ verb ที่กำหนดเอง เก็บใน LRS และดูย้อนหลังได้ในหน้า statement viewer ของแอดมิน',
        },
      },
    ],
    links: { internal: true },
    overview: {
      problem: {
        en: 'Client organisations run the platform for their own staff and need answers on demand: who changed what in the admin console, where a deleted user’s data went and whether it is recoverable, and why a learner shows a given completion state. The platform also needed video-based learning tracked to the same standard as imported content.',
        th: 'องค์กรลูกค้าใช้แพลตฟอร์มนี้กับพนักงานของตัวเอง และต้องการคำตอบทันที: ใครแก้อะไรในหน้าแอดมิน ข้อมูลของผู้ใช้ที่ถูกลบไปอยู่ไหนและกู้คืนได้ไหม และทำไมผู้เรียนถึงมีสถานะเรียนจบแบบนั้น นอกจากนี้ยังต้องมีการเรียนรู้ผ่านวิดีโอที่ติดตามด้วยมาตรฐานเดียวกับเนื้อหาที่นำเข้า',
      },
      solution: {
        en: 'I built these areas end to end across three codebases. On the Java backend: a request interceptor that writes an audit entry for every non-read admin call, a soft-delete flow with a 30-day trash and a daily job that anonymises instead of deleting, the social-content and social-course APIs, and the transcript approval and sync endpoints. On the Next.js frontend: the audit log viewer with CSV and Excel export, the trash view with a restore countdown, a 2,000-line video learning shell that emits xAPI statements, the statement viewer and the admin dashboard with drill-downs. Plus a standalone Spring Boot service that turns YouTube links or uploaded video into Thai transcripts.',
        th: 'ผมพัฒนาส่วนเหล่านี้ครบทุกชั้นใน 3 codebase ฝั่ง Java backend: interceptor ที่เขียน audit entry ให้ทุกคำสั่งแอดมินที่ไม่ใช่การอ่าน, soft delete พร้อมถังขยะ 30 วันและงานรายวันที่ anonymize แทนการลบ, API ของ social content และ social course, และ endpoint สำหรับอนุมัติและ sync transcript ฝั่ง Next.js: หน้าดู audit log พร้อม export CSV และ Excel, หน้าถังขยะพร้อมนับถอยหลังก่อนกู้คืน, video learning shell ราว 2,000 บรรทัดที่ส่ง xAPI statement, หน้า statement viewer และแดชบอร์ดแอดมินแบบเจาะลึกได้ รวมถึง Spring Boot service แยกที่แปลงลิงก์ YouTube หรือวิดีโอที่อัปโหลดเป็น transcript ภาษาไทย',
      },
      result: {
        en: 'Client administrators answer audit questions in the console and export the evidence themselves instead of asking for a database query. A deletion is one action with a 30-day undo, and learning records survive the purge because personal fields are overwritten rather than rows removed. Video lessons count toward the same progress and reports as imported packages, and lesson transcripts go from upload to an approved, synced text without leaving the admin console.',
        th: 'แอดมินของลูกค้าตอบคำถามด้าน audit และ export หลักฐานได้เองในหน้าแอดมิน ไม่ต้องขอ query จากทีมพัฒนา การลบผู้ใช้เป็นคำสั่งเดียวที่ย้อนกลับได้ภายใน 30 วัน และประวัติการเรียนยังอยู่ครบหลัง purge เพราะเขียนทับเฉพาะข้อมูลส่วนตัวแทนการลบแถว บทเรียนวิดีโอนับรวมในความคืบหน้าและรายงานเดียวกับแพ็กเกจที่นำเข้า และ transcript ของบทเรียนไปตั้งแต่อัปโหลดจนถึงข้อความที่อนุมัติและ sync แล้วโดยไม่ต้องออกจากหน้าแอดมิน',
      },
    },
    features: [
      {
        title: { en: 'System-wide audit log', th: 'Audit log ทั้งระบบ' },
        body: {
          en: 'A Spring handler interceptor records every non-read admin request: actor, HTTP method, derived action and entity, target id, status code, address and user agent, into a 15-column table with seven indexes. The console lists it with eight filters and paging on an indexed sort, and exports the filtered result as CSV or Excel.',
          th: 'Spring handler interceptor บันทึกทุกคำสั่งแอดมินที่ไม่ใช่การอ่าน: ผู้กระทำ HTTP method, action และ entity ที่อนุมานได้, id เป้าหมาย, status code, address และ user agent ลงตาราง 15 คอลัมน์พร้อม index 7 ตัว หน้าแอดมินแสดงพร้อมตัวกรอง 8 ตัวและแบ่งหน้าโดยเรียงตามคอลัมน์ที่ทำ index ไว้ และ export ผลที่กรองแล้วเป็น CSV หรือ Excel',
        },
        shot: { en: 'Audit log viewer', th: 'หน้าดู audit log' },
      },
      {
        title: { en: 'PDPA trash, restore and anonymisation', th: 'ถังขยะ กู้คืน และ anonymize ตาม PDPA' },
        body: {
          en: 'Deleting a user stamps a delete date instead of removing the row. The trash view shows a live countdown and a restore button for 30 days, and re-registering a trashed email is refused with a clear message. A daily job then overwrites the username, email, name, phone, employee id, job title and password while keeping enrollments and completions intact.',
          th: 'การลบผู้ใช้จะประทับวันที่ลบแทนการลบแถว หน้าถังขยะแสดงเวลานับถอยหลังและปุ่มกู้คืนภายใน 30 วัน และปฏิเสธการสมัครซ้ำด้วยอีเมลที่อยู่ในถังขยะพร้อมข้อความชัดเจน จากนั้นงานรายวันจะเขียนทับ username อีเมล ชื่อ เบอร์โทร รหัสพนักงาน ตำแหน่งงาน และรหัสผ่าน โดยคงข้อมูลการลงทะเบียนและการเรียนจบไว้ครบ',
        },
        shot: { en: 'Trash view with countdown', th: 'หน้าถังขยะพร้อมนับถอยหลัง' },
      },
      {
        title: { en: 'Video learning tracked with xAPI', th: 'วิดีโอเรียนรู้ที่ติดตามด้วย xAPI' },
        body: {
          en: 'Curated YouTube or uploaded videos grouped into courses. The player I built sends played, resumed, paused, seeked, completed and exited statements to the LRS, resumes at the last position, and on courses set to lock forward seeking it stops learners skipping ahead until a lesson is finished, with free seeking unlocked for review.',
          th: 'วิดีโอจาก YouTube หรือที่อัปโหลดเอง จัดกลุ่มเป็นคอร์ส player ที่ผมสร้างส่ง statement played, resumed, paused, seeked, completed และ exited ไปยัง LRS เปิดต่อจากตำแหน่งล่าสุด และในคอร์สที่ตั้งค่าล็อกการเลื่อนไปข้างหน้าจะกันการข้ามไปข้างหน้าจนกว่าจะเรียนจบบท โดยปลดล็อกให้เลื่อนอิสระตอนทบทวน',
        },
        shot: { en: 'Video learning player', th: 'หน้าเล่นวิดีโอเรียนรู้' },
      },
      {
        title: { en: 'AI transcript pipeline', th: 'ระบบถอดเสียงด้วย AI' },
        body: {
          en: 'A standalone Spring Boot 4 service pulls audio with yt-dlp, converts it with ffmpeg and transcribes Thai speech with faster-whisper on CPU, then posts the result back by callback. The LMS stores it as pending review, an admin approves the text, and the approved transcript syncs to the course section.',
          th: 'Spring Boot 4 service แยกดึงเสียงด้วย yt-dlp แปลงด้วย ffmpeg และถอดเสียงภาษาไทยด้วย faster-whisper บน CPU แล้วส่งผลกลับผ่าน callback ระบบ LMS เก็บเป็นสถานะรอตรวจ แอดมินอนุมัติข้อความ แล้ว transcript ที่อนุมัติจะ sync ไปยังบทเรียนของคอร์ส',
        },
        shot: { en: 'Transcript review', th: 'หน้าตรวจ transcript' },
      },
      {
        title: { en: 'Admin dashboard and reports', th: 'แดชบอร์ดและรายงานแอดมิน' },
        body: {
          en: 'The dashboard home drills from group totals into member lists and deep-links into the enrollment and certificate reports, so an unexpected number leads straight to the rows behind it. The certificate report prints in page, and six screens export to CSV or Excel.',
          th: 'หน้าแรกแดชบอร์ดเจาะจากยอดรวมของกลุ่มลงไปถึงรายชื่อสมาชิก และลิงก์ตรงไปยังรายงานการลงทะเบียนและใบประกาศ ตัวเลขที่ผิดคาดจึงพาไปถึงแถวข้อมูลได้ทันที รายงานใบประกาศพิมพ์ได้ในหน้า และมี 6 หน้าจอที่ export เป็น CSV หรือ Excel ได้',
        },
        shot: { en: 'Admin dashboard', th: 'แดชบอร์ดแอดมิน' },
      },
      {
        title: { en: 'xAPI statement viewer and content export', th: 'หน้าดู xAPI statement และ export เนื้อหา' },
        body: {
          en: 'Admins browse the raw statements a learner generated, filtered by email, verb, activity and date, which is how we explain a completion state. Imported Tin Can packages can be exported back as a zip, streamed in memory with Thai filenames encoded correctly.',
          th: 'แอดมินดู statement ดิบที่ผู้เรียนสร้าง กรองตามอีเมล verb activity และวันที่ ซึ่งใช้อธิบายสถานะการเรียนจบได้ แพ็กเกจ Tin Can ที่นำเข้าสามารถ export กลับเป็น zip ได้ โดย stream ในหน่วยความจำและเข้ารหัสชื่อไฟล์ภาษาไทยถูกต้อง',
        },
        shot: { en: 'Statement viewer', th: 'หน้าดู statement' },
      },
      {
        title: { en: 'Sign-in and access control', th: 'การเข้าสู่ระบบและสิทธิ์การเข้าถึง' },
        body: {
          en: 'Login accepts a username or email and offers remember-me, which keeps the refresh token in a persistent cookie instead of a session one. Google sign-in verifies the email, then signs in through a secret-derived bridge credential compared in constant time; when no account matches, the user completes a profile and the account is created. On the admin side, owner-based scoping adds a creator column to courses, content, social items, certificates and e-publications, so an instructor manages only their own records while full admins keep site-wide access, and private categories stay hidden from learner listings.',
          th: 'เข้าสู่ระบบได้ด้วย username หรืออีเมล มี remember-me ที่เก็บ refresh token เป็นคุกกี้แบบค้างไว้แทนคุกกี้ระดับ session ส่วน Google sign-in จะยืนยันอีเมลแล้วเข้าสู่ระบบผ่าน bridge credential ที่สร้างจาก secret และเทียบแบบ constant time หากยังไม่มีบัญชีตรงกัน ผู้ใช้จะกรอกโปรไฟล์แล้วระบบจึงสร้างบัญชีให้ ฝั่งแอดมิน owner-based scoping เพิ่มคอลัมน์ผู้สร้างให้คอร์ส เนื้อหา social item ใบประกาศ และ e-publication ทำให้ผู้สอนจัดการเฉพาะข้อมูลของตัวเอง ขณะที่แอดมินเต็มสิทธิ์ยังเข้าถึงได้ทั้งระบบ และซ่อนหมวดหมู่ส่วนตัวจากรายการของผู้เรียน',
        },
        shot: { en: 'Sign-in page', th: 'หน้าเข้าสู่ระบบ' },
      },
      {
        title: { en: 'Thai and English throughout', th: 'รองรับไทยและอังกฤษทั้งระบบ' },
        body: {
          en: 'A single language provider switches the learner pages and the admin dashboard between Thai and English at runtime and remembers the choice. Certificate templates persist a font family per element, so an admin picks TH Sarabun New or Outfit for each text field and the same choice drives both the live preview and the certificate image the server renders.',
          th: 'language provider ตัวเดียวสลับหน้าผู้เรียนและแดชบอร์ดแอดมินระหว่างไทยกับอังกฤษได้ทันที พร้อมจำค่าที่เลือกไว้ เทมเพลตใบประกาศเก็บฟอนต์แยกต่อ element แอดมินเลือก TH Sarabun New หรือ Outfit ให้แต่ละช่องข้อความ แล้วค่าเดียวกันนี้ใช้ทั้งในพรีวิวและในภาพใบประกาศที่ server เรนเดอร์',
        },
        shot: { en: 'Language switcher', th: 'ตัวสลับภาษา' },
      },
    ],
    next: 'membership-booking',
  },
  {
    slug: 'membership-booking',
    index: '03',
    badge: 'SPRING BOOT + REACT',
    tags: ['Spring Boot', 'React', 'SQL Server'],
    cover: { from: '#33BF99', to: '#0D7366' },
    title: {
      en: 'Membership & Course Booking',
      th: 'ระบบสมาชิกและจองคอร์สอบรม',
    },
    summary: {
      en: 'Training-course booking for a corporate safety-training client: VIP membership, points, coupons and invoice PDFs with Thai VAT and withholding tax. I work across the Spring Boot API, the React back-office and the customer site.',
      th: 'ระบบจองคอร์สอบรมของลูกค้าด้านฝึกอบรมความปลอดภัย: สมาชิก VIP คะแนนสะสม คูปอง และใบแจ้งหนี้ PDF พร้อม VAT และภาษีหัก ณ ที่จ่าย ผมทำงานทั้ง Spring Boot API, back-office ด้วย React และเว็บลูกค้า',
    },
    role: {
      en: 'Full-stack developer on a shared team: booking, invoicing, email templates and back-office screens',
      th: 'Full-stack developer ในทีมร่วม: การจอง ใบแจ้งหนี้ เทมเพลตอีเมล และหน้า back-office',
    },
    period: { en: '2026', th: '2026' },
    kind: { en: 'Client project', th: 'งานลูกค้า' },
    stack: [
      {
        name: 'Spring Boot',
        slug: 'springboot',
        note: {
          en: 'Spring Boot 3.4 on Java 17 with JPA and JWT: 78 controllers and 61 services for membership, cart and booking, coupons, points, invoices and 44 email templates.',
          th: 'Spring Boot 3.4 บน Java 17 กับ JPA และ JWT มี controller 78 ตัวและ service 61 ตัว สำหรับสมาชิก ตะกร้าและการจอง คูปอง คะแนน ใบแจ้งหนี้ และเทมเพลตอีเมล 44 แบบ',
        },
      },
      {
        name: 'React',
        slug: 'react',
        note: {
          en: 'React 19 with Vite, TanStack Query and i18next for the customer site (41 pages) and the back-office SPA (96 admin screens), both bilingual Thai and English.',
          th: 'React 19 กับ Vite, TanStack Query และ i18next สำหรับเว็บลูกค้า (41 หน้า) และ back-office SPA (96 หน้าแอดมิน) รองรับไทยและอังกฤษทั้งคู่',
        },
      },
      {
        name: 'SQL Server',
        note: {
          en: 'SQL Server 2022 with Thai collation, 108 JPA repositories and dated SQL migrations for schema changes and backfills.',
          th: 'SQL Server 2022 ที่ตั้ง collation ภาษาไทย มี JPA repository 108 ตัว และสคริปต์ migration ตามวันที่สำหรับแก้ schema และ backfill ข้อมูล',
        },
      },
      {
        name: 'Document generation',
        note: {
          en: 'Word templates filled with poi-tl and converted to PDF for invoices, pay-in slips with barcode and QR, and confirmation letters; Apache POI for Excel reports.',
          th: 'เทมเพลต Word เติมข้อมูลด้วย poi-tl แล้วแปลงเป็น PDF สำหรับใบแจ้งหนี้ ใบ pay-in พร้อมบาร์โค้ดและ QR และจดหมายยืนยัน ใช้ Apache POI สำหรับรายงาน Excel',
        },
      },
    ],
    links: { internal: true },
    overview: {
      problem: {
        en: 'A safety-training company sells scheduled courses to corporate customers and individuals, with VIP tiers, loyalty points and coupon campaigns. Bookings, invoices and confirmation emails all carry customer and tax details that must stay correct even after a member edits their profile, and the finance team needs Thai VAT and withholding tax handled on every document.',
        th: 'บริษัทฝึกอบรมด้านความปลอดภัยขายคอร์สตามรอบให้ลูกค้าองค์กรและบุคคล มีสมาชิก VIP คะแนนสะสม และแคมเปญคูปอง การจอง ใบแจ้งหนี้ และอีเมลยืนยันล้วนมีข้อมูลลูกค้าและภาษีที่ต้องถูกต้องแม้สมาชิกจะแก้โปรไฟล์ทีหลัง และฝ่ายการเงินต้องการให้จัดการ VAT และภาษีหัก ณ ที่จ่ายถูกต้องในทุกเอกสาร',
      },
      solution: {
        en: 'Working in a shared team, I built the booking coordinator snapshot: an entity, DTO, async backfill job and SQL migration that freeze the coordinator, company and VIP details onto each booking at the moment it is made. I added the tax calculation and tax-ID mapping to the invoice generator with unit tests, made invoices reload the booking so withholding tax reflects the latest change, and aligned document numbers with booking numbers. I wrote the VIP upgrade, booking change and partner-service notification emails, extended member registration and the address report, and shipped back-office screens for satisfaction surveys and new email templates.',
        th: 'ในทีมร่วม ผมสร้างระบบ snapshot ข้อมูลผู้ประสานงานของการจอง: entity, DTO, งาน backfill แบบ async และ SQL migration ที่ตรึงข้อมูลผู้ประสานงาน บริษัท และสถานะ VIP ไว้กับการจองแต่ละรายการ ณ เวลาที่จอง เพิ่มการคำนวณภาษีและการจับคู่เลขผู้เสียภาษีในตัวสร้างใบแจ้งหนี้พร้อม unit test ให้ใบแจ้งหนี้โหลดข้อมูลการจองใหม่เพื่อให้ภาษีหัก ณ ที่จ่ายตรงกับการแก้ไขล่าสุด และใช้เลขที่การจองเป็นเลขที่เอกสาร เขียนอีเมลแจ้งอัปเกรด VIP อีเมลเมื่อการจองเปลี่ยน และอีเมลบริการพันธมิตร ขยายการสมัครสมาชิกและรายงานที่อยู่ และส่งมอบหน้า back-office สำหรับแบบประเมินความพึงพอใจและเทมเพลตอีเมลใหม่',
      },
      result: {
        en: 'Historical bookings keep the details they were made with, so invoices and letters no longer change when a profile does, and a one-off job backfilled existing records with progress and stop control. Invoices carry VAT, withholding tax and matching document numbers, and the finance team gets a pay-in slip PDF with barcode and QR alongside each one. The most recent fix closed a login failure for newly registered members and shipped with an idempotent backfill script and deploy note.',
        th: 'การจองในอดีตคงข้อมูลตามตอนที่จองไว้ ใบแจ้งหนี้และจดหมายจึงไม่เปลี่ยนตามโปรไฟล์อีก และงาน backfill ครั้งเดียวเติมข้อมูลรายการเดิมพร้อมแสดงความคืบหน้าและหยุดได้ ใบแจ้งหนี้มี VAT ภาษีหัก ณ ที่จ่าย และเลขที่เอกสารตรงกัน ฝ่ายการเงินได้ใบ pay-in แบบ PDF พร้อมบาร์โค้ดและ QR ควบคู่ทุกใบ การแก้ไขล่าสุดปิดปัญหาสมาชิกใหม่ล็อกอินไม่ได้ พร้อมสคริปต์ backfill ที่รันซ้ำได้และบันทึกขั้นตอน deploy',
      },
    },
    features: [
      {
        title: { en: 'Booking coordinator snapshot', th: 'Snapshot ข้อมูลผู้ประสานงานของการจอง' },
        body: {
          en: 'Each booking stores a frozen copy of the coordinator, company, branch, address and VIP status as they were at booking time. An async patch job with progress and stop control backfilled existing bookings, and a back-office dialog shows the snapshot next to the live profile.',
          th: 'การจองแต่ละรายการเก็บสำเนาข้อมูลผู้ประสานงาน บริษัท สาขา ที่อยู่ และสถานะ VIP ตามที่เป็น ณ เวลาที่จอง งาน patch แบบ async พร้อมแสดงความคืบหน้าและหยุดได้เติมข้อมูลให้การจองเดิม และ dialog ใน back-office แสดง snapshot เทียบกับโปรไฟล์ปัจจุบัน',
        },
        shot: { en: 'Snapshot dialog', th: 'หน้า snapshot' },
      },
      {
        title: { en: 'Invoices with Thai tax', th: 'ใบแจ้งหนี้พร้อมภาษีไทย' },
        body: {
          en: 'The invoice generator computes discount, net before tax, 7% VAT, 3% withholding tax and net payable, maps the customer’s tax ID and tax address into the template, and regenerates from the latest booking so a change never leaves a stale tax figure. Document numbers follow the booking number.',
          th: 'ตัวสร้างใบแจ้งหนี้คำนวณส่วนลด ยอดก่อนภาษี VAT 7% ภาษีหัก ณ ที่จ่าย 3% และยอดสุทธิ จับคู่เลขผู้เสียภาษีและที่อยู่ภาษีของลูกค้าลงเทมเพลต และสร้างใหม่จากข้อมูลการจองล่าสุดเพื่อไม่ให้ตัวเลขภาษีค้างเก่า เลขที่เอกสารอิงตามเลขที่การจอง',
        },
        shot: { en: 'Invoice PDF', th: 'ใบแจ้งหนี้ PDF' },
      },
      {
        title: { en: 'VIP membership and points', th: 'สมาชิก VIP และคะแนนสะสม' },
        body: {
          en: 'Members upgrade or renew VIP with cash or points, requests go through admin approval, and expiry reminders go out at three, two and one months. I added the VIP upgrade notification email, approval search by email, and the email column on the approval list.',
          th: 'สมาชิกอัปเกรดหรือต่ออายุ VIP ด้วยเงินสดหรือคะแนน คำขอผ่านการอนุมัติของแอดมิน และมีอีเมลเตือนก่อนหมดอายุที่ 3, 2 และ 1 เดือน ผมเพิ่มอีเมลแจ้งอัปเกรด VIP การค้นหาคำขออนุมัติด้วยอีเมล และคอลัมน์อีเมลในรายการอนุมัติ',
        },
        shot: { en: 'VIP approval list', th: 'รายการอนุมัติ VIP' },
      },
      {
        title: { en: 'Transactional email templates', th: 'เทมเพลตอีเมลธุรกรรม' },
        body: {
          en: 'Admin-editable templates with Thai variable tokens are rendered by 44 handlers and sent through SMTP or Microsoft Graph. I wrote the training confirmation remark field, company and branch display for individual members, the re-prompt when a confirmed booking changes, and the trial and redeem notifications for a partner service.',
          th: 'เทมเพลตที่แอดมินแก้ได้พร้อมตัวแปรภาษาไทย เรนเดอร์ผ่าน handler 44 ตัว และส่งผ่าน SMTP หรือ Microsoft Graph ผมเพิ่มช่องหมายเหตุในอีเมลยืนยันการอบรม การแสดงบริษัทและสาขาสำหรับสมาชิกบุคคล การส่งยืนยันซ้ำเมื่อการจองที่ยืนยันแล้วเปลี่ยน และอีเมลแจ้งทดลองใช้และแลกสิทธิ์ของบริการพันธมิตร',
        },
        shot: { en: 'Email template editor', th: 'หน้าแก้เทมเพลตอีเมล' },
      },
      {
        title: { en: 'Registration and address report', th: 'การสมัครสมาชิกและรายงานที่อยู่' },
        body: {
          en: 'Registration validates username and email, makes the citizen ID optional, preloads and allows editing the postal code, and records the membership type. The register-address report prefixes sub-district, district and province correctly, including the Bangkok-specific forms.',
          th: 'การสมัครตรวจสอบ username และอีเมล ให้เลขบัตรประชาชนเป็นตัวเลือก โหลดและแก้ไขรหัสไปรษณีย์ได้ และบันทึกประเภทสมาชิก รายงานที่อยู่สมาชิกใส่คำนำหน้า ตำบล อำเภอ จังหวัด ถูกต้อง รวมถึงรูปแบบเฉพาะของกรุงเทพฯ',
        },
        shot: { en: 'Registration form', th: 'ฟอร์มสมัครสมาชิก' },
      },
      {
        title: { en: 'Back-office screens', th: 'หน้า back-office' },
        body: {
          en: 'In the React back-office I shipped the satisfaction survey record page and the pages for new email templates, and in the legacy admin I added the coordinator snapshot dialog, trainee metrics on course sessions, and reporting fixes that exclude cancelled bookings and limit training history to completed sessions.',
          th: 'ใน back-office ที่เป็น React ผมส่งมอบหน้าบันทึกแบบประเมินความพึงพอใจและหน้าเทมเพลตอีเมลใหม่ ส่วนใน admin เดิมเพิ่ม dialog snapshot ผู้ประสานงาน ตัวเลขผู้เข้าอบรมในรอบคอร์ส และแก้รายงานให้ไม่นับการจองที่ยกเลิกและแสดงประวัติอบรมเฉพาะรอบที่จบแล้ว',
        },
        shot: { en: 'Survey record page', th: 'หน้าบันทึกแบบประเมิน' },
      },
    ],
    next: 'obec-vr-learning',
  },
  {
    slug: 'obec-vr-learning',
    index: '04',
    badge: 'SPRING BOOT + UNITY',
    tags: ['Spring Boot', 'React', 'Unity', 'MySQL'],
    cover: { from: '#8C73FF', to: '#4D33B3', image: '/images/obec-vr-learning.webp' },
    title: {
      en: 'OBEC MyLearningTime',
      th: 'OBEC MyLearningTime',
    },
    summary: {
      en: 'A VR learning platform for OBEC, Thailand’s Office of the Basic Education Commission: a Spring Boot API with 129 documented endpoints, a React portal, and 18 Unity VR science games wired to record every play session.',
      th: 'แพลตฟอร์มเรียนรู้ผ่าน VR ของ สพฐ. (OBEC): Spring Boot API ที่มีเอกสาร 129 endpoints, portal ด้วย React และเกม VR วิทยาศาสตร์ 18 เกมบน Unity ที่เชื่อมต่อให้บันทึกผลการเล่นทุกครั้ง',
    },
    role: {
      en: 'Back-end developer, API documentation and VR integration',
      th: 'Back-end developer ดูแลเอกสาร API และการเชื่อมต่อเกม VR',
    },
    period: { en: '2025 — 2026', th: '2025 — 2026' },
    kind: { en: 'Government project', th: 'งานภาครัฐ' },
    stack: [
      {
        name: 'Spring Boot',
        slug: 'springboot',
        note: {
          en: 'Spring Boot 3.1 on Java 17 with Spring Security and JWT: 28 REST controllers and 130 endpoints covering the LMS, school registry, reporting and game telemetry.',
          th: 'Spring Boot 3.1 บน Java 17 กับ Spring Security และ JWT มี REST controller 28 ตัว และ endpoint 130 เส้น ครอบคลุม LMS ทะเบียนโรงเรียน รายงาน และการเก็บผลจากเกม',
        },
      },
      {
        name: 'React',
        slug: 'react',
        note: {
          en: 'React 18 with Vite and React Router for the portal: login, dashboard, account and password management, school management, teacher and student onboarding, VR game history and VR management.',
          th: 'React 18 กับ Vite และ React Router สำหรับ portal: ล็อกอิน แดชบอร์ด จัดการบัญชีและรหัสผ่าน จัดการโรงเรียน onboarding ครูและนักเรียน ประวัติการเล่นเกม VR และจัดการเกม VR',
        },
      },
      {
        name: 'Unity',
        slug: 'unity',
        note: {
          en: 'Unity 2022 with the Oculus XR plugin targeting Meta Quest on Android; the 18 science games were built by an external studio and I own the layer that talks to the API.',
          th: 'Unity 2022 กับ Oculus XR plugin สำหรับ Meta Quest บน Android เกมวิทยาศาสตร์ 18 เกมพัฒนาโดยสตูดิโอภายนอก ผมรับผิดชอบชั้นที่คุยกับ API',
        },
      },
      {
        name: 'MySQL',
        slug: 'mysql',
        note: {
          en: 'Schema for schools, classes, users and roles, courses through lessons, enrollments, assessments and the five game event tables.',
          th: 'schema ของโรงเรียน ห้องเรียน ผู้ใช้และบทบาท คอร์สถึงบทเรียน การลงทะเบียน แบบทดสอบ และตารางเหตุการณ์จากเกม 5 ตาราง',
        },
      },
      {
        name: 'OpenAPI',
        slug: 'openapiinitiative',
        note: {
          en: 'springdoc drives a Swagger UI, and the generated API document lists all 129 endpoints with fields, types and auth.',
          th: 'springdoc สร้าง Swagger UI และเอกสาร API ที่ generate ออกมาแสดงทั้ง 129 endpoints พร้อมฟิลด์ ชนิดข้อมูล และการยืนยันตัวตน',
        },
      },
    ],
    links: { internal: true },
    overview: {
      problem: {
        en: 'Students play VR science games on headsets in class, but each game was a standalone experience, so teachers had no record of who played what or how they scored. The agency also required complete API documentation as a deliverable, and the platform needed a proper LMS layer for schools, courses and reporting.',
        th: 'นักเรียนเล่นเกม VR วิทยาศาสตร์บนแว่นในห้องเรียน แต่แต่ละเกมเป็นระบบแยกเดี่ยว ครูจึงไม่มีบันทึกว่าใครเล่นอะไรและได้คะแนนเท่าไร หน่วยงานยังกำหนดให้ส่งเอกสาร API ฉบับสมบูรณ์เป็นงานส่งมอบ และแพลตฟอร์มต้องมีชั้น LMS สำหรับโรงเรียน คอร์ส และรายงานด้วย',
      },
      solution: {
        en: 'On the backend I built out the Spring Boot API: JWT authentication, game telemetry endpoints that record intro, lesson, quick, exam and mission events per game, and the LMS layer with courses, batches, modules, lessons, enrollment approval, assessments, role permissions and teacher and admin reports. I generated the 129-endpoint API document from the running API and wrote a PowerShell script that logs in and exercises the game and report endpoints. On the Unity side I own the integration layer: the HTTP transport with bearer tokens, the login flow, the per-game event wrappers and the report reader.',
        th: 'ฝั่ง backend ผมพัฒนา Spring Boot API: การยืนยันตัวตนด้วย JWT, endpoint เก็บผลจากเกมที่บันทึกเหตุการณ์ intro, lesson, quick, exam และ mission ต่อเกม และชั้น LMS ที่มีคอร์ส รุ่น โมดูล บทเรียน การอนุมัติลงทะเบียน แบบทดสอบ สิทธิ์ตามบทบาท และรายงานสำหรับครูกับแอดมิน ผม generate เอกสาร API 129 endpoints จาก API ที่รันอยู่ และเขียนสคริปต์ PowerShell ที่ล็อกอินแล้วยิง endpoint ของเกมและรายงาน ฝั่ง Unity ผมรับผิดชอบชั้นเชื่อมต่อ: HTTP transport พร้อม bearer token, ขั้นตอนล็อกอิน, wrapper ส่งเหตุการณ์ต่อเกม และตัวอ่านรายงาน',
      },
      result: {
        en: 'Every play session from all 18 games lands in one database under the student’s own identity, so a teacher sees each student across every title, and admins export user lists from the portal as CSV. The API document passed the agency review, and the test script gives the team a repeatable check of the game endpoints after each change.',
        th: 'ผลการเล่นทุกครั้งจากทั้ง 18 เกมเข้ามาที่ฐานข้อมูลเดียวภายใต้ตัวตนของนักเรียนเอง ครูจึงเห็นนักเรียนแต่ละคนครบทุกเกม และแอดมิน export รายชื่อผู้ใช้จาก portal เป็น CSV ได้ เอกสาร API ผ่านการตรวจรับจากหน่วยงาน และสคริปต์ทดสอบให้ทีมตรวจ endpoint ของเกมซ้ำได้ทุกครั้งหลังแก้โค้ด',
      },
    },
    features: [
      {
        title: { en: '129 documented endpoints', th: 'เอกสาร API 129 endpoints' },
        body: {
          en: 'The API document is generated from the running API and lists every endpoint with its method, path, request fields, types, required flags and bearer authentication, alongside a live Swagger UI. A separate document covers the web portal subset.',
          th: 'เอกสาร API generate จาก API ที่รันอยู่ แสดงทุก endpoint พร้อม method, path, ฟิลด์ของ request, ชนิดข้อมูล, ฟิลด์บังคับ และการยืนยันตัวตนแบบ bearer ควบคู่กับ Swagger UI ที่ใช้งานได้จริง และมีเอกสารแยกสำหรับส่วน web portal',
        },
        shot: { en: 'API document', th: 'เอกสาร API' },
      },
      {
        title: { en: 'Game telemetry API', th: 'API เก็บผลจากเกม' },
        body: {
          en: 'Five telemetry endpoints, keyed by game id, record intro, lesson, quick, exam and mission events with start and end times, scores, pass and fail counts and mission extras. The game sends the student’s JWT, so the server resolves who played from the token rather than trusting an id in the payload.',
          th: 'endpoint เก็บผล 5 เส้นที่รับ game id บันทึกเหตุการณ์ intro, lesson, quick, exam และ mission พร้อมเวลาเริ่มและจบ คะแนน จำนวนผ่านและไม่ผ่าน และข้อมูลเพิ่มเติมของภารกิจ เกมส่ง JWT ของนักเรียนมา server จึงระบุผู้เล่นจาก token แทนการเชื่อ id ใน payload',
        },
        shot: { en: 'Telemetry endpoints', th: 'endpoint เก็บผล' },
      },
      {
        title: { en: 'Unity integration layer for 18 games', th: 'ชั้นเชื่อมต่อ Unity สำหรับ 18 เกม' },
        body: {
          en: 'One transport class posts JSON with a bearer token from PlayerPrefs, a login controller stores the token and user, and each of the 18 games has an event wrapper designers hook to scene events, posting its intro, quick, exam and mission results. A consolidated game list, a report reader and editor-side test buttons round out the layer.',
          th: 'transport class เดียวส่ง JSON พร้อม bearer token จาก PlayerPrefs, login controller เก็บ token และผู้ใช้ และเกมทั้ง 18 เกมมี wrapper ส่งเหตุการณ์ที่นักออกแบบผูกกับ event ในฉากได้ ส่งผล intro, quick, exam และ mission เสริมด้วยรายการเกมรวม ตัวอ่านรายงาน และปุ่มทดสอบใน editor',
        },
        shot: { en: 'Unity API scripts', th: 'สคริปต์ API ใน Unity' },
      },
      {
        title: { en: 'API test script', th: 'สคริปต์ทดสอบ API' },
        body: {
          en: 'A PowerShell script logs in as a chosen role, then posts intro, lesson, quick, exam and mission for a selected game and reads back the report endpoints, so the team can smoke-test the API before a delivery.',
          th: 'สคริปต์ PowerShell ล็อกอินด้วยบทบาทที่เลือก แล้วยิง intro, lesson, quick, exam และ mission ของเกมที่เลือก พร้อมอ่าน endpoint รายงานกลับมา ทีมจึง smoke-test API ได้ก่อนส่งมอบ',
        },
        shot: { en: 'Test run', th: 'ผลการทดสอบ' },
      },
      {
        title: { en: 'LMS layer and reporting', th: 'ชั้น LMS และรายงาน' },
        body: {
          en: 'Courses contain batches, modules and lessons; enrollment supports self-enroll, assignment and approval; assessments store attempts; and role permissions gate schools, teachers and students. Reports for learners, teachers and admins, plus a game results report.',
          th: 'คอร์สประกอบด้วยรุ่น โมดูล และบทเรียน การลงทะเบียนรองรับสมัครเอง มอบหมาย และอนุมัติ แบบทดสอบเก็บผลการทำ และสิทธิ์ตามบทบาทกำกับโรงเรียน ครู และนักเรียน มีรายงานสำหรับผู้เรียน ครู และแอดมิน รวมถึงรายงานผลจากเกม',
        },
        shot: { en: 'Teacher report', th: 'รายงานสำหรับครู' },
      },
    ],
    next: 'workcatch',
  },
  {
    slug: 'workcatch',
    index: '05',
    badge: 'IN DEVELOPMENT',
    tags: ['Spring Boot', 'React', 'MySQL', 'LINE'],
    cover: { from: '#0FA3A3', to: '#065F5F' },
    title: {
      en: 'WorkCatch',
      th: 'WorkCatch',
    },
    summary: {
      en: 'A personal task tracker I am building: work that arrives by LINE, email or a word in a meeting ends up in one place, and WorkCatch reminds you through LINE before the deadline — capture from LINE is built first. In development, launching soon.',
      th: 'แอปติดตามงานส่วนตัวที่กำลังสร้าง: งานที่เข้ามาทั้งทางไลน์ อีเมล หรือคำพูดในห้องประชุม มารวมอยู่ที่เดียว แล้ว WorkCatch เตือนผ่าน LINE ก่อนถึงกำหนด โดยเริ่มจากการรับงานผ่าน LINE ก่อน กำลังพัฒนา เปิดให้ใช้เร็ว ๆ นี้',
    },
    role: {
      en: 'Designer and developer — API, web app and LINE integration',
      th: 'ออกแบบและพัฒนา — API, เว็บแอป และการเชื่อมต่อ LINE',
    },
    period: { en: '2026 — now', th: '2026 — ปัจจุบัน' },
    kind: { en: 'Personal product (in development)', th: 'โปรดักส์ส่วนตัว (กำลังพัฒนา)' },
    stack: [
      {
        name: 'Spring Boot',
        slug: 'springboot',
        note: {
          en: 'Spring Boot 3.5 on Java 17: 22 JPA entities, 59 REST endpoints across 14 API controllers, and 10 Flyway migrations on MySQL 8.',
          th: 'Spring Boot 3.5 บน Java 17: JPA entity 22 ตัว, REST endpoint 59 เส้นใน API controller 14 ตัว และ Flyway migration 10 ชุดบน MySQL 8',
        },
      },
      {
        name: 'React',
        slug: 'react',
        note: {
          en: 'React 19 with Vite, TanStack Query and React Router: 26 screens across 30 routes, including the admin console, all in Thai.',
          th: 'React 19 กับ Vite, TanStack Query และ React Router มีหน้าจอ 26 หน้าใน 30 route รวมคอนโซลแอดมิน ทั้งหมดเป็นภาษาไทย',
        },
      },
      {
        name: 'LINE',
        slug: 'line',
        note: {
          en: 'LINE Login (OIDC with PKCE and JWKS signature checks) and an HMAC-verified inbound webhook, implemented and tested against a stub; not yet connected to a live LINE channel.',
          th: 'LINE Login (OIDC พร้อม PKCE และตรวจลายเซ็นผ่าน JWKS) และ webhook ขาเข้าที่ตรวจ HMAC เขียนและทดสอบกับ stub แล้ว ยังไม่ได้ต่อกับ channel จริงของ LINE',
        },
      },
      {
        name: 'MySQL',
        slug: 'mysql',
        note: {
          en: 'Flyway owns the schema with a separate DDL principal, so the runtime user has CRUD only; migrations are tested with Testcontainers.',
          th: 'Flyway ดูแล schema ด้วยบัญชีแยกสำหรับ DDL ผู้ใช้ตอนรันมีสิทธิ์แค่ CRUD และทดสอบ migration ด้วย Testcontainers',
        },
      },
    ],
    links: { comingSoon: true },
    overview: {
      problem: {
        en: 'Work reaches one person through many channels: a LINE message, an email, a word in a meeting. Each promise lives only in memory until someone chases it, and generic to-do apps do not meet Thai users where the work actually arrives.',
        th: 'งานมาถึงคนคนหนึ่งหลายทาง ทั้งข้อความไลน์ อีเมล และคำพูดในห้องประชุม แต่ละคำรับปากอยู่แค่ในความจำจนกว่าจะมีคนทวง และแอป to-do ทั่วไปก็ไม่ได้อยู่ในช่องทางที่งานเข้ามาจริงของคนไทย',
      },
      solution: {
        en: 'I am building WorkCatch end to end: a Spring Boot API with owner-scoped access on every resource, a Thai natural-language parser that turns a message like "เตือนส่งรายงานพรุ่งนี้ 10 โมง" into a draft task and asks instead of guessing when the phrasing is ambiguous, a reminder pipeline that plans, claims and records every delivery, knowledge notes with versions and encrypted secret blocks, and a React web app in Thai with an admin console.',
        th: 'ผมกำลังพัฒนา WorkCatch ครบทุกชั้น: Spring Boot API ที่จำกัดสิทธิ์ตามเจ้าของในทุก resource, ตัวแยกวิเคราะห์ภาษาไทยที่แปลงข้อความอย่าง "เตือนส่งรายงานพรุ่งนี้ 10 โมง" เป็นงานฉบับร่าง และถามกลับแทนการเดาเมื่อข้อความกำกวม, ระบบแจ้งเตือนที่วางแผน จอง และบันทึกการส่งทุกครั้ง, โน้ตความรู้พร้อมเวอร์ชันและบล็อกข้อมูลลับที่เข้ารหัส และเว็บแอป React ภาษาไทยพร้อมคอนโซลแอดมิน',
      },
      result: {
        en: 'The codebase stands at 22 entities, 59 endpoints and 26 screens with 25 backend test classes, including a cross-user isolation test that enumerates every owner-scoped endpoint and asserts each one returns 404 outside its owner. The LINE integration runs against a stub in tests; the live channel is not connected yet. Launching soon.',
        th: 'โค้ดตอนนี้มี entity 22 ตัว endpoint 59 เส้น หน้าจอ 26 หน้า และ test class ฝั่ง backend 25 ชุด รวมเทสต์กันข้ามผู้ใช้ที่ไล่ทุก endpoint ที่ผูกกับเจ้าของ และยืนยันว่าตอบ 404 เมื่อไม่ใช่เจ้าของ ส่วนการเชื่อม LINE รันกับ stub ในเทสต์ ยังไม่ได้ต่อกับ channel จริง เตรียมเปิดให้ใช้เร็ว ๆ นี้',
      },
    },
    features: [
      {
        title: { en: 'Thai natural-language capture', th: 'จดงานด้วยภาษาไทยธรรมชาติ' },
        body: {
          en: 'A roughly 500-line Thai date and time parser reads phrases like "พรุ่งนี้ 10 โมง" and builds the task draft. It never guesses: an ambiguous "ห้าโมง" produces a draft without a due time plus a reply offering the possible readings.',
          th: 'ตัวแยกวิเคราะห์วันเวลาภาษาไทยราว 500 บรรทัด อ่านวลีอย่าง "พรุ่งนี้ 10 โมง" แล้วสร้างงานฉบับร่าง โดยไม่เดาเลย ถ้าเจอคำกำกวมอย่าง "ห้าโมง" จะสร้างร่างที่ยังไม่ใส่กำหนด พร้อมตอบกลับให้เลือกความหมายที่เป็นไปได้',
        },
        shot: { en: 'LINE chat to task', th: 'จากแชต LINE เป็นงาน' },
      },
      {
        title: { en: 'Reminders through LINE', th: 'เตือนผ่าน LINE' },
        body: {
          en: 'A scheduler plans reminders ahead of each due date, claims them so a delivery happens at most once, sends through the LINE Messaging API and records every attempt. When no channel token is configured the sender swaps to a logging stub, so nothing half-configured ever reaches a user.',
          th: 'ตัวจัดตารางวางแผนการเตือนล่วงหน้าก่อนกำหนดส่ง จองรายการเพื่อให้ส่งได้ไม่เกินหนึ่งครั้ง ส่งผ่าน LINE Messaging API และบันทึกทุกความพยายาม ถ้ายังไม่ตั้งค่า token ของ channel ตัวส่งจะสลับเป็น stub ที่เขียน log แทน จึงไม่มีข้อความจากระบบที่ตั้งค่าไม่ครบหลุดถึงผู้ใช้',
        },
        shot: { en: 'Reminder pipeline', th: 'ระบบแจ้งเตือน' },
      },
      {
        title: { en: 'Tasks, projects and follow-ups', th: 'งาน โปรเจกต์ และการติดตาม' },
        body: {
          en: 'Tasks carry status, priority, due and follow-up dates, checklists and a full history ledger, grouped into colour-coded projects. An inbox screen triages drafts the bot created before they become real tasks.',
          th: 'งานแต่ละรายการมีสถานะ ความสำคัญ กำหนดส่ง วันติดตามผล เช็กลิสต์ และบันทึกประวัติครบ จัดกลุ่มเป็นโปรเจกต์แยกสี และมีหน้า inbox ไว้คัดกรองร่างที่บอทสร้างก่อนรับเป็นงานจริง',
        },
        shot: { en: 'Task board', th: 'บอร์ดงาน' },
      },
      {
        title: { en: 'Knowledge attached to the work', th: 'ความรู้ติดอยู่กับงาน' },
        body: {
          en: 'Every task can carry "how to do this" notes: block-based content with versions and revert, tags, pinning, trash with restore, and full-text search, linked to the task or project they belong to.',
          th: 'งานทุกชิ้นแนบโน้ต "งานนี้ทำยังไง" ได้: เนื้อหาแบบบล็อก มีเวอร์ชันย้อนกลับได้ ติดแท็ก ปักหมุด ถังขยะพร้อมกู้คืน และค้นหาเต็มรูปแบบ โดยผูกกับงานหรือโปรเจกต์ที่เกี่ยวข้อง',
        },
        shot: { en: 'Knowledge note', th: 'โน้ตความรู้' },
      },
      {
        title: { en: 'Encrypted secrets with audited reveal', th: 'ข้อมูลลับเข้ารหัสพร้อมบันทึกการเปิดดู' },
        body: {
          en: 'Credentials that belong to a task live in encrypted secret blocks, behind a deployment switch that ships off. Revealing one requires step-up authentication with an unlock code, and every reveal is written to an audit trail.',
          th: 'รหัสผ่านหรือข้อมูลลับของงานเก็บในบล็อกที่เข้ารหัส อยู่หลังสวิตช์ที่ปิดไว้เป็นค่าเริ่มต้น การเปิดดูต้องยืนยันตัวตนเพิ่มด้วย unlock code และทุกการเปิดดูถูกบันทึกลง audit trail',
        },
        shot: { en: 'Secret block', th: 'บล็อกข้อมูลลับ' },
      },
      {
        title: { en: 'Security built in from day one', th: 'ความปลอดภัยตั้งแต่วันแรก' },
        body: {
          en: 'Every user-owned resource is addressed by a public UUID and guarded by owner checks; a cross-user isolation test enumerates every owner-scoped endpoint from the request mappings and asserts 404 outside the owner. LINE Login verifies signatures against LINE’s JWKS with the algorithm pinned, and the webhook checks its HMAC on the raw bytes so Thai text verifies correctly.',
          th: 'ทุก resource ของผู้ใช้ถูกอ้างด้วย UUID สาธารณะและมีการตรวจสิทธิ์เจ้าของ มีเทสต์กันข้ามผู้ใช้ที่ไล่ทุก endpoint ที่ผูกกับเจ้าของจาก request mapping และยืนยันว่าได้ 404 เมื่อไม่ใช่เจ้าของ LINE Login ตรวจลายเซ็นกับ JWKS ของ LINE โดยล็อกอัลกอริทึมไว้ และ webhook ตรวจ HMAC บนไบต์ดิบเพื่อให้ข้อความไทยตรวจผ่านถูกต้อง',
        },
        shot: { en: 'Isolation test', th: 'เทสต์แยกสิทธิ์ผู้ใช้' },
      },
    ],
    next: 'goskillup-lms',
  },
];

export const getProject = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);
