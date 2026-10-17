import React, { useEffect, memo } from "react";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TechIcon = memo(({ name, icon }) => (
  <div
    className="tech-icon group relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-200 cursor-default"
    title={name}
  >
    <img
      src={icon}
      alt={`${name} technology icon`}
      className="w-12 h-12 sm:w-14 sm:h-14 object-contain transition-transform duration-300 group-hover:scale-105"
      width={56}
      height={56}
      loading="lazy"
    />

    {/* Tooltip */}
    <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs text-slate-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap bg-white px-2 py-0.5 rounded shadow-sm border border-slate-100">
      {name}
    </span>
  </div>
));

TechIcon.displayName = "TechIcon";

const Tech = () => {
  useEffect(() => {
    gsap.fromTo(
      ".tech-icon",
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".tech-icons-wrapper",
          start: "top 80%",
          end: "bottom 70%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section aria-label="Technologies and skills">
      <div className="mb-12">
        <p className={styles.sectionSubText}>What I work with</p>
        <h2 className={`${styles.sectionHeadText} font-display`}>
          Skills & Technologies<span className="text-accent">.</span>
        </h2>
      </div>

      <div className="tech-icons-wrapper flex flex-row flex-wrap justify-center gap-8 sm:gap-10">
        {technologies.map((technology) => (
          <TechIcon key={technology.name} {...technology} />
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(Tech, "tech");
