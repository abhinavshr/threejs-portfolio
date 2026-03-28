import React, { lazy, Suspense, useState, useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Download, ChevronsRight } from "lucide-react";
import DownloadButton from "./DownloadButton";

// Lazy loading the 3D canvas component to optimize initial page load
const GeometricCoreCanvas = lazy(() => import("./canvas/GeometricCore"));

// Static background tech stack elements
const BACKGROUND_TECHS = [
    { name: "Laravel", x: "10%", y: "20%", duration: "9.5s", delay: "0.5s" },
    { name: "MySQL", x: "85%", y: "15%", duration: "11.2s", delay: "1.2s" },
    { name: "Flutter", x: "75%", y: "85%", duration: "8.8s", delay: "0.8s" },
    { name: "Node.js", x: "5%", y: "75%", duration: "12.1s", delay: "1.5s" },
    { name: "Three.js", x: "50%", y: "10%", duration: "10.4s", delay: "0.2s" },
    { name: "React", x: "40%", y: "90%", duration: "9.9s", delay: "1.8s" },
    { name: "APIs", x: "90%", y: "50%", duration: "11.5s", delay: "0.9s" },
    { name: "System Architecture", x: "15%", y: "50%", duration: "8.5s", delay: "1.1s" },
];

// Roles to cycle through in the typing animation
const TYPED_ROLES = [
    "Full Stack Developer",
    "Backend Engineer",
    "Laravel Specialist",
    "API Architect",
    "Mobile Developer",
];

// Stats for the animated counter section
const STATS = [
    { label: "Projects Built", target: 5, suffix: "+" },
    { label: "Tech Skills", target: 14, suffix: "+" },
    { label: "Years Learning", target: 3, suffix: "+" },
];

// Framer Motion animation variants for entry effects
const fadeSlideLeft = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0 },
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

// ── Time-Based Greeting ───────────────────────────────────────────────────────
function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return { text: "Good Morning", emoji: "☀️" };
    if (hour >= 12 && hour < 17) return { text: "Good Afternoon", emoji: "🌤️" };
    if (hour >= 17 && hour < 21) return { text: "Good Evening", emoji: "🌇" };
    return { text: "Good Night", emoji: "🌙" };
}

// ── Typing Animation Hook ─────────────────────────────────────────────────────
function useTypingAnimation(lines, typingSpeed = 70, deletingSpeed = 40, pauseMs = 1800) {
    const [displayText, setDisplayText] = useState("");
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const current = lines[lineIndex];

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                // Typing phase
                setDisplayText(current.slice(0, charIndex + 1));
                if (charIndex + 1 === current.length) {
                    // Fully typed — pause then start deleting
                    setTimeout(() => setIsDeleting(true), pauseMs);
                } else {
                    setCharIndex((c) => c + 1);
                }
            } else {
                // Deleting phase
                setDisplayText(current.slice(0, charIndex - 1));
                if (charIndex - 1 === 0) {
                    setIsDeleting(false);
                    setLineIndex((l) => (l + 1) % lines.length);
                    setCharIndex(0);
                } else {
                    setCharIndex((c) => c - 1);
                }
            }
        }, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, lineIndex, lines, typingSpeed, deletingSpeed, pauseMs]);

    return displayText;
}

// ── Animated Counter Component ────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "" }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        const controls = animate(0, target, {
            duration: 2,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (latest) => setValue(Math.round(latest)),
        });
        return () => controls.stop();
    }, [isInView, target]);

    return (
        <span ref={ref} className="tabular-nums">
            {value}{suffix}
        </span>
    );
}

