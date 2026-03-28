import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LoadingScreen from "./components/LoadingScreen";
import AnimatedCursor from "react-animated-cursor";
import "./App.css";

// Lazy load components that are not immediately visible
const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const SoftSkills = lazy(() => import("./components/SoftSkills"));
const Experience = lazy(() => import("./components/Experience"));
const Education = lazy(() => import("./components/Education"));
const Certifications = lazy(() => import("./components/Certifications"));
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));
const NotFound = lazy(() => import("./components/NotFound"));
const Offline = lazy(() => import("./components/Offline"));

// A simple loading fallback
const SectionLoader = () => (
  <div className="w-full h-40 flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// High-end section reveal wrapper for premium scroll effect
const RevealSection = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 80, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1] // Custom refined spring-like easing 
    }}
    className="w-full relative z-10"
  >
    {children}
  </motion.div>
);

function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans relative">
      <AnimatePresence mode="wait">
        {!loadingComplete && (
          <LoadingScreen key="loading" onComplete={() => setLoadingComplete(true)} />
        )}
      </AnimatePresence>

      {/* Global Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 origin-left z-50"
        style={{ scaleX }}
      />
      <Navbar />
      <Hero />
      <Suspense fallback={<SectionLoader />}>
        <RevealSection><About /></RevealSection>
        <RevealSection><Skills /></RevealSection>
        <RevealSection><SoftSkills /></RevealSection>
        <RevealSection><Experience /></RevealSection>
        <RevealSection><Education /></RevealSection>
        <RevealSection><Certifications /></RevealSection>
        <RevealSection><Projects /></RevealSection>
        <RevealSection><Contact /></RevealSection>
        <RevealSection><Footer /></RevealSection>
      </Suspense>
    </main>
  );
}

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <>
        <AnimatedCursor
          innerSize={8}
          outerSize={35}
          innerScale={1}
          outerScale={2}
          outerAlpha={0}
          hasBlendMode={true}
          innerStyle={{
            backgroundColor: '#3b82f6'
          }}
          outerStyle={{
            border: '3px solid #3b82f6'
          }}
        />
        <Suspense fallback={<SectionLoader />}>
          <Offline />
        </Suspense>
      </>
    );
  }

  return (
    <>
      <AnimatedCursor
        innerSize={8}
        outerSize={35}
        innerScale={1}
        outerScale={2}
        outerAlpha={0}
        hasBlendMode={true}
        innerStyle={{
          backgroundColor: '#3b82f6'
        }}
        outerStyle={{
          border: '3px solid #3b82f6'
        }}
      />
      <Suspense fallback={<SectionLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
