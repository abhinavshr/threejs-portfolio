import { useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, Preload } from "@react-three/drei";
import { useTheme } from "../../context/ThemeContext";

const CAMERA = { position: [0, 2, 5], fov: 60 };
const GL = {
    antialias: false,
    alpha: true,
    powerPreference: "high-performance",
};
const DPR = [1, 1.5];
const PERF = { min: 0.5 };

const GRID_ROTATION = [-Math.PI / 2.5, 0, 0];
const GRID_POSITION = [0, -3, -10];

const DataGridBackground = ({ isDark }) => {
    const gridRef = useRef();
    const groupRef = useRef();

    const mousePos = useRef({ x: 0, y: 0 });
    useEffect(() => {
        const handleMouseMove = (e) => {
            mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame((state) => {
        // Continuous scrolling
        gridRef.current.position.z = (state.clock.elapsedTime * 0.4) % 3;

        // Interactive tilting
        const targetX = mousePos.current.y * 0.1;
        const targetY = mousePos.current.x * 0.1;

        groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
        groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
    });

    return (
        <group ref={groupRef}>
            <group rotation={GRID_ROTATION} position={GRID_POSITION}>
                <Grid
                    ref={gridRef}
                    args={[60, 60]}
                    cellSize={1}
                    cellThickness={0.5}
                    cellColor={isDark ? "#1e3a8a" : "#93c5fd"}
                    sectionSize={4}
                    sectionThickness={1}
                    sectionColor={isDark ? "#3b82f6" : "#2563eb"}
                    fadeDistance={25}
                    fadeStrength={1}
                />
            </group>
        </group>
    );
};

const SkillsCanvas = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50 md:opacity-70 transition-opacity duration-1000">
            <Suspense fallback={null}>
                <Canvas
                    camera={CAMERA}
                    gl={GL}
                    dpr={DPR}
                    performance={PERF}
                >
                    <ambientLight intensity={0.5} />
                    <DataGridBackground isDark={isDark} />
                    <Preload all />
                </Canvas>
            </Suspense>
            
            <div className={`absolute inset-0 bg-gradient-to-b ${isDark ? 'from-slate-950 to-slate-950' : 'from-slate-50 to-slate-50'} via-transparent transition-colors duration-700`} />
            <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,${isDark ? 'rgba(2,6,23,0.8)' : 'rgba(248,250,252,0.8)'}_100%)] transition-colors duration-700`} />
        </div>
    );
};

export default SkillsCanvas;