// ── Hero Component ────────────────────────────────────────────────────────────
const Hero = () => {
    const greeting = getGreeting();
    const typedText = useTypingAnimation(TYPED_ROLES);

    return (
        <section
            id="hero"
            className="relative w-full min-h-screen mx-auto overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex items-center pt-32 sm:pt-40 lg:pt-20 pb-10"
        >
            {/* Background floating text animation styles defined purely in CSS for performance */}
            <style>{`
                @keyframes floatText {
                    0%, 100% { transform: translateY(0);    opacity: 0.1; }
                    50%       { transform: translateY(-30%); opacity: 0.3; }
                }
                @keyframes blinkCursor {
                    0%, 100% { opacity: 1; }
                    50%      { opacity: 0; }
                }
                .typing-cursor {
                    display: inline-block;
                    width: 2px;
                    height: 1em;
                    background: currentColor;
                    margin-left: 3px;
                    vertical-align: middle;
                    animation: blinkCursor 0.75s step-end infinite;
                }
            `}</style>

            {BACKGROUND_TECHS.map((tech, i) => (
                <span
                    key={tech.name}
                    aria-hidden="true"
                    className={`absolute text-slate-800 font-mono text-sm sm:text-lg md:text-xl font-bold select-none pointer-events-none${i % 2 === 0 ? " hidden xs:block" : ""
                        }`}
                    style={{
                        left: tech.x,
                        top: tech.y,
                        animation: `floatText ${tech.duration} ${tech.delay} infinite ease-in-out`,
                        opacity: 0.1,
                        willChange: "transform, opacity",
                    }}
                >
                    {tech.name}
                </span>
            ))}

            <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-5 items-center">

                {/* ── Text Content ── */}
                <div className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left order-1 lg:pt-0 pb-8 sm:pb-12">

                    {/* Stagger children with a shared parent transition */}
                    <motion.div
                        variants={{ show: { transition: { staggerChildren: 0.2 } } }}
                        initial="hidden"
                        animate="show"
                    >
                        {/* ── Time-based greeting badge ── */}
                        <motion.div
                            variants={fadeUp}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full
                                       bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60
                                       text-slate-600 dark:text-slate-300 text-sm font-medium tracking-wide
                                       shadow-sm backdrop-blur-sm"
                        >
                            <span>{greeting.emoji}</span>
                            <span>{greeting.text}, I'm Abhinav</span>
                        </motion.div>

                        <motion.h1
                            variants={fadeSlideLeft}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white mb-4"
                        >
                            Hi, I'm <br className="hidden lg:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                Abhinav Shrestha
                            </span>
                        </motion.h1>

                        {/* ── Typing animation subtitle ── */}
                        <motion.h2
                            variants={fadeSlideLeft}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-300 mb-6 max-w-xl lg:max-w-none min-h-[2.5rem] flex items-center justify-center lg:justify-start"
                        >
                            <span className="text-blue-400">{typedText}</span>
                            <span className="typing-cursor text-blue-400" aria-hidden="true" />
                        </motion.h2>

                        <motion.p
                            variants={fadeSlideLeft}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="mt-2 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-8"
                        >
                            I build secure, scalable, and user-focused web applications using Laravel, MySQL, Flutter, and modern backend technologies.
                        </motion.p>

                        <motion.div
                            variants={fadeUp}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto"
                        >
                            <a
                                href="#projects"
                                className="group relative flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                                <span className="relative z-10 flex items-center gap-2">
                                    View My Projects
                                    <ChevronsRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </a>

                            <DownloadButton
                                href="/CV/Abhinav_Shrestha.html"
                                fileName="Abhinav_Shrestha_Resume.html"
                            />
                        </motion.div>

                        {/* ── Animated Stats Counters ── */}
                        <motion.div
                            variants={fadeUp}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                            className="mt-10 flex items-center gap-6 sm:gap-10 flex-wrap justify-center lg:justify-start"
                        >
                            {STATS.map((stat, i) => (
                                <div key={stat.label} className="flex flex-col items-center lg:items-start">
                                    <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 leading-none">
                                        <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                                    </span>
                                    <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1 tracking-wide uppercase">
                                        {stat.label}
                                    </span>
                                    {/* Divider — hidden on last item */}
                                    {i < STATS.length - 1 && (
                                        <div className="hidden lg:block absolute" />
                                    )}
                                </div>
                            ))}
                            {/* Subtle dividers between stats on desktop */}
                            <style>{`
                                .stat-divider { width: 1px; height: 40px; background: rgba(148,163,184,0.3); }
                            `}</style>
                        </motion.div>
                    </motion.div>
                </div>

                {/* ── 3D Scene (lazy-loaded) ── */}
                <motion.div
                    className="w-full h-[300px] sm:h-[400px] lg:h-[600px] order-2 relative flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
                    {/* Show a loading pulse animation while the 3D scene finishes loading */}
                    <Suspense fallback={<div className="w-32 h-32 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />}>
                        <GeometricCoreCanvas />
                    </Suspense>
                </motion.div>
            </div>

            {/* ── Scroll Indicator (pure CSS) ── */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-50 hidden sm:flex">
                <style>{`
                    @keyframes scrollDot {
                        0%, 100% { transform: translateY(0); }
                        50%       { transform: translateY(12px); }
                    }
                `}</style>
                <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center p-1">
                    <div
                        className="w-1.5 h-1.5 bg-blue-500 rounded-full"
                        style={{ animation: "scrollDot 1.5s ease-in-out infinite" }}
                    />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Scroll Down</span>
            </div>
        </section>
    );
};

export default Hero;