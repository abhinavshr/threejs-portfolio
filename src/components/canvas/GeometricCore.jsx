import { useRef } from "react";
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
    return (
        <div className="w-full h-[50vh] lg:h-full lg:min-h-[600px] z-10 relative">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
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
