import { motion } from "framer-motion";
import SkillsCanvas from "./canvas/SkillsCanvas";
import { Server, Layout, Database, Smartphone, Wrench } from "lucide-react";

const skillCategories = [
    {
        title: "Backend Development",
        icon: <Server className="w-5 h-5 text-blue-400" />,
        skills: [
            { name: "Laravel", level: 90 },
            { name: "Node.js", level: 75 },
            { name: "PHP", level: 85 },
        ]
    },
    {
        title: "Frontend Development",
        icon: <Layout className="w-5 h-5 text-indigo-400" />,
        skills: [
            { name: "React", level: 85 },
            { name: "Three.js", level: 65 },
            { name: "JavaScript", level: 85 },
            { name: "HTML & CSS", level: 90 },
        ]
    },
    {
        title: "Databases",
        icon: <Database className="w-5 h-5 text-purple-400" />,
        skills: [
            { name: "Database Design", level: 95 },
            { name: "MySQL", level: 90 },
        ]
    },
    {
        title: "Mobile Development",
        icon: <Smartphone className="w-5 h-5 text-pink-400" />,
        skills: [
            { name: "Flutter", level: 80 },
        ]
    },
    {
        title: "Tools & Version Control",
        icon: <Wrench className="w-5 h-5 text-cyan-400" />,
        skills: [
            { name: "Git & GitHub", level: 85 },
            { name: "Visual Studio Code", level: 90 },
            { name: "MySQL Workbench", level: 85 },
            { name: "Figma & Draw.io", level: 75 },
        ]
    }
];

const SkillBar = ({ name, level, index }) => {
    return (
        <div className="mb-5 last:mb-0 relative z-10">
            <div className="flex justify-between mb-2">
                <span className="text-sm md:text-base font-semibold text-slate-200">{name}</span>
                <span className="text-sm font-bold text-blue-400">{level}%</span>
            </div>
            <div className="w-full bg-slate-950/50 shadow-inner rounded-full h-3 overflow-hidden border border-slate-800/50">
                <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 relative shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level}%` }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Glowing lead edge inside the bar */}
                    <div className="absolute top-0 right-0 bottom-0 w-12 bg-white/20 blur-[4px] rounded-r-full" />
                </motion.div>
            </div>
        </div>
    );
};

const Skills = () => {
    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    return (
        <section id="skills" className="relative w-full min-h-screen bg-slate-950 py-16 md:py-24 overflow-hidden flex flex-col justify-center">
            {/* Immersive 3D Data Grid Background */}
            <SkillsCanvas />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 relative z-10 w-full mb-10 md:mb-16">

                {/* Section Heading */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
                        Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">Expertise</span>
                    </h2>
                    <p className="text-slate-400 max-w-3xl mx-auto text-sm md:text-lg leading-relaxed mb-6 px-2">
                        Building structured systems requires a deep understanding of architecture, databases, and scalable logic. Here is my organized technical stack, powering robust full-stack applications and reliable APIs.
                    </p>
                    <div className="w-16 md:w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                </motion.div>
            </div>

            {/* Skills Interactive Cards Layout */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 relative z-10 w-full text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
                    {skillCategories.map((category, catIdx) => (
                        <motion.div
                            key={catIdx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: catIdx * 0.1 }}
                            whileHover={{
                                y: -10,
                                scale: 1.02,
                                transition: { duration: 0.3 }
                            }}
                            className="bg-slate-900/40 backdrop-blur-md border border-slate-800/50 rounded-2xl p-6 md:p-8 flex flex-col relative overflow-hidden group shadow-xl hover:shadow-[0_20px_50px_-15px_rgba(79,70,229,0.3)] hover:border-indigo-500/50 transition-all duration-500"
                        >
                            {/* Subtle Ambient Glow On Hover */}
                            <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700 pointer-events-none z-0" />
                            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/15 transition-all duration-700 pointer-events-none z-0" />

                            <h3 className="text-xl md:text-2xl font-bold text-white mb-8 flex items-center gap-4 relative z-10">
                                <div className="flex-shrink-0 p-2.5 bg-slate-800/90 rounded-xl border border-slate-700/50 shadow-lg group-hover:scale-110 group-hover:border-indigo-500/50 transition-all duration-500">
                                    {category.icon}
                                </div>
                                <span className="tracking-tight">{category.title}</span>
                            </h3>

                            <div className="flex flex-col relative z-10">
                                {category.skills.map((skill, skillIdx) => (
                                    <SkillBar key={skillIdx} index={skillIdx} name={skill.name} level={skill.level} />
                                ))}
                            </div>

                            {/* Inner ambient bottom glow for premium feel */}
                            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none z-0" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
