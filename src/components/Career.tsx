import "./styles/Career.css";
import { useLanguage } from "../context/LanguageProvider";

const Career = () => {
  const { language } = useLanguage();

  const content = {
    titleLineOne: language === "th" ? "เส้นทาง" : "My career",
    titleLineTwo: language === "th" ? "ประสบการณ์" : "experience",
    educationTitle:
      language === "th"
        ? "วิศวกรรมคอมพิวเตอร์และอิเล็กทรอนิกส์"
        : "Computer & Electronics Engineering",
    educationSchool:
      language === "th" ? "มหาวิทยาลัยรามคำแหง" : "Ramkhamhaeng University",
    educationPeriod: language === "th" ? "2022 - ปัจจุบัน" : "2022 - Present",
    educationDescription:
      language === "th"
        ? "ปัจจุบันกำลังศึกษาอยู่ชั้นปีที่ 4 และพัฒนาพื้นฐานด้านการพัฒนาซอฟต์แวร์ สถาปัตยกรรมระบบ และเทคโนโลยีเว็บสมัยใหม่อย่างต่อเนื่อง"
        : "Currently in my 4th year, building a strong technical foundation in software development, system architecture, and modern web technologies.",
    projectTitle: language === "th" ? "โปรเจกต์จบ" : "Final Year Project",
    projectDescription:
      language === "th"
        ? "ออกแบบและพัฒนา Learning Management System สำหรับผู้เรียนและผู้ดูแลระบบ โดยมีฟีเจอร์จัดการคอร์ส การลงทะเบียนเรียน แบบทดสอบ ใบประกาศนียบัตร สิทธิ์การเข้าถึง และรายงานผล"
        : "Designed and developed a capstone Learning Management System for both learners and administrators, featuring course management, enrollment workflows, quizzes, certificates, role-based access control, and progress reporting.",
    roleTitle:
      language === "th" ? "Junior Front-End Developer" : "Jr. Front-End Developer",
    rolePeriod: language === "th" ? "2026 - ปัจจุบัน" : "2026 - Present",
    roleDescription:
      language === "th"
        ? "พัฒนาระบบฝั่ง front-end สำหรับผลิตภัณฑ์ Learning Management System ของบริษัท พร้อมช่วยดูแลงานที่เกี่ยวข้องกับฐานข้อมูล การแก้ไขบั๊ก และเสถียรภาพของระบบเพื่อให้ผู้ใช้ได้รับประสบการณ์ที่ลื่นไหล"
        : "Developing the front-end for the company's Learning Management System (LMS) product. Responsibilities include occasional database-related tasks, handling migrations, and resolving bugs to ensure a smooth and stable user experience.",
  };

  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          {content.titleLineOne} <span>&</span>
          <br /> {content.titleLineTwo}
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          
          {/* Box 1: Education */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>{content.educationTitle}</h4>
                <h5>{content.educationSchool}</h5>
              </div>
              <h3>{content.educationPeriod}</h3>
            </div>
            <p>{content.educationDescription}</p>
          </div>

          {/* Box 2: Final Year Project */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>{content.projectTitle}</h4>
                <h5>GoSkillUp LMS Platform</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>{content.projectDescription}</p>
          </div>

          {/* Box 3: Current Role */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>{content.roleTitle}</h4>
                <h5>Learn Tech</h5>
              </div>
              <h3>{content.rolePeriod}</h3>
            </div>
            <p>{content.roleDescription}</p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Career;
