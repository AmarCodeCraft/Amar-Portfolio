import React, { lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

// Lazy-load below-the-fold sections for faster initial paint
const About = lazy(() => import("./components/About"));
const Experience = lazy(() => import("./components/Experience"));
const Tech = lazy(() => import("./components/Tech"));
const Works = lazy(() => import("./components/Works"));
const Feedbacks = lazy(() => import("./components/Feedbacks"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));
const StarsCanvas = lazy(() =>
  import("./components/canvas/Stars").then((m) => ({ default: m.default }))
);

// Minimal fallback that doesn't cause layout shift
const SectionFallback = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        {/* Ambient background glow */}
        <div className="ambient-glow" aria-hidden="true" />

        {/* Hero Section — loaded eagerly for fast FCP */}
        <div className="bg-gradient-to-b from-[#0B0F19] via-[#0D1322] to-[#0B0F19]">
          <Navbar />
          <Hero />
        </div>

        {/* Below-the-fold: lazy loaded */}
        <Suspense fallback={<SectionFallback />}>
          <About />
          <Experience />
          <Tech />
          <Works />
          <Feedbacks />
          <div className="relative z-0">
            <Contact />
            <StarsCanvas />
            <Footer />
          </div>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
