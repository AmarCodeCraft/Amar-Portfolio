import React, { useRef, useEffect, memo } from "react";
import { Tilt } from "react-tilt";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";

gsap.registerPlugin(ScrollTrigger);

const useGsap = (elementRef, animation, delay = 0) => {
  useEffect(() => {
    if (elementRef.current) {
      gsap.fromTo(
        elementRef.current,
        animation.from,
        {
          ...animation.to,
          delay,
          scrollTrigger: {
            trigger: elementRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [elementRef, animation, delay]);
};

const ServiceCard = memo(({ index, title, icon }) => {
  const cardRef = useRef(null);
  useGsap(cardRef, {
    from: { opacity: 0, y: 80, scale: 0.9 },
    to: { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" },
  }, index * 0.15);

  return (
    <Tilt
      className="xs:w-[250px] w-full"
      options={{ max: 25, scale: 1.02, speed: 400 }}
    >
      <div
        ref={cardRef}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card group"
      >
        <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col relative overflow-hidden">
          {/* Subtle hover glow */}
          <div
            className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            aria-hidden="true"
          />

          <img
            src={icon}
            alt={`${title} service icon`}
            className="w-16 h-16 object-contain relative z-10 transition-transform duration-300 group-hover:scale-110"
            width={64}
            height={64}
            loading="lazy"
          />
          <h3 className="text-white text-[20px] font-bold text-center relative z-10">
            {title}
          </h3>
        </div>
      </div>
    </Tilt>
  );
});

ServiceCard.displayName = "ServiceCard";

const About = () => {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);

  useGsap(headingRef, {
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
  });

  useGsap(paragraphRef, {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
  }, 0.3);

  return (
    <>
      <div ref={headingRef}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={`${styles.sectionHeadText} font-display`}>
          Overview<span className="text-accent">.</span>
        </h2>
      </div>

      <p
        ref={paragraphRef}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I'm a skilled software developer with experience in JavaScript, and expertise in frameworks
        like React, and Node.js. I'm a quick learner and collaborate closely with clients to create efficient,
        scalable, and user-friendly solutions that solve real-world problems. Let's work together to bring your ideas to life!
      </p>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
