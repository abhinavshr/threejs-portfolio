import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Cylinder, Torus } from "@react-three/drei";

const AcademicPillar = ({ position, color, scale, speed = 1 }) => {
    const nodeRef = useRef();

    useFrame((state, delta) => {
        if (nodeRef.current) {
            nodeRef.current.rotation.y += delta * 0.4 * speed;
            nodeRef.current.rotation.x += delta * 0.1 * speed;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5} position={position}>
            <group ref={nodeRef} scale={scale}>
                {/* Core Pillar Base */}
                <Cylinder args={[0.5, 0.5, 2, 32]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial color={color} transparent opacity={0.15} wireframe />
                </Cylinder>
                {/* Orbital Rings representing years of study */}
                <Torus args={[0.8, 0.05, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
                    <meshBasicMaterial color={color} transparent opacity={0.6} />
                </Torus>
                <Torus args={[1.1, 0.02, 16, 100]} rotation={[-Math.PI / 4, Math.PI / 8, 0]}>
                    <meshBasicMaterial color={color} transparent opacity={0.3} />
                </Torus>
            </group>
        </Float>
    );
};

const EducationTimelineGroup = () => {
    const groupRef = useRef();

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.05;
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, -3]}>
            {/* Earlier Education Pillar */}
            <AcademicPillar position={[-3, 1, -1]} color="#3b82f6" scale={0.8} speed={0.8} />
            {/* University Degree Pillar */}
            <AcademicPillar position={[3, -1, 1]} color="#8b5cf6" scale={1.2} speed={1.2} />
            {/* Future/Ongoing Development Pillar */}
            <AcademicPillar position={[0, -2, -2]} color="#06b6d4" scale={0.6} speed={1.5} />
        </group>
    );
};

const EducationCanvas = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
            <Canvas camera={{ position: [0, 0, 7], fov: 60 }} gl={{ antialias: true, alpha: true }}>
                <ambientLight intensity={1} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
                <EducationTimelineGroup />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.9)_100%)]" />
        </div>
    );
};

export default EducationCanvas;
