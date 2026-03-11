import React from "react";
import { motion } from "framer-motion";
import { WifiOff, RefreshCcw } from "lucide-react";
import OfflineCanvas from "./canvas/OfflineCanvas";

const Offline = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="relative w-full h-screen bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
      {/* Three.js Background */}
      <OfflineCanvas />

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-slate-900/40 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl inline-block"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
              <WifiOff className="w-10 h-10 text-blue-400 animate-pulse" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent"
          >
            Connection Lost
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-slate-400 text-lg mb-8 max-w-md mx-auto"
          >
            It looks like you've drifted off the grid. Check your internet connection and try again.
          </motion.p>

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRetry}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium transition-colors shadow-lg shadow-blue-500/20 mx-auto group"
          >
            <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Retry Connection
          </motion.button>
        </motion.div>
      </div>

      {/* Footer hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-0 right-0 text-center"
      >
        <p className="text-slate-600 text-sm uppercase tracking-widest">
          Offline Mode
        </p>
      </motion.div>
    </div>
  );
};

export default Offline;
