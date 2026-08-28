// STUB (Agent A owns this file) — data per DESIGN_BRIEF.md; Agent A's version wins at merge.
import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "goskillup-lms",
    index: "01",
    badge: "NEXT.JS",
    title: { en: "GoSkillUp LMS Platform", th: "GoSkillUp LMS Platform" },
    summary: {
      en: "Final-year project: an end-to-end LMS with course management, enrollment, quizzes, certificates and reporting; SCORM/xAPI support; Docker deployment.",
      th: "โปรเจกต์จบ ระบบ LMS ครบวงจร จัดการคอร์ส ลงทะเบียน แบบทดสอบ ใบประกาศ รายงาน รองรับ SCORM/xAPI และ deploy ด้วย Docker",
    },
    tags: ["Next.js", "Prisma", "Tailwind", "Docker"],
    cover: { from: "#3B47FF", to: "#262EBF" },
    role: { en: "Solo developer", th: "พัฒนาคนเดียว" },
    period: { en: "2025 — 2026", th: "2025 — 2026" },
    kind: { en: "Final year project", th: "โปรเจกต์จบ" },
    stack: [
      {
        name: "Next.js",
        slug: "nextdotjs",
        note: { en: "App Router, server actions", th: "App Router และ server actions" },
      },
      {
        name: "Prisma",
        slug: "prisma",
        note: { en: "Schema, migrations, seeding", th: "Schema, migration และ seed data" },
      },
      {
        name: "Tailwind",
        slug: "tailwindcss",
        note: { en: "Design system and layout", th: "ดีไซน์ซิสเทมและเลย์เอาต์" },
      },
      {
        name: "Docker",
        slug: "docker",
        note: { en: "Compose stack for deployment", th: "Compose stack สำหรับ deploy" },
      },
    ],
    links: { demo: "https://goskillup.example.com", repo: "https://github.com/HaroonKasor" },
    overview: {
      problem: {
        en: "Small training providers manage courses in spreadsheets and chat groups. There is no single place to enroll learners, track progress, run quizzes or issue certificates, so admins rebuild the same reports by hand every month.",
        th: "ผู้ให้บริการอบรมรายเล็กจัดการคอร์สด้วยสเปรดชีตและแชท ไม่มีที่เดียวสำหรับลงทะเบียน ติดตามความคืบหน้า ทำแบบทดสอบ หรือออกใบประกาศ แอดมินจึงต้องทำรายงานเดิมซ้ำด้วยมือทุกเดือน",
      },
      solution: {
        en: "I designed and built the whole platform: a Prisma data model for courses, lessons, enrollments and attempts; an admin area for authoring and reporting; a learner area with progress tracking, quizzes and certificates; and a SCORM/xAPI player so existing content packages run unchanged.",
        th: "ผมออกแบบและพัฒนาทั้งระบบ ตั้งแต่ data model บน Prisma สำหรับคอร์ส บทเรียน การลงทะเบียนและการทำข้อสอบ ส่วนแอดมินสำหรับสร้างคอร์สและดูรายงาน ส่วนผู้เรียนที่ติดตามความคืบหน้า ทำแบบทดสอบและรับใบประกาศ พร้อม SCORM/xAPI player ให้ใช้สื่อเดิมได้ทันที",
      },
      result: {
        en: "A working end-to-end LMS deployed with Docker Compose. Course setup that used to take a day of spreadsheet work now takes minutes, and certificates are issued automatically the moment a learner passes.",
        th: "ได้ระบบ LMS ที่ใช้งานได้จริง deploy ด้วย Docker Compose การตั้งค่าคอร์สที่เคยใช้เวลาทั้งวันเหลือเพียงไม่กี่นาที และใบประกาศออกอัตโนมัติทันทีที่ผู้เรียนสอบผ่าน",
      },
    },
    features: [
      {
        title: { en: "Course & lesson authoring", th: "สร้างคอร์สและบทเรียน" },
        body: {
          en: "Admins build a course from modules and lessons, attach video, PDF or SCORM packages, and publish when the outline is ready. Draft and published states are separate so an in-progress edit never reaches learners.",
          th: "แอดมินสร้างคอร์สจากโมดูลและบทเรียน แนบวิดีโอ PDF หรือแพ็กเกจ SCORM แล้วเผยแพร่เมื่อพร้อม สถานะ draft และ published แยกกัน การแก้ไขที่ยังไม่เสร็จจึงไม่หลุดถึงผู้เรียน",
        },
        shot: { en: "Course builder", th: "หน้าสร้างคอร์ส" },
      },
      {
        title: { en: "Quizzes and certificates", th: "แบบทดสอบและใบประกาศ" },
        body: {
          en: "Question banks with multiple choice and true/false, configurable pass marks and attempt limits. Passing a course generates a PDF certificate with a verification code.",
          th: "คลังข้อสอบแบบปรนัยและถูก/ผิด กำหนดเกณฑ์ผ่านและจำนวนครั้งที่ทำได้ เมื่อสอบผ่านระบบจะออกใบประกาศ PDF พร้อมรหัสตรวจสอบ",
        },
        shot: { en: "Quiz result", th: "ผลแบบทดสอบ" },
      },
      {
        title: { en: "Progress & reporting", th: "ความคืบหน้าและรายงาน" },
        body: {
          en: "Learners see completion per lesson; admins get enrollment, completion-rate and score reports per course, exportable for the training records the client has to keep.",
          th: "ผู้เรียนเห็นความคืบหน้ารายบทเรียน แอดมินได้รายงานการลงทะเบียน อัตราการเรียนจบและคะแนนรายคอร์ส ส่งออกไปเก็บเป็นหลักฐานการอบรมได้",
        },
        shot: { en: "Reporting dashboard", th: "แดชบอร์ดรายงาน" },
      },
    ],
    next: "learntech-lms",
  },
  {
    slug: "learntech-lms",
    index: "02",
    badge: "REACT",
    title: { en: "Learn Tech LMS", th: "LMS ของ Learn Tech" },
    summary: {
      en: "My main responsibility: audit logging with export, PDPA soft-delete/restore, social learning and admin reporting.",
      th: "งานหลักที่รับผิดชอบ audit log พร้อม export, soft delete/กู้คืนตาม PDPA, social learning และรายงานแอดมิน",
    },
    tags: ["React", "Spring Boot", "MySQL"],
    cover: { from: "#FF9E6B", to: "#E65233" },
    role: { en: "Junior Developer", th: "Junior Developer" },
    period: { en: "2024 — now", th: "2024 — ปัจจุบัน" },
    kind: { en: "Company product", th: "ผลิตภัณฑ์ของบริษัท" },
    stack: [
      {
        name: "React",
        slug: "react",
        note: { en: "Admin and learner interfaces", th: "หน้าจอแอดมินและผู้เรียน" },
      },
      {
        name: "Spring Boot",
        slug: "springboot",
        note: { en: "REST services and scheduled jobs", th: "REST service และงานตามเวลา" },
      },
      {
        name: "MySQL",
        slug: "mysql",
        note: { en: "Production schema and queries", th: "Schema และ query บน production" },
      },
      {
        name: "Docker",
        slug: "docker",
        note: { en: "Local and staging environments", th: "สภาพแวดล้อม local และ staging" },
      },
    ],
    links: { internal: true },
    overview: {
      problem: {
        en: "The platform serves corporate and government clients who must prove who touched which record, and delete personal data on request under PDPA. The original system had no audit trail and deletes were permanent, so support could not answer either question.",
        th: "แพลตฟอร์มให้บริการลูกค้าองค์กรและภาครัฐที่ต้องพิสูจน์ได้ว่าใครแก้ไขข้อมูลใด และต้องลบข้อมูลส่วนบุคคลตามคำขอภายใต้ PDPA ระบบเดิมไม่มี audit trail และการลบเป็นแบบถาวร ทีมซัพพอร์ตจึงตอบคำถามทั้งสองข้อไม่ได้",
      },
      solution: {
        en: "I added an audit-logging layer that records actor, action, entity and before/after values on every write, with a filterable admin view and CSV export. Deletion became a two-stage soft delete with a restore window, and I built the social learning feed and the admin reporting screens on top of the same services.",
        th: "ผมเพิ่มชั้น audit log ที่บันทึกผู้กระทำ การกระทำ เอนทิตี และค่าก่อน/หลังในทุกการเขียนข้อมูล พร้อมหน้าแอดมินที่กรองได้และส่งออก CSV เปลี่ยนการลบเป็น soft delete สองขั้นที่กู้คืนได้ภายในระยะเวลาที่กำหนด และพัฒนา feed social learning กับหน้ารายงานแอดมินบนบริการชุดเดียวกัน",
      },
      result: {
        en: "Compliance questions that used to need a database engineer are now answered from the admin screen, accidental deletions are recoverable instead of permanent, and admins pull their own monthly reports.",
        th: "คำถามด้าน compliance ที่เคยต้องพึ่ง database engineer ตอบได้จากหน้าแอดมินโดยตรง ข้อมูลที่ลบผิดกู้คืนได้แทนที่จะหายถาวร และแอดมินดึงรายงานรายเดือนได้เอง",
      },
    },
    features: [
      {
        title: { en: "Audit log with export", th: "Audit log พร้อมส่งออก" },
        body: {
          en: "Every create, update and delete is recorded with the acting user, timestamp, affected entity and a diff of the changed fields. Admins filter by user, date range or entity type and export the result as CSV for compliance reviews.",
          th: "ทุกการสร้าง แก้ไข และลบถูกบันทึกพร้อมผู้ใช้ที่ทำ เวลา เอนทิตีที่กระทบ และ diff ของฟิลด์ที่เปลี่ยน แอดมินกรองตามผู้ใช้ ช่วงวันที่ หรือประเภทเอนทิตี แล้วส่งออกเป็น CSV สำหรับการตรวจสอบ",
        },
        shot: { en: "Audit log table", th: "ตาราง audit log" },
      },
      {
        title: { en: "PDPA soft delete & restore", th: "Soft delete และกู้คืนตาม PDPA" },
        body: {
          en: "Deleting a user detaches their personal data and hides the account, keeping an anonymised training record. Within the retention window an admin can restore the account; after it expires a scheduled job purges the remaining data for good.",
          th: "การลบผู้ใช้จะถอดข้อมูลส่วนบุคคลออกและซ่อนบัญชี แต่ยังเก็บประวัติการอบรมแบบไม่ระบุตัวตน ภายในระยะเวลาที่กำหนดแอดมินกู้คืนบัญชีได้ เมื่อหมดกำหนดงานตามเวลาจะลบข้อมูลที่เหลือถาวร",
        },
        shot: { en: "Restore dialog", th: "หน้าต่างกู้คืนข้อมูล" },
      },
      {
        title: { en: "Social learning feed", th: "Feed social learning" },
        body: {
          en: "Learners post questions and share notes inside a course, react and reply in threads. Instructors pin the answers that matter so the next cohort finds them first.",
          th: "ผู้เรียนตั้งคำถามและแชร์โน้ตภายในคอร์ส กดถูกใจและตอบกลับแบบเธรด ผู้สอนปักหมุดคำตอบสำคัญเพื่อให้รุ่นถัดไปเห็นก่อน",
        },
        shot: { en: "Course feed", th: "Feed ในคอร์ส" },
      },
      {
        title: { en: "Admin reporting", th: "รายงานสำหรับแอดมิน" },
        body: {
          en: "Enrollment, completion and score reports per course, department and period, built on the same query layer as the audit view so numbers stay consistent across screens.",
          th: "รายงานการลงทะเบียน การเรียนจบ และคะแนน แยกตามคอร์ส หน่วยงาน และช่วงเวลา สร้างบน query layer เดียวกับหน้า audit ตัวเลขทุกหน้าจึงตรงกัน",
        },
        shot: { en: "Report filters", th: "ตัวกรองรายงาน" },
      },
    ],
    next: "membership-booking",
  },
  {
    slug: "membership-booking",
    index: "03",
    badge: "NEXT.JS",
    title: { en: "Membership & Course Booking", th: "ระบบสมาชิกและจองคอร์สอบรม" },
    summary: {
      en: "Course booking for a client with VIP membership, discount coupons and automatic invoicing.",
      th: "ระบบจองคอร์สสำหรับลูกค้า พร้อมสมาชิก VIP คูปองส่วนลด และออกใบแจ้งหนี้อัตโนมัติ",
    },
    tags: ["Next.js", "SQL Server"],
    cover: { from: "#33BF99", to: "#0D7366" },
    role: { en: "Junior Developer", th: "Junior Developer" },
    period: { en: "2025", th: "2025" },
    kind: { en: "Client project", th: "งานลูกค้า" },
    stack: [
      {
        name: "Next.js",
        slug: "nextdotjs",
        note: { en: "Booking flow and member area", th: "ขั้นตอนการจองและหน้าสมาชิก" },
      },
      {
        name: "SQL Server",
        note: { en: "Bookings, members and invoices", th: "ข้อมูลการจอง สมาชิก และใบแจ้งหนี้" },
      },
    ],
    links: { internal: true },
    overview: {
      problem: {
        en: "Bookings arrived by phone and email, and discounts were applied by hand, so seats were double-booked and invoices disagreed with what the customer was told.",
        th: "การจองเข้ามาทางโทรศัพท์และอีเมล ส่วนลดคิดด้วยมือ ทำให้ที่นั่งถูกจองซ้ำและใบแจ้งหนี้ไม่ตรงกับที่แจ้งลูกค้า",
      },
      solution: {
        en: "A self-service booking flow with live seat counts, VIP membership tiers, coupon validation at checkout, and invoices generated from the same booking record.",
        th: "ระบบจองด้วยตัวเองที่แสดงที่นั่งคงเหลือแบบเรียลไทม์ ระดับสมาชิก VIP ตรวจสอบคูปองตอนชำระเงิน และออกใบแจ้งหนี้จากข้อมูลการจองชุดเดียวกัน",
      },
      result: {
        en: "Double bookings stopped, and invoicing that used to be a manual end-of-week task now happens at the moment of booking.",
        th: "การจองซ้ำหมดไป และการออกใบแจ้งหนี้ที่เคยต้องทำมือปลายสัปดาห์เกิดขึ้นทันทีตอนจอง",
      },
    },
    features: [
      {
        title: { en: "Seat-aware booking", th: "จองตามที่นั่งคงเหลือ" },
        body: {
          en: "Live seat counts per session, with holds released automatically if checkout is abandoned.",
          th: "แสดงที่นั่งคงเหลือรายรอบ และปล่อยที่นั่งที่จองค้างคืนอัตโนมัติเมื่อไม่ชำระเงิน",
        },
        shot: { en: "Booking calendar", th: "ปฏิทินการจอง" },
      },
      {
        title: { en: "Coupons and invoicing", th: "คูปองและใบแจ้งหนี้" },
        body: {
          en: "Coupon rules validated at checkout, and an invoice generated from the confirmed booking so the totals always match.",
          th: "ตรวจสอบเงื่อนไขคูปองตอนชำระเงิน และออกใบแจ้งหนี้จากการจองที่ยืนยันแล้ว ยอดจึงตรงกันเสมอ",
        },
        shot: { en: "Invoice preview", th: "ตัวอย่างใบแจ้งหนี้" },
      },
    ],
    next: "gov-elearning",
  },
  {
    slug: "gov-elearning",
    index: "04",
    badge: "SPRING BOOT",
    title: { en: "Government E-learning Platform", th: "E-learning ภาครัฐ" },
    summary: {
      en: "Bootstrapped backend and frontend from scratch, documented 129 API endpoints and wrote API test scripts.",
      th: "วางโครง backend + frontend ตั้งแต่ต้น เขียนเอกสาร API 129 endpoints และสคริปต์ทดสอบ API",
    },
    tags: ["Spring Boot", "API Docs"],
    cover: { from: "#8C73FF", to: "#4D33B3" },
    role: { en: "Junior Developer", th: "Junior Developer" },
    period: { en: "2025", th: "2025" },
    kind: { en: "Client project", th: "งานลูกค้า" },
    stack: [
      {
        name: "Spring Boot",
        slug: "springboot",
        note: { en: "REST API and service layer", th: "REST API และ service layer" },
      },
      {
        name: "MySQL",
        slug: "mysql",
        note: { en: "Course and user data", th: "ข้อมูลคอร์สและผู้ใช้" },
      },
    ],
    links: { internal: true },
    overview: {
      problem: {
        en: "A government client needed an e-learning platform started from nothing, with API documentation complete enough for a separate team to integrate against.",
        th: "ลูกค้าภาครัฐต้องการแพลตฟอร์ม e-learning ที่เริ่มจากศูนย์ พร้อมเอกสาร API ที่สมบูรณ์พอให้อีกทีมเชื่อมต่อได้",
      },
      solution: {
        en: "I set up the backend and frontend projects, implemented the core course and user APIs, then documented 129 endpoints with request and response examples and wrote scripts to exercise them.",
        th: "ผมวางโครงโปรเจกต์ทั้ง backend และ frontend พัฒนา API หลักของคอร์สและผู้ใช้ จากนั้นเขียนเอกสาร 129 endpoints พร้อมตัวอย่าง request/response และสคริปต์ทดสอบ",
      },
      result: {
        en: "The integrating team worked from the documentation without needing to read the source, and the test scripts caught contract breaks before release.",
        th: "ทีมที่มาเชื่อมต่อทำงานจากเอกสารได้โดยไม่ต้องอ่านซอร์ส และสคริปต์ทดสอบจับความเปลี่ยนแปลงของ contract ได้ก่อนปล่อยจริง",
      },
    },
    features: [
      {
        title: { en: "129 documented endpoints", th: "เอกสาร API 129 endpoints" },
        body: {
          en: "Every endpoint documented with parameters, example payloads and error cases, kept alongside the code.",
          th: "ทุก endpoint มีเอกสารพารามิเตอร์ ตัวอย่างข้อมูล และกรณีข้อผิดพลาด เก็บไว้คู่กับโค้ด",
        },
        shot: { en: "API reference", th: "เอกสาร API" },
      },
      {
        title: { en: "API test scripts", th: "สคริปต์ทดสอบ API" },
        body: {
          en: "Scripted request suites that run the documented flows end to end and flag responses that drift from the contract.",
          th: "ชุดสคริปต์ที่รันขั้นตอนตามเอกสารตั้งแต่ต้นจนจบ และแจ้งเตือนเมื่อ response ไม่ตรงกับ contract",
        },
        shot: { en: "Test run output", th: "ผลการรันทดสอบ" },
      },
    ],
    next: "vr-science-games",
  },
  {
    slug: "vr-science-games",
    index: "05",
    badge: "VR",
    title: { en: "VR Science Games ×13", th: "เกม VR วิทยาศาสตร์ ×13" },
    summary: {
      en: "Connected 13 VR games to the backend to record gameplay results and produced game builds for delivery.",
      th: "เชื่อมต่อเกม VR 13 เกมกับ backend เพื่อบันทึกผลการเล่น และ build ตัวเกมส่งมอบ",
    },
    tags: ["VR", "Integration"],
    cover: { from: "#FF80A6", to: "#BF3373" },
    role: { en: "Junior Developer", th: "Junior Developer" },
    period: { en: "2025", th: "2025" },
    kind: { en: "Client project", th: "งานลูกค้า" },
    stack: [
      {
        name: "Spring Boot",
        slug: "springboot",
        note: { en: "Result-recording API", th: "API บันทึกผลการเล่น" },
      },
      {
        name: "MySQL",
        slug: "mysql",
        note: { en: "Gameplay results storage", th: "จัดเก็บผลการเล่น" },
      },
    ],
    links: { internal: true },
    overview: {
      problem: {
        en: "Thirteen VR science games ran standalone, so teachers had no record of who played what or how they scored.",
        th: "เกม VR วิทยาศาสตร์ 13 เกมทำงานแยกกัน ครูจึงไม่มีบันทึกว่าใครเล่นเกมไหนและได้คะแนนเท่าไร",
      },
      solution: {
        en: "I built the result-recording API and integrated each game with it, then produced and verified the delivery builds.",
        th: "ผมพัฒนา API บันทึกผลการเล่นและเชื่อมต่อเข้ากับเกมทุกตัว จากนั้น build และตรวจสอบไฟล์ส่งมอบ",
      },
      result: {
        en: "Gameplay results from all thirteen games land in one place, and teachers can review scores per student.",
        th: "ผลการเล่นจากเกมทั้ง 13 ตัวรวมอยู่ที่เดียว ครูตรวจสอบคะแนนรายนักเรียนได้",
      },
    },
    features: [
      {
        title: { en: "Unified result API", th: "API รวมผลการเล่น" },
        body: {
          en: "A single endpoint contract every game reports to, so adding the next title is configuration rather than new code.",
          th: "Contract ปลายทางเดียวที่ทุกเกมส่งผลเข้ามา การเพิ่มเกมถัดไปจึงเป็นแค่การตั้งค่า ไม่ต้องเขียนโค้ดใหม่",
        },
        shot: { en: "Results dashboard", th: "แดชบอร์ดผลการเล่น" },
      },
      {
        title: { en: "Delivery builds", th: "ไฟล์ส่งมอบ" },
        body: {
          en: "Packaged and verified builds for all thirteen titles, checked against the recording API before hand-off.",
          th: "แพ็กและตรวจสอบไฟล์ build ของเกมทั้ง 13 ตัว ทดสอบร่วมกับ API บันทึกผลก่อนส่งมอบ",
        },
        shot: { en: "Build checklist", th: "เช็กลิสต์การ build" },
      },
    ],
    next: "goskillup-lms",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
