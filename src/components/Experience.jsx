import { motion } from "framer-motion";
import { Briefcase, Code, Smartphone, Database, Layers } from "lucide-react";
import ExperienceCanvas from "./canvas/ExperienceCanvas";

const experienceData = [
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
        keyProject: "Cosmetic Store Mobile Application — Implemented product listing systems, cart functionality, order processing workflows, and backend API integration ensuring smooth performance."
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
        keyProject: "Explored interactive web technologies with Three.js to create dynamic 3D web experiences. Contributed to rendering 3D models, camera controls, lighting, and performance optimization."
    }
];

const Experience = () => {
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    return (
        <section id="experience" className="relative w-full py-24 bg-slate-950 overflow-hidden flex flex-col items-center">
            {/* 3D Background */}
            <ExperienceCanvas />

            {/* Background Ambient Glows */}
            <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/3 right-10 w-[30rem] h-[30rem] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 relative z-10 w-full mb-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-white">
                        Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-indigo-500">Journey</span>
                    </h2>
                    <p className="text-slate-400 max-w-3xl mx-auto text-base md:text-lg leading-relaxed mb-6">
                        My evolution from a backend-focused developer into a versatile full-stack and mobile developer, demonstrating adaptability, continuous learning, and modern stack expertise.
                    </p>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full" />
                </motion.div>
            </div>

            <div className="max-w-4xl mx-auto px-6 lg:px-12 w-full relative z-10">
                {/* Central Timeline Line */}
                <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-slate-700 to-transparent transform md:-translate-x-1/2" />

                <div className="space-y-16">
                    {experienceData.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className={`group relative flex flex-col md:flex-row items-start md:items-center justify-between w-full ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Timeline Node/Icon */}
                            <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                                <span className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 border-2 border-slate-700 z-10 ${exp.borderFocus} transition-colors duration-500`}>
                                    {/* Pulse effect */}
                                    <span className={`absolute inline-flex h-full w-full rounded-full bg-gradient-to-r ${exp.color} opacity-20 group-hover:animate-ping`} />
                                    <span className={`relative inline-flex rounded-full h-10 w-10 items-center justify-center bg-slate-800 ${exp.shadow}`}>
                                        {exp.icon}
                                    </span>
                                </span>
                            </div>

                            {/* Content Card container */}
                            <div className={`w-full md:w-5/12 ml-20 md:ml-0 ${index % 2 === 0 ? "md:pl-10 text-left md:text-left" : "md:pr-10 text-left md:text-right"
                                }`}>
                                <div className={`relative bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 md:p-8 hover:bg-slate-900/80 transition-all duration-500 hover:shadow-lg ${exp.borderFocus}`}>
                                    {/* Content inside card */}
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                                        {exp.role}
                                    </h3>
                                    <div className={`flex items-center gap-2 mb-4 text-sm font-medium text-slate-400 ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}>
                                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${exp.color} uppercase tracking-wider font-bold`}>
                                            {exp.company}
                                        </span>
                                        <span className="hidden md:inline">•</span>
                                        <span>{exp.date}</span>
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

                                    {/* Arrow connecting to timeline */}
                                    <div className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 w-0 h-0 border-y-8 border-y-transparent border-slate-800 transition-colors duration-500 ${exp.arrowColor} ${index % 2 === 0 ? "left-0 -translate-x-full border-r-8" : "right-0 translate-x-full border-l-8"}`} />
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
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
};

export default Experience;
