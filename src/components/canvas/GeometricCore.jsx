import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Sphere, MeshDistortMaterial, Edges, Preload } from "@react-three/drei";
import * as THREE from "three";

const CoreShape = () => {
    const groupRef = useRef();

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.x += delta * 0.15; // Slow down slightly for smoother look
            groupRef.current.rotation.y += delta * 0.2;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Inner glowing core */}
            <Sphere args={[1.2, 24, 24]}> {/* Slightly reduce segments */}
                <MeshDistortMaterial
                    color="#3b82f6"
                    emissive="#60a5fa"
                    emissiveIntensity={1.5}
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>

            {/* Outer technical shell */}
            <mesh>
                <icosahedronGeometry args={[2.2, 1]} />
                <meshStandardMaterial
                    color="#8b5cf6"
                    wireframe
                    transparent
                    opacity={0.3}
                />
                <Edges
                    linewidth={2}
                    threshold={15}
                    color="#a78bfa"
                />
            </mesh>

            {/* Second outer ring */}
            <mesh rotation={[Math.PI / 4, 0, 0]}>
                <torusGeometry args={[3, 0.05, 12, 64]} /> {/* Reduced segments from 16, 100 to 12, 64 */}
                <meshStandardMaterial
                    color="#2dd4bf"
                    emissive="#2dd4bf"
                    emissiveIntensity={1}
                    transparent
                    opacity={0.6}
                />
            </mesh>

            <mesh rotation={[0, Math.PI / 3, 0]}>
                <torusGeometry args={[3.2, 0.02, 12, 64]} /> {/* Reduced segments */}
                <meshStandardMaterial
                    color="#60a5fa"
                    emissive="#60a5fa"
                    emissiveIntensity={0.8}
                    transparent
                    opacity={0.4}
                />
            </mesh>
        </group>
    );
};


const GeometricCoreCanvas = () => {
    const [cameraPosition, setCameraPosition] = useState([0, 0, 8]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setCameraPosition([0, 0, 15]);
            } else if (window.innerWidth < 1024) {
                setCameraPosition([0, 0, 10]);
            } else {
                setCameraPosition([0, 0, 8]);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="w-full h-full z-10 relative">
            <Suspense fallback={null}>
                <Canvas
                    camera={{ position: cameraPosition, fov: 45 }}
                    gl={{
                        antialias: true,
                        alpha: true,
                        powerPreference: "high-performance",
                    }}
                    dpr={[1, 2]} // Performance optimization: cap pixel ratio at 2
                    performance={{ min: 0.5 }} // Allows Three.js to downscale when performance is low
                >
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
                    <pointLight position={[-10, -10, -5]} intensity={2} color="#8b5cf6" />
                    <pointLight position={[0, -5, 5]} intensity={2} color="#3b82f6" />

                    <Float
                        speed={2}
                        rotationIntensity={1.5}
                        floatIntensity={2}
                    >
                        <CoreShape />
                    </Float>

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.5}
                    />
                    <Preload all /> {/* Preload all assets in the scene */}
                </Canvas>
            </Suspense>
        </div>
    );
};

export default GeometricCoreCanvas;
