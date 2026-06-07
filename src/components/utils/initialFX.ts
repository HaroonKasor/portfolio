import gsap from "gsap";

export function initialFX() {
  document.body.style.overflowY = "auto";
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  gsap.fromTo(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
    { opacity: 0, y: 40, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.12,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    ".landing-h2-info",
    { opacity: 0, y: 40, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  LoopText(".landing-h2-info", ".landing-h2-info-1");
  LoopText(".landing-h2-1", ".landing-h2-2");
}

function LoopText(text1: string, text2: string) {
  var tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 3.5;
  const delay2 = delay * 2 + 1;

  tl.to(
    text1,
    {
      opacity: 0,
      y: -40,
      duration: 0.9,
      ease: "power3.inOut",
      delay: delay,
    })
    .fromTo(
      text2,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
      })
    .to(
      text2,
      {
        opacity: 0,
        y: -40,
        duration: 0.9,
        ease: "power3.inOut",
        delay: delay2,
      })
    .fromTo(
      text1,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
      });
}
