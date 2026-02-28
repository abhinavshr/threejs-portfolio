import { motion } from "framer-motion";
import ProjectsCanvas from "./canvas/ProjectsCanvas";
import { Github, ExternalLink, Lock } from "lucide-react";

const projectsList = [
    {
        id: "college-finder",
        title: "College Finder Nepal",
        description: "A comprehensive full-stack system designed for students in Nepal. Demonstrates complex database design, role-based access control (Users, Admins, College Reps), secure authentication, and structured backend API logic to explore colleges, courses, and scholarships.",
        techStack: ["Laravel", "MySQL", "PHP", "React"],
        role: "Full Stack Backend Architect",
        github: "https://github.com/abhinavshr/CollegeFinder",
        featured: true, // Special styling for the most important project
    },
    {
        id: "cosmitech",
        title: "CosmiTech International",
        description: "Professional contribution to a live, client-facing system. I worked within a real industry environment handling deployment structures, UI integration, and production-level database management, establishing immediate industry exposure and teamwork.",
        techStack: ["Web Architecture", "APIs", "Database Management"],
        role: "Backend & Integration Developer",
        live: "https://cosmitechinternational.com",
    },
    {
        id: "confidential",
        title: "Confidential Production Application",
        description: "Currently contributing to a high-stake upcoming application as a dedicated frontend developer. Architecting and building the entire mobile experience using Flutter, integrating with secure production APIs, and implementing scalable state management. Demonstrates trusted capability in delivering polished, real-world deployment interfaces.",
        techStack: ["Flutter", "Dart", "API Integration", "State Management"],
        role: "Frontend Mobile Engineer",
        confidential: true,
    },
    {
        id: "social-api",
        title: "Instagram Clone",
        description: "A complete full-stack social media application mirroring Instagram. Built a high-performance backend with Node.js to handle user authentication, image uploads, and post feeds, integrated seamlessly with a cross-platform mobile frontend developed in Flutter.",
        techStack: ["Node.js", "Flutter", "Express", "REST API"],
        role: "Full Stack Developer",
        github: [
            { label: "App / Frontend Node", url: "https://github.com/abhinavshr/instamate" },
            { label: "Backend API", url: "https://github.com/abhinavshr/instagram-clone-backend" }
        ],
    },
    {
        id: "static-portfolio",
        title: "Static Web Portfolio",
        description: "A highly interactive, design-focused personal portfolio website. Built to demonstrate advanced frontend animation capabilities using GSAP, smooth scrolling, and dynamic layout structures, resulting in a premium backend-integrated frontend experience.",
        techStack: ["React", "Vite", "Tailwind CSS", "GSAP"],
        role: "Frontend Developer",
        github: "https://github.com/abhinavshr/static-portfolio",
        live: "https://sunisthashrestha.com.np/",
    }
];

const Projects = () => {
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    return (
        <section id="projects" className="relative w-full min-h-screen bg-slate-950 py-24 overflow-hidden flex flex-col justify-center">

            {/* 3D Network Background Canvas */}
            <ProjectsCanvas />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 relative z-10 w-full mb-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-white">
                        Production & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">Live Architecture</span>
                    </h2>
                    <p className="text-slate-400 max-w-3xl mx-auto text-base md:text-lg leading-relaxed mb-6">
                        I build structured systems, live industry applications, and scalable backends. Here is a curated showcase demonstrating my capability in taking projects from database schema to real-world deployment.
                    </p>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 relative z-10 w-full">
                {/* Featured Project */}
                {projectsList.filter(p => p.featured).map((project) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="group flex flex-col lg:flex-row gap-8 lg:gap-12 bg-slate-900/60 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8 md:p-12 shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:border-blue-400/60 transition-colors mb-10 overflow-hidden relative"
                    >
                        {/* Glow ambient background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl pointer-events-none rounded-full" />

                        <div className="flex-1 flex flex-col justify-center relative z-10">
                            <span className="text-blue-400 font-bold tracking-wider uppercase text-sm mb-2">Primary Highlight</span>
                            <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">{project.title}</h3>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.techStack.map((tech, i) => (
                                    <span key={i} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs md:text-sm text-slate-300 font-mono">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <h4 className="text-indigo-300 font-semibold mb-3">Role: {project.role}</h4>
                            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">
                                {project.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mt-auto">
                                {Array.isArray(project.github) ? (
                                    project.github.map((repo, idx) => (
                                        <a key={idx} href={repo.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-3 px-6 rounded-lg transition-colors font-semibold border border-slate-700 hover:border-slate-500 text-sm">
                                            <Github className="w-5 h-5" /> {repo.label}
                                        </a>
                                    ))
                                ) : project.github && (
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-3 px-6 rounded-lg transition-colors font-semibold border border-slate-700 hover:border-slate-500">
                                        <Github className="w-5 h-5" /> GitHub Repo
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Grid for remaining projects */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-6">
                    {projectsList.filter(p => !p.featured).map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            whileHover={{ y: -5 }}
                            className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-8 flex flex-col relative overflow-hidden group hover:bg-slate-900/70 hover:border-slate-700 transition-all shadow-lg hover:shadow-[0_20px_40px_-20px_rgba(99,102,241,0.2)]"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[50px] pointer-events-none group-hover:bg-purple-500/10 transition-colors" />

                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <h3 className="text-xl md:text-2xl font-bold text-slate-100 group-hover:text-blue-300 transition-colors">
                                    {project.title}
                                </h3>
                                <div className="flex gap-3 text-slate-400">
                                    {project.confidential && <Lock className="w-6 h-6 text-red-400" />}
                                    {project.live && (
                                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                                            <ExternalLink className="w-6 h-6" />
                                        </a>
                                    )}
                                    {Array.isArray(project.github) ? (
                                        project.github.map((repo, idx) => (
                                            <a key={idx} href={repo.url} target="_blank" rel="noopener noreferrer" title={repo.label} className="hover:text-white transition-colors">
                                                <Github className="w-6 h-6" />
                                            </a>
                                        ))
                                    ) : project.github && (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                            <Github className="w-6 h-6" />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6 flex-1 relative z-10 line-clamp-4 group-hover:line-clamp-none transition-all">
                                {project.description}
                            </p>

                            <div className="mt-auto relative z-10">
                                <h4 className="text-slate-300 font-semibold mb-3 text-sm">Role: <span className="text-purple-300 font-normal">{project.role}</span></h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech, i) => (
                                        <span key={i} className="text-xs font-mono text-slate-500 bg-slate-950/50 px-2 py-1 rounded border border-slate-800/50">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
