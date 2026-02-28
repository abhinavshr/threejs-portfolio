import Hero from "./components/Hero";
import About from "./components/About";
import "./App.css";

function App() {
  return (
    <main className="bg-slate-950 min-h-screen text-slate-100 font-sans">
      <Hero />
      <About />
    </main>
  );
}

export default App;
