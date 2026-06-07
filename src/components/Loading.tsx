import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";
import { useLanguage } from "../context/LanguageProvider";

import Marquee from "react-fast-marquee";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const { language } = useLanguage();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  const content = {
    loading: language === "th" ? "กำลังโหลด" : "Loading",
    welcome: language === "th" ? "ยินดีต้อนรับ" : "Welcome",
    marquee:
      language === "th"
        ? ["นักพัฒนา Front-End", "ผู้สร้าง Responsive UI"]
        : ["Creative Front-End Developer", "Responsive UI Builder"],
  };

  useEffect(() => {
    if (percent < 100 || loaded) return;

    const loadedTimer = window.setTimeout(() => {
      setLoaded(true);
    }, 120);

    return () => {
      window.clearTimeout(loadedTimer);
    };
  }, [percent, loaded]);

  useEffect(() => {
    if (!loaded || isLoaded) return;

    const revealTimer = window.setTimeout(() => {
      setIsLoaded(true);
    }, 140);

    return () => {
      window.clearTimeout(revealTimer);
    };
  }, [loaded, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    let cancelled = false;
    let timer = 0;

    import("./utils/initialFX").then((module) => {
      if (cancelled) return;

      setClicked(true);
      timer = window.setTimeout(() => {
        try {
          if (module.initialFX) {
            module.initialFX();
          }
        } finally {
          setIsLoading(false);
        }
      }, 250);
    }).catch(() => {
      if (cancelled) return;

      setClicked(true);
      timer = window.setTimeout(() => {
        setIsLoading(false);
      }, 250);
    });

    return () => {
      cancelled = true;
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, [isLoaded]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          R7G
        </a>
        <div className={`loaderGame ${clicked && "loader-out"}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-screen">
        <div className="fluid-orb orb-1"></div>
        <div className="fluid-orb orb-2"></div>
        <div className="fluid-orb orb-3"></div>
        <div className="loading-marquee">
          <Marquee>
            {content.marquee.map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
            {content.marquee.map((item, index) => (
              <span key={`${item}-repeat-${index}`}>{item}</span>
            ))}
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked && "loading-clicked"}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded && "loading-complete"}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  {content.loading} <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>{content.welcome}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent < 80) {
      const rand = 4 + Math.round(Math.random() * 8);
      percent = Math.min(percent + rand, 80);
      setLoading(percent);
    } else {
      clearInterval(interval);
    }
  }, 120);

  function clear() {
    clearInterval(interval);
    percent = 100;
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent = Math.min(percent + 4, 100);
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 16);
    });
  }
  return { loaded, percent, clear };
};
