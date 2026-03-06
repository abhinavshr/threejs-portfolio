import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Download, ChevronsRight, MousePointer2 } from "lucide-react";
import GeometricCoreCanvas from "./canvas/GeometricCore";

const backgroundTechs = [
    { name: "Laravel", x: "10%", y: "20%", duration: 9.5, delay: 0.5 },
    { name: "MySQL", x: "85%", y: "15%", duration: 11.2, delay: 1.2 },
    { name: "Flutter", x: "75%", y: "85%", duration: 8.8, delay: 0.8 },
    { name: "Node.js", x: "5%", y: "75%", duration: 12.1, delay: 1.5 },
    { name: "Three.js", x: "50%", y: "10%", duration: 10.4, delay: 0.2 },
    { name: "React", x: "40%", y: "90%", duration: 9.9, delay: 1.8 },
    { name: "APIs", x: "90%", y: "50%", duration: 11.5, delay: 0.9 },
    { name: "System Architecture", x: "15%", y: "50%", duration: 8.5, delay: 1.1 },
];

const Hero = () => {
    const memoizedBackground = useMemo(() => (
        backgroundTechs.map((tech, index) => (
            <motion.div
                key={index}
                className={`absolute text-slate-800 font-mono text-sm sm:text-lg md:text-xl font-bold opacity-30 select-none pointer-events-none ${index % 2 === 0 ? "hidden xs:block" : ""}`}
                initial={{ opacity: 0 }}
                animate={{
                    y: ["0%", "-30%", "0%"],
                    opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                    duration: tech.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: tech.delay,
                }}
                style={{ left: tech.x, top: tech.y }}
            >
                {tech.name}
            </motion.div>
        ))
    ), []);

    return (
        <section id="hero" className="relative w-full min-h-screen mx-auto overflow-hidden bg-slate-950 text-white flex items-center pt-32 sm:pt-40 lg:pt-20 pb-10">
            {/* Background Floating Elements */}
            {memoizedBackground}

            <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-5 items-center">

                {/* Text Content */}
                <div className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left order-1 lg:pt-0 pb-8 sm:pb-12">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-white mb-4">
                            Hi, I'm <br className="hidden lg:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                Abhinav Shrestha
                            </span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-300 mb-6 max-w-xl lg:max-w-none">
                            Full Stack Developer Specializing in{" "}
                            <span className="text-blue-400">Laravel</span> and{" "}
                            <span className="text-purple-400">Backend Systems</span>
                        </h2>
                    </motion.div>

                    <motion.p
                        className="mt-2 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed mb-8"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    >
                        I build secure, scalable, and user-focused web applications using Laravel, MySQL, Flutter, and modern backend technologies.
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
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

                        <a
                            href="/CV/Abhinav_Shrestha.html"
                            download="Abhinav_Shrestha_Resume.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-slate-700 text-slate-200 font-bold rounded-lg transition-all hover:border-blue-500 hover:text-white hover:bg-slate-800"
                        >
                            <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                            Download Resume
                        </a>
                    </motion.div>
                </div>

                {/* 3D Scene */}
                <motion.div
                    className="w-full h-[300px] sm:h-[400px] lg:h-[600px] order-2 relative flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                >
                    {/* Subtle glow behind the 3D object */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

                    <GeometricCoreCanvas />
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hidden sm:flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1.2, duration: 1 }}
            >
                <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center p-1">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1.5 h-1.5 bg-blue-500 rounded-full"
                    />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Scroll Down</span>
            </motion.div>
        </section>
    );
};

export default Hero;
