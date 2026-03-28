import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Rocket,
  BookOpen,
  Code2,
  Briefcase,
  Sparkles,
  Star,
  ArrowRight,
} from "lucide-react";

// ── Story chapters ──────────────────────────────────────────────────────────
const CHAPTERS = [
  {
    id: 1,
    era: "The Beginning",
    year: "2019",
    icon: <Sparkles className="w-6 h-6" />,
    color: "from-violet-500 to-purple-600",
    glow: "rgba(139,92,246,0.4)",
    accent: "violet",
    title: "A Spark of Curiosity",
    body: "It started with a simple question: \"How does this website actually work?\" That curiosity pulled me into the world of code. I built my first HTML page — a mess of tags and broken CSS — but it lit a fire that's never gone out.",
    highlight: "First lines of HTML written on a school computer",
  },
  {
    id: 2,
    era: "The Foundation",
    year: "2021",
    icon: <BookOpen className="w-6 h-6" />,
    color: "from-blue-500 to-indigo-600",
    glow: "rgba(99,102,241,0.4)",
    accent: "blue",
    title: "Building on Solid Ground",
    body: "College gave me structure. I dove deep into data structures, algorithms, and databases — not just to pass exams, but because I genuinely wanted to understand *why* systems work the way they do. Backend engineering became my obsession.",
    highlight: "BIT degree — mastering systems from the ground up",
  },
  {
    id: 3,
    era: "The Craft",
    year: "2023",
    icon: <Code2 className="w-6 h-6" />,
    color: "from-sky-500 to-cyan-600",
    glow: "rgba(6,182,212,0.4)",
    accent: "sky",
    title: "Finding My Stack",
    body: "Laravel clicked immediately. The elegance of MVC, the power of Eloquent ORM, the joy of building secure APIs from scratch — I built a full College Finder platform for Nepal and realized: this is what I'm meant to do. I wasn't just coding, I was engineering solutions.",
    highlight: "College Finder — first real-world Laravel product",
  },
  {
    id: 4,
    era: "The Arena",
    year: "2024",
    icon: <Briefcase className="w-6 h-6" />,
    color: "from-emerald-500 to-teal-600",
    glow: "rgba(16,185,129,0.4)",
    accent: "emerald",
    title: "Into the Real World",
    body: "Two internships — one at Grafi Offshore building Laravel backends, another at Eos Web Solutions crafting Flutter mobile apps. Each day brought real users, real deadlines, and real lessons. I learned that writing code is one thing; shipping software is another.",
    highlight: "Laravel APIs · Flutter apps · Real users, real impact",
  },
  {
    id: 5,
    era: "The Horizon",
    year: "2025 →",
    icon: <Rocket className="w-6 h-6" />,
    color: "from-orange-500 to-rose-500",
    glow: "rgba(249,115,22,0.4)",
    accent: "orange",
    title: "What's Next",
    body: "I graduated in 2025, and I'm hungry for more. I'm expanding into Node.js, pushing my Three.js skills into this very portfolio, and seeking the role where I can architect systems at scale — combining backend depth with the kind of frontend magic that makes people say \"whoa\".",
    highlight: "Full Stack · Mobile · 3D Web — building the future",
  },
];

// ── Viewport config ─────────────────────────────────────────────────────────
const VP = { once: true, margin: "-80px" };

