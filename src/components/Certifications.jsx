import { motion } from "framer-motion";
import CertificationsCanvas from "./canvas/CertificationsCanvas";
import { Cloud, Code, ShieldCheck, Database, Layout, ExternalLink, Award } from "lucide-react";

const certificationCategories = [
    {
        title: "Cloud Computing (AWS Academy)",
        icon: <Cloud className="w-6 h-6 text-orange-400" />,
        certs: [
            {
                name: "AWS Academy Data Center Technician",
                url: "https://www.credly.com/badges/86d7995c-7d42-4722-9cf4-454aaa54f0dc/linked_in_profile",
                description: "Enhanced understanding of data center operations and infrastructure management."
            },
            {
                name: "AWS Academy Cloud Security Foundations",
                url: "https://www.credly.com/badges/1e7121cb-864d-44bd-bf6e-d5b047ac7f81/linked_in_profile",
                description: "Knowledge of cloud security principles, risk management, and AWS security services."
            },
            {
                name: "AWS Academy Cloud Operations",
                url: "https://www.credly.com/badges/69982a53-d224-4e2a-a36d-73954bec34bd/linked_in_profile",
                description: "Focused on monitoring, maintaining, and optimizing cloud environments."
            },
            {
                name: "AWS Academy Cloud Foundations",
                url: "https://www.credly.com/badges/94f50d21-3ce5-4d2a-9558-c0bbbb238904/linked_in_profile",
                description: "Comprehensive foundational knowledge of AWS cloud architecture and services."
            }
        ]
    },
    {
        title: "Backend & Web Development (LinkedIn Learning)",
        icon: <Code className="w-6 h-6 text-blue-400" />,
        certs: [
            {
                name: "Building RESTful APIs in Laravel",
                id: "ff4e2a7af5e890011f6438d0afd780bc5681045f61c43d34b3d15a5a0f70688d",
                description: "Deep understanding of REST architecture, API authentication, and scalable communication."
            },
            {
                name: "Building GraphQL Applications in Laravel",
                id: "e5a3273b995ccf5a7ab28168ea4b77f7ab7930de529fefa5611967f1b89fa61d",
                description: "Strengthened ability to design efficient and flexible GraphQL APIs."
            },
            {
                name: "Advanced Laravel & Building Skills",
                id: "Multi-ID",
                description: "Mastery of backend architecture, authentication systems, and scalable application development."
            },
            {
                name: "HTML Essential Training",
                id: "ARuWlPRBXuqlE4K9Dgl7TbZwJcGu",
                description: "Reinforced understanding of semantic HTML and modern web structure principles."
            }
        ]
    }
];

const Certifications = () => {
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    return (
        <section id="certifications" className="relative w-full min-h-screen bg-slate-950 py-20 md:py-24 overflow-hidden flex flex-col justify-center">

            <CertificationsCanvas />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 relative z-10 w-full mb-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-white">
                        Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">Certifications</span>
                    </h2>
                    <p className="text-slate-400 max-w-3xl mx-auto text-base md:text-lg leading-relaxed mb-6">
                        Validating technical proficiency across cloud infrastructure, backend engineering, and modern web architectures to complement my formal degree.
                    </p>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {certificationCategories.map((category, catIndex) => (
                        <motion.div
                            key={catIndex}
                            initial={{ opacity: 0, x: catIndex === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8 }}
                            className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl"
                        >
                            <div className="flex items-center gap-4 mb-6 md:mb-8">
                                <div className="bg-slate-800 p-2.5 md:p-3 rounded-2xl ring-1 ring-slate-700 shadow-inner shrink-0">
                                    <span className="[&>svg]:w-5 [&>svg]:h-5 md:[&>svg]:w-6 md:[&>svg]:h-6">{category.icon}</span>
                                </div>
                                <h3 className="text-lg md:text-2xl font-bold text-white tracking-tight leading-tight">
                                    {category.title}
                                </h3>
                            </div>

                            <div className="space-y-6">
                                {category.certs.map((cert, certIndex) => (
                                    <div
                                        key={certIndex}
                                        className="group relative bg-slate-800/20 border border-slate-800/50 rounded-2xl p-5 md:p-6 hover:border-blue-500/30 transition-all duration-300"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="text-slate-100 font-bold text-base md:text-lg group-hover:text-blue-400 transition-colors">
                                                {cert.name}
                                            </h4>
                                            {cert.url && (
                                                <a
                                                    href={cert.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-slate-500 hover:text-white transition-colors p-1 shrink-0"
                                                >
                                                    <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                                                </a>
                                            )}
                                        </div>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-2">
                                            {cert.description}
                                        </p>
                                        {cert.id && (
                                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg">
                                                <Award className="w-3 h-3 text-indigo-400" />
                                                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                                                    ID: {cert.id.substring(0, 12)}...
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="max-w-4xl mx-auto px-6 text-center mt-16 z-10"
            >
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
                    <p className="text-slate-300 italic text-sm md:text-base leading-relaxed">
                        "Collectively, these certifications validate my technical proficiency across cloud computing, backend engineering, and web technologies, complementing my professional experience in Laravel, Flutter, and Three.js."
                    </p>
                </div>
            </motion.div>

        </section >
    );
};

export default Certifications;
