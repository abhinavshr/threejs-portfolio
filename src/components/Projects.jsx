// Projects.jsx  ───────────────────────────────────────────────────
import { useMemo } from "react";
import { motion } from "framer-motion";
import ProjectsCanvas from "./canvas/ProjectsCanvas";
import { Github, ExternalLink, Lock, SearchX, Smartphone } from "lucide-react";

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
        id: "fix-my-ride",
        title: "Fix My Ride",
        description: "A comprehensive platform with separate User and Mechanic applications. Users can book mechanics for vehicle repairs, add up to 3 vehicles, use emergency contacts, and report issues. Mechanics can manage their workforce by adding workers. Features include profile management, service history, and real-time Firebase notifications.",
        techStack: ["Flutter", "Dart", "API Integration", "Firebase"],
        role: "Frontend Mobile Engineer",
        appGroups: [
            {
                title: "User Application",
                playStore: "https://play.google.com/store/apps/details?id=com.fix_my_ride_user&hl=en",
                appStore: "https://apps.apple.com/np/app/fix-my-ride-anytime-anywhere/id6761678829"
            },
            {
                title: "Mechanic Application",
                playStore: "https://play.google.com/store/apps/details?id=com.fix_my_ride_mechanic&hl=en",
                appStore: "https://apps.apple.com/np/app/fix-my-ride-mechanic/id6761676416"
            }
        ],
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

const AppleIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 384 512" fill="currentColor">
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
    </svg>
);

const PlayStoreIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 512 512" fill="currentColor">
        <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
    </svg>
);

/**
 * AppGroupLinks Component
 * Dynamically renders beautifully styled App Store / Play Store links grouped by category.
 */
const AppGroupLinks = ({ appGroups }) => (
    <div className="flex flex-col gap-6 mt-6 w-full">
        {appGroups.map((group, i) => (
            <div key={i} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 whitespace-nowrap">
                        {group.title}
                    </span>
                    <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="flex flex-wrap gap-3">
                    <a href={group.playStore} target="_blank" rel="noopener noreferrer" 
                        className="group relative flex items-center justify-center gap-3 px-4 md:px-5 py-2.5 bg-slate-200/50 hover:bg-emerald-100/80 dark:bg-slate-900/50 dark:hover:bg-emerald-900/40 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 rounded-xl transition-all duration-300 hover:shadow-[0_4px_20px_-5px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 overflow-hidden w-full sm:w-auto">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/20 to-emerald-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        <PlayStoreIcon className="w-6 h-6 text-emerald-600 dark:text-emerald-400 drop-shadow-sm shrink-0" />
                        <div className="flex flex-col items-start">
                            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 leading-none mb-1">Get it on</span>
                            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-none tracking-tight">Google Play</span>
                        </div>
                    </a>
                    
                    <a href={group.appStore} target="_blank" rel="noopener noreferrer" 
                        className="group relative flex items-center justify-center gap-3 px-4 md:px-5 py-2.5 bg-slate-200/50 hover:bg-blue-100/80 dark:bg-slate-900/50 dark:hover:bg-blue-900/40 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 rounded-xl transition-all duration-300 hover:shadow-[0_4px_20px_-5px_rgba(59,130,246,0.3)] hover:-translate-y-0.5 overflow-hidden w-full sm:w-auto">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/20 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        <AppleIcon className="w-6 h-6 text-slate-800 dark:text-slate-200 drop-shadow-sm shrink-0" />
                        <div className="flex flex-col items-start">
                            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 leading-none mb-1">Download on the</span>
                            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-none tracking-tight">App Store</span>
                        </div>
                    </a>
                </div>
            </div>
        ))}
    </div>
);

/**
 * TechBadge Component
 * Renders a small badge for individual technologies in the tech stack.
 * 
 * @param {string} tech - The technology name to display.
 */
