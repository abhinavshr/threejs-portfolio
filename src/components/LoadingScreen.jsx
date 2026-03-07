import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Prevent scrolling while loading
        document.body.style.overflow = "hidden";

        const duration = 2500; // 2.5 seconds total
        let animationFrameId;
        let startTime = null;

        const animateProgress = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;

            // Calculate progress (0 to 1)
            const p = Math.min(elapsed / duration, 1);

            // Custom easeOutQuart function: 1 - (1 - x)^4 for very smooth deceleration
            const easeOutProgress = 1 - Math.pow(1 - p, 4);
            const currentPercentage = Math.min(Math.round(easeOutProgress * 100), 100);

            setProgress(currentPercentage);

            if (p < 1) {
                animationFrameId = requestAnimationFrame(animateProgress);
            } else {
                setTimeout(() => {
                    document.body.style.overflow = "unset";
                    onComplete();
                }, 400); // slightly longer pause at 100% for user to see it
            }
        };

        animationFrameId = requestAnimationFrame(animateProgress);

        return () => {
            cancelAnimationFrame(animationFrameId);
            document.body.style.overflow = "unset";
        };
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-[#030303] flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Background Blobs for that subtle dark space glow resembling the reference image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-[90%] -translate-y-[60%] w-[60vw] sm:w-[500px] h-[60vw] sm:h-[500px] bg-purple-900/15 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/2 w-[55vw] sm:w-[450px] h-[55vw] sm:h-[450px] bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

            <div className="relative z-10 flex flex-col items-center w-full max-w-[280px] sm:max-w-sm">
                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-white text-lg sm:text-xl md:text-2xl font-semibold mb-1 tracking-wide"
                >
                    Abhinav Shrestha
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="text-slate-400 text-[11px] sm:text-xs tracking-[0.2em] mb-8 uppercase"
                >
                    Loading Portfolio...
                </motion.p>

                {/* Progress track */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden mb-3 relative origin-left"
                >
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                        style={{ width: `${progress}%` }}
                    />
                </motion.div>

                {/* Percentage text */}
                <motion.div
                    className="text-slate-500 text-[10px] sm:text-xs font-mono font-medium tracking-widest"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                >
                    {progress}%
                </motion.div>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
