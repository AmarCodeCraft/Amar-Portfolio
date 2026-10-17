import { memo, useCallback } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = memo(() => {
  const scrollToProjects = useCallback(() => {
    document.getElementById("works")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-screen mx-auto"
      aria-label="Hero section"
    >
      {/* Decorative subtle ambient lights */}
      <div
        className="absolute top-20 right-10 w-96 h-96 bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-40 left-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/*
        Hero text content — z-10 ensures it stays ABOVE the 3D canvas.
        max-w-2xl keeps text in the left half, clear of the 3D model.
      */}
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 z-10 pointer-events-none`}
      >
        {/* Accent line */}
        <div className="flex flex-col justify-center items-center mt-28 md:mt-5">
          <div className="w-4 h-4 rounded-full bg-indigo-500 shadow-[0_0_12px_#6366f1]" />
          <div className="w-0.5 sm:h-80 h-40 bg-gradient-to-b from-indigo-500 via-indigo-500/50 to-transparent" />
        </div>

        {/* Hero content */}
        <div className="mt-28 md:mt-5 max-w-2xl pointer-events-auto">
          <motion.h1
            className={`${styles.heroHeadText} font-display`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Hi, I'm{" "}
            <span className="purple-text-gradient">Amar</span>
          </motion.h1>

          <motion.p
            className={`${styles.heroSubText} mt-4 text-slate-300`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            I craft modern, high-performance web experiences with sleek design and scalable architecture.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <button
              onClick={scrollToContact}
              className="btn-primary"
              aria-label="Navigate to contact section"
            >
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Hire Me
              </span>
            </button>

            <button
              onClick={scrollToProjects}
              className="btn-outline"
              aria-label="Navigate to projects section"
            >
              <span className="flex items-center gap-2 whitespace-nowrap">
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                View Projects
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* 3D Computer Model — sits behind the text layer (z-0) */}
      <div className="absolute inset-0 z-[1]">
        <ComputersCanvas />
      </div>

      {/* Scroll indicator — above the 3D canvas */}
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-10">
        <a href="#about" aria-label="Scroll to about section">
          <div className="w-[35px] h-[64px] rounded-3xl border-2 border-secondary/50 flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-accent mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
