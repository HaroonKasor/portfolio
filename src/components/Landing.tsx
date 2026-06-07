import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { useLanguage } from "../context/LanguageProvider";

const Landing = ({ children }: PropsWithChildren) => {
  const { language } = useLanguage();
  const firstName = "Haroon";
  const lastName = "Kasor";

  const content = {
    greeting: language === "th" ? "สวัสดี, ผมชื่อ" : "Hello! I'm",
    roleLead: language === "th" ? "ผมเป็น" : "A Creative",
    roleOne: language === "th" ? "Front-End" : "Front-End",
    roleTwo: language === "th" ? "Developer" : "Developer",
    roleAltOne: language === "th" ? "ผู้พัฒนา" : "Developer",
    roleAltTwo: language === "th" ? "UI" : "Builder",
  };

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>{content.greeting}</h2>
            <h1 key={`${firstName}-${lastName}`}>
              {firstName}
              <br />
              <span>{lastName}</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>{content.roleLead}</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">{content.roleOne}</div>
              <div className="landing-h2-2">{content.roleTwo}</div>
            </h2>
            <h2>
              <div className="landing-h2-info">{content.roleAltOne}</div>
              <div className="landing-h2-info-1">{content.roleAltTwo}</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
