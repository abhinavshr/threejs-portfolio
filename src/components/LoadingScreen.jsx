import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Prevent scrolling while loading
        document.body.style.overflow = "hidden";

        // Simulate loading progress
        const duration = 2500; // 2.5 seconds total
        const intervalTime = 20;
        const steps = duration / intervalTime;
        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            // Custom easing function for smooth initial burst and slower end
            const progressValue = 1 - Math.pow(1 - currentStep / steps, 3);
            const nextProgress = Math.min(Math.round(progressValue * 100), 100);
            setProgress(nextProgress);

            if (currentStep >= steps) {
                clearInterval(interval);
                setTimeout(() => {
                    document.body.style.overflow = "unset";
                    onComplete();
                }, 300); // brief pause at 100%
            }
        }, intervalTime);

        return () => {
            clearInterval(interval);
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
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="text-white text-lg sm:text-xl md:text-2xl font-semibold mb-1"
                >
                    Abhinav Shrestha
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-slate-400 text-[11px] sm:text-xs tracking-wider mb-8"
                >
                    Loading Portfolio...
                </motion.p>

                {/* Progress track */}
                <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden mb-3 relative">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Percentage text */}
                <motion.div
                    className="text-slate-500 text-[10px] sm:text-xs font-mono font-medium tracking-widest"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {progress}%
                </motion.div>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
