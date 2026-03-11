import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff, RefreshCcw, Gamepad2, Trophy, ArrowLeft, Keyboard } from "lucide-react";
import OfflineCanvas from "./canvas/OfflineCanvas";
import OfflineGameCanvas from "./canvas/OfflineGame";

const Offline = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem("offline_high_score") || "0");
  });
  const [gameOver, setGameOver] = useState(false);

  const handleRetry = () => {
    window.location.reload();
  };

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
  };

  const handleGameOver = () => {
    setIsPlaying(false);
    setGameOver(true);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("offline_high_score", score.toString());
    }
  };

  return (
    <div className="relative w-full h-screen bg-slate-950 flex flex-col items-center justify-center overflow-hidden font-sans">
      {/* Three.js Backgrounds */}
      <AnimatePresence mode="wait">
        {!isPlaying ? (
          <motion.div
            key="bg-normal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <OfflineCanvas />
          </motion.div>
        ) : (
          <motion.div
            key="bg-game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <OfflineGameCanvas 
              isPlaying={isPlaying} 
              onGameOver={handleGameOver} 
              score={score}
              setScore={setScore}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <AnimatePresence mode="wait">
          {!isPlaying && !gameOver && (
            <motion.div
              key="message"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-slate-900/40 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl inline-block"
            >
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                  <WifiOff className="w-10 h-10 text-blue-400 animate-pulse" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Off the Grid
              </h1>

              <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
                No internet? No problem. While you wait to reconnect, why not beat your high score?
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRetry}
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-medium transition-colors border border-white/10 group"
                >
                  <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  Retry Connection
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startGame}
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium transition-colors shadow-lg shadow-blue-500/20"
                >
                  <Gamepad2 className="w-5 h-5" />
                  Play 3D Dodge
                </motion.button>
              </div>

              {highScore > 0 && (
                <div className="mt-8 flex items-center justify-center gap-2 text-yellow-500/80">
                  <Trophy className="w-4 h-4" />
                  <span className="text-sm font-medium">Record: {highScore} pts</span>
                </div>
              )}
            </motion.div>
          )}

          {isPlaying && (
            <motion.div
              key="game-ui"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed top-12 left-0 right-0 pointer-events-none"
            >
              <div className="inline-block bg-slate-900/60 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/10">
                <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Current Score</p>
                <p className="text-4xl font-bold text-white tabular-nums">{score}</p>
              </div>
              
              <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 text-slate-500 text-sm">
                <div className="flex items-center gap-2 bg-slate-900/40 px-3 py-1.5 rounded-lg border border-white/5">
                  <Keyboard className="w-4 h-4" />
                  <span>Use Arrows to Move</span>
                </div>
              </div>
            </motion.div>
          )}

          {gameOver && (
            <motion.div
              key="game-over"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900/60 backdrop-blur-xl p-10 rounded-3xl border border-red-500/20 shadow-2xl inline-block"
            >
              <h2 className="text-5xl font-extrabold text-white mb-2">Game Over</h2>
              <p className="text-slate-400 mb-8">You managed to dodge {score} obstacles!</p>
              
              <div className="flex flex-col gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startGame}
                  className="flex items-center justify-center gap-2 px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold shadow-xl shadow-blue-500/30"
                >
                  Try Again
                </motion.button>
                
                <button
                  onClick={() => setGameOver(false)}
                  className="text-slate-500 hover:text-white transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Message
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer hint */}
      {!isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-8 left-0 right-0 text-center"
        >
          <p className="text-slate-600 text-sm uppercase tracking-widest flex items-center justify-center gap-4">
            <span className="w-8 h-px bg-slate-800"></span>
            Offline Mode
            <span className="w-8 h-px bg-slate-800"></span>
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Offline;
