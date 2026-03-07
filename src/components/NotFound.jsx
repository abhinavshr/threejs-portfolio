import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100 relative overflow-hidden">
            {/* Background ambient lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center text-center px-6"
            >
                <motion.h1
                    className="text-[12rem] md:text-[18rem] font-bold leading-none tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 drop-shadow-sm"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
                >
                    404
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-4 mb-10"
                >
                    <h2 className="text-3xl md:text-5xl font-semibold mb-4 tracking-tight">
                        Lost in Space
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl max-w-md mx-auto">
                        The page you're looking for doesn't exist or has been moved to another universe.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <Link
                        to="/"
                        className="group relative px-8 py-4 bg-white text-slate-950 rounded-full font-medium text-lg flex items-center justify-center gap-2 overflow-hidden transition-transform hover:scale-105"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Home className="w-5 h-5 relative z-10" />
                        <span className="relative z-10">Back to Home</span>
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="px-8 py-4 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-600 rounded-full font-medium text-lg flex items-center justify-center gap-2 transition-all hover:bg-slate-900"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Go Back</span>
                    </button>
                </motion.div>
            </motion.div>

            {/* Floating particles/stars effect (optional micro-animation) */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white rounded-full"
                        style={{
                            width: Math.random() * 4 + 1 + 'px',
                            height: Math.random() * 4 + 1 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.2, 1, 0.2],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default NotFound;
