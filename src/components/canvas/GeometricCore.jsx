import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Sphere, MeshDistortMaterial, Edges, Wireframe } from "@react-three/drei";
import * as THREE from "three";

const CoreShape = () => {
    const groupRef = useRef();

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.x += delta * 0.2;
            groupRef.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Inner glowing core */}
            <Sphere args={[1.2, 32, 32]}>
                <MeshDistortMaterial
                    color="#3b82f6" // Electric blue
                    emissive="#60a5fa"
                    emissiveIntensity={2}
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
                    color="#8b5cf6" // Soft purple
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
                <torusGeometry args={[3, 0.05, 16, 100]} />
                <meshStandardMaterial
                    color="#2dd4bf"
                    emissive="#2dd4bf"
                    emissiveIntensity={1}
                    transparent
                    opacity={0.6}
                />
            </mesh>

            <mesh rotation={[0, Math.PI / 3, 0]}>
                <torusGeometry args={[3.2, 0.02, 16, 100]} />
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
        handleResize(); // Initial call

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="w-full h-full z-10 relative">
            <Canvas
                camera={{ position: cameraPosition, fov: 45 }}
                key={cameraPosition.join(",")} // Force re-render camera if needed, or better just use the prop
                gl={{ antialias: true, alpha: true }}
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
            </Canvas>
        </div>
    );
};

export default GeometricCoreCanvas;
