import { motion } from "framer-motion";
import ContactCanvas from "./canvas/ContactCanvas";
import { Mail, Github, Linkedin, Send, MapPin, ExternalLink, MessageSquare } from "lucide-react";

// ── Static data & variants outside component ──────────────────────────────────

const CONTACT_LINKS = [
    {
        icon: <Mail     className="w-6 h-6" />,
        label: "Email",
        value: "abhinavshr002@gmail.com",
        href: "mailto:abhinavshr002@gmail.com",
        // Full resolved Tailwind class — dynamic `text-${color}-400` gets purged
        iconColorClass: "text-blue-400",
    },
    {
        icon: <Linkedin className="w-6 h-6" />,
        label: "LinkedIn",
        value: "abhinavshr",
        href: "https://www.linkedin.com/in/abhinav-shrestha-9a8786255/",
        iconColorClass: "text-indigo-400",
    },
    {
        icon: <Github   className="w-6 h-6" />,
        label: "GitHub",
        value: "abhinavshr",
        href: "https://github.com/abhinavshr",
        iconColorClass: "text-slate-400",
    },
    {
        icon: <MapPin   className="w-6 h-6" />,
        label: "Location",
        value: "Madhyapur Thimi Bode, Bhaktapur, Nepal",
        href: "https://www.google.com/maps/place/Bode,+Madhyapur+Thimi+44600/@27.691152,85.3876036,17z",
        iconColorClass: "text-purple-400",
    },
];

