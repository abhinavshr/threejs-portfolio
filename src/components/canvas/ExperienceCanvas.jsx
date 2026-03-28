import { useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { useTheme } from "../../context/ThemeContext";

const PARTICLE_COUNT = 150;
const POSITIONS = new Float32Array(PARTICLE_COUNT * 3);
const SPEEDS = new Float32Array(PARTICLE_COUNT);

for (let i = 0; i < PARTICLE_COUNT; i++) {
    POSITIONS[i * 3] = (Math.random() - 0.5) * 15;
    POSITIONS[i * 3 + 1] = (Math.random() - 0.5) * 20;
    POSITIONS[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;
    SPEEDS[i] = Math.random() * 0.03 + 0.01;
}

const CAMERA = { position: [0, 0, 10], fov: 60 };
const GL = { antialias: false, alpha: true, powerPreference: "high-performance" };
const DPR = [1, 1.5];
const PERF = { min: 0.5 };

const AscendingParticles = ({ isDark }) => {
    const pointsRef = useRef();

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
        const pos = pointsRef.current.geometry.attributes.position.array;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            pos[i * 3 + 1] += SPEEDS[i];
            if (pos[i * 3 + 1] > 10) {
                pos[i * 3 + 1] = -10;
            }
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
        
        // Base rotation
        const baseRotation = state.clock.elapsedTime * 0.03;
        
        // Interactive mouse rotation offset
        const targetX = mousePos.current.y * 0.2;
        const targetY = mousePos.current.x * 0.2;

        pointsRef.current.rotation.x += (targetX - pointsRef.current.rotation.x) * 0.05;
        pointsRef.current.rotation.y = baseRotation + (targetY - pointsRef.current.rotation.y) * 0.05;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={PARTICLE_COUNT}
                    array={POSITIONS}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                color={isDark ? "#34d399" : "#059669"}
                transparent
                opacity={isDark ? 0.6 : 0.8}
                sizeAttenuation
            />
        </points>
    );
};

const ExperienceCanvas = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50 transition-opacity duration-1000">
            <Suspense fallback={null}>
                <Canvas camera={CAMERA} gl={GL} dpr={DPR} performance={PERF}>
                    <ambientLight intensity={1} />
                    <AscendingParticles isDark={isDark} />
                    <Preload all />
                </Canvas>
            </Suspense>
            
            <div className={`absolute inset-0 bg-gradient-to-b ${isDark ? 'from-slate-950 to-slate-950' : 'from-slate-50 to-slate-50'} via-transparent transition-colors duration-700`} />
            <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,${isDark ? 'rgba(2,6,23,0.9)' : 'rgba(248,250,252,0.9)'}_100%)] transition-colors duration-700`} />
        </div>
    );
};

export default ExperienceCanvas;