// ── Animated chapter card ────────────────────────────────────────────────────
const ChapterCard = ({ chapter, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -60 : 60, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col md:flex-row items-start md:items-center w-full gap-4 md:gap-0 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* ── Card content ── */}
      <div
        className={`w-full md:w-[calc(50%-3rem)] pl-16 md:pl-0 ${
          isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
        }`}
      >
        <div
          className="relative bg-slate-100/80 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8
            hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-500
            hover:shadow-xl group-hover:shadow-2xl"
          style={{
            boxShadow: `0 0 0 0 ${chapter.glow}`,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = `0 0 30px 2px ${chapter.glow}`)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow = `0 0 0 0 ${chapter.glow}`)
          }
        >
          {/* Era badge */}
          <div
            className={`inline-flex items-center gap-1.5 mb-3 ${
              isEven ? "md:flex-row-reverse md:ml-auto" : ""
            }`}
          >
            <span
              className={`text-xs font-bold uppercase tracking-widest bg-gradient-to-r ${chapter.color} bg-clip-text text-transparent`}
            >
              {chapter.era}
            </span>
            <span className="text-slate-400 dark:text-slate-600 text-xs">
              · {chapter.year}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mb-3 leading-tight">
            {chapter.title}
          </h3>

          {/* Body text */}
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed mb-4 text-left">
            {chapter.body}
          </p>

          {/* Highlight tag */}
          <div
            className={`flex items-center gap-2 ${
              isEven ? "md:justify-end" : ""
            }`}
          >
            <div
              className={`flex items-center gap-2 bg-gradient-to-r ${chapter.color} bg-opacity-10 rounded-lg px-3 py-2 text-xs font-semibold text-white`}
              style={{
                background: `linear-gradient(135deg, ${chapter.glow.replace("0.4", "0.15")}, transparent)`,
                border: `1px solid ${chapter.glow.replace("0.4", "0.3")}`,
              }}
            >
              <Star className="w-3 h-3 flex-shrink-0" style={{ color: "white", opacity: 0.8 }} />
              <span className="text-slate-700 dark:text-slate-300 text-left">
                {chapter.highlight}
              </span>
            </div>
          </div>

          {/* Connector arrow (desktop) */}
          <div
            className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-0 h-0
              border-y-[10px] border-y-transparent
              border-slate-200 dark:border-slate-800
              transition-colors duration-500 ${
                isEven
                  ? "right-0 translate-x-full border-r-[12px]"
                  : "left-0 -translate-x-full border-l-[12px]"
              }`}
          />
        </div>
      </div>

      {/* ── Timeline node ── */}
      <div className="absolute left-0 top-6 md:static md:w-24 md:flex-shrink-0 flex items-center justify-center">
        <motion.div
          whileInView={{ scale: [0.5, 1.15, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 flex items-center justify-center"
        >
          {/* Glow ring */}
          <span
            className="absolute w-16 h-16 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle, ${chapter.glow} 0%, transparent 70%)`,
            }}
          />
          {/* Ping pulse */}
          <span
            className={`absolute w-14 h-14 rounded-full bg-gradient-to-br ${chapter.color} opacity-0 group-hover:opacity-20 group-hover:animate-ping`}
          />
          {/* Icon container */}
          <span
            className={`relative flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full
              bg-slate-100 dark:bg-slate-900
              border-2 border-slate-300 dark:border-slate-700
              shadow-lg text-white
              bg-gradient-to-br ${chapter.color}`}
          >
            {chapter.icon}
          </span>
        </motion.div>
      </div>

      {/* Spacer for the opposing side (desktop) */}
      <div className="hidden md:block w-[calc(50%-3rem)]" />
    </motion.div>
  );
};

// ── Main Story Component ─────────────────────────────────────────────────────
const Story = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax for background elements
  const bgY1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const lineProgress = useSpring(
    useTransform(scrollYProgress, [0.05, 0.85], [0, 1]),
    { stiffness: 80, damping: 20 }
  );

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 bg-slate-50 dark:bg-slate-950 overflow-hidden"
    >
      {/* ── Parallax ambient glows ── */}
      <motion.div
        style={{ y: bgY1 }}
        className="absolute top-20 left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(139,92,246,0.12)_0%,transparent_65%)] rounded-full" />
      </motion.div>
      <motion.div
        style={{ y: bgY2 }}
        className="absolute bottom-10 right-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(16,185,129,0.1)_0%,transparent_65%)] rounded-full" />
      </motion.div>

      {/* Floating star particles */}
      {[...Array(18)].map((_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute w-1 h-1 bg-white/20 dark:bg-white/10 rounded-full pointer-events-none"
          style={{
            left: `${(i * 17 + 5) % 95}%`,
            top: `${(i * 23 + 8) % 90}%`,
            animation: `floatParticle ${6 + (i % 5)}s ${i * 0.4}s ease-in-out infinite alternate`,
          }}
        />
      ))}

      <style>{`
        @keyframes floatParticle {
          0%   { transform: translateY(0)   scale(1);   opacity: 0.2; }
          100% { transform: translateY(-20px) scale(1.4); opacity: 0.6; }
        }
        @keyframes drawLine {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-5 md:px-12 xl:px-20 relative z-10">
        {/* ── Section heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-violet-500 dark:text-violet-400 text-sm font-bold uppercase tracking-[0.25em] mb-3 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            Narrative
          </p>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white mb-5">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-blue-400 to-emerald-400">
              Story
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Not just a résumé — a journey. From a curious student writing
            broken HTML to an engineer who thinks in systems and ships real
            software.
          </p>
          <div className="w-20 h-1.5 bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 mx-auto rounded-full mt-6" />
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative">
          {/* Animated vertical timeline line */}
          <div className="absolute left-4 top-0 bottom-0 md:left-1/2 md:-translate-x-1/2 w-0.5 overflow-hidden">
            {/* Static faint track */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
            {/* Scroll-driven glowing fill */}
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-violet-500 via-blue-500 to-emerald-500 rounded-full"
              style={{ scaleY: lineProgress, originY: 0 }}
            />
          </div>

          {/* Chapter cards */}
          <div className="space-y-14 md:space-y-20">
            {CHAPTERS.map((chapter, index) => (
              <ChapterCard key={chapter.id} chapter={chapter} index={index} />
            ))}
          </div>

          {/* ── Closing badge ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center mt-20"
          >
            <a
              href="#projects"
              className="group relative flex items-center gap-3 bg-gradient-to-r from-violet-600 via-blue-600 to-indigo-600
                text-white font-bold px-8 py-4 rounded-full shadow-[0_0_25px_rgba(99,102,241,0.45)]
                hover:shadow-[0_0_40px_rgba(99,102,241,0.65)] hover:scale-105 transition-all duration-300"
            >
              <span>See What I've Built</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Story;
