import { motion } from "framer-motion";
import SkillsCanvas from "./canvas/SkillsCanvas";
import { Server, Layout, Database, Smartphone, Wrench, SearchX } from "lucide-react";

// Technical skill categories and their proficiency levels

const SKILL_CATEGORIES = [
    {
        title: "Backend Development",
        icon: <Server className="w-5 h-5 text-blue-400" />,
        skills: [
            { name: "Laravel", level: 90 },
            { name: "Node.js", level: 75 },
            { name: "PHP", level: 85 },
        ],
    },
    {
        title: "Frontend Development",
        icon: <Layout className="w-5 h-5 text-indigo-400" />,
        skills: [
            { name: "React", level: 85 },
            { name: "Three.js", level: 65 },
            { name: "JavaScript", level: 85 },
            { name: "HTML & CSS", level: 90 },
        ],
    },
    {
        title: "Databases",
        icon: <Database className="w-5 h-5 text-purple-400" />,
        skills: [
            { name: "Database Design", level: 95 },
            { name: "MySQL", level: 90 },
        ],
    },
    {
        title: "Mobile Development",
        icon: <Smartphone className="w-5 h-5 text-pink-400" />,
        skills: [
            { name: "Flutter", level: 80 },
        ],
    },
    {
        title: "Tools & Version Control",
        icon: <Wrench className="w-5 h-5 text-cyan-400" />,
        skills: [
            { name: "Git & GitHub", level: 85 },
            { name: "Visual Studio Code", level: 90 },
            { name: "MySQL Workbench", level: 85 },
            { name: "Figma & Draw.io", level: 75 },
        ],
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

// Animation easing for the skill bars
const BAR_EASE = [0.22, 1, 0.36, 1];

// Viewport configurations for scroll animations
const VIEWPORT_100 = { once: true, margin: "-100px" };
const VIEWPORT_50 = { once: true, margin: "-50px" };

// Hover animation for skill cards
const cardHover = { y: -10, scale: 1.02, transition: { duration: 0.3 } };

// Individual skill bar component with animated progress

const SkillBar = ({ name, level, index }) => (
    <div className="mb-5 last:mb-0 relative z-10">
        {/* Label and Percentage value */}
        <div className="flex justify-between mb-2">
            <span className="text-sm md:text-base font-semibold text-slate-200">{name}</span>
            <span className="text-sm font-bold text-blue-400">{level}%</span>
        </div>
        
        {/* Progress Bar Container: Uses a dark background with subtle inner shadows and borders */}
        <div className="w-full bg-slate-950/50 shadow-inner rounded-full h-3 overflow-hidden border border-slate-800/50">
            {/* Animated Bar: Width expands from 0 to 'level%' when in view */}
            <motion.div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 relative shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                initial={{ width: 0 }}
                whileInView={{ width: `${level}%` }}
                viewport={VIEWPORT_50}
                transition={{ duration: 1.5, delay: index * 0.1, ease: BAR_EASE }}
            >
                {/* Visual Polish: A subtle white highlight at the end of the progress bar */}
                <div className="absolute top-0 right-0 bottom-0 w-12 bg-white/20 blur-[4px] rounded-r-full" />
            </motion.div>
        </div>
    </div>
);

// Main Skills section component

const Skills = () => (
    <section
        id="skills"
        className="relative w-full min-h-screen bg-slate-950 py-16 md:py-24 overflow-hidden flex flex-col justify-center"
    >
        <SkillsCanvas />

        {/* Section Title and Introduction */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 relative z-10 w-full mb-10 md:mb-16">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_100}
                variants={fadeUp}
                className="text-center"
            >
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
                    Technical{" "}
                    {/* Gradient text using background-clip:text */}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
                        Expertise
                    </span>
                </h2>
                <p className="text-slate-400 max-w-3xl mx-auto text-sm md:text-lg leading-relaxed mb-6 px-2">
                    Building structured systems requires a deep understanding of architecture, databases, and scalable logic. Here is my organized technical stack, powering robust full-stack applications and reliable APIs.
                </p>
                {/* Decorative underline with gradient */}
                <div className="w-16 md:w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
            </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 relative z-10 w-full text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
                {SKILL_CATEGORIES.length > 0 ? (
                    SKILL_CATEGORIES.map((category, catIdx) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={VIEWPORT_50}
                            transition={{ duration: 0.8, delay: catIdx * 0.1 }}
                            whileHover={cardHover}
                            // Stylistic Card Container: Uses glassmorphism effects (backdrop-blur) and custom hovers.
                            className="bg-slate-900/40 backdrop-blur-md border border-slate-800/50 rounded-2xl p-6 md:p-8 flex flex-col relative overflow-hidden group shadow-xl hover:shadow-[0_20px_50px_-15px_rgba(79,70,229,0.3)] hover:border-indigo-500/50 transition-all duration-500"
                        >
                            {/* 
                              * Radial Glows: These absolute elements create the glowing corners on hover.
                              * The transition is handled via the 'group-hover' class.
                            */}
                            <div className="absolute -top-16 -right-16 w-48 h-48 bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,transparent_70%)] rounded-full group-hover:bg-[radial-gradient(circle,rgba(99,102,241,0.25)_0%,transparent_70%)] transition-all duration-700 pointer-events-none z-0" />
                            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[radial-gradient(circle,rgba(168,85,247,0.1)_0%,transparent_70%)] rounded-full group-hover:bg-[radial-gradient(circle,rgba(168,85,247,0.2)_0%,transparent_70%)] transition-all duration-700 pointer-events-none z-0" />

                            <h3 className="text-xl md:text-2xl font-bold text-white mb-8 flex items-center gap-4 relative z-10">
                                {/* Icon Wrapper: High contrast background with ring-effect on hover */}
                                <div className="flex-shrink-0 p-2.5 bg-slate-800/90 rounded-xl border border-slate-700/50 shadow-lg group-hover:scale-110 group-hover:border-indigo-500/50 transition-all duration-500">
                                    {category.icon}
                                </div>
                                <span className="tracking-tight">{category.title}</span>
                            </h3>

                            <div className="flex flex-col relative z-10">
                                {category.skills.map((skill, skillIdx) => (
                                    <SkillBar
                                        key={skill.name}
                                        index={skillIdx}
                                        name={skill.name}
                                        level={skill.level}
                                    />
                                ))}
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none z-0" />
                        </motion.div>
                    ))
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="col-span-full flex flex-col items-center justify-center p-12 bg-slate-900/40 backdrop-blur-md border border-slate-800/50 rounded-3xl text-center"
                    >
                        <div className="p-6 bg-slate-800/50 rounded-full mb-6 border border-slate-700/50 text-slate-400">
                            <SearchX className="w-12 h-12" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">No Skills Found</h3>
                        <p className="text-slate-400 max-w-md">
                            It looks like there aren't any skill categories to display at the moment. Please check back later or contact me for more information.
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    </section>
);

export default Skills;