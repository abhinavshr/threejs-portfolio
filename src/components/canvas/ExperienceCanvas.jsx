import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload } from "@react-three/drei";

// ── Pre-computed particle data — runs once at module load ─────────────────────
const PARTICLE_COUNT = 150;
const POSITIONS = new Float32Array(PARTICLE_COUNT * 3);
const SPEEDS = new Float32Array(PARTICLE_COUNT);

for (let i = 0; i < PARTICLE_COUNT; i++) {
    POSITIONS[i * 3] = (Math.random() - 0.5) * 15;       // x
    POSITIONS[i * 3 + 1] = (Math.random() - 0.5) * 20;       // y
    POSITIONS[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;   // z
    SPEEDS[i] = Math.random() * 0.03 + 0.01;
}

// ── Canvas config constants — stable references for R3F ──────────────────────
const CAMERA = { position: [0, 0, 10], fov: 60 };
const GL = { antialias: false, alpha: true, powerPreference: "high-performance" };
const DPR = [1, 1.5];
const PERF = { min: 0.5 };

// ── AscendingParticles ────────────────────────────────────────────────────────

const AscendingParticles = () => {
    const pointsRef = useRef();

    useFrame((state) => {
        const pos = pointsRef.current.geometry.attributes.position.array;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            pos[i * 3 + 1] += SPEEDS[i];
            // Wrap particle back to bottom when it exits the top
            if (pos[i * 3 + 1] > 10) pos[i * 3 + 1] = -10;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
        // Use elapsedTime directly — avoids accumulating floating-point drift
        pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={PARTICLE_COUNT}
                    array={POSITIONS}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                color="#34d399"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
};

// ── ExperienceCanvas ──────────────────────────────────────────────────────────

const ExperienceCanvas = () => (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Suspense fallback={null}>
            <Canvas camera={CAMERA} gl={GL} dpr={DPR} performance={PERF}>
                <ambientLight intensity={1} />
                <AscendingParticles />
                <Preload all />
            </Canvas>
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.9)_100%)]" />
    </div>
);

export default ExperienceCanvas;