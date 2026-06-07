import "./styles/About.css";
import { useLanguage } from "../context/LanguageProvider";

const About = () => {
  const { language } = useLanguage();

  const content = {
    title: language === "th" ? "เกี่ยวกับผม" : "About Me",
    description:
      language === "th"
        ? "สวัสดีครับ ผม Haroon Kasor เป็นนักพัฒนา Front-End ที่ชื่นชอบการเขียนโค้ดและสร้างเว็บไซต์ที่ใช้งานง่าย ผมสนุกกับการเรียนรู้เทคโนโลยีใหม่ ๆ และพัฒนาทักษะของตัวเองอยู่เสมอ เพื่อเปลี่ยนไอเดียที่ซับซ้อนให้กลายเป็นประสบการณ์ดิจิทัลที่ลื่นไหลและใช้งานได้จริง"
        : "Hello, I'm Haroon Kasor, a Front-End Developer with a passion for coding and creating intuitive, user-friendly websites. I enjoy learning new technologies and am constantly striving to improve my skills, turning complex ideas into seamless digital experiences.",
  };

  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">{content.title}</h3>
        <p className="para">{content.description}</p>
      </div>
    </div>
  );
};

export default About;
