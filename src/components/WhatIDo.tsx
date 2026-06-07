import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageProvider";

const WhatIDo = () => {
  const { language } = useLanguage();
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };

  const content = {
    title: language === "th" ? "สิ่งที่ผมทำ" : "WHAT I DO",
    label: language === "th" ? "จุดเด่น" : "Focus",
    tools: language === "th" ? "ทักษะและเครื่องมือ" : "Skillset & tools",
    developTitle: language === "th" ? "พัฒนา" : "DEVELOP",
    developDescription:
      language === "th"
        ? "ผมพัฒนาเว็บที่ responsive และใช้งานง่าย โดยให้ความสำคัญกับหน้าตาที่สะอาด การโต้ตอบที่ลื่นไหล และโครงสร้าง front-end ที่ดูแลต่อได้ง่าย"
        : "I build responsive and user-friendly web experiences with a strong focus on clean interfaces, smooth interactions, and maintainable front-end architecture.",
    implementTitle: language === "th" ? "นำไปพัฒนา" : "IMPLEMENT",
    implementDescription:
      language === "th"
        ? "ผมนำแนวคิดจาก UX/UI มาพัฒนาเป็นหน้าจอจริงที่ดูเรียบร้อย ใช้งานได้ดี และมีความสม่ำเสมอ โดยใส่ใจกับรายละเอียดและประสบการณ์ผู้ใช้"
        : "I turn UX/UI concepts into polished, responsive interfaces by translating design handoff files into consistent front-end experiences with attention to detail and usability.",
  };

  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">{content.title}</h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>{content.developTitle}</h3>
              <h4>{content.label}</h4>
              <p>{content.developDescription}</p>
              <h5>{content.tools}</h5>
              <div className="what-content-flex">
                <div className="what-tags">JavaScript</div>
                <div className="what-tags">TypeScript</div>
                <div className="what-tags">React</div>
                <div className="what-tags">CSS</div>
                <div className="what-tags">Next.js</div>
                <div className="what-tags">Tailwind CSS</div>
                <div className="what-tags">MySQL</div>
                <div className="what-tags">SQL Server</div>
                <div className="what-tags">DBeaver</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>{content.implementTitle}</h3>
              <h4>{content.label}</h4>
              <p>{content.implementDescription}</p>
              <h5>{content.tools}</h5>
              <div className="what-content-flex">
                <div className="what-tags">Figma</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
