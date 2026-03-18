import { motion } from "framer-motion";
import SoftSkillsCanvas from "./canvas/SoftSkillsCanvas";
import { BrainCircuit, RefreshCw, ShieldCheck, MessageSquareText, Lightbulb, Users } from "lucide-react";

// Soft skills data including icons and descriptions

const SOFT_SKILLS = [
    {
        id: "problem-solving",
        title: "System-Level Problem Solving",
        icon: <BrainCircuit className="w-8 h-8 text-blue-400" />,
        description: "I approach problems methodically, breaking complex challenges into logical components. Before writing code, I design tables, define relationships, and structure APIs carefully to ensure stability."
    },
    {
        id: "adaptability",
        title: "Continuous Learning",
        icon: <RefreshCw className="w-8 h-8 text-purple-400" />,
        description: "From Laravel and Flutter to Node.js and Three.js, I continuously step outside my comfort zone. I adapt to evolving technology by actively building real projects rather than just studying theory."
    },
    {
        id: "ownership",
        title: "Project Ownership",
        icon: <ShieldCheck className="w-8 h-8 text-indigo-400" />,
        description: "From database structuring to final deployment, I take full responsibility for my systems. I ensure that projects like College Finder maintain proper architecture, performance, and long-term maintainability."
    },
    {
        id: "communication",
        title: "Clear Communication",
        icon: <MessageSquareText className="w-8 h-8 text-cyan-400" />,
        description: "Building reliable systems requires explaining ideas clearly and documenting architectures effectively. I value structured communication to facilitate teamwork and long-term project understanding."
    },
    {
        id: "creativity",
        title: "Technical Creativity",
        icon: <Lightbulb className="w-8 h-8 text-pink-400" />,
        description: "The combination of technical backend discipline and presentation. My exploration into Three.js proves that robust backend logic can go hand-in-hand with an engaging and modern frontend experience."
    },
    {
        id: "leadership",
        title: "Team Leadership & Management",
        icon: <Users className="w-8 h-8 text-emerald-400" />,
        description: "I have successfully led development teams during my college projects. I understand how to manage project timelines, delegate responsibilities, and guide peers to deliver cohesive, structured systems on schedule."
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

// Viewport configurations for scroll animations
const VIEWPORT_100 = { once: true, margin: "-100px" };
const VIEWPORT_50 = { once: true, margin: "-50px" };

// Main Soft Skills section component highlighting professional mindset

const SoftSkills = () => (
    <section
        id="soft-skills"
        className="relative w-full min-h-screen bg-slate-950 py-24 overflow-hidden flex flex-col justify-center"
    >
        <SoftSkillsCanvas />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 relative z-10 w-full mb-16">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_100}
                variants={fadeUp}
                className="text-center"
            >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-white px-4">
                    Professional{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
                        Mindset
                    </span>
                </h2>
                <p className="text-slate-400 max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed mb-8 px-6">
                    Technical skills demonstrate what I can build, but soft skills define how I build it. I approach full stack development methodically, prioritizing architecture, adaptability, and clear communication.
                </p>
                <div className="w-20 md:w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
            </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 relative z-10 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-center">
                {SOFT_SKILLS.map((skill, index) => (
                    <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={VIEWPORT_50}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group relative bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-indigo-500/50 hover:bg-slate-900/80 shadow-lg hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] overflow-hidden cursor-default"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                        <div className="bg-slate-800/80 p-5 rounded-2xl mb-5 shadow-inner relative z-10 transition-transform duration-300 group-hover:-translate-y-2 group-hover:bg-slate-800 ring-1 ring-slate-700">
                            {skill.icon}
                        </div>

                        <h3 className="text-lg md:text-xl font-bold text-slate-200 mb-2 relative z-10 transition-colors duration-300 group-hover:text-white group-hover:drop-shadow-md">
                            {skill.title}
                        </h3>

                        <div className="relative z-10 md:max-h-0 md:opacity-0 group-hover:max-h-60 group-hover:opacity-100 transition-all duration-500 ease-in-out md:overflow-hidden text-slate-400 text-sm md:text-base leading-relaxed md:mt-0 group-hover:mt-4">
                            <p className="pt-4 md:pt-0 border-t border-slate-800 md:border-transparent group-hover:border-slate-800 transition-colors duration-300">
                                {skill.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

export default SoftSkills;