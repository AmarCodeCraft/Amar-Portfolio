import React, { memo } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = memo(({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "rgba(15, 12, 41, 0.7)",
        backdropFilter: "blur(12px)",
        color: "#fff",
        border: "1px solid rgba(145, 94, 255, 0.1)",
        borderRadius: "16px",
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.3)",
      }}
      contentArrowStyle={{ borderRight: "7px solid rgba(145, 94, 255, 0.3)" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={`${experience.company_name} logo`}
            className="w-[90%] h-[90%] object-contain"
            loading="lazy"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[22px] font-bold tracking-tight font-display">
          {experience.title}
        </h3>
        <p
          className="text-accent text-[15px] font-semibold"
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 text-[14px] pl-1 tracking-wider leading-relaxed"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
});

ExperienceCard.displayName = "ExperienceCard";

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center font-display`}>
          Work Experience<span className="text-accent">.</span>
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
