import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Sphere, MeshDistortMaterial, Edges, Preload } from "@react-three/drei";

// Global canvas configuration for React Three Fiber
const CAMERA = { position: [0, 0, 8], fov: 45 };
const GL = { antialias: true, alpha: true, powerPreference: "high-performance" };
const DPR = [1, 2];
const PERF = { min: 0.5 };

// 3D Scene lighting positions
const DIR_LIGHT_POS = [10, 10, 5];
const POINT_LIGHT_1_POS = [-10, -10, -5];
const POINT_LIGHT_2_POS = [0, -5, 5];

// Parameters for 3D geometries
const SPHERE_ARGS = [1.2, 24, 24];
const ICO_ARGS = [2.2, 1];
const TORUS_A_ARGS = [3, 0.05, 12, 64];
const TORUS_B_ARGS = [3.2, 0.02, 12, 64];

// Initial rotations for specific meshes
const TORUS_A_ROTATION = [Math.PI / 4, 0, 0];
const TORUS_B_ROTATION = [0, Math.PI / 3, 0];

// Hover floating animation properties
const FLOAT_PROPS = { speed: 2, rotationIntensity: 1.5, floatIntensity: 2 };

// Camera interaction configuration
const ORBIT_PROPS = { enableZoom: false, enablePan: false, autoRotate: true, autoRotateSpeed: 0.5 };

// Component for the central interactive 3D object

const CoreShape = () => {
    const groupRef = useRef();

    useFrame((_, delta) => {
        groupRef.current.rotation.x += delta * 0.15;
        groupRef.current.rotation.y += delta * 0.2;
    });

    return (
        <group ref={groupRef}>
            {/* Inner glowing core */}
            <Sphere args={SPHERE_ARGS}>
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

            {/* Outer wireframe shell */}
            <mesh>
                <icosahedronGeometry args={ICO_ARGS} />
                <meshStandardMaterial color="#8b5cf6" wireframe transparent opacity={0.3} />
                <Edges linewidth={2} threshold={15} color="#a78bfa" />
            </mesh>

            {/* Orbital rings */}
            <mesh rotation={TORUS_A_ROTATION}>
                <torusGeometry args={TORUS_A_ARGS} />
                <meshStandardMaterial color="#2dd4bf" emissive="#2dd4bf" emissiveIntensity={1} transparent opacity={0.6} />
            </mesh>

            <mesh rotation={TORUS_B_ROTATION}>
                <torusGeometry args={TORUS_B_ARGS} />
                <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.8} transparent opacity={0.4} />
            </mesh>
        </group>
    );
};

// Main Canvas container that renders the 3D scene

const GeometricCoreCanvas = () => (
    <div className="w-full h-full z-10 relative">
        <Suspense fallback={null}>
            <Canvas camera={CAMERA} gl={GL} dpr={DPR} performance={PERF}>
                <ambientLight intensity={0.5} />
                <directionalLight position={DIR_LIGHT_POS} intensity={1} color="#ffffff" />
                <pointLight position={POINT_LIGHT_1_POS} intensity={2} color="#8b5cf6" />
                <pointLight position={POINT_LIGHT_2_POS} intensity={2} color="#3b82f6" />

                <Float {...FLOAT_PROPS}>
                    <CoreShape />
                </Float>

                <OrbitControls {...ORBIT_PROPS} />
                <Preload all />
            </Canvas>
        </Suspense>
    </div>
);

export default GeometricCoreCanvas;