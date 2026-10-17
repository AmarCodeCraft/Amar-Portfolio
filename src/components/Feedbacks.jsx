import React, { useEffect, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { testimonials } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const FeedbackCard = memo(({ index, testimonial, name, designation, company, image }) => {
  const cardRef = React.useRef(null);

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

  return (
    <div
      ref={cardRef}
      className="glass-card p-8 rounded-2xl xs:w-[320px] w-full"
    >
      {/* Quote mark */}
      <p className="text-indigo-400 font-serif font-black text-[40px] leading-none select-none">“</p>

      <div className="mt-1">
        <p className="text-slate-300 tracking-normal text-[15px] leading-relaxed">
          {testimonial}
        </p>

        <div className="mt-6 flex justify-between items-center gap-1">
          <div className="flex-1 flex flex-col">
            <p className="text-white font-medium text-[15px]">
              {name}
            </p>
            <p className="mt-0.5 text-slate-500 text-[12px]">
              {designation} at {company}
            </p>
          </div>

          <img
            src={image}
            alt={`Photo of ${name}`}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-800"
            width={40}
            height={40}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
});

FeedbackCard.displayName = "FeedbackCard";

const Feedbacks = () => {
  return (
    <div className="mt-12 bg-slate-900/50 border border-slate-800 rounded-2xl">
      <div
        className={`bg-slate-950 rounded-t-2xl border-b border-slate-800 ${styles.padding} min-h-[260px]`}
      >
        <div>
          <p className={styles.sectionSubText}>What others say</p>
          <h2 className={`${styles.sectionHeadText} font-display`}>
            Testimonials<span className="text-indigo-400">.</span>
          </h2>
        </div>
      </div>
      <div
        className={`-mt-16 pb-14 ${styles.paddingX} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center`}
      >
        {testimonials.map((testimonial, index) => (
          <FeedbackCard
            key={testimonial.name}
            index={index}
            {...testimonial}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
