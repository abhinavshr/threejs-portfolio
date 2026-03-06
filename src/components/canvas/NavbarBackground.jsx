import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Preload } from "@react-three/drei";

const BackgroundEffect = () => {
    const meshRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(t * 0.05) * 0.05;
            meshRef.current.rotation.y = Math.cos(t * 0.05) * 0.05;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, -2]}>
            <sphereGeometry args={[5, 32, 32]} />
            <MeshDistortMaterial
                color="#0f172a"
                speed={1}
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
        return Array.from({ length: 10 }, () => ({ // Reduced from 15 to 10
            position: [
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 5
            ],
            color: Math.random() > 0.5 ? "#3b82f6" : "#8b5cf6",
            size: Math.random() * 0.04 + 0.01 // Smaller orbs
        }));
    });

    return (
        <group>
            {orbs.map((orb, i) => (
                <Float key={i} speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                    <mesh position={orb.position}>
                        <sphereGeometry args={[orb.size, 12, 12]} />
                        <meshStandardMaterial color={orb.color} emissive={orb.color} emissiveIntensity={1.5} />
                    </mesh>
                </Float>
            ))}
        </group>
    );
};

const NavbarBackgroundCanvas = () => {
    return (
        <div className="absolute inset-0 -z-10 opacity-60">
            <Suspense fallback={null}>
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 75 }}
                    alpha={true}
                    dpr={[1, 1.5]} // Low dpr for background
                    gl={{ antialias: false }} // No antialias needed for background
                    performance={{ min: 0.5 }}
                >
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
                    <BackgroundEffect />
                    <FloatingOrbs />
                    <Preload all />
                </Canvas>
            </Suspense>
        </div>
    );
};

export default NavbarBackgroundCanvas;
