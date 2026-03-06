import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload } from "@react-three/drei";

// Pre-compute the particle array outside component render
const particleCount = 150; // slightly reduced for performance
const initialPositions = new Float32Array(particleCount * 3);
const initialSpeeds = new Float32Array(particleCount);

for (let i = 0; i < particleCount; i++) {
    // X and Z are spread out, Y is random height
    initialPositions[i * 3] = (Math.random() - 0.5) * 15; // x
    initialPositions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
    initialPositions[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5; // z

    // Random speeds for each particle
    initialSpeeds[i] = Math.random() * 0.03 + 0.01;
}

const AscendingParticles = () => {
    const pointsRef = useRef();

    useFrame((state) => {
        if (!pointsRef.current) return;

        const currentPositions = pointsRef.current.geometry.attributes.position.array;

        for (let i = 0; i < particleCount; i++) {
            // Move particle up along Y axis
            currentPositions[i * 3 + 1] += initialSpeeds[i];

            // If it goes too high, reset to bottom
            if (currentPositions[i * 3 + 1] > 10) {
                currentPositions[i * 3 + 1] = -10;
            }
        }

        // Mark positions attribute as needing update
        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        // Slight rotation for the whole group
        pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03; // slowed slightly
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={initialPositions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                color="#34d399" /* emerald-400 */
                transparent
                opacity={0.6}
                sizeAttenuation={true}
            />
        </points>
    );
};

const ExperienceCanvas = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            <Suspense fallback={null}>
                <Canvas
                    camera={{ position: [0, 0, 10], fov: 60 }}
                    gl={{
                        antialias: false,
                        alpha: true,
                        powerPreference: "high-performance"
                    }}
                    dpr={[1, 1.5]}
                    performance={{ min: 0.5 }}
                >
                    <ambientLight intensity={1} />
                    <AscendingParticles />
                    <Preload all />
                </Canvas>
            </Suspense>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.9)_100%)]" />
        </div>
    );
};

export default ExperienceCanvas;
