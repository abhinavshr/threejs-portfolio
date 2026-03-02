import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const BackgroundEffect = () => {
    const meshRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
            meshRef.current.rotation.y = Math.cos(t * 0.1) * 0.1;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, -2]}>
            <sphereGeometry args={[5, 64, 64]} />
            <MeshDistortMaterial
                color="#0f172a"
                speed={1.5}
                distort={0.2}
                roughness={0.5}
                metalness={0.8}
                opacity={0.3}
                transparent
            />
        </mesh>
    );
};

const FloatingOrbs = () => {
    const [orbs] = useState(() => {
        return Array.from({ length: 15 }, () => ({
            position: [
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 5
            ],
            color: Math.random() > 0.5 ? "#3b82f6" : "#8b5cf6",
            size: Math.random() * 0.05 + 0.02
        }));
    });

    return (
        <group>
            {orbs.map((orb, i) => (
                <Float key={i} speed={2} rotationIntensity={1} floatIntensity={1}>
                    <mesh position={orb.position}>
                        <sphereGeometry args={[orb.size, 16, 16]} />
                        <meshStandardMaterial color={orb.color} emissive={orb.color} emissiveIntensity={2} />
                    </mesh>
                </Float>
            ))}
        </group>
    );
};

const NavbarBackgroundCanvas = () => {
    return (
        <div className="absolute inset-0 -z-10 opacity-60">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }} alpha={true}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
                <BackgroundEffect />
                <FloatingOrbs />
            </Canvas>
        </div>
    );
};

export default NavbarBackgroundCanvas;
