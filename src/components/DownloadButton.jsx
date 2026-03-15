import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Check, Loader2 } from "lucide-react";

const DownloadButton = ({ href, fileName }) => {
    const [status, setStatus] = useState("idle"); // idle, downloading, completed

    const handleDownload = () => {
        if (status !== "idle") return;
        
        setStatus("downloading");

        // Simulate download delay for the animation
        setTimeout(() => {
            setStatus("completed");
            
            // Actually trigger the download
            const link = document.createElement("a");
            link.href = href;
            link.download = fileName;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Reset after some time
            setTimeout(() => {
                setStatus("idle");
            }, 3000);
        }, 2000);
    };

    return (
        <button
            onClick={handleDownload}
            disabled={status !== "idle"}
            className={`group relative flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 font-bold rounded-lg transition-all duration-300 overflow-hidden min-w-[240px] ${
                status === "idle" 
                ? "border-slate-700 text-slate-200 hover:border-blue-500 hover:text-white hover:bg-slate-800" 
                : status === "downloading"
                ? "border-blue-500 text-blue-400 cursor-wait"
                : "border-emerald-500 text-emerald-400"
            }`}
        >
            {/* Progress Bar Background */}
            <AnimatePresence>
                {status === "downloading" && (
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, ease: "linear" }}
                        className="absolute inset-0 bg-blue-500/10 origin-left z-0"
                    />
                )}
            </AnimatePresence>

            <div className="relative z-10 flex items-center gap-3">
                <AnimatePresence mode="wait">
                    {status === "idle" && (
                        <motion.div
                            key="idle-icon"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                        </motion.div>
                    )}
                    {status === "downloading" && (
                        <motion.div
                            key="loading-icon"
                            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
                        >
                            <Loader2 className="w-5 h-5 animate-spin" />
                        </motion.div>
                    )}
                    {status === "completed" && (
                        <motion.div
                            key="completed-icon"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                        >
                            <Check className="w-5 h-5" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    <motion.span
                        key={status}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {status === "idle" && "Download Resume"}
                        {status === "downloading" && "Downloading..."}
                        {status === "completed" && "Success!"}
                    </motion.span>
                </AnimatePresence>
            </div>

            {/* Subtle glow effect on success */}
            {status === "completed" && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-emerald-500/5 blur-xl pointer-events-none"
                />
            )}
        </button>
    );
};

export default DownloadButton;
