import { motion } from "framer-motion";
import { Briefcase, Smartphone, Layers, SearchX } from "lucide-react";
import ExperienceCanvas from "./canvas/ExperienceCanvas";

// ── Static data & variants outside component ──────────────────────────────────

const EXPERIENCE_DATA = [
    {
        id: 1,
        role: "Mobile Application Developer Intern",
        company: "Eos Web Solutions",
        date: "Current Role",
        icon: <Smartphone className="w-6 h-6 text-emerald-400" />,
        color: "from-emerald-400 to-teal-500",
        shadow: "shadow-[0_0_15px_rgba(52,211,153,0.5)]",
        borderFocus: "group-hover:border-emerald-500/50",
        arrowColor: "group-hover:border-emerald-400",
        description: "Currently developing cross-platform mobile applications using Flutter, focusing on performance, scalability, and clean architecture principles. Responsible for UI implementation, REST API integration, state management, debugging, and optimizing user experience across Android and iOS platforms.",
        keyProject: "Cosmetic Store Mobile Application — Implemented product listing systems, cart functionality, order processing workflows, and backend API integration ensuring smooth performance.",
    },
    {
        id: 2,
        role: "Laravel Developer Intern",
        company: "Grafi Offshore",
        date: "Previous Role",
        icon: <Briefcase className="w-6 h-6 text-blue-400" />,
        color: "from-blue-400 to-indigo-500",
        shadow: "shadow-[0_0_15px_rgba(96,165,250,0.5)]",
        borderFocus: "group-hover:border-blue-500/50",
        arrowColor: "group-hover:border-blue-400",
        description: "Worked on developing robust and scalable web applications using PHP and the Laravel framework following MVC architecture. Responsible for building RESTful APIs, implementing secure authentication, role-based access control systems, and optimizing database queries.",
        keyProject: "Explored interactive web technologies with Three.js to create dynamic 3D web experiences. Contributed to rendering 3D models, camera controls, lighting, and performance optimization.",
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

// Shared viewport configs — stable object references
const VIEWPORT_100 = { once: true, margin: "-100px" };
const VIEWPORT_50 = { once: true, margin: "-50px" };
const VIEWPORT_DEF = { once: true };

// ── Experience ────────────────────────────────────────────────────────────────

/**
 * Experience Component
 * The main section that renders the professional timeline.
 * It uses an alternating layout (left/right) for wide screens and 
 * a single column for smaller devices.
 */
const Experience = () => (
    <section
        id="experience"
        className="relative w-full py-20 md:py-24 bg-slate-950 overflow-hidden flex flex-col items-center"
    >
        {/* The 3D background with floating green particles */}
        <ExperienceCanvas />

        {/* Ambient glows — pure CSS radial gradients for mood lighting */}
        <div className="absolute top-1/3 left-10 w-[40rem] h-[40rem] bg-[radial-gradient(circle,rgba(30,58,138,0.15)_0%,transparent_60%)] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/3 right-10 w-[40rem] h-[40rem] bg-[radial-gradient(circle,rgba(6,95,70,0.15)_0%,transparent_60%)] rounded-full pointer-events-none" />

        {/* Section heading container */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 relative z-10 w-full mb-16">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_100}
                variants={fadeUp}
                className="text-center"
            >
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-white">
                    Professional{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-indigo-500">
                        Journey
                    </span>
                </h2>
                <p className="text-slate-400 max-w-3xl mx-auto text-base md:text-lg leading-relaxed mb-6">
                    My evolution from a backend-focused developer into a versatile full-stack and mobile developer, demonstrating adaptability, continuous learning, and modern stack expertise.
                </p>
                <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full" />
            </motion.div>
        </div>

        {/* Timeline container */}
        <div className="max-w-4xl mx-auto px-6 lg:px-12 w-full relative z-10">
            {/* The vertical line in the middle of the timeline */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-slate-700 to-transparent transform -translate-x-1/2" />

            <div className="space-y-16">
                {EXPERIENCE_DATA.length > 0 ? (
                    EXPERIENCE_DATA.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={VIEWPORT_50}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            /* Alternates flex order using index % 2 */
                            className={`group relative flex flex-col md:flex-row items-start md:items-center justify-between w-full${index % 2 === 0 ? " md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Timeline node icon */}
                            <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                                <span className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 border-2 border-slate-700 z-10 ${exp.borderFocus} transition-colors duration-500`}>
                                    {/* Pulse animation on hover */}
                                    <span className={`absolute inline-flex h-full w-full rounded-full bg-gradient-to-r ${exp.color} opacity-20 group-hover:animate-ping`} />
                                    <span className={`relative inline-flex rounded-full h-10 w-10 items-center justify-center bg-slate-800 ${exp.shadow}`}>
                                        {exp.icon}
                                    </span>
                                </span>
                            </div>

                            {/* Experience Card Content */}
                            <div className={`w-full md:w-5/12 pl-20 md:pl-0${index % 2 === 0
                                ? " md:pl-10 text-left md:text-left"
                                : " md:pr-10 text-left md:text-right"
                                }`}>
                                <div className={`relative bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 md:p-8 hover:bg-slate-900/80 transition-all duration-500 hover:shadow-lg ${exp.borderFocus}`}>
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{exp.role}</h3>
                                    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 mb-4 text-sm font-medium text-slate-400${index % 2 === 0 ? " md:justify-start" : " md:justify-end"
                                        }`}>
                                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${exp.color} uppercase tracking-wider font-bold`}>
                                            {exp.company}
                                        </span>
                                        <span className="hidden sm:inline opacity-50">•</span>
                                        <span className="text-slate-500">{exp.date}</span>
                                    </div>
                                    <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4 text-left">
                                        {exp.description}
                                    </p>
                                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 text-left">
                                        <p className="text-slate-400 text-sm italic">
                                            <strong className="text-slate-300 not-italic block mb-1">Highlight:</strong>
                                            {exp.keyProject}
                                        </p>
                                    </div>
                                    {/* The small arrow tip connecting the card to the central timeline node */}
                                    <div className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 w-0 h-0 border-y-8 border-y-transparent border-slate-800 transition-colors duration-500 ${exp.arrowColor}${index % 2 === 0
                                        ? " left-0 -translate-x-full border-r-8"
                                        : " right-0 translate-x-full border-l-8"
                                        }`} />
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="col-span-full flex flex-col items-center justify-center p-12 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl text-center"
                    >
                        <div className="p-6 bg-slate-800/50 rounded-full mb-6 border border-slate-700/50 text-slate-400">
                            <SearchX className="w-12 h-12" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Professional Path TBD</h3>
                        <p className="text-slate-400 max-w-md">
                            It looks like there aren't any professional journey details to display at the moment.
                        </p>
                    </motion.div>
                )}

                {/* Closing decorative badge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={VIEWPORT_DEF}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="relative flex justify-center w-full mt-10"
                >
                    <div className="bg-slate-900 border border-slate-700 rounded-full px-6 py-2 shadow-[0_0_15px_rgba(99,102,241,0.3)] z-10 flex items-center gap-2 group cursor-default">
                        <Layers className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform" />
                        <span className="text-slate-300 font-medium text-sm">Full Stack • Mobile • 3D Web</span>
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
);

export default Experience;