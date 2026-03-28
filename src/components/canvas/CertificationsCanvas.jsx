import { useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial, Preload } from "@react-three/drei";
import { useTheme } from "../../context/ThemeContext";

const CAMERA   = { position: [0, 0, 10], fov: 60 };
const GL       = { antialias: false, alpha: true, powerPreference: "high-performance" };
const DPR      = [1, 1.5];
const PERF     = { min: 0.5 };

const DIR_LIGHT_POS = [10, 10, 5];
const ICO_ARGS = [1, 0];
const FLOAT_BASE = { rotationIntensity: 0.5, floatIntensity: 1 };

const BADGES = [
    { position: [-6,  3, -2], color: "#ff9900", distort: 0.3, speed: 2   },
    { position: [ 6, -3, -1], color: "#3b82f6", distort: 0.5, speed: 1.5 },
    { position: [ 4,  4, -4], color: "#8b5cf6", distort: 0.4, speed: 3   },
    { position: [-5, -4, -3], color: "#10b981", distort: 0.2, speed: 2.5 },
];

const FloatingBadge = ({ position, color, distort, speed, mousePos }) => {
    const meshRef = useRef();
    const floatRef = useRef();

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.2;
            meshRef.current.rotation.x += delta * 0.1;
        }

        if (floatRef.current && mousePos) {
            const targetX = mousePos.current.y * 0.2;
            const targetY = mousePos.current.x * 0.2;
            floatRef.current.rotation.x += (targetX - floatRef.current.rotation.x) * 0.05;
            floatRef.current.rotation.y += (targetY - floatRef.current.rotation.y) * 0.05;
        }
    });

    return (
        <group ref={floatRef}>
            <Float {...FLOAT_BASE} speed={speed} position={position}>
                <Icosahedron ref={meshRef} args={ICO_ARGS}>
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
        </group>
    );
};

const CertificationsCanvas = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const mousePos = useRef({ x: 0, y: 0 });
    useEffect(() => {
        const handleMouseMove = (e) => {
            mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50 md:opacity-70 transition-opacity duration-1000">
            <Suspense fallback={null}>
                <Canvas camera={CAMERA} gl={GL} dpr={DPR} performance={PERF}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={DIR_LIGHT_POS} intensity={1} color={isDark ? "#ffffff" : "#e2e8f0"} />
                    
                    {BADGES.map((b) => (
                        <FloatingBadge key={b.color} {...b} mousePos={mousePos} />
                    ))}
                    
                    <Preload all />
                </Canvas>
            </Suspense>
            
            <div className={`absolute inset-0 bg-gradient-to-b ${isDark ? 'from-slate-950 to-slate-950' : 'from-slate-50 to-slate-50'} via-transparent transition-colors duration-700`} />
            <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,${isDark ? 'rgba(2,6,23,0.9)' : 'rgba(248,250,252,0.9)'}_100%)] transition-colors duration-700`} />
        </div>
    );
};

export default CertificationsCanvas;