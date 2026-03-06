import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial, Preload } from "@react-three/drei";

const FloatingBadge = ({ position, color, distort, speed }) => {
    const meshRef = useRef();

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.2;
            meshRef.current.rotation.x += delta * 0.1;
        }
    });

    return (
        <Float speed={speed} rotationIntensity={0.5} floatIntensity={1} position={position}>
            <Icosahedron ref={meshRef} args={[1, 0]}>
                <MeshDistortMaterial
                    color={color}
                    distort={distort}
                    speed={speed}
                    roughness={0.2}
                    metalness={0.8}
                    transparent
                    opacity={0.4}
                />
            </Icosahedron>
        </Float>
    );
};

const CertificationsCanvas = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            <Suspense fallback={null}>
                <Canvas
                    camera={{ position: [0, 0, 10], fov: 60 }}
                    gl={{
                        antialias: false, // Turn off antialiasing for blurred backgrounds to save GPU
                        alpha: true,
                        powerPreference: "high-performance"
                    }}
                    dpr={[1, 1.5]} // Cap display ratio to stop 4K screens from rendering huge background resolutions
                    performance={{ min: 0.5 }}
                >
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />

                    <FloatingBadge position={[-6, 3, -2]} color="#ff9900" distort={0.3} speed={2} />
                    <FloatingBadge position={[6, -3, -1]} color="#3b82f6" distort={0.5} speed={1.5} />
                    <FloatingBadge position={[4, 4, -4]} color="#8b5cf6" distort={0.4} speed={3} />
                    <FloatingBadge position={[-5, -4, -3]} color="#10b981" distort={0.2} speed={2.5} />
                    <Preload all />
                </Canvas>
            </Suspense>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.9)_100%)]" />
        </div>
    );
};

export default CertificationsCanvas;
