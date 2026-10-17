import React, { useEffect, useRef, memo, useCallback } from "react";
import { Tilt } from "react-tilt";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = memo(({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    gsap.fromTo(
      el,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "top center",
          scrub: true,
          markers: false,
        },
      }
    );
  }, []);

  const handleSourceClick = useCallback(() => {
    window.open(source_code_link, "_blank", "noopener,noreferrer");
  }, [source_code_link]);

  return (
    <div ref={cardRef}>
      <Tilt
        options={{ max: 10, scale: 1.01, speed: 400 }}
        className="bg-white border border-slate-200/80 p-5 rounded-2xl sm:w-[360px] w-full shadow-sm hover:shadow-md transition-shadow duration-300 group"
      >
        {/* Project Image */}
        <div className="relative w-full h-[230px] overflow-hidden rounded-xl bg-slate-100">
          <img
            src={image}
            alt={`Screenshot of ${name} project`}
            className="w-full h-full object-cover object-left transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* GitHub link */}
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <button
              onClick={handleSourceClick}
              className="bg-white/90 backdrop-blur-sm border border-slate-200 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-105 transition-transform duration-200 shadow-sm"
              aria-label={`View ${name} source code on GitHub`}
            >
              <img
                src={github}
                alt=""
                className="w-1/2 h-1/2 object-contain"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>

        {/* Project Info */}
        <div className="mt-5">
          <h3 className="text-slate-900 font-bold text-[20px] tracking-tight font-display">
            {name}
          </h3>
          <p className="mt-2 text-slate-600 text-[14px] leading-[22px]">
            {description}
          </p>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={`${name}-${tag.name}`}
              className="text-[12px] font-medium bg-slate-100 text-slate-700 px-2 py-1 rounded-md"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </Tilt>
    </div>
  );
});

ProjectCard.displayName = "ProjectCard";

const Works = () => {
  useEffect(() => {
    gsap.fromTo(
      ".project-card",
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".works-container",
          start: "top bottom",
          end: "top center",
          scrub: true,
          markers: false,
        },
      }
    );
  }, []);

  return (
    <>
      <div>
        <p className={`${styles.sectionSubText}`}>My work</p>
        <h2 className={`${styles.sectionHeadText} font-display`}>
          Projects<span className="text-accent">.</span>
        </h2>
      </div>

      <div className="w-full flex">
        <p className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]">
          Following projects showcase my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos. It reflects my ability to
          solve complex problems, work with different technologies, and manage
          projects effectively.
        </p>
      </div>

      <div
        id="works"
        className="works-container mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-8"
      >
        {projects.map((project, index) => (
          <div key={`project-${index}`} className="project-card">
            <ProjectCard index={index} {...project} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
