import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";

const FloatingConnection = ({ position, color }) => {
    const meshRef = useRef();

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1} position={position}>
            <Sphere ref={meshRef} args={[1, 32, 32]}>
                <MeshDistortMaterial
                    color={color}
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                    transparent
                    opacity={0.3}
                />
            </Sphere>
        </Float>
    );
};

const ContactCanvas = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ antialias: true, alpha: true }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <FloatingConnection position={[-7, 4, -2]} color="#3b82f6" />
                <FloatingConnection position={[7, -4, -2]} color="#8b5cf6" />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950" />
        </div>
    );
};

export default ContactCanvas;
