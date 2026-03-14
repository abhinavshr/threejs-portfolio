import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points, Preload } from "@react-three/drei";

// ── Pre-computed particle positions — runs once at module load, never again ───
const PARTICLE_COUNT = 250;
const POSITIONS = new Float32Array(PARTICLE_COUNT * 3);
for (let i = 0; i < PARTICLE_COUNT; i++) {
    const r     = 4 + Math.random() * 3;
    const theta = 2 * Math.PI * Math.random();
    const phi   = Math.acos(2 * Math.random() - 1);
    POSITIONS[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    POSITIONS[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    POSITIONS[i * 3 + 2] = r * Math.cos(phi);
}

// ── Static group rotation — computed once, not inline ────────────────────────
const GROUP_ROTATION = [0, 0, Math.PI / 6];

// ── Canvas config constants — stable references for R3F ──────────────────────
const CAMERA = { position: [0, 0, 8], fov: 60 };
const GL     = { antialias: false, alpha: true, powerPreference: "high-performance" };
const DPR    = [1, 1.5];
const PERF   = { min: 0.5 };

// ── ParticleSystem ────────────────────────────────────────────────────────────

const ParticleSystem = () => {
    const pointsRef = useRef();

    useFrame((_, delta) => {
        // Destructure delta directly — avoids accessing state.clock on every frame
        pointsRef.current.rotation.y += delta * 0.03;
        pointsRef.current.rotation.x += delta * 0.015;
    });

    return (
        <group rotation={GROUP_ROTATION}>
            <Points ref={pointsRef} positions={POSITIONS} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#8b5cf6"
                    size={0.06}
                    sizeAttenuation
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>
        </group>
    );
};

// ── SoftSkillsCanvas ──────────────────────────────────────────────────────────

const SoftSkillsCanvas = () => (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Suspense fallback={null}>
            <Canvas camera={CAMERA} gl={GL} dpr={DPR} performance={PERF}>
                <ambientLight intensity={0.5} />
                <ParticleSystem />
                <Preload all />
            </Canvas>
        </Suspense>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.9)_100%)]" />
    </div>
);

export default SoftSkillsCanvas;