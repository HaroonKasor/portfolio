import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface AnimatedElement extends HTMLElement {
  anim?: gsap.core.Tween;
}

gsap.registerPlugin(ScrollTrigger);

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;

  const paras: NodeListOf<AnimatedElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<AnimatedElement> =
    document.querySelectorAll(".title");

  const triggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const toggleAction = "play pause resume reverse";

  paras.forEach((para) => {
    para.classList.add("visible");
    para.anim?.progress(1).kill();

    para.anim = gsap.fromTo(
      para,
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: toggleAction,
          start: triggerStart,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
      }
    );
  });

  titles.forEach((title) => {
    title.anim?.progress(1).kill();

    title.anim = gsap.fromTo(
      title,
      { autoAlpha: 0, y: 40, rotate: 4 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: toggleAction,
          start: triggerStart,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
      }
    );
  });
}
