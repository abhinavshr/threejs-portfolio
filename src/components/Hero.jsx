import { motion } from "framer-motion";
import { Download, ChevronsRight } from "lucide-react";
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
    return (
        <section className="relative w-full min-h-screen mx-auto overflow-hidden bg-slate-950 text-white flex items-center pt-20 pb-10">
            {/* Background Floating Elements */}
            {backgroundTechs.map((tech, index) => (
                <motion.div
                    key={index}
                    className="absolute text-slate-800 font-mono text-sm sm:text-lg md:text-xl font-bold opacity-30 select-none pointer-events-none"
                    initial={{ x: tech.x, y: tech.y, yOffset: 0 }}
                    animate={{
                        y: ["0%", "-30%", "0%"],
                        opacity: [0.1, 0.4, 0.1],
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
            ))}

            <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                {/* Text Content */}
                <div className="flex flex-col justify-center order-1 pt-10 lg:pt-0 pb-12">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-white mb-4">
                            Hi, I'm <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                Abhinav Shrestha
                            </span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-300 mb-6">
                            Full Stack Developer Specializing in{" "}
                            <span className="text-blue-400">Laravel</span> and{" "}
                            <span className="text-purple-400">Backend Systems</span>
                        </h2>
                    </motion.div>

                    <motion.p
                        className="mt-2 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed mb-8"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        I build secure, scalable, and user-focused web applications using Laravel, MySQL, Flutter, and modern backend technologies. Through building tools like College Finder and robust application backends, I transform complex architectural problems into efficient real-world solutions.
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-5"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <a
                            href="#projects"
                            className="group relative flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                            <span className="relative z-10 flex items-center gap-2">
                                View My Projects
                                <ChevronsRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </a>

                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-slate-700 text-slate-200 font-bold rounded-lg transition-all hover:border-blue-500 hover:text-white hover:bg-slate-800"
                        >
                            <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                            Download Resume
                        </a>
                    </motion.div>
                </div>

                {/* 3D Scene (Right on Large, Bottom on Mobile - wait user asked for 3d model above text on mobile? "On mobile devices, the text should appear first and the 3D scene should move below it", so text is order-2? Ah, if text appears first on mobile: order-1? Wait, flex-col on mobile.
        My code: text has order-2 lg:order-1. So text is below on mobile. Let's fix that! */}

                <motion.div
                    className="w-full h-[50vh] min-h-[400px] lg:h-full lg:min-h-[600px] order-2 relative flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                >
                    {/* Subtle glow behind the 3D object */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />

                    <GeometricCoreCanvas />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
