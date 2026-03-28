import { motion } from "framer-motion";
import EducationCanvas from "./canvas/EducationCanvas";
import { GraduationCap, BookOpen, ScrollText, SearchX } from "lucide-react";

// ── Static data & variants outside component ──────────────────────────────────

const EDUCATION_DETAILS = [
    {
        id: "bachelors",
        degree: "BSc (Hons) in Mobile Application Development",
        institution: "Islington College, Nepal",
        affiliation: "London Metropolitan University, UK",
        period: "2022 — 2025",
        icon: <GraduationCap className="w-8 h-8 text-blue-400" />,
        highlight: "University Degree",
        description: "This three-year program provided me with in-depth knowledge of mobile application architecture, software engineering principles, user interface design, database systems, and modern programming frameworks. Throughout my degree, I worked on multiple practical projects that strengthened my expertise in Flutter development, backend integration, and application deployment.",
        // Resolved Tailwind classes — dynamic `text-${color}-400` strings are
        // purged at build time because Tailwind can't see them. Use full strings.
        highlightClass: "text-blue-400",
        borderHoverClass: "hover:border-blue-500/30",
    },
    {
        id: "high-school",
        degree: "Higher Secondary Education (+2)",
        institution: "Khwopa Higher Secondary School, Nepal",
        affiliation: "Management with Computer & IT",
        period: "2020 — 2022",
        icon: <BookOpen className="w-8 h-8 text-indigo-400" />,
        highlight: "Foundational Studies",
        description: "During this period, I built a strong foundation in business concepts, computer fundamentals, and information technology. This combination of management studies and technical subjects helped me develop both analytical thinking and technical problem-solving skills at an early stage of my academic journey.",
        highlightClass: "text-indigo-400",
        borderHoverClass: "hover:border-indigo-500/30",
    },
];

const LAST_EDU_IDX = EDUCATION_DETAILS.length - 1;

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

// Shared viewport configs — stable object references, never inline
const VIEWPORT_100 = { once: true, margin: "-100px" };
const VIEWPORT_50 = { once: true, margin: "-50px" };

// ── Education ─────────────────────────────────────────────────────────────────

/**
 * Education Component
 * The main section that renders the academic timeline.
 * It uses a vertical layout with a progress line connecting the items.
 */
const Education = () => (
    <section
        id="education"
        className="relative w-full min-h-screen bg-slate-50 dark:bg-slate-950 py-20 md:py-24 overflow-hidden flex flex-col justify-center"
    >
        {/* The 3D background with floating abstract academic pillars */}
        <EducationCanvas />

        {/* Section Heading Container */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 relative z-10 w-full mb-16">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_100}
                variants={fadeUp}
                className="text-center"
            >
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-slate-900 dark:text-white">
                    Academic{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
                        Journey
                    </span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-base md:text-lg leading-relaxed mb-6">
                    My academic journey reflects a clear progression from foundational IT and management studies to specialized training in mobile application architecture and backend integration.
                </p>
                <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
            </motion.div>
        </div>

        {/* Timeline Cards Container */}
        <div className="max-w-5xl mx-auto px-6 lg:px-12 xl:px-20 relative z-10 w-full mb-16">
            <div className="flex flex-col gap-12">
                {EDUCATION_DETAILS.length > 0 ? (
                    EDUCATION_DETAILS.map((edu, index) => (
                        <motion.div
                            key={edu.id}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={VIEWPORT_50}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="relative flex flex-row gap-4 md:gap-10 items-start group"
                        >
                            {/* Timeline connector: A vertical line that stops at the last element */}
                            {index !== LAST_EDU_IDX && (
                                <div className="absolute left-8 md:left-[3.25rem] top-20 md:top-24 bottom-[-3.5rem] md:bottom-[-3rem] w-0.5 bg-gradient-to-b from-slate-700 to-transparent" />
                            )}

                            {/* Icon Pillar: A container for the graduation/book icons with a floating hover effect */}
                            <div className="relative z-10 flex shrink-0 w-16 md:w-28 flex-col items-center">
                                <div className="w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg flex items-center justify-center shrink-0 group-hover:bg-slate-200 dark:bg-slate-800 transition-colors group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] group-hover:-translate-y-1 transform duration-500 [&>svg]:w-6 [&>svg]:h-6 md:[&>svg]:w-8 md:[&>svg]:h-8">
                                    {edu.icon}
                                </div>
                            </div>

                            {/* High-level Content Panel using Glassmorphism */}
                            <div className={`flex-1 bg-slate-100 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 ${edu.borderHoverClass} transition-all shadow-lg relative overflow-hidden group-hover:shadow-[0_10px_30px_-15px_rgba(99,102,241,0.2)] w-full`}>
                                {/* Inner radial glow that enhances on hover */}
                                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[radial-gradient(circle,rgba(59,130,246,0.1)_0%,transparent_70%)] rounded-full pointer-events-none group-hover:bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,transparent_70%)] transition-colors duration-700" />

                                <div className="flex items-start justify-between mb-4 flex-col sm:flex-row sm:items-center gap-4">
                                    <div>
                                        <span className={`${edu.highlightClass} font-bold tracking-wider uppercase text-xs md:text-sm mb-2 block`}>
                                            {edu.highlight}
                                        </span>
                                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100">{edu.degree}</h3>
                                    </div>
                                    <div className="bg-slate-200 dark:bg-slate-800/80 px-4 py-1.5 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm whitespace-nowrap md:ml-auto font-mono">
                                        {edu.period}
                                    </div>
                                </div>

                                <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-800/60">
                                    <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300">{edu.institution}</h4>
                                    <p className="text-indigo-300/80 text-sm mt-1">{edu.affiliation}</p>
                                </div>

                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base relative z-10">
                                    {edu.description}
                                </p>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="col-span-full flex flex-col items-center justify-center p-12 bg-slate-100 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl text-center"
                    >
                        <div className="p-6 bg-slate-200 dark:bg-slate-800/50 rounded-full mb-6 border border-slate-300 dark:border-slate-700/50 text-slate-600 dark:text-slate-400">
                            <SearchX className="w-12 h-12" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Academic Records Unavailable</h3>
                        <p className="text-slate-600 dark:text-slate-400 max-w-md">
                            It looks like there aren't any academic journey details to display at the moment.
                        </p>
                    </motion.div>
                )}
            </div>
        </div>

        {/* Reflection Quote Section */}
        <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10 w-full">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_50}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-indigo-500/20 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 backdrop-blur-sm"
            >
                <div className="shrink-0 bg-slate-100 dark:bg-slate-900 p-3 rounded-full hidden sm:block border border-slate-200 dark:border-slate-800">
                    <ScrollText className="w-6 h-6 text-purple-400" />
                </div>
                <p className="text-slate-700 dark:text-slate-300 italic leading-relaxed text-sm md:text-base">
                    "This educational background, combined with hands-on industry experience, has shaped me into a well-rounded developer with both technical depth and practical implementation skills."
                </p>
            </motion.div>
        </div>
    </section>
);

export default Education;