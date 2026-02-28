import { motion } from "framer-motion";
import SoftSkillsCanvas from "./canvas/SoftSkillsCanvas";
import { BrainCircuit, RefreshCw, ShieldCheck, MessageSquareText, Lightbulb, Users } from "lucide-react";

const softSkillsList = [
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
    }
];

const SoftSkills = () => {
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    return (
        <section id="soft-skills" className="relative w-full min-h-screen bg-slate-950 py-24 overflow-hidden flex flex-col justify-center">

            {/* Particle Network Canvas */}
            <SoftSkillsCanvas />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 relative z-10 w-full mb-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-white">
                        Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">Mindset</span>
                    </h2>
                    <p className="text-slate-400 max-w-3xl mx-auto text-base md:text-lg leading-relaxed mb-6">
                        Technical skills demonstrate what I can build, but soft skills define how I build it. I approach full stack development methodically, prioritizing architecture, adaptability, and clear communication.
                    </p>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 relative z-10 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                    {softSkillsList.map((skill, index) => (
                        <motion.div
                            key={skill.id}
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className={`group relative bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-500 hover:border-indigo-500/50 hover:bg-slate-900/80 shadow-lg hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] overflow-hidden cursor-default ${index === softSkillsList.length - 1 ? 'md:col-span-2 lg:col-span-1 md:max-w-md md:mx-auto lg:max-w-none lg:mx-0 w-full' : ''
                                }`}
                        >
                            {/* Hover Gradient Lighting Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            {/* Floating Icon Container */}
                            <div className="bg-slate-800/80 p-5 rounded-2xl mb-5 shadow-inner relative z-10 group-hover:-translate-y-2 transition-transform duration-500 group-hover:bg-slate-800 ring-1 ring-slate-700">
                                {skill.icon}
                            </div>

                            {/* Skill Title */}
                            <h3 className="text-lg md:text-xl font-bold text-slate-200 mb-2 relative z-10 group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all duration-300">
                                {skill.title}
                            </h3>

                            {/* Responsive Adaptive Description */}
                            <div className="relative z-10 md:max-h-0 md:opacity-0 group-hover:max-h-60 group-hover:opacity-100 transition-all duration-700 ease-in-out md:overflow-hidden text-slate-400 text-sm md:text-base leading-relaxed md:mt-0 group-hover:mt-4">
                                <p className="pt-2 md:pt-0 border-t border-slate-800/0 group-hover:border-slate-800/100 transition-colors duration-700">
                                    {skill.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SoftSkills;
