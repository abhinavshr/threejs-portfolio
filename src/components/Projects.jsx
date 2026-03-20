// Projects.jsx  ───────────────────────────────────────────────────
import { useMemo } from "react";
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
        featured: true,
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
        description: "Currently contributing to a high-stake upcoming application as a dedicated frontend developer. Architecting and building the entire mobile experience using Flutter, integrating with secure production APIs, and implementing scalable state management.",
        techStack: ["Flutter", "Dart", "API Integration", "State Management"],
        role: "Frontend Mobile Engineer",
        confidential: true,
    },
    {
        id: "social-api",
        title: "Instagram Clone",
        description: "A complete full-stack social media application mirroring Instagram. Built a high-performance backend with Node.js to handle user authentication, image uploads, and post feeds, integrated seamlessly with a cross-platform mobile frontend in Flutter.",
        techStack: ["Node.js", "Flutter", "Express", "REST API"],
        role: "Full Stack Developer",
        github: [
            { label: "App / Frontend Node", url: "https://github.com/abhinavshr/instamate" },
            { label: "Backend API", url: "https://github.com/abhinavshr/instagram-clone-backend" },
        ],
    },
    {
        id: "static-portfolio",
        title: "Static Web Portfolio",
        description: "A highly interactive, design-focused personal portfolio. Built to demonstrate advanced frontend animation capabilities using GSAP, smooth scrolling, and dynamic layout structures, resulting in a premium frontend experience.",
        techStack: ["React", "Vite", "Tailwind CSS", "GSAP"],
        role: "Frontend Developer",
        github: "https://github.com/abhinavshr/static-portfolio",
        live: "https://sunisthashrestha.com.np/",
    },
];

// Stable variant object — defined outside component, never recreated
const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};
const cardVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
};

/**
 * GithubLinks Component
 * Dynamically renders GitHub links based on the input type.
 * Supports both a single URL string or an array of repository objects.
 * 
 * @param {string|Array} github - The GitHub URL or an array of {label, url} objects.
 * @param {string} className - Optional CSS classes for the links.
 */
const GithubLinks = ({ github, className = "" }) =>
    Array.isArray(github) ? (
        github.map((repo, i) => (
            <a key={i} href={repo.url} target="_blank" rel="noopener noreferrer"
                className={className} title={repo.label}>
                <Github className="w-5 h-5 shrink-0" /> {repo.label ?? ""}
            </a>
        ))
    ) : github ? (
        <a href={github} target="_blank" rel="noopener noreferrer" className={className}>
            <Github className="w-5 h-5 shrink-0" /> GitHub Repo
        </a>
    ) : null;

/**
 * TechBadge Component
 * Renders a small badge for individual technologies in the tech stack.
 * 
 * @param {string} tech - The technology name to display.
 */
const TechBadge = ({ tech }) => (
    <span className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs font-mono text-slate-300">
        {tech}
    </span>
);

/**
 * Projects Component
 * The main section that renders the portfolio projects.
 * It separates projects into a "featured" layout (larger cards) 
 * and a "rest" layout (grid of smaller cards).
 */
const Projects = () => {
    /**
     * useMemo Hook
     * Segregates the projectsList into featured and non-featured arrays.
     * This avoids re-filtering on every component render.
     */
    const [featured, rest] = useMemo(() => {
        const f = projectsList.filter(p => p.featured);
        const r = projectsList.filter(p => !p.featured);
        return [f, r];
    }, []); // projectsList is module-level constant — deps never change

    return (
        <section
            id="projects"
            className="relative w-full min-h-screen bg-slate-950 py-16 md:py-24 overflow-hidden flex flex-col justify-center"
        >
            {/* The 3D constellation background scene */}
            <ProjectsCanvas />

            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-12 xl:px-20 relative z-10 w-full mb-10 md:mb-16">
                <motion.div
                    initial="hidden" whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                    className="text-center"
                >
                    <h2 className="text-2xl md:text-5xl font-extrabold tracking-tight mb-4 md:mb-6 text-white text-balance">
                        Production &amp;{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
                            Live Architecture
                        </span>
                    </h2>
                    <p className="text-slate-400 max-w-3xl mx-auto text-base md:text-lg leading-relaxed mb-6">
                        I build structured systems, live industry applications, and scalable backends.
                        Here is a curated showcase demonstrating my capability in taking projects from
                        database schema to real-world deployment.
                    </p>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-12 xl:px-20 relative z-10 w-full">
                {/* Featured Projects: Displayed in a semi-row layout with blue glow effects */}
                {featured.map((project) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="group flex flex-col lg:flex-row gap-8 lg:gap-12 bg-slate-900/60 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 md:p-12 shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:border-blue-400/60 transition-colors mb-10 overflow-hidden relative"
                    >
                        {/* Decorative radial glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,transparent_70%)] rounded-full pointer-events-none" />

                        <div className="flex-1 flex flex-col justify-center relative z-10">
                            <span className="text-blue-400 font-bold tracking-wider uppercase text-sm mb-2">
                                Primary Highlight
                            </span>
                            <h3 className="text-xl md:text-4xl font-bold text-white mb-4">{project.title}</h3>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.techStack.map((t, i) => <TechBadge key={i} tech={t} />)}
                            </div>

                            <h4 className="text-indigo-300 font-semibold mb-3">Role: {project.role}</h4>
                            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">
                                {project.description}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-auto">
                                <GithubLinks
                                    github={project.github}
                                    className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg transition-colors font-semibold border border-slate-700 hover:border-slate-500 text-xs md:text-sm"
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Secondary Projects Grid: Standard grid of smaller cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-6">
                    {rest.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial="hidden" whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={cardVariant}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            /* Hover effect: Translates card upwards slightly */
                            className="hover:-translate-y-1.5 transition-transform bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 md:p-8 flex flex-col relative overflow-hidden group hover:bg-slate-900/70 hover:border-slate-700 hover:shadow-[0_20px_40px_-20px_rgba(99,102,241,0.2)] shadow-lg"
                        >
                            <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle,rgba(168,85,247,0.1)_0%,transparent_70%)] rounded-full pointer-events-none" />

                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <h3 className="text-lg md:text-2xl font-bold text-slate-100 group-hover:text-blue-300 transition-colors">
                                    {project.title}
                                </h3>
                                <div className="flex gap-3 text-slate-400">
                                    {/* Action links: Lock for confidential, ExternalLink for live, and custom GitHub helper */}
                                    {project.confidential && <Lock className="w-6 h-6 text-red-400" />}
                                    {project.live && (
                                        <a href={project.live} target="_blank" rel="noopener noreferrer"
                                            className="hover:text-blue-400 transition-colors">
                                            <ExternalLink className="w-6 h-6" />
                                        </a>
                                    )}
                                    <GithubLinks
                                        github={project.github}
                                        className="hover:text-white transition-colors"
                                    />
                                </div>
                            </div>

                            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6 flex-1 relative z-10 line-clamp-4 group-hover:line-clamp-none">
                                {project.description}
                            </p>

                            <div className="mt-auto relative z-10">
                                <h4 className="text-slate-300 font-semibold mb-3 text-sm">
                                    Role: <span className="text-purple-300 font-normal">{project.role}</span>
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((t, i) => (
                                        <span key={i} className="text-xs font-mono text-slate-500 bg-slate-950/50 px-2 py-1 rounded border border-slate-800/50">
                                            {t}
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