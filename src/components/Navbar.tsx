import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap-trial/ScrollSmoother";
import "./styles/Navbar.css";
import { useLanguage } from "../context/LanguageProvider";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  const { language, setLanguage } = useLanguage();

  const navText = {
    title: "R7G",
    about: language === "th" ? "เกี่ยวกับ" : "ABOUT",
    work: language === "th" ? "ผลงาน" : "WORK",
    contact: language === "th" ? "ติดต่อ" : "CONTACT",
  };

  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      });
    });
    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          {navText.title}
        </a>
        <a
          href="mailto:mprgame02@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          mprgame02@gmail.com
        </a>
        <div className="navbar-lang-switch">
          <button
            type="button"
            className={language === "en" ? "active" : ""}
            onClick={() => setLanguage("en")}
          >
            EN
          </button>
          <span>/</span>
          <button
            type="button"
            className={language === "th" ? "active" : ""}
            onClick={() => setLanguage("th")}
          >
            TH
          </button>
        </div>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <span>{navText.about}</span>
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <span>{navText.work}</span>
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <span>{navText.contact}</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
