import type { Localized } from "./types";

export type Testimonial = {
  /** 2–3 sentences about work quality or collaboration. */
  quote: Localized;
  /** Person's name as it should appear (same in both languages is fine). */
  name: Localized;
  /** Job title. */
  role: Localized;
  /** Company / university. */
  org: string;
  /** Optional avatar under /public, e.g. "/images/testimonials/somchai.jpg". */
  avatar?: string;
};

/**
 * ใส่คำรับรองจริงที่นี่ — section "05 คำรับรอง" จะแสดงอัตโนมัติเมื่อมีอย่างน้อย 1 รายการ
 * (ลบ/ปล่อยว่างไว้ = ซ่อน section)
 *
 * ตัวอย่าง:
 * {
 *   quote: {
 *     th: "ฮารูนรับผิดชอบงาน full stack ได้ครบ ส่งงานตรงเวลา และเขียนโค้ดที่ทีมอ่านต่อได้ง่าย",
 *     en: "Haroon owns full-stack work end to end, ships on time, and writes code the team can read.",
 *   },
 *   name: { th: "สมชาย ใจดี", en: "Somchai Jaidee" },
 *   role: { th: "หัวหน้าทีมพัฒนา", en: "Engineering Lead" },
 *   org: "Learn Tech",
 *   avatar: "/images/testimonials/somchai.jpg",
 * },
 */
export const testimonials: Testimonial[] = [];

export const SHOW_TESTIMONIAL = testimonials.length > 0;
