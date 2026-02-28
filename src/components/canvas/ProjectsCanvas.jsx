import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Sphere } from "@react-three/drei";

const ConstellationNodes = () => {
    const groupRef = useRef();

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.05;
            groupRef.current.rotation.x += delta * 0.02;
        }
    });

    // Create a simple abstract node structure representing "Connected Architecture"
    return (
        <group ref={groupRef} position={[0, 0, -5]}>
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
                {/* Core Node */}
                <Sphere args={[0.4, 16, 16]} position={[0, 0, 0]}>
                    <meshBasicMaterial color="#3b82f6" />
                </Sphere>
                {/* Orbiting Nodes */}
                <Sphere args={[0.2, 16, 16]} position={[3, 2, -1]}>
                    <meshBasicMaterial color="#8b5cf6" />
                </Sphere>
                <Sphere args={[0.25, 16, 16]} position={[-2, -3, 2]}>
                    <meshBasicMaterial color="#ec4899" />
                </Sphere>
                <Sphere args={[0.15, 16, 16]} position={[2, -2, -2]}>
                    <meshBasicMaterial color="#06b6d4" />
                </Sphere>
                <Sphere args={[0.3, 16, 16]} position={[-3, 1, -1]}>
                    <meshBasicMaterial color="#8b5cf6" />
                </Sphere>

                {/* Connecting Lines */}
                <Line points={[[0, 0, 0], [3, 2, -1]]} color="#3b82f6" transparent opacity={0.3} lineWidth={1} />
                <Line points={[[0, 0, 0], [-2, -3, 2]]} color="#8b5cf6" transparent opacity={0.3} lineWidth={1} />
                <Line points={[[0, 0, 0], [2, -2, -2]]} color="#ec4899" transparent opacity={0.3} lineWidth={1} />
                <Line points={[[0, 0, 0], [-3, 1, -1]]} color="#06b6d4" transparent opacity={0.3} lineWidth={1} />
                <Line points={[[-3, 1, -1], [-2, -3, 2]]} color="#ffffff" transparent opacity={0.1} lineWidth={1} />
                <Line points={[[3, 2, -1], [2, -2, -2]]} color="#ffffff" transparent opacity={0.1} lineWidth={1} />
            </Float>
        </group>
    );
};

const ProjectsCanvas = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ antialias: true, alpha: true }}>
                <ambientLight intensity={1} />
                <ConstellationNodes />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.9)_100%)]" />
        </div>
    );
};

export default ProjectsCanvas;