const fadeUp = {
    hidden:  { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

// Stable viewport configs
const VIEWPORT_100 = { once: true, margin: "-100px" };
const VIEWPORT_DEF = { once: true };

// ── Contact ───────────────────────────────────────────────────────────────────

/**
 * Contact Component
 * The final section of the portfolio that handles outreach and social links.
 * It features a split layout: a textual invitation on the left and 
 * an interactive grid of contact cards on the right.
 */
const Contact = () => (
    <section
        id="contact"
        className="relative w-full py-16 md:py-24 bg-slate-950 overflow-hidden flex flex-col justify-center"
    >
        {/* The 3D background with floating distorted 'connection' spheres */}
        <ContactCanvas />

        {/* Section Heading Container */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 relative z-10 w-full mb-10 md:mb-16">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_100}
                variants={fadeUp}
                className="text-center"
            >
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 md:mb-6 text-white">
                    Let's Create{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
                        Something Amazing
                    </span>
                </h2>
                <p className="text-slate-400 max-w-3xl mx-auto text-sm md:text-lg leading-relaxed mb-6">
                    I am always open to new opportunities, collaborations, and innovative projects that challenge my skills and allow me to grow as a developer.
                </p>
                <div className="w-20 md:w-24 h-1 md:h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
            </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">

                {/* Left Panel: Outreach & Availability */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={VIEWPORT_DEF}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col justify-center space-y-6 md:space-y-8"
                >
                    <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 md:p-10 shadow-xl relative overflow-hidden group">
                        {/* Dynamic radial glow that highlights on hover */}
                        <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,transparent_70%)] rounded-full pointer-events-none group-hover:bg-[radial-gradient(circle,rgba(59,130,246,0.2)_0%,transparent_70%)] transition-colors duration-700" />

                        <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <MessageSquare className="w-6 h-6 text-blue-400" />
                            Professional Outreach
                        </h3>

                        <div className="space-y-4 md:space-y-6 text-slate-300 leading-relaxed text-sm md:text-base">
                            <p>
                                Whether you are looking for a dedicated{" "}
                                <span className="text-blue-400 font-semibold">mobile application developer</span>, a{" "}
                                <span className="text-indigo-400 font-semibold">backend Laravel developer</span>, or someone who can build{" "}
                                <span className="text-purple-400 font-semibold">immersive web experiences using Three.js</span>, I would be excited to connect and discuss how I can contribute to your project or organization.
                            </p>
                            <p>
                                I am particularly interested in roles involving{" "}
                                <span className="text-slate-100 italic">Flutter development, scalable backend systems, cloud-integrated applications, and interactive 3D web experiences</span>. I enjoy solving complex problems, working in collaborative environments, and turning ideas into functional, user-friendly digital solutions.
                            </p>
                            <p className="font-medium text-slate-200">
                                If you have a project in mind, a job opportunity, or simply want to connect professionally, feel free to reach out. I am always ready to learn, innovate, and build impactful technology.
                            </p>
                        </div>
                    </div>

                    {/* Status Badge: Pulse animation to indicate active status */}
                    <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-4 md:p-6 flex items-center gap-4">
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                        <p className="text-slate-400 text-xs md:text-sm font-medium">
                            Available for new opportunities and collaborations
                        </p>
                    </div>
                </motion.div>

                {/* Right Panel: Interactive Contact Grid */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={VIEWPORT_DEF}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 h-full"
                >
                    {CONTACT_LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target={link.href.startsWith("http") ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            className="group relative bg-slate-900/40 backdrop-blur-md border border-slate-800 p-6 md:p-8 rounded-3xl hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between overflow-hidden"
                        >
                            {/* Inner radial glow specific to individual contact cards */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,rgba(59,130,246,0.1)_0%,transparent_70%)] rounded-full pointer-events-none group-hover:bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,transparent_70%)] transition-colors" />

                            <div className="flex justify-between items-start relative z-10">
                                <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl bg-slate-800 group-hover:bg-slate-700 ${link.iconColorClass} group-hover:scale-110 transition-all duration-300`}>
                                    {link.icon}
                                </div>
                                <ExternalLink className="w-5 h-5 text-slate-600 group-hover:text-slate-300 transition-colors" />
                            </div>

                            <div className="mt-6 md:mt-8 relative z-10">
                                <p className="text-slate-500 text-[10px] md:text-xs uppercase tracking-widest font-extrabold mb-1">
                                    {link.label}
                                </p>
                                <p className="text-base md:text-xl font-bold text-white group-hover:text-blue-400 transition-colors break-words line-clamp-2">
                                    {link.value}
                                </p>
                            </div>
                        </a>
                    ))}
                </motion.div>

            </div>
        </div>

        {/* 
          * Professional Footer Component
          * Acts as the final visual anchor for the entire portfolio.
          * It incorporates branding, technical credits, and legal information in a 
          * responsive, high-fidelity layout.
          */}
        <footer className="mt-20 md:mt-32 pt-10 border-t border-slate-900/50 w-full relative z-10">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
                
                {/* 
                  * Branding Section
                  * Consists of a symbolic initial badge ('AS') and full-name attribution.
                  * Uses a high-contrast gradient to maintain visual hierarchy.
                  */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/10">
                        <span className="text-white font-black text-xl italic select-none">AS</span>
                    </div>
                    <div>
                        <p className="text-slate-100 font-bold tracking-tight leading-none">Abhinav Shrestha</p>
                        <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mt-1">Full Stack Developer</p>
                    </div>
                </div>

                {/* 
                  * Technical Stack Credits
                  * Explains the core frameworks and libraries that power the site.
                  * This sections humanizes the development effort and serves as a dev-to-dev nod.
                  */}
                <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-slate-500 text-xs md:text-sm font-medium">
                    {/* Built with Three.js: Highlights the 3D graphics capability */}
                    <span className="flex items-center gap-2 hover:text-blue-400 transition-colors cursor-default">
                        Built with <span className="text-blue-400">Three.js</span>
                    </span>
                    <span className="w-1 h-1 bg-slate-800 rounded-full hidden sm:block" />
                    {/* Powered by React: Highlights the robust component architecture */}
                    <span className="flex items-center gap-2 hover:text-indigo-400 transition-colors cursor-default">
                        Powered by <span className="text-indigo-400">React</span>
                    </span>
                    <span className="w-1 h-1 bg-slate-800 rounded-full hidden sm:block" />
                    {/* Styled with Tailwind: Highlights the modern styling utility */}
                    <span className="flex items-center gap-2 hover:text-purple-400 transition-colors cursor-default">
                        Styled with <span className="text-purple-400">Tailwind</span>
                    </span>
                </div>

                {/* 
                  * Legal & Copyright Section
                  * Uses standard JS Date() to ensure the year is always current.
                  * Positions at the end of the flex container for visual balance.
                  */}
                <div className="text-slate-500 text-xs md:text-sm text-right">
                    <p>© {new Date().getFullYear()} All Rights Reserved.</p>
                </div>
            </div>
            
            {/* 
              * Finishing Decorative Glow
              * A subtle horizontal line with a radial fade that ensures the 
              * 3D background doesn't appear as a 'hard cut' at the very bottom.
              */}
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        </footer>
    </section>
);

export default Contact;