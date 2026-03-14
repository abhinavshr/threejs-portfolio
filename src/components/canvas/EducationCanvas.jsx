import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Cylinder, Torus, Preload } from "@react-three/drei";

// ── Canvas config constants — stable references, never recreated by R3F ───────
const CAMERA = { position: [0, 0, 7], fov: 60 };
const GL     = { antialias: true, alpha: true, powerPreference: "high-performance" };
const DPR    = [1, 1.5];
const PERF   = { min: 0.5 };

// ── Directional light position — stable array ─────────────────────────────────
const DIR_LIGHT_POS = [10, 10, 5];

// ── AcademicPillar geometry args — stable arrays, defined once ────────────────
const CYLINDER_ARGS = [0.5, 0.5, 2, 16];
const TORUS_A_ARGS  = [0.8, 0.05, 12, 48];
const TORUS_B_ARGS  = [1.1, 0.02, 12, 48];

// ── Rotation constants ────────────────────────────────────────────────────────
const CYLINDER_ROTATION = [Math.PI / 2, 0, 0];
const TORUS_A_ROTATION  = [Math.PI / 3, 0, 0];
const TORUS_B_ROTATION  = [-Math.PI / 4, Math.PI / 8, 0];

// ── Float props — stable objects per pillar (defined outside to avoid
//    @react-three/drei re-parsing them every render) ──────────────────────────
const FLOAT_PROPS = { speed: 1.5, rotationIntensity: 0.2, floatIntensity: 0.5 };

// ── Pillar layout data — position/color/scale/speed defined once ──────────────
const PILLARS = [
    { position: [-3,  1, -1], color: "#3b82f6", scale: 0.8, speed: 0.8 },
    { position: [ 3, -1,  1], color: "#8b5cf6", scale: 1.2, speed: 1.2 },
    { position: [ 0, -2, -2], color: "#06b6d4", scale: 0.6, speed: 1.5 },
];

const GROUP_POSITION = [0, 0, -3];

// ── AcademicPillar ────────────────────────────────────────────────────────────

const AcademicPillar = ({ position, color, scale, speed }) => {
    const nodeRef = useRef();

    useFrame((_, delta) => {
        nodeRef.current.rotation.y += delta * 0.4 * speed;
        nodeRef.current.rotation.x += delta * 0.1 * speed;
    });

    return (
        <Float {...FLOAT_PROPS} position={position}>
            <group ref={nodeRef} scale={scale}>
                <Cylinder args={CYLINDER_ARGS} rotation={CYLINDER_ROTATION}>
                    <meshStandardMaterial color={color} transparent opacity={0.15} wireframe />
                </Cylinder>
                <Torus args={TORUS_A_ARGS} rotation={TORUS_A_ROTATION}>
                    <meshBasicMaterial color={color} transparent opacity={0.6} />
                </Torus>
                <Torus args={TORUS_B_ARGS} rotation={TORUS_B_ROTATION}>
                    <meshBasicMaterial color={color} transparent opacity={0.3} />
                </Torus>
            </group>
        </Float>
    );
};

// ── EducationTimelineGroup ────────────────────────────────────────────────────

const EducationTimelineGroup = () => {
    const groupRef = useRef();

    useFrame((_, delta) => {
        groupRef.current.rotation.y += delta * 0.05;
    });

    return (
        <group ref={groupRef} position={GROUP_POSITION}>
            {PILLARS.map((p) => (
                <AcademicPillar key={p.color} {...p} />
            ))}
        </group>
    );
};

// ── EducationCanvas ───────────────────────────────────────────────────────────

const EducationCanvas = () => (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <Suspense fallback={null}>
            <Canvas camera={CAMERA} gl={GL} dpr={DPR} performance={PERF}>
                <ambientLight intensity={1} />
                <directionalLight position={DIR_LIGHT_POS} intensity={1.5} color="#ffffff" />
                <EducationTimelineGroup />
                <Preload all />
            </Canvas>
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.9)_100%)]" />
    </div>
);

export default EducationCanvas;