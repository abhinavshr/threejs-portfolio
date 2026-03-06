import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points, Preload } from "@react-three/drei";

// Pre-compute the static positions outside of the component to avoid impure function calls during render
const particleCount = 250;
const initialPositions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i++) {
    const r = 4 + Math.random() * 3;
    const theta = 2 * Math.PI * Math.random();
    const phi = Math.acos(2 * Math.random() - 1);

    initialPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    initialPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    initialPositions[i * 3 + 2] = r * Math.cos(phi);
}

const ParticleSystem = () => {
    const pointsRef = useRef();

    // Use the statically generated positions array
    const positions = initialPositions;

    useFrame((state, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * 0.03; // Slower, smoother rotation
            pointsRef.current.rotation.x += delta * 0.015;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 6]}>
            <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial transparent color="#8b5cf6" size={0.06} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
            </Points>
        </group>
    );
};

const SoftSkillsCanvas = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            <Suspense fallback={null}>
                <Canvas
                    camera={{ position: [0, 0, 8], fov: 60 }}
                    gl={{
                        antialias: false, // Turn off antialiasing since it's blurred anyway
                        alpha: true,
                        powerPreference: "high-performance"
                    }}
                    dpr={[1, 1.5]} // Limit pixel ratio to prevent heavy computation
                    performance={{ min: 0.5 }}
                >
                    <ambientLight intensity={0.5} />
                    <ParticleSystem />
                    <Preload all />
                </Canvas>
            </Suspense>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.9)_100%)]" />
        </div>
    );
};

export default SoftSkillsCanvas;
