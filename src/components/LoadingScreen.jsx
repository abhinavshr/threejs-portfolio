import React, { useEffect, useRef, useState } from "react";

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const barRef = useRef(null);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        const duration = 2500;
        const start = performance.now();

        // Update bar via transform (compositor thread, no layout)
        let rafId;
        const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 4);
            if (barRef.current) {
                barRef.current.style.transform = `scaleX(${eased})`;
            }
            if (p < 1) {
                rafId = requestAnimationFrame(tick);
            }
        };
        rafId = requestAnimationFrame(tick);

        // Percentage counter — low-frequency interval, not rAF
        const interval = setInterval(() => {
            const p = Math.min((performance.now() - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 4);
            setProgress(Math.round(eased * 100));
            if (p >= 1) clearInterval(interval);
        }, 50);

        const timeout = setTimeout(() => {
            document.body.style.overflow = "unset";
            onComplete();
        }, duration + 400);

        return () => {
            cancelAnimationFrame(rafId);
            clearInterval(interval);
            clearTimeout(timeout);
            document.body.style.overflow = "unset";
        };
    }, [onComplete]);

    return (
        <div className="loading-root">
            <style>{`
        .loading-root {
          position: fixed; inset: 0; z-index: 9999;
          background: #030303;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          overflow: hidden;
          contain: strict;
          animation: fadeInScreen 0.4s ease both;
        }
        @keyframes fadeInScreen { from { opacity: 0 } to { opacity: 1 } }

        .blob {
          position: absolute; border-radius: 9999px;
          pointer-events: none; mix-blend-mode: screen;
          will-change: transform; transform: translateZ(0);
        }
        .blob-1 {
          top: 50%; left: 50%;
          width: min(60vw, 500px); height: min(60vw, 500px);
          background: rgba(88, 28, 135, 0.15);
          filter: blur(120px);
          translate: -90% -60%;
        }
        .blob-2 {
          top: 50%; left: 50%;
          width: min(55vw, 450px); height: min(55vw, 450px);
          background: rgba(49, 46, 129, 0.10);
          filter: blur(120px);
          translate: -25% -50%;
        }

        .content {
          position: relative; z-index: 10;
          display: flex; flex-direction: column; align-items: center;
          width: 100%; max-width: min(280px, 90vw);
        }
        @media (min-width: 640px) { .content { max-width: 384px; } }

        .title {
          color: #fff;
          font-size: clamp(1rem, 2.5vw, 1.5rem);
          font-weight: 600; letter-spacing: 0.05em;
          margin-bottom: 4px;
          animation: slideUp 0.8s 0.1s cubic-bezier(0.16,1,0.3,1) both;
        }
        .subtitle {
          color: #94a3b8;
          font-size: clamp(10px, 1.5vw, 12px);
          letter-spacing: 0.2em; text-transform: uppercase;
          margin-bottom: 32px;
          animation: slideUp 0.8s 0.3s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes slideUp {
          from { opacity: 0; translate: 0 16px }
          to   { opacity: 1; translate: 0 0 }
        }

        .track {
          width: 100%; height: 3px;
          background: rgba(255,255,255,0.1);
          border-radius: 9999px; overflow: hidden;
          margin-bottom: 12px;
          animation: expandTrack 0.8s 0.4s cubic-bezier(0.16,1,0.3,1) both;
          transform-origin: left;
        }
        @keyframes expandTrack {
          from { opacity: 0; transform: scaleX(0) }
          to   { opacity: 1; transform: scaleX(1) }
        }

        .bar {
          height: 100%;
          background: linear-gradient(to right, #a855f7, #d946ef, #6366f1);
          box-shadow: 0 0 15px rgba(168,85,247,0.5);
          transform-origin: left;
          transform: scaleX(0);
          will-change: transform;
        }

        .pct {
          color: #64748b;
          font-size: clamp(10px, 1.5vw, 12px);
          font-family: ui-monospace, monospace;
          font-weight: 500; letter-spacing: 0.15em;
          animation: fadeIn 0.5s 0.6s ease both;
        }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>

            <div className="blob blob-1" />
            <div className="blob blob-2" />

            <div className="content">
                <h1 className="title">Abhinav Shrestha</h1>
                <p className="subtitle">Loading Portfolio...</p>
                <div className="track">
                    <div className="bar" ref={barRef} />
                </div>
                <span className="pct">{progress}%</span>
            </div>
        </div>
    );
};

export default LoadingScreen;