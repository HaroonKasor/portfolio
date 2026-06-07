import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useEffect, useMemo, useRef } from "react";
import { useLanguage } from "../context/LanguageProvider";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Work = () => {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const content = useMemo(
    () => ({
      toolsLabel:
        language === "th" ? "เครื่องมือและฟีเจอร์" : "Tools and features",
      projects: [
        {
          number: "01",
          name: "GoSkillUp",
          category: language === "th" ? "แพลตฟอร์ม LMS" : "LMS Platform",
          tools: "Next.js, React, Tailwind CSS, Prisma, MariaDB",
          summary:
            language === "th"
              ? "โปรเจกต์จบประเภท LMS สำหรับผู้เรียนและผู้ดูแลระบบ พร้อมฟีเจอร์คอร์ส แบบทดสอบ ใบประกาศนียบัตร และรายงานผล"
              : "Capstone LMS project built for learners and administrators with course, quiz, certificate, and reporting workflows.",
          image: "/images/goskillup.png",
          alt: "GoSkillUp LMS Platform",
          link: "https://goskillup.me/",
        },
        {
          number: "02",
          name: "OBEC MyLearnTime VR Admin",
          category:
            language === "th"
              ? "แดชบอร์ดหลังบ้านภายใน"
              : "Internal Admin Dashboard",
          tools: "React, API Integration, Dashboard UI, Data Tracking",
          summary:
            language === "th"
              ? "แดชบอร์ดภายในสำหรับติดตามกิจกรรม VR คะแนน ประสบการณ์ที่เล่น และประวัติการใช้งานจากข้อมูล API"
              : "Internal dashboard for tracking VR activity, scores, played experiences, and historical usage data from API records.",
          image: "/images/obec.png",
          alt: "OBEC MyLearnTime VR Admin Dashboard",
        },
        {
          number: "03",
          name: "Learn Tech LMS Web",
          category:
            language === "th"
              ? "เว็บไซต์ผลิตภัณฑ์ EdTech"
              : "EdTech Product Website",
          tools: "React, Next.js, Responsive UI, UX/UI Handoff",
          summary:
            language === "th"
              ? "เว็บไซต์แพลตฟอร์มการเรียนรู้ที่เน้น responsive UI การนำเสนอบริการให้ชัดเจน และงาน front-end ที่ดูเรียบร้อย"
              : "Product-facing learning platform website focused on responsive UI, clear service presentation, and polished front-end delivery.",
          image: "/images/lms.png",
          alt: "Learn Tech LMS Web",
        },
      ],
    }),
    [language]
  );

  useGSAP(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const track = trackRef.current;

    if (!section || !container || !track || window.innerWidth <= 1024) {
      gsap.set(trackRef.current, { clearProps: "transform" });
      ScrollTrigger.getById("work")?.kill();
      return;
    }

    const getTranslateX = () => {
      const boxes = track.querySelectorAll<HTMLElement>(".work-box");
      const lastBox = boxes[boxes.length - 1];

      if (!lastBox) return 0;

      const paddingRight = parseFloat(window.getComputedStyle(track).paddingRight);
      const lastBoxEnd = lastBox.offsetLeft + lastBox.offsetWidth;

      return Math.max(lastBoxEnd - container.clientWidth + paddingRight, 0);
    };

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${getTranslateX()}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        id: "work",
      },
    });

    timeline.to(track, {
      x: () => -getTranslateX(),
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [language]);

  return (
    <div className="work-section" id="work" ref={sectionRef}>
      <div className="work-container section-container" ref={containerRef}>
        <h2>
          {language === "th" ? "ผลงาน" : "My"} <span>{language === "th" ? "ของผม" : "Work"}</span>
        </h2>
        <div className="work-flex" ref={trackRef}>
          {content.projects.map((project) => (
            <div className="work-box" key={project.number}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.number}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>{content.toolsLabel}</h4>
                <p>{project.tools}</p>
                <p className="work-summary">{project.summary}</p>
              </div>
              <WorkImage
                image={project.image}
                alt={project.alt}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
