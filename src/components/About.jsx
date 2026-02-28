import { motion } from "framer-motion";
import AboutCoreCanvas from "./canvas/AboutCore";
import { Server, Database, Code, Cpu } from "lucide-react";

const coreStrengths = [
    { icon: <Cpu className="w-5 h-5 text-blue-400" />, label: "Backend Architecture" },
    { icon: <Database className="w-5 h-5 text-purple-400" />, label: "Database Design" },
    { icon: <Server className="w-5 h-5 text-indigo-400" />, label: "API Development" },
    { icon: <Code className="w-5 h-5 text-cyan-400" />, label: "System Thinking" }
];

const About = () => {

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    return (
        <section id="about" className="relative w-full min-h-screen bg-slate-950 text-white flex flex-col justify-center py-24 overflow-hidden">
            {/* Background glowing effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 w-full z-10 flex flex-col items-center">

                {/* Section Heading */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
                            About Me
                        </span>
                    </h2>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">

                    {/* 3D Visual Element */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1.2 }}
                        className="w-full h-full lg:order-2 flex justify-center items-center relative"
                    >
                        <AboutCoreCanvas />
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.2 } }
                        }}
                        className="flex flex-col space-y-6 text-slate-300 lg:order-1 text-base md:text-lg leading-relaxed"
                    >
                        <motion.p variants={fadeUp}>
                            I am a full stack developer, having completed my college degree in 2025, with a strong focus on backend systems and robust applications. Rather than just experimenting with code, I am passionate about building real-world software that solves practical problems—like my Laravel-based College Finder platform focused on Nepal. My approach is rooted in turning ideas into structured systems with proper database design, clean code architecture, and secure backend logic.
                        </motion.p>

                        <motion.p variants={fadeUp}>
                            While my core strengths lie in designing database structures, building APIs, and handling robust authentication systems, I am deeply interested in combining strong backend engineering with modern interactive frontend experiences. This drive to create complete, scalable systems is exactly why I'm exploring modern web technologies like Three.js for my portfolio.
                        </motion.p>

                        <motion.p variants={fadeUp}>
                            I love the process of learning new technologies, building applications from scratch, and understanding how large-scale features work internally. I have strong expertise in Laravel, React, and Flutter, and I am currently expanding my backend capabilities by diving deeper into Node.js. I am constantly pushing myself to understand optimal system structures rather than just surface-level coding.
                        </motion.p>

                        {/* Core Strengths Highlights */}
                        <motion.div variants={fadeUp} className="pt-6">
                            <h3 className="text-xl font-bold text-slate-100 mb-4 tracking-wide">Core Strengths</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {coreStrengths.map((strength, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 bg-slate-900/50 border border-slate-800 rounded-lg p-3 shadow-sm hover:border-slate-700 transition-colors"
                                    >
                                        <div className="bg-slate-800/80 p-2 rounded-md">
                                            {strength.icon}
                                        </div>
                                        <span className="font-medium text-slate-200 text-sm md:text-base">
                                            {strength.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default About;
