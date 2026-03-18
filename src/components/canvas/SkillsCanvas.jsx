import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, Preload } from "@react-three/drei";

// Global camera configuration for the 3D grid scene
const CAMERA = { position: [0, 2, 5], fov: 60 };

// WebGL renderer configuration
const GL = {
    antialias: false,       // Off — massive saving on a grid background
    alpha: true,
    powerPreference: "high-performance",
};

// Device Pixel Ratio settings for performance
const DPR = [1, 1.5];

// Performance optimization threshold
const PERF = { min: 0.5 };

// Initial position and rotation for the grid plane
const GRID_ROTATION = [-Math.PI / 2.5, 0, 0];
const GRID_POSITION = [0, -3, -10];

// Component for the animated scrolling technical grid
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
                /* Grid Dimensions: 60x60 units is large enough to cover the view comfortably */
                args={[60, 60]}
                /* Cell size (inner squares) and thickness of the lines */
                cellSize={1}
                cellThickness={0.5}
                cellColor="#1e3a8a"
                /* Section size (larger grid squares, groups of 4x4 cells) */
                sectionSize={4}
                sectionThickness={1}
                sectionColor="#3b82f6"
                /* Fading properties: The grid softly fades as it gets further from the camera */
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
                {/* Global soft light to illuminate the grid evenly */}
                <ambientLight intensity={0.5} />
                <DataGridBackground />
                {/* Pre-fetches all assets to prevent stuttering during initial interaction */}
                <Preload all />
            </Canvas>
        </Suspense>
        {/* Gradient overlays blend the grid into the dark background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)]" />
    </div>
);

export default SkillsCanvas;