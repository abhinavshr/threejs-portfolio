import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, Github, Linkedin, ExternalLink } from "lucide-react";
import NavbarLogoCanvas from "./canvas/NavbarLogoCanvas";
import NavbarBackgroundCanvas from "./canvas/NavbarBackground";

const navLinks = [
    { id: "about", title: "About" },
    { id: "skills", title: "Skills" },
    { id: "experience", title: "Experience" },
    { id: "education", title: "Education" },
    { id: "certifications", title: "Cert" },
    { id: "projects", title: "Projects" },
    { id: "contact", title: "Contact" },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [active, setActive] = useState("hero");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            const current = navLinks.find(link => {
                const el = document.getElementById(link.id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    return rect.top >= -300 && rect.top <= 400;
                }
                return false;
            });
            if (current) setActive(current.id);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (id) => {
        setActive(id);
        setToggle(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 px-2 sm:px-10 py-4 sm:py-6 flex justify-center`}
        >
            <div
                className={`max-w-7xl w-full flex items-center justify-between px-4 sm:px-8 py-2 sm:py-3 rounded-2xl sm:rounded-[3rem] transition-all duration-700 border relative overflow-hidden
                    ${scrolled
                        ? "bg-slate-950/40 backdrop-blur-2xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-2 sm:py-2.5 scale-[0.97] md:scale-100"
                        : "bg-transparent border-transparent"}`}
            >
                {/* Three.js Background inside Navbar */}
                <NavbarBackgroundCanvas />

                {/* Left Side: Logo & Brand */}
                <div
                    className="flex items-center gap-4 cursor-pointer group z-10"
                    onClick={() => {
                        handleNavClick("hero");
                        setToggle(false);
                    }}
                >
                    <div className="relative transform group-hover:scale-110 transition-transform duration-500">
                        <NavbarLogoCanvas />
                        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="hidden md:flex flex-col">
                        <div className="flex gap-1.5 items-baseline">
                            <span className="text-white text-xl font-black tracking-tighter uppercase transition-all group-hover:tracking-normal">
                                Abhinav
                            </span>
                            <span className="text-blue-500 text-xl font-black tracking-tighter uppercase">
                                Shrestha
                            </span>
                        </div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.4em] mt-0.5 group-hover:text-blue-400 transition-colors">
                            Portfolio • 2026
                        </span>
                    </div>
                </div>

                {/* Center: Navigation Links */}
                <div className="hidden lg:flex items-center gap-1.5 z-10">
                    <ul className="flex items-center gap-0.5 bg-white/5 backdrop-blur-md rounded-full p-1 border border-white/5">
                        {navLinks.map((link) => (
                            <li key={link.id}>
                                <a
                                    href={`#${link.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavClick(link.id);
                                    }}
                                    className={`relative px-3 xl:px-5 py-2 text-[9px] xl:text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-500 rounded-full flex items-center gap-2
                                        ${active === link.id ? "text-white" : "text-slate-400 hover:text-white hover:bg-white/5"}
                                    `}
                                >
                                    <span className="relative z-10">{link.title}</span>

                                    {active === link.id && (
                                        <motion.div
                                            layoutId="navGlow"
                                            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full -z-10 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Side: Socials & CTA */}
                <div className="hidden lg:flex items-center gap-6 z-10">
                    <div className="flex items-center gap-3">
                        <motion.a
                            whileHover={{ y: -2, scale: 1.1 }}
                            href="https://github.com/abhinavshr"
                            target="_blank"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-900/50 border border-white/5 text-slate-400 hover:text-white hover:border-blue-500/50 transition-all"
                        >
                            <Github className="w-5 h-5" />
                        </motion.a>
                        <motion.a
                            whileHover={{ y: -2, scale: 1.1 }}
                            href="https://www.linkedin.com/in/abhinav-shrestha-9a8786255/"
                            target="_blank"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-900/50 border border-white/5 text-slate-400 hover:text-white hover:border-blue-500/50 transition-all"
                        >
                            <Linkedin className="w-5 h-5" />
                        </motion.a>
                    </div>

                    <div className="h-8 w-[1px] bg-white/10" />

                    <motion.a
                        href="/resume.pdf"
                        target="_blank"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-6 py-2.5 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest overflow-hidden shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                        <span className="relative z-10 flex items-center gap-2">
                            Resume
                            <Download className="w-3 h-3" />
                        </span>
                    </motion.a>
                </div>

                {/* Mobile Menu Trigger */}
                <button
                    onClick={() => setToggle(!toggle)}
                    className="lg:hidden z-20 w-10 h-10 flex items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white group overflow-hidden"
                >
                    <AnimatePresence mode="wait">
                        {toggle ? (
                            <motion.div key="x" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}><X className="w-6 h-6" /></motion.div>
                        ) : (
                            <motion.div key="menu" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}><Menu className="w-6 h-6" /></motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* Mobile Immersive Menu */}
            <AnimatePresence>
                {toggle && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-slate-950/90 backdrop-blur-3xl z-40"
                            onClick={() => setToggle(false)}
                        />
                        <motion.div
                            initial={{ x: "100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "100%", opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 150 }}
                            className="fixed top-0 bottom-0 right-0 w-full sm:w-[400px] bg-slate-900/60 backdrop-blur-3xl border-l border-white/10 p-6 sm:p-10 pt-24 sm:pt-32 z-50 flex flex-col justify-between shadow-2xl"
                        >
                            {/* Close Button Inside Menu */}
                            <button
                                onClick={() => setToggle(false)}
                                className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="flex flex-col gap-4">
                                <span className="text-[10px] text-blue-500 font-black uppercase tracking-[0.5em] mb-4">Navigation</span>
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.id}
                                        initial={{ x: 50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <a
                                            href={`#${link.id}`}
                                            className={`text-3xl sm:text-5xl font-black uppercase tracking-tighter flex items-center justify-between group
                                                ${active === link.id ? "text-white" : "text-slate-500 hover:text-white"}
                                            `}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setToggle(false);
                                                handleNavClick(link.id);
                                            }}
                                        >
                                            <span className="relative">
                                                {link.title}
                                                {active === link.id && (
                                                    <motion.div layoutId="mobileActive" className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full" />
                                                )}
                                            </span>
                                            <ExternalLink className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
                                        </a>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="space-y-8">
                                <div className="h-[1px] bg-white/10 w-full" />
                                <div className="flex flex-col gap-6">
                                    <div className="flex gap-4">
                                        <a
                                            href="https://github.com/abhinavshr"
                                            target="_blank"
                                            onClick={() => setToggle(false)}
                                            className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-blue-600 transition-colors"
                                        >
                                            <Github className="w-6 h-6" />
                                        </a>
                                        <a
                                            href="https://www.linkedin.com/in/abhinav-shrestha-9a8786255/"
                                            target="_blank"
                                            onClick={() => setToggle(false)}
                                            className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-blue-600 transition-colors"
                                        >
                                            <Linkedin className="w-6 h-6" />
                                        </a>
                                    </div>
                                    <a
                                        href="/resume.pdf"
                                        onClick={() => setToggle(false)}
                                        className="w-full py-4 sm:py-6 bg-blue-600 text-white rounded-2xl sm:rounded-[2rem] font-black text-center text-lg sm:text-xl uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(37,99,235,0.3)] active:scale-95 transition-all"
                                    >
                                        Download Resume
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
