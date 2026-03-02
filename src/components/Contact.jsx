import { motion } from "framer-motion";
import ContactCanvas from "./canvas/ContactCanvas";
import { Mail, Github, Linkedin, Send, MapPin, ExternalLink, MessageSquare } from "lucide-react";

const Contact = () => {
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    const contactLinks = [
        {
            icon: <Mail className="w-6 h-6" />,
            label: "Email",
            value: "abhinavshr002@gmail.com",
            href: "mailto:abhinavshr002@gmail.com",
            color: "blue"
        },
        {
            icon: <Linkedin className="w-6 h-6" />,
            label: "LinkedIn",
            value: "abhinavshr",
            href: "https://www.linkedin.com/in/abhinav-shrestha-9a8786255/",
            color: "indigo"
        },
        {
            icon: <Github className="w-6 h-6" />,
            label: "GitHub",
            value: "abhinavshr",
            href: "https://github.com/abhinavshr",
            color: "slate"
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            label: "Location",
            value: "Madhyapur Thimi Bode, Bhaktapur, Nepal",
            href: "https://www.google.com/maps/place/Bode,+Madhyapur+Thimi+44600/@27.691152,85.3876036,17z/data=!3m1!4b1!4m6!3m5!1s0x39eb1a5bee851915:0x18d6ced81c235072!8m2!3d27.6909398!4d85.3904693!16s%2Fm%2F04jlfbn?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D",
            color: "purple"
        }
    ];

    return (
        <section id="contact" className="relative w-full py-24 bg-slate-950 overflow-hidden flex flex-col justify-center">

            <ContactCanvas />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 relative z-10 w-full mb-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-white">
                        Let's Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">Something Amazing</span>
                    </h2>
                    <p className="text-slate-400 max-w-3xl mx-auto text-base md:text-lg leading-relaxed mb-6">
                        I am always open to new opportunities, collaborations, and innovative projects that challenge my skills and allow me to grow as a developer.
                    </p>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

                    {/* Outreach Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col justify-center space-y-8"
                    >
                        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/5 blur-[50px] pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-700" />

                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <MessageSquare className="w-6 h-6 text-blue-400" />
                                Professional Outreach
                            </h3>

                            <div className="space-y-6 text-slate-300 leading-relaxed text-sm md:text-base">
                                <p>
                                    Whether you are looking for a dedicated <span className="text-blue-400 font-semibold">mobile application developer</span>, a <span className="text-indigo-400 font-semibold">backend Laravel developer</span>, or someone who can build <span className="text-purple-400 font-semibold">immersive web experiences using Three.js</span>, I would be excited to connect and discuss how I can contribute to your project or organization.
                                </p>
                                <p>
                                    I am particularly interested in roles involving <span className="text-slate-100 italic">Flutter development, scalable backend systems, cloud-integrated applications, and interactive 3D web experiences</span>. I enjoy solving complex problems, working in collaborative environments, and turning ideas into functional, user-friendly digital solutions.
                                </p>
                                <p className="font-medium text-slate-200">
                                    If you have a project in mind, a job opportunity, or simply want to connect professionally, feel free to reach out. I am always ready to learn, innovate, and build impactful technology.
                                </p>
                            </div>
                        </div>

                        {/* Availability Snippet */}
                        <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6 flex items-center gap-4">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                            <p className="text-slate-400 text-sm font-medium">Available for new opportunities and collaborations</p>
                        </div>
                    </motion.div>

                    {/* Contact Links Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 h-full"
                    >
                        {contactLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                target={link.href.startsWith("http") ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                className="group relative bg-slate-900/40 backdrop-blur-md border border-slate-800 p-8 rounded-3xl hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between overflow-hidden"
                            >
                                <div className={`absolute top-0 right-0 w-24 h-24 bg-${link.color}-500/5 blur-[40px] pointer-events-none group-hover:bg-${link.color}-500/10 transition-colors`} />

                                <div className="flex justify-between items-start relative z-10">
                                    <div className={`p-4 rounded-2xl bg-slate-800 group-hover:bg-slate-700 text-${link.color}-400 group-hover:scale-110 transition-all duration-300`}>
                                        {link.icon}
                                    </div>
                                    <ExternalLink className="w-5 h-5 text-slate-600 group-hover:text-slate-300 transition-colors" />
                                </div>

                                <div className="mt-8 relative z-10">
                                    <p className="text-slate-500 text-xs uppercase tracking-widest font-extrabold mb-1">{link.label}</p>
                                    <p className="text-lg md:text-xl font-bold text-white group-hover:text-blue-400 transition-colors break-words">{link.value}</p>
                                </div>
                            </a>
                        ))}
                    </motion.div>

                </div>
            </div>

        </section>
    );
};

export default Contact;
