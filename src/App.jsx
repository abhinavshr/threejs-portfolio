import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import SoftSkills from "./components/SoftSkills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import "./App.css";

function App() {
  return (
    <main className="bg-slate-950 min-h-screen text-slate-100 font-sans">
      <Hero />
      <About />
      <Skills />
      <SoftSkills />
      <Experience />
      <Projects />
    </main>
  );
}

export default App;
