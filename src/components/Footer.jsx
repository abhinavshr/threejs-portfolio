import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ChevronUp } from "lucide-react";

// ── Static data & variants outside component ──────────────────────────────────

const SOCIALS = [
    { icon: <Github   className="w-5 h-5" />, href: "https://github.com/abhinavshr",                             label: "GitHub"   },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/abhinav-shrestha-9a8786255/",  label: "LinkedIn" },
    { icon: <Mail     className="w-5 h-5" />, href: "mailto:abhinavshr002@gmail.com",                           label: "Email"    },
];

// Shared viewport config
const VIEWPORT = { once: true };

// Shared stagger parent variant
const stagger = {
    hidden: {},
    show:   { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show:   { opacity: 1,  y: 0  },
};

// scrollToTop defined outside — stable function reference, no re-creation per render
const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

// ── Footer ────────────────────────────────────────────────────────────────────

const Footer = () => (
    <footer className="relative w-full bg-slate-950 pt-16 md:pt-20 pb-10 overflow-hidden border-t border-slate-900">
        {/* Ambient glow — pure CSS, zero JS */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[150px] md:h-[300px] bg-blue-600/5 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 mb-10 md:mb-16">

                {/* Brand & Identity — single stagger parent replaces 3 separate motion.divs */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={VIEWPORT}
                    className="flex flex-col space-y-6"
                >
                    <motion.div variants={fadeUp} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-xl uppercase tracking-tighter">AS</span>
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">Abhinav Shrestha</span>
                    </motion.div>

                    <motion.p variants={fadeUp} className="text-slate-400 leading-relaxed text-sm md:text-base max-w-xl">
                        The footer of my portfolio represents the final impression of my professional identity and digital presence.
                        As a passionate <span className="text-blue-400 font-medium">Full Stack and Mobile Application Developer</span>,
                        I am committed to building scalable backend systems, high-performance mobile applications, and immersive web experiences
                        using modern technologies such as <span className="text-slate-200">Laravel, Flutter, and Three.js</span>.
                    </motion.p>

                    <motion.div variants={fadeUp} className="flex gap-4">
                        {SOCIALS.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={s.label}
                                className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white hover:border-blue-500/50 hover:bg-slate-800 transition-all duration-300"
                            >
                                {s.icon}
                            </a>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Mission & Vision — single stagger parent replaces 2 separate motion.divs */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={VIEWPORT}
                    className="flex flex-col space-y-6"
                >
                    <motion.h3 variants={fadeUp} className="text-lg font-bold text-white uppercase tracking-widest">
                        The Journey Continues
                    </motion.h3>

                    <motion.div variants={fadeUp} className="space-y-4">
                        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                            This section reinforces my dedication to{" "}
                            <span className="text-indigo-400">continuous learning</span>,{" "}
                            <span className="text-indigo-400">clean architecture</span>, and{" "}
                            <span className="text-indigo-400">user-focused development</span>.
                            It symbolizes more than just the end of a webpage — it represents my ongoing journey in technology, innovation, and professional growth.
                        </p>
                        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                            Every project showcased above reflects my dedication, problem-solving ability, and passion for creating impactful digital solutions.
                        </p>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom bar */}
            <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={VIEWPORT}
                    className="text-slate-500 text-xs md:text-sm text-center md:text-left"
                >
                    © 2025 <span className="text-slate-300 font-medium">Abhinav Shrestha</span>. All rights reserved.{" "}
                    <br className="sm:hidden" />
                    Built with creativity, code, and innovation.
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -5 }}
                    viewport={VIEWPORT}
                    onClick={scrollToTop}
                    className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-all shadow-lg"
                >
                    <ChevronUp className="w-6 h-6" />
                </motion.button>
            </div>
        </div>
    </footer>
);

export default Footer;