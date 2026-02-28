import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Sphere, MeshDistortMaterial, Text } from "@react-three/drei";

const CoreShape = () => {
    const groupRef = useRef();

    useFrame((state, delta) => {
        groupRef.current.rotation.y += delta * 0.15;
        groupRef.current.rotation.x += delta * 0.1;
    });

    return (
        <group ref={groupRef}>
            {/* Inner distorted sphere representing dynamic core logic */}
            <Sphere args={[1.2, 64, 64]}>
                <MeshDistortMaterial
                    color="#1e3a8a" // deep blue
                    attach="material"
                    distort={0.4}
                    speed={1.5}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>

            {/* Outer wireframe sphere indicating "structure & architecture" */}
            <Sphere args={[1.7, 32, 32]}>
                <meshStandardMaterial color="#3b82f6" wireframe transparent opacity={0.3} />
            </Sphere>

            {/* Outer geometric frame for "security & scalable" bounds */}
            <Sphere args={[2.0, 12, 12]}>
                <meshStandardMaterial color="#8b5cf6" wireframe transparent opacity={0.15} />
            </Sphere>

            {/* Orbiting text highlighting core values */}
            <Float speed={2} rotationIntensity={0} floatIntensity={0.5} position={[1.5, 1.2, 0]}>
                <Text
                    fontSize={0.3}
                    font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
                    color="#60a5fa"
                    anchorX="center"
                    anchorY="middle"
                >
                    Structured
                </Text>
            </Float>
            <Float speed={2.5} rotationIntensity={0} floatIntensity={0.5} position={[-1.7, -1.0, 0.5]}>
                <Text
                    fontSize={0.25}
                    font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
                    color="#c084fc"
                    anchorX="center"
                    anchorY="middle"
                >
                    Secure
                </Text>
            </Float>
            <Float speed={1.5} rotationIntensity={0} floatIntensity={0.5} position={[0, -2.0, 1]}>
                <Text
                    fontSize={0.3}
                    font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
                    color="#93c5fd"
                    anchorX="center"
                    anchorY="middle"
                >
                    Scalable
                </Text>
            </Float>
        </group>
    );
};

const AboutCoreCanvas = () => {
    return (
        <div className="w-full h-[400px] lg:h-full min-h-[400px] relative">
            {/* Subtle glow behind the 3D shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />

            <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ antialias: true, alpha: true }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
                <directionalLight position={[-10, -10, -5]} intensity={1} color="#8b5cf6" />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                    <CoreShape />
                </Float>

                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
            </Canvas>
        </div>
    );
};

export default AboutCoreCanvas;
