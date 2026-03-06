import React, { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
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

// A simple loading fallback
const SectionLoader = () => (
  <div className="w-full h-40 flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <main className="bg-slate-950 min-h-screen text-slate-100 font-sans">
      <Navbar />
      <Hero />
      <Suspense fallback={<SectionLoader />}>
        <About />
        <Skills />
        <SoftSkills />
        <Experience />
        <Education />
        <Certifications />
        <Projects />
        <Contact />
        <Footer />
      </Suspense>
    </main>
  );
}

export default App;
