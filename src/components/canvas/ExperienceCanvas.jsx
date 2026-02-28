import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const AscendingParticles = () => {
    const pointsRef = useRef();
    const particleCount = 200;

    const [data] = useState(() => {
        const pos = new Float32Array(particleCount * 3);
        const speeds = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            // X and Z are spread out, Y is random height
            pos[i * 3] = (Math.random() - 0.5) * 15; // x
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
            pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5; // z

            // Random speeds for each particle
            speeds[i] = Math.random() * 0.03 + 0.01;
        }

        return { positions: pos, targetSpeeds: speeds };
    });

    const { positions, targetSpeeds } = data;

    useFrame((state) => {
        if (!targetSpeeds || !pointsRef.current) return;

        const currentPositions = pointsRef.current.geometry.attributes.position.array;

        for (let i = 0; i < particleCount; i++) {
            // Move particle up along Y axis
            currentPositions[i * 3 + 1] += targetSpeeds[i];

            // If it goes too high, reset to bottom
            if (currentPositions[i * 3 + 1] > 10) {
                currentPositions[i * 3 + 1] = -10;
            }
        }

        // Mark positions attribute as needing update
        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        // Slight rotation for the whole group
        pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    });

    if (!positions) return null;

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
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
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ antialias: false, alpha: true }}>
                <ambientLight intensity={1} />
                <AscendingParticles />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.9)_100%)]" />
        </div>
    );
};

export default ExperienceCanvas;
