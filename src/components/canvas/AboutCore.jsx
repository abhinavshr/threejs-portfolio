import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Sphere, MeshDistortMaterial, Text, Preload } from "@react-three/drei";

// Global canvas configuration for React Three Fiber
const CAMERA = { position: [0, 0, 7], fov: 45 };
const GL = { antialias: true, alpha: true, powerPreference: "high-performance" };
const DPR = [1, 2];
const PERF = { min: 0.5 };
const STYLE = { touchAction: "none" };

// 3D Scene lighting positions
const DIR_LIGHT_1_POS = [10, 10, 5];
const DIR_LIGHT_2_POS = [-10, -10, -5];

// Parameters for 3D geometries
const SPHERE_INNER_ARGS = [1.2, 32, 32];
const SPHERE_MID_ARGS = [1.7, 24, 24];
const SPHERE_OUTER_ARGS = [2.0, 10, 10];

// Hover floating animation properties
const FLOAT_OUTER = { speed: 2, rotationIntensity: 0.5, floatIntensity: 1 };
// Prevent text tumbling during floating animation
const FLOAT_TEXT_BASE = { rotationIntensity: 0, floatIntensity: 0.5 };

// Camera interaction configuration
const ORBIT_PROPS = { enableZoom: false, enablePan: false, autoRotate: true, autoRotateSpeed: 0.8 };

// URL for the 3D text font
const FONT_URL = "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf";

// Data for the 3D text labels
const LABELS = [
    { text: "Structured", color: "#60a5fa", fontSize: 0.30, position: [1.5, 1.2, 0], speed: 2.0 },
    { text: "Secure", color: "#c084fc", fontSize: 0.25, position: [-1.7, -1.0, 0.5], speed: 2.5 },
    { text: "Scalable", color: "#93c5fd", fontSize: 0.30, position: [0, -2.0, 1], speed: 1.5 },
];

// Component for the central interactive 3D object

const CoreShape = () => {
    const groupRef = useRef();

    useFrame((_, delta) => {
        groupRef.current.rotation.y += delta * 0.12;
        groupRef.current.rotation.x += delta * 0.08;
    });

    return (
        <group ref={groupRef}>
            <Sphere args={SPHERE_INNER_ARGS}>
                <MeshDistortMaterial
                    color="#1e3a8a"
                    distort={0.4}
                    speed={1.5}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>

            <Sphere args={SPHERE_MID_ARGS}>
                <meshStandardMaterial color="#3b82f6" wireframe transparent opacity={0.3} />
            </Sphere>

            <Sphere args={SPHERE_OUTER_ARGS}>
                <meshStandardMaterial color="#8b5cf6" wireframe transparent opacity={0.15} />
            </Sphere>

            {LABELS.map((l) => (
                <Float key={l.text} {...FLOAT_TEXT_BASE} speed={l.speed} position={l.position}>
                    <Text
                        fontSize={l.fontSize}
                        font={FONT_URL}
                        color={l.color}
                        anchorX="center"
                        anchorY="middle"
                    >
                        {l.text}
                    </Text>
                </Float>
            ))}
        </group>
    );
};

// Main Canvas container that renders the 3D scene

const AboutCoreCanvas = () => (
    <div className="w-full h-[300px] md:h-[450px] lg:h-full min-h-[300px] md:min-h-[450px] relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-[radial-gradient(circle,rgba(168,85,247,0.15)_0%,transparent_50%)] rounded-full pointer-events-none" />

        <Suspense fallback={null}>
            <Canvas camera={CAMERA} gl={GL} dpr={DPR} performance={PERF} style={STYLE}>
                <ambientLight intensity={0.6} />
                <directionalLight position={DIR_LIGHT_1_POS} intensity={1.5} color="#ffffff" />
                <directionalLight position={DIR_LIGHT_2_POS} intensity={1} color="#8b5cf6" />

                <Float {...FLOAT_OUTER}>
                    <CoreShape />
                </Float>

                <OrbitControls {...ORBIT_PROPS} />
                <Preload all />
            </Canvas>
        </Suspense>
    </div>
);

export default AboutCoreCanvas;