const TechBadge = ({ tech }) => (
    <span className="px-3 py-1 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-full text-xs font-mono text-slate-700 dark:text-slate-300">
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
            className="relative w-full min-h-screen bg-slate-50 dark:bg-slate-950 py-16 md:py-24 overflow-hidden flex flex-col justify-center"
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
                    <h2 className="text-2xl md:text-5xl font-extrabold tracking-tight mb-4 md:mb-6 text-slate-900 dark:text-white text-balance">
                        Production &amp;{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
                            Live Architecture
                        </span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-base md:text-lg leading-relaxed mb-6">
                        I build structured systems, live industry applications, and scalable backends.
                        Here is a curated showcase demonstrating my capability in taking projects from
                        database schema to real-world deployment.
                    </p>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-12 xl:px-20 relative z-10 w-full">
                {projectsList.length > 0 ? (
                    <>
                        {/* Featured Projects: Displayed in a semi-row layout with blue glow effects */}
                        {featured.map((project) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="group flex flex-col lg:flex-row gap-8 lg:gap-12 bg-slate-100 dark:bg-slate-900/60 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 md:p-12 shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:border-blue-400/60 transition-colors mb-10 overflow-hidden relative"
                            >
                                {/* Decorative radial glow */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,transparent_70%)] rounded-full pointer-events-none" />

                                <div className="flex-1 flex flex-col justify-center relative z-10">
                                    <span className="text-blue-400 font-bold tracking-wider uppercase text-sm mb-2">
                                        Primary Highlight
                                    </span>
                                    <h3 className="text-xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">{project.title}</h3>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.techStack.map((t, i) => <TechBadge key={i} tech={t} />)}
                                    </div>

                                    <h4 className="text-indigo-300 font-semibold mb-3">Role: {project.role}</h4>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed mb-8">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-col mt-auto gap-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                            <GithubLinks
                                                github={project.github}
                                                className="flex items-center justify-center gap-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-700 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg transition-colors font-semibold border border-slate-300 dark:border-slate-700 hover:border-slate-500 text-xs md:text-sm"
                                            />
                                        </div>
                                        {project.appGroups && (
                                            <AppGroupLinks appGroups={project.appGroups} />
                                        )}
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
                                    className="hover:-translate-y-1.5 transition-transform bg-slate-100 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 flex flex-col relative overflow-hidden group hover:bg-indigo-50/80 dark:hover:bg-indigo-900/20 hover:border-indigo-300/60 dark:hover:border-indigo-500/30 hover:shadow-[0_20px_40px_-20px_rgba(99,102,241,0.4)] shadow-lg"
                                >
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle,rgba(168,85,247,0.1)_0%,transparent_70%)] rounded-full pointer-events-none" />

                                    <div className="flex justify-between items-start mb-4 relative z-10">
                                        <h3 className="text-lg md:text-2xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-300 transition-colors">
                                            {project.title}
                                        </h3>
                                        <div className="flex gap-3 text-slate-600 dark:text-slate-400">
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
                                                className="hover:text-slate-900 dark:hover:text-white transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed mb-6 flex-1 relative z-10 line-clamp-4 group-hover:line-clamp-none">
                                        {project.description}
                                    </p>

                                    <div className="mt-auto relative z-10">
                                        <h4 className="text-slate-700 dark:text-slate-300 font-semibold mb-3 text-sm">
                                            Role: <span className="text-purple-300 font-normal">{project.role}</span>
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.techStack.map((t, i) => (
                                                <span key={i} className="text-xs font-mono text-slate-500 bg-slate-50 dark:bg-slate-950/50 px-2 py-1 rounded border border-slate-200 dark:border-slate-800/50">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                        {project.appGroups && (
                                            <AppGroupLinks appGroups={project.appGroups} />
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="col-span-full flex flex-col items-center justify-center p-12 bg-slate-100 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl text-center"
                    >
                        <div className="p-6 bg-slate-200 dark:bg-slate-800/50 rounded-full mb-6 border border-slate-300 dark:border-slate-700/50 text-slate-600 dark:text-slate-400">
                            <SearchX className="w-12 h-12" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">No Projects Showcase</h3>
                        <p className="text-slate-600 dark:text-slate-400 max-w-md">
                            It looks like there aren't any projects to display at the moment.
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Projects;