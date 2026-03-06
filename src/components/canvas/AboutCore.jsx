import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Sphere, MeshDistortMaterial, Text, Preload } from "@react-three/drei";

const CoreShape = () => {
    const groupRef = useRef();

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.12; // Slightly slower for elegance
            groupRef.current.rotation.x += delta * 0.08;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Inner distorted sphere representing dynamic core logic */}
            <Sphere args={[1.2, 32, 32]}> {/* Reduced segments from 64 to 32 */}
                <MeshDistortMaterial
                    color="#1e3a8a"
                    distort={0.4}
                    speed={1.5}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>

            {/* Outer wireframe sphere indicating "structure & architecture" */}
            <Sphere args={[1.7, 24, 24]}> {/* Reduced segments */}
                <meshStandardMaterial color="#3b82f6" wireframe transparent opacity={0.3} />
            </Sphere>

            {/* Outer geometric frame for "security & scalable" bounds */}
            <Sphere args={[2.0, 10, 10]}> {/* Reduced segments */}
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
        <div className="w-full h-[300px] md:h-[450px] lg:h-full min-h-[300px] md:min-h-[450px] relative">
            {/* Subtle glow behind the 3D shape (Optimized with radial gradient) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-[radial-gradient(circle,rgba(168,85,247,0.15)_0%,transparent_50%)] rounded-full pointer-events-none" />

            <Suspense fallback={null}>
                <Canvas
                    camera={{ position: [0, 0, 7], fov: 45 }}
                    gl={{
                        antialias: true,
                        alpha: true,
                        powerPreference: "high-performance"
                    }}
                    dpr={[1, 2]} // Cap pixel ratio
                    performance={{ min: 0.5 }}
                    style={{ touchAction: 'none' }}
                >
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
                    <directionalLight position={[-10, -10, -5]} intensity={1} color="#8b5cf6" />

                    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                        <CoreShape />
                    </Float>

                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
                    <Preload all />
                </Canvas>
            </Suspense>
        </div>
    );
};

export default AboutCoreCanvas;
