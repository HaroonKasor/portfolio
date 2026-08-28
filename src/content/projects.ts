import type { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'goskillup-lms',
    index: '01',
    badge: 'NEXT.JS',
    tags: ['Next.js', 'Prisma', 'Tailwind', 'Docker'],
    cover: { from: '#3B47FF', to: '#262EBF' },
    title: {
      en: 'GoSkillUp LMS Platform',
      th: 'GoSkillUp LMS Platform',
    },
    summary: {
      en: 'Final-year project: an end-to-end LMS with course management, enrollment, quizzes, certificates and reporting; SCORM/xAPI support; Docker deployment.',
      th: 'โปรเจกต์จบ ระบบ LMS ครบวงจร จัดการคอร์ส ลงทะเบียน แบบทดสอบ ใบประกาศ รายงาน รองรับ SCORM/xAPI และ deploy ด้วย Docker',
    },
    role: {
      en: 'Solo developer — design, front-end, back-end, deployment',
      th: 'พัฒนาคนเดียว ตั้งแต่ออกแบบ front-end back-end จนถึง deploy',
    },
    period: { en: '2025 — 2026', th: '2025 — 2026' },
    kind: { en: 'Final year project', th: 'โปรเจกต์จบการศึกษา' },
    stack: [
      {
        name: 'Next.js',
        slug: 'nextdotjs',
        note: {
          en: 'App Router with server components for course pages and admin dashboards.',
          th: 'ใช้ App Router และ server components สำหรับหน้าคอร์สและแดชบอร์ดแอดมิน',
        },
      },
      {
        name: 'Prisma',
        slug: 'prisma',
        note: {
          en: 'Schema and migrations for users, courses, enrollments, quiz attempts and certificates.',
          th: 'จัดการ schema และ migration ของผู้ใช้ คอร์ส การลงทะเบียน ผลสอบ และใบประกาศ',
        },
      },
      {
        name: 'Tailwind CSS',
        slug: 'tailwindcss',
        note: {
          en: 'Design tokens and responsive layouts for learner and admin views.',
          th: 'วาง design token และ layout responsive สำหรับฝั่งผู้เรียนและแอดมิน',
        },
      },
      {
        name: 'Docker',
        slug: 'docker',
        note: {
          en: 'App and database containers with one compose file for reproducible deploys.',
          th: 'แยกคอนเทนเนอร์แอปกับฐานข้อมูล ใช้ compose ไฟล์เดียวให้ deploy ซ้ำได้',
        },
      },
    ],
    links: { repo: 'https://github.com/HaroonKasor' },
    overview: {
      problem: {
        en: 'Small training teams need a full learning platform, but off-the-shelf systems are priced per seat and still cannot host the SCORM packages and xAPI content those teams already own.',
        th: 'ทีมฝึกอบรมขนาดเล็กต้องการแพลตฟอร์มเรียนรู้ครบวงจร แต่ระบบสำเร็จรูปคิดราคาต่อผู้ใช้ และยังรองรับไฟล์ SCORM กับเนื้อหา xAPI ที่ทีมมีอยู่แล้วไม่ได้',
      },
      solution: {
        en: 'I built GoSkillUp end to end: a Prisma data model covering courses, lessons, enrollments, quiz attempts and certificates; a Next.js App Router front end for both learners and admins; a quiz engine with per-question scoring and pass marks; automatic PDF certificate generation on completion; and an embedded SCORM/xAPI player that reports progress back into the same tables.',
        th: 'ผมพัฒนา GoSkillUp เองทั้งระบบ ตั้งแต่ data model ด้วย Prisma ครอบคลุมคอร์ส บทเรียน การลงทะเบียน ผลทำแบบทดสอบ และใบประกาศ ทำ front end ด้วย Next.js App Router ทั้งฝั่งผู้เรียนและแอดมิน สร้าง quiz engine ที่ให้คะแนนรายข้อและกำหนดเกณฑ์ผ่าน ออกใบประกาศ PDF อัตโนมัติเมื่อเรียนจบ และฝัง SCORM/xAPI player ที่ส่งความคืบหน้ากลับมาเก็บในตารางเดียวกัน',
      },
      result: {
        en: 'A working platform where an admin can publish a course, enroll learners, watch completion and quiz scores on a dashboard, and hand out certificates without manual work. The whole stack runs from a single docker compose file, so it can be handed to another team and started in one command.',
        th: 'ได้แพลตฟอร์มที่ใช้งานได้จริง แอดมินสร้างคอร์ส ลงทะเบียนผู้เรียน ดูอัตราเรียนจบและคะแนนสอบบนแดชบอร์ด และออกใบประกาศได้โดยไม่ต้องทำมือ ทั้งระบบรันจาก docker compose ไฟล์เดียว ส่งต่อให้ทีมอื่นแล้วสั่งรันได้ทันที',
      },
    },
    features: [
      {
        title: { en: 'Course management', th: 'จัดการคอร์ส' },
        body: {
          en: 'Admins create courses, order lessons and modules, attach video or SCORM content, and switch a course between draft and published without touching the database.',
          th: 'แอดมินสร้างคอร์ส จัดลำดับบทเรียนและโมดูล แนบวิดีโอหรือไฟล์ SCORM และสลับสถานะร่าง/เผยแพร่ได้โดยไม่ต้องแก้ฐานข้อมูล',
        },
        shot: { en: 'Course builder', th: 'หน้าสร้างคอร์ส' },
      },
      {
        title: { en: 'Enrollment & progress', th: 'ลงทะเบียนและติดตามความคืบหน้า' },
        body: {
          en: 'Learners self-enroll or are added in bulk by an admin. Lesson completion is recorded per learner, so the course page always resumes where the learner stopped.',
          th: 'ผู้เรียนลงทะเบียนเองหรือให้แอดมินเพิ่มเป็นชุด ระบบบันทึกการเรียนจบรายบทเรียนของแต่ละคน หน้าคอร์สจึงเปิดต่อจากจุดที่หยุดไว้เสมอ',
        },
        shot: { en: 'Progress dashboard', th: 'แดชบอร์ดความคืบหน้า' },
      },
      {
        title: { en: 'Quiz engine', th: 'ระบบแบบทดสอบ' },
        body: {
          en: 'Multiple-choice and true/false questions with a configurable pass mark, attempt limits and randomised question order. Every attempt is stored with its score for later reporting.',
          th: 'รองรับข้อสอบปรนัยและถูก/ผิด ตั้งเกณฑ์ผ่าน จำกัดจำนวนครั้ง และสุ่มลำดับข้อได้ ทุกครั้งที่ทำจะถูกบันทึกพร้อมคะแนนไว้ใช้ทำรายงาน',
        },
        shot: { en: 'Quiz attempt', th: 'หน้าทำแบบทดสอบ' },
      },
      {
        title: { en: 'Automatic PDF certificates', th: 'ใบประกาศ PDF อัตโนมัติ' },
        body: {
          en: 'When a learner passes the final quiz the system renders a certificate PDF with their name, the course title and the completion date, then stores it against the enrollment for download.',
          th: 'เมื่อผู้เรียนสอบผ่าน ระบบจะสร้างใบประกาศ PDF ที่มีชื่อผู้เรียน ชื่อคอร์ส และวันที่เรียนจบ แล้วเก็บผูกกับการลงทะเบียนให้ดาวน์โหลดได้',
        },
        shot: { en: 'Certificate output', th: 'ตัวอย่างใบประกาศ' },
      },
      {
        title: { en: 'SCORM / xAPI player', th: 'SCORM / xAPI player' },
        body: {
          en: 'Uploaded SCORM packages are unpacked and served inside the course player, and the statements they emit are captured so imported content counts toward the same progress and reporting as native lessons.',
          th: 'ไฟล์ SCORM ที่อัปโหลดจะถูกแตกและเล่นในหน้าเรียน พร้อมดักเก็บ statement ที่ส่งออกมา เนื้อหาที่นำเข้าจึงนับรวมในความคืบหน้าและรายงานเดียวกับบทเรียนปกติ',
        },
        shot: { en: 'SCORM player', th: 'หน้าเล่น SCORM' },
      },
      {
        title: { en: 'Dockerised deployment', th: 'Deploy ด้วย Docker' },
        body: {
          en: 'The app and its database run as separate containers described by one compose file, so a fresh environment goes from clone to running instance in a single command.',
          th: 'แอปและฐานข้อมูลรันแยกคอนเทนเนอร์ในไฟล์ compose เดียว เครื่องใหม่จึง clone แล้วสั่งรันได้จบในคำสั่งเดียว',
        },
        shot: { en: 'Compose setup', th: 'โครงสร้าง compose' },
      },
    ],
    next: 'learntech-lms',
  },
  {
    slug: 'learntech-lms',
    index: '02',
    badge: 'REACT',
    tags: ['React', 'Spring Boot', 'MySQL'],
    cover: { from: '#FF9E6B', to: '#E65233' },
    title: { en: 'Learn Tech LMS', th: 'LMS ของ Learn Tech' },
    summary: {
      en: 'My main responsibility: audit logging with export, PDPA soft-delete/restore, social learning and admin reporting.',
      th: 'งานหลักที่รับผิดชอบ audit log พร้อม export, soft delete/กู้คืนตาม PDPA, social learning และรายงานแอดมิน',
    },
    role: {
      en: 'Full-stack developer on the core platform team',
      th: 'Full-stack developer ในทีมแพลตฟอร์มหลัก',
    },
    period: { en: '2024 — now', th: '2024 — ปัจจุบัน' },
    kind: { en: 'Production platform', th: 'ระบบที่ใช้งานจริง' },
    stack: [
      {
        name: 'React',
        slug: 'react',
        note: {
          en: 'Admin console screens: audit log table, user management and reporting views.',
          th: 'หน้าจอฝั่งแอดมิน ทั้งตาราง audit log จัดการผู้ใช้ และหน้ารายงาน',
        },
      },
      {
        name: 'Spring Boot',
        slug: 'springboot',
        note: {
          en: 'REST APIs, the scheduled anonymisation job and the export endpoints.',
          th: 'REST API งาน anonymize ตามตารางเวลา และ endpoint สำหรับ export',
        },
      },
      {
        name: 'MySQL',
        slug: 'mysql',
        note: {
          en: 'Production schema, indexes for the audit log filters and soft-delete columns.',
          th: 'schema ที่ใช้งานจริง index สำหรับตัวกรอง audit log และคอลัมน์ soft delete',
        },
      },
    ],
    links: { internal: true },
    overview: {
      problem: {
        en: "Learn Tech's main LMS serves client organisations that need to answer two questions on demand: who changed what, and where is a specific user's personal data. The platform recorded neither in a usable form, and Thailand's PDPA requires deletion requests to be honoured without destroying the training records that depend on them.",
        th: 'LMS หลักของ Learn Tech ให้บริการองค์กรลูกค้าที่ต้องตอบสองคำถามได้ทุกเมื่อ คือใครแก้อะไรบ้าง และข้อมูลส่วนบุคคลของผู้ใช้คนหนึ่งอยู่ตรงไหน ระบบเดิมไม่ได้เก็บทั้งสองอย่างในรูปแบบที่ใช้งานได้ และ PDPA ยังกำหนดให้ต้องรับคำขอลบข้อมูลโดยไม่ทำลายประวัติการอบรมที่อ้างอิงข้อมูลนั้น',
      },
      solution: {
        en: 'I own these areas across the stack. I added an audit log that records actor, action, target and timestamp for every administrative change, with filters and CSV/Excel export on top. I replaced hard deletes with a PDPA soft-delete flow: a deleted account is hidden immediately, restorable for 30 days, then permanently anonymised by a scheduled job that scrubs personal fields while leaving enrollment and completion records intact. I also built the social learning layer and wired the admin dashboard to the reporting data.',
        th: 'ผมดูแลส่วนเหล่านี้ทั้ง stack เพิ่มระบบ audit log ที่บันทึกผู้กระทำ การกระทำ เป้าหมาย และเวลาของทุกการแก้ไขฝั่งแอดมิน พร้อมตัวกรองและ export เป็น CSV/Excel เปลี่ยนการลบถาวรเป็น soft delete ตาม PDPA บัญชีที่ถูกลบจะถูกซ่อนทันที กู้คืนได้ภายใน 30 วัน จากนั้น job ตามตารางเวลาจะ anonymize ข้อมูลส่วนบุคคลถาวรโดยยังคงประวัติการลงทะเบียนและการเรียนจบไว้ นอกจากนี้ยังพัฒนาส่วน social learning และเชื่อมแดชบอร์ดแอดมินเข้ากับข้อมูลรายงาน',
      },
      result: {
        en: 'Client administrators can now answer an audit question themselves in the console instead of asking the dev team for a database query, and a deletion request is a single action with a safe undo window. The reporting deep links cut the number of manual data pulls the team was handling each month.',
        th: 'ตอนนี้แอดมินฝั่งลูกค้าตรวจสอบย้อนหลังได้เองจากหน้าคอนโซล แทนที่จะต้องขอให้ทีม dev ไปคิวรีฐานข้อมูล และคำขอลบข้อมูลก็จบในคลิกเดียวพร้อมช่วงเวลากู้คืนที่ปลอดภัย ส่วนลิงก์ลัดในหน้ารายงานช่วยลดจำนวนงานดึงข้อมูลด้วยมือที่ทีมต้องทำในแต่ละเดือน',
      },
    },
    features: [
      {
        title: { en: 'Audit log with filters and export', th: 'Audit log พร้อมตัวกรองและ export' },
        body: {
          en: 'Every administrative change writes an entry holding the actor, the action, the affected record and the timestamp. The console filters by date range, actor and action type, and the filtered result exports straight to CSV or Excel for compliance reviews.',
          th: 'ทุกการแก้ไขฝั่งแอดมินจะบันทึกรายการที่มีผู้กระทำ การกระทำ ข้อมูลที่ถูกแก้ และเวลา หน้าคอนโซลกรองตามช่วงวันที่ ผู้กระทำ และประเภทการกระทำได้ แล้ว export ผลลัพธ์ที่กรองแล้วเป็น CSV หรือ Excel เพื่อใช้ตรวจสอบ',
        },
        shot: { en: 'Audit log table', th: 'ตาราง audit log' },
      },
      {
        title: { en: 'PDPA soft delete and 30-day restore', th: 'Soft delete และกู้คืน 30 วันตาม PDPA' },
        body: {
          en: 'Deleting a user marks the record instead of removing it. The account disappears from every list immediately but stays restorable for 30 days, which turns an accidental deletion from a data-loss incident into a one-click undo.',
          th: 'การลบผู้ใช้จะเป็นการทำเครื่องหมายแทนการลบจริง บัญชีหายจากทุกรายการทันทีแต่ยังกู้คืนได้ภายใน 30 วัน การลบผิดจึงกลายเป็นการกดย้อนกลับครั้งเดียว ไม่ใช่เหตุข้อมูลสูญหาย',
        },
        shot: { en: 'Restore panel', th: 'หน้ากู้คืนข้อมูล' },
      },
      {
        title: { en: 'Scheduled anonymisation job', th: 'งาน anonymize ตามตารางเวลา' },
        body: {
          en: 'Once the 30-day window closes, a scheduled job overwrites the personal fields — name, email, phone — while keeping enrollment and completion rows, so historical training reports stay accurate after the data is gone.',
          th: 'เมื่อครบ 30 วัน job ตามตารางเวลาจะเขียนทับข้อมูลส่วนบุคคล ทั้งชื่อ อีเมล เบอร์โทร โดยยังเก็บแถวการลงทะเบียนและการเรียนจบไว้ รายงานการอบรมย้อนหลังจึงยังถูกต้องหลังข้อมูลถูกลบ',
        },
        shot: { en: 'Anonymisation flow', th: 'ขั้นตอน anonymize' },
      },
      {
        title: { en: 'Social learning', th: 'Social learning' },
        body: {
          en: 'Learners post video contributions to a course feed. I implemented the player controls, the completion rule that decides when a video counts as watched, and the moderation queue where an admin approves or rejects a transcript before it becomes visible.',
          th: 'ผู้เรียนโพสต์วิดีโอลงฟีดของคอร์สได้ ผมพัฒนาส่วนควบคุมการเล่น เงื่อนไขที่ตัดสินว่าวิดีโอถูกดูจบแล้ว และคิวตรวจสอบที่ให้แอดมินอนุมัติหรือปฏิเสธ transcript ก่อนแสดงผล',
        },
        shot: { en: 'Social feed', th: 'ฟีด social learning' },
      },
      {
        title: { en: 'Dashboard deep links', th: 'ลิงก์ลัดจากแดชบอร์ด' },
        body: {
          en: 'Each dashboard metric links through to the filtered list behind it, so an admin who sees an unexpected number lands directly on the matching rows instead of rebuilding the filter by hand.',
          th: 'ตัวเลขแต่ละตัวบนแดชบอร์ดลิงก์ไปยังรายการที่กรองไว้แล้ว แอดมินที่เห็นตัวเลขผิดปกติจึงกดเข้าไปเจอแถวข้อมูลตรงนั้นได้เลย ไม่ต้องตั้งตัวกรองใหม่เอง',
        },
        shot: { en: 'Admin dashboard', th: 'แดชบอร์ดแอดมิน' },
      },
      {
        title: { en: 'xAPI statement viewer', th: 'หน้าดู xAPI statement' },
        body: {
          en: 'A viewer that lists the raw xAPI statements a learner generated inside imported content, which is what we use to explain why a learner shows as incomplete when the content provider disagrees.',
          th: 'หน้าที่แสดง xAPI statement ดิบที่ผู้เรียนสร้างจากเนื้อหานำเข้า ใช้อธิบายได้ว่าทำไมผู้เรียนถึงยังไม่ถูกนับว่าเรียนจบ เมื่อผู้ให้บริการเนื้อหาเห็นไม่ตรงกัน',
        },
        shot: { en: 'Statement viewer', th: 'หน้าดู statement' },
      },
    ],
    next: 'membership-booking',
  },
  {
    slug: 'membership-booking',
    index: '03',
    badge: 'NEXT.JS',
    tags: ['Next.js', 'SQL Server'],
    cover: { from: '#33BF99', to: '#0D7366' },
    title: {
      en: 'Membership & Course Booking',
      th: 'ระบบสมาชิกและจองคอร์สอบรม',
    },
    summary: {
      en: 'Course booking for a client with VIP membership, discount coupons and automatic invoicing.',
      th: 'ระบบจองคอร์สสำหรับลูกค้า พร้อมสมาชิก VIP คูปองส่วนลด และออกใบแจ้งหนี้อัตโนมัติ',
    },
    role: {
      en: 'Full-stack developer',
      th: 'Full-stack developer',
    },
    period: { en: '2025', th: '2025' },
    kind: { en: 'Client project', th: 'งานลูกค้า' },
    stack: [
      {
        name: 'Next.js',
        slug: 'nextdotjs',
        note: {
          en: 'Public booking pages and the member area.',
          th: 'หน้าจองสำหรับบุคคลทั่วไปและพื้นที่สมาชิก',
        },
      },
      {
        name: 'SQL Server',
        slug: 'sqlserver',
        note: {
          en: 'Client-mandated database for members, bookings and invoices.',
          th: 'ฐานข้อมูลตามที่ลูกค้ากำหนด เก็บสมาชิก การจอง และใบแจ้งหนี้',
        },
      },
    ],
    links: { internal: true },
    overview: {
      problem: {
        en: 'The client took course bookings by phone and spreadsheet, then wrote every invoice by hand, which made VIP pricing and coupon discounts slow and error-prone.',
        th: 'ลูกค้ารับจองคอร์สทางโทรศัพท์และสเปรดชีต แล้วออกใบแจ้งหนี้เองทุกใบ ทำให้ราคาสมาชิก VIP และส่วนลดคูปองช้าและผิดพลาดง่าย',
      },
      solution: {
        en: 'I built a booking site with member registration, VIP tiers that apply their own pricing automatically, coupon validation at checkout, and invoice generation triggered by a confirmed booking.',
        th: 'ผมทำเว็บจองที่มีระบบสมัครสมาชิก ระดับ VIP ที่คิดราคาของตัวเองอัตโนมัติ ตรวจสอบคูปองตอนชำระเงิน และสร้างใบแจ้งหนี้เมื่อการจองได้รับการยืนยัน',
      },
      result: {
        en: 'Bookings and invoices are handled in one place, and the staff no longer reconcile a spreadsheet against manually written invoices.',
        th: 'การจองและใบแจ้งหนี้อยู่ที่เดียวกัน พนักงานไม่ต้องกระทบยอดสเปรดชีตกับใบแจ้งหนี้ที่เขียนเองอีกต่อไป',
      },
    },
    features: [
      {
        title: { en: 'VIP membership tiers', th: 'ระดับสมาชิก VIP' },
        body: {
          en: 'Members are assigned a tier that carries its own course pricing, applied automatically at checkout.',
          th: 'สมาชิกถูกกำหนดระดับที่มีราคาคอร์สของตัวเอง และคิดให้อัตโนมัติตอนชำระเงิน',
        },
        shot: { en: 'Member area', th: 'พื้นที่สมาชิก' },
      },
      {
        title: { en: 'Discount coupons', th: 'คูปองส่วนลด' },
        body: {
          en: 'Coupon codes are validated against their expiry date and usage limit before the total is recalculated.',
          th: 'ตรวจสอบรหัสคูปองกับวันหมดอายุและจำนวนครั้งที่ใช้ได้ ก่อนคำนวณยอดรวมใหม่',
        },
        shot: { en: 'Checkout', th: 'หน้าชำระเงิน' },
      },
      {
        title: { en: 'Automatic invoicing', th: 'ออกใบแจ้งหนี้อัตโนมัติ' },
        body: {
          en: 'A confirmed booking generates an invoice with the final price, the discount applied and the member details.',
          th: 'การจองที่ยืนยันแล้วจะสร้างใบแจ้งหนี้ที่มีราคาสุทธิ ส่วนลดที่ใช้ และข้อมูลสมาชิก',
        },
        shot: { en: 'Invoice', th: 'ใบแจ้งหนี้' },
      },
    ],
    next: 'gov-elearning',
  },
  {
    slug: 'gov-elearning',
    index: '04',
    badge: 'SPRING BOOT',
    tags: ['Spring Boot', 'API Docs'],
    cover: { from: '#8C73FF', to: '#4D33B3' },
    title: {
      en: 'Government E-learning Platform',
      th: 'E-learning ภาครัฐ',
    },
    summary: {
      en: 'Bootstrapped backend and frontend from scratch, documented 129 API endpoints and wrote API test scripts.',
      th: 'วางโครง backend + frontend ตั้งแต่ต้น เขียนเอกสาร API 129 endpoints และสคริปต์ทดสอบ API',
    },
    role: {
      en: 'Back-end developer and API documentation owner',
      th: 'Back-end developer และผู้ดูแลเอกสาร API',
    },
    period: { en: '2025', th: '2025' },
    kind: { en: 'Government project', th: 'งานภาครัฐ' },
    stack: [
      {
        name: 'Spring Boot',
        slug: 'springboot',
        note: {
          en: 'REST API layer, authentication and the course/reporting services.',
          th: 'ชั้น REST API ระบบยืนยันตัวตน และเซอร์วิสคอร์สกับรายงาน',
        },
      },
      {
        name: 'MySQL',
        slug: 'mysql',
        note: {
          en: 'Schema for users, courses, progress and reporting.',
          th: 'schema ของผู้ใช้ คอร์ส ความคืบหน้า และรายงาน',
        },
      },
    ],
    links: { internal: true },
    overview: {
      problem: {
        en: 'A government e-learning platform had to be started from an empty repository, and the agency required complete API documentation as a delivery condition.',
        th: 'ระบบ e-learning ภาครัฐต้องเริ่มจาก repository เปล่า และหน่วยงานกำหนดให้ส่งมอบเอกสาร API ที่ครบถ้วนเป็นเงื่อนไข',
      },
      solution: {
        en: 'I set up the backend and frontend structure, implemented the REST layer, then documented all 129 endpoints with their request and response shapes and wrote test scripts that exercise them.',
        th: 'ผมวางโครงสร้าง backend และ frontend พัฒนาชั้น REST แล้วเขียนเอกสาร endpoint ทั้ง 129 รายการพร้อมรูปแบบ request/response และเขียนสคริปต์ทดสอบเรียกใช้จริง',
      },
      result: {
        en: 'The documentation passed the agency review and the test scripts gave the team a repeatable way to check the API after each change.',
        th: 'เอกสารผ่านการตรวจของหน่วยงาน และสคริปต์ทดสอบทำให้ทีมตรวจ API ซ้ำได้ทุกครั้งที่แก้โค้ด',
      },
    },
    features: [
      {
        title: { en: '129 documented endpoints', th: 'เอกสาร API 129 endpoints' },
        body: {
          en: 'Every endpoint documented with its method, parameters, request body, response shape and error cases.',
          th: 'ทุก endpoint มีเอกสารระบุ method พารามิเตอร์ request body รูปแบบ response และกรณี error',
        },
        shot: { en: 'API reference', th: 'เอกสาร API' },
      },
      {
        title: { en: 'API test scripts', th: 'สคริปต์ทดสอบ API' },
        body: {
          en: 'Scripts that call each endpoint with valid and invalid input so regressions surface before delivery.',
          th: 'สคริปต์ที่เรียกทุก endpoint ด้วยข้อมูลถูกและผิด เพื่อให้เจอปัญหาก่อนส่งมอบ',
        },
        shot: { en: 'Test run', th: 'ผลการทดสอบ' },
      },
      {
        title: { en: 'Project bootstrap', th: 'วางโครงโปรเจกต์' },
        body: {
          en: 'Backend and frontend project structure, build configuration and the initial data model set up from scratch.',
          th: 'วางโครงสร้างโปรเจกต์ backend และ frontend ตั้งค่า build และ data model เริ่มต้นตั้งแต่ต้น',
        },
        shot: { en: 'Repository layout', th: 'โครงสร้าง repository' },
      },
    ],
    next: 'vr-science-games',
  },
  {
    slug: 'vr-science-games',
    index: '05',
    badge: 'VR',
    tags: ['VR', 'Integration'],
    cover: { from: '#FF80A6', to: '#BF3373' },
    title: { en: 'VR Science Games ×13', th: 'เกม VR วิทยาศาสตร์ ×13' },
    summary: {
      en: 'Connected 13 VR games to the backend to record gameplay results and produced game builds for delivery.',
      th: 'เชื่อมต่อเกม VR 13 เกมกับ backend เพื่อบันทึกผลการเล่น และ build ตัวเกมส่งมอบ',
    },
    role: {
      en: 'Integration developer and build engineer',
      th: 'ผู้พัฒนาส่วนเชื่อมต่อและจัดทำ build',
    },
    period: { en: '2025', th: '2025' },
    kind: { en: 'Client project', th: 'งานลูกค้า' },
    stack: [
      {
        name: 'Spring Boot',
        slug: 'springboot',
        note: {
          en: 'Result-collection API shared by all thirteen games.',
          th: 'API รับผลการเล่นที่ใช้ร่วมกันทั้ง 13 เกม',
        },
      },
      {
        name: 'MySQL',
        slug: 'mysql',
        note: {
          en: 'Stores gameplay results per student and per game.',
          th: 'เก็บผลการเล่นรายนักเรียนและรายเกม',
        },
      },
    ],
    links: { internal: true },
    overview: {
      problem: {
        en: 'Thirteen VR science games were built as standalone experiences, so teachers had no record of who played what or how they scored.',
        th: 'เกม VR วิทยาศาสตร์ 13 เกมถูกสร้างเป็นเกมแยกเดี่ยว ครูจึงไม่มีบันทึกว่าใครเล่นเกมไหนและได้คะแนนเท่าไร',
      },
      solution: {
        en: 'I defined one result-collection API, integrated all thirteen games with it so each submits its score and completion on finish, and produced the delivery builds.',
        th: 'ผมออกแบบ API รับผลการเล่นชุดเดียว เชื่อมเกมทั้ง 13 เกมเข้ากับ API ให้ส่งคะแนนและสถานะเมื่อเล่นจบ และจัดทำ build สำหรับส่งมอบ',
      },
      result: {
        en: 'Gameplay results from every game land in one database, so a teacher sees each student across all thirteen titles in a single view.',
        th: 'ผลการเล่นจากทุกเกมเข้ามาที่ฐานข้อมูลเดียว ครูจึงดูผลของนักเรียนแต่ละคนครบทั้ง 13 เกมได้ในหน้าเดียว',
      },
    },
    features: [
      {
        title: { en: 'Shared result API', th: 'API รับผลร่วม' },
        body: {
          en: 'One endpoint contract that all thirteen games post to, so adding a game does not require backend changes.',
          th: 'สัญญา endpoint ชุดเดียวที่ทั้ง 13 เกมส่งข้อมูลเข้ามา เพิ่มเกมใหม่จึงไม่ต้องแก้ backend',
        },
        shot: { en: 'Integration contract', th: 'สัญญาการเชื่อมต่อ' },
      },
      {
        title: { en: 'Per-student gameplay records', th: 'บันทึกผลรายนักเรียน' },
        body: {
          en: 'Each session stores the student, the game, the score and the completion state for later reporting.',
          th: 'แต่ละรอบการเล่นเก็บนักเรียน เกม คะแนน และสถานะการเล่นจบ ไว้ใช้ทำรายงาน',
        },
        shot: { en: 'Results table', th: 'ตารางผลการเล่น' },
      },
      {
        title: { en: 'Delivery builds', th: 'จัดทำ build ส่งมอบ' },
        body: {
          en: 'Produced and verified the packaged builds of all thirteen games handed over to the client.',
          th: 'จัดทำและตรวจสอบ build ของเกมทั้ง 13 เกมที่ส่งมอบให้ลูกค้า',
        },
        shot: { en: 'Build output', th: 'ไฟล์ build' },
      },
    ],
    next: 'goskillup-lms',
  },
];

export const getProject = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);
