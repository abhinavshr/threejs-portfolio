import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Text, Sparkles, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const LogoMesh = () => {
    const meshRef = useRef();
    const groupRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.y = Math.sin(t * 0.5) * 0.3;
            meshRef.current.rotation.x = Math.cos(t * 0.3) * 0.2;
        }
        if (groupRef.current) {
            groupRef.current.rotation.z = t * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Background 3D Pill */}
            <mesh ref={meshRef}>
                <torusKnotGeometry args={[0.6, 0.2, 128, 32]} />
                <MeshDistortMaterial
                    color="#6366f1"
                    speed={2}
                    distort={0.4}
                    roughness={0}
                    metalness={1}
                    emissive="#3b82f6"
                    emissiveIntensity={0.8}
                />
            </mesh>

            {/* Floating Particles Around Logo */}
            <Sparkles count={40} scale={2} size={2} speed={0.4} color="#60a5fa" />

            {/* Glowing Text "AS" */}
            <Text
                position={[0, 0, 0.2]}
                fontSize={0.5}
                color="white"
                font="https://fonts.gstatic.com/s/outfit/v11/Q_Lp9p5mX97wRCO669Lp.woff"
                anchorX="center"
                anchorY="middle"
                depthOffset={-1}
            >
                AS
            </Text>
        </group>
    );
};

const NavbarLogoCanvas = () => {
    return (
        <div className="w-14 h-14 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 4], fov: 40 }} alpha={true}>
                <ambientLight intensity={0.7} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#60a5fa" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#8b5cf6" />
                <spotLight position={[5, 5, 5]} angle={0.2} penumbra={1} intensity={2} color="#ffffff" />

                <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                    <LogoMesh />
                </Float>
            </Canvas>
        </div>
    );
};

export default NavbarLogoCanvas;
