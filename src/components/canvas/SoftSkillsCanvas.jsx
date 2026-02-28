import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";

// Generate random points in a sphere to simulate "connected thoughts" and "systems"
const count = 350;
const initialPositions = new Float32Array(count * 3);
for (let i = 0; i < count; i++) {
    const r = 4 + Math.random() * 3;
    const theta = 2 * Math.PI * Math.random();
    const phi = Math.acos(2 * Math.random() - 1);

    initialPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    initialPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    initialPositions[i * 3 + 2] = r * Math.cos(phi);
}

const ParticleSystem = () => {
    const pointsRef = useRef();

    // Use the static pre-calculated array instead of calling Math.random in render mapping
    const positions = initialPositions;

    useFrame((state, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * 0.04;
            pointsRef.current.rotation.x += delta * 0.02;
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
            <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ antialias: false, alpha: true }}>
                <ambientLight intensity={0.5} />
                <ParticleSystem />
            </Canvas>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.9)_100%)]" />
        </div>
    );
};

export default SoftSkillsCanvas;
