import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, Preload } from "@react-three/drei";

// ── Camera config outside component — stable object reference ─────────────────
const CAMERA = { position: [0, 2, 5], fov: 60 };

// ── GL config outside component — never recreated ─────────────────────────────
const GL = {
    antialias: false,       // Off — massive saving on a grid background
    alpha: true,
    powerPreference: "high-performance",
};

// ── DPR bounds — low ceiling for a background canvas ─────────────────────────
const DPR = [1, 1.5];

// ── Performance hint ──────────────────────────────────────────────────────────
const PERF = { min: 0.5 };

// ── Grid group rotation — computed once, not inline ──────────────────────────
const GRID_ROTATION = [-Math.PI / 2.5, 0, 0];
const GRID_POSITION = [0, -3, -10];

const DataGridBackground = () => {
    const gridRef = useRef();

    useFrame((state) => {
        // Modulo keeps z in [0, 3) without ever growing the float — avoids
        // precision loss that would accumulate with += over a long session.
        gridRef.current.position.z = (state.clock.elapsedTime * 0.4) % 3;
    });

    return (
        <group rotation={GRID_ROTATION} position={GRID_POSITION}>
            <Grid
                ref={gridRef}
                args={[60, 60]}
                cellSize={1}
                cellThickness={0.5}
                cellColor="#1e3a8a"
                sectionSize={4}
                sectionThickness={1}
                sectionColor="#3b82f6"
                fadeDistance={25}
                fadeStrength={1}
            />
        </group>
    );
};

const SkillsCanvas = () => (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <Suspense fallback={null}>
            <Canvas
                camera={CAMERA}
                gl={GL}
                dpr={DPR}
                performance={PERF}
            >
                <ambientLight intensity={0.5} />
                <DataGridBackground />
                <Preload all />
            </Canvas>
        </Suspense>
        {/* Gradient overlays blend the grid into the dark background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)]" />
    </div>
);

export default SkillsCanvas;