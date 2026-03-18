import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial, Preload } from "@react-three/drei";

// ── Canvas config constants — stable R3F references ───────────────────────────
const CAMERA   = { position: [0, 0, 10], fov: 60 };
const GL       = { antialias: false, alpha: true, powerPreference: "high-performance" };
const DPR      = [1, 1.5];
const PERF     = { min: 0.5 };

// ── Directional light position — stable array ─────────────────────────────────
const DIR_LIGHT_POS = [10, 10, 5];

// ── Icosahedron geometry args — stable, shared across all badges ──────────────
// All badges use the same args [1, 0] so one array reference works for all.
const ICO_ARGS = [1, 0];

// ── Float props — stable per-badge objects (defined once) ─────────────────────
const FLOAT_BASE = { rotationIntensity: 0.5, floatIntensity: 1 };

// ── Badge layout data ─────────────────────────────────────────────────────────
const BADGES = [
    { position: [-6,  3, -2], color: "#ff9900", distort: 0.3, speed: 2   },
    { position: [ 6, -3, -1], color: "#3b82f6", distort: 0.5, speed: 1.5 },
    { position: [ 4,  4, -4], color: "#8b5cf6", distort: 0.4, speed: 3   },
    { position: [-5, -4, -3], color: "#10b981", distort: 0.2, speed: 2.5 },
];

/**
 * FloatingBadge Component
 * Renders an icosahedron (abstract badge) with a distortion effect.
 * The shape and color vary per instance defined in the BADGES data.
 */
const FloatingBadge = ({ position, color, distort, speed }) => {
    const meshRef = useRef();

    /**
     * Animation Loop (useFrame)
     * Slowly rotates each individual badge on its axes.
     */
    useFrame((_, delta) => {
        // Slow constant rotation
        meshRef.current.rotation.y += delta * 0.2;
        meshRef.current.rotation.x += delta * 0.1;
    });

    return (
        /* Float: Adds sinusoidal movement (up/down/rotate) to the badge */
        <Float {...FLOAT_BASE} speed={speed} position={position}>
            <Icosahedron ref={meshRef} args={ICO_ARGS}>
                {/* 
                  * MeshDistortMaterial: Creates a 'shimmering' or 'wobbly' effect 
                  * to make the certificate badges feel alive and premium.
                */}
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
    );
};

/**
 * CertificationsCanvas Component
 * The high-level R3F wrapper that renders the cluster of distorted 3D badges.
 */
const CertificationsCanvas = () => (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Suspense fallback={null}>
            <Canvas camera={CAMERA} gl={GL} dpr={DPR} performance={PERF}>
                {/* 
                  * Lighting setup: 
                  * ambientLight for constant brightness, directionalLight for highlights 
                */}
                <ambientLight intensity={0.5} />
                <directionalLight position={DIR_LIGHT_POS} intensity={1} />
                
                {/* Map through Badge layout data to render individual floating nodes */}
                {BADGES.map((b) => (
                    <FloatingBadge key={b.color} {...b} />
                ))}
                
                {/* Forces R3F to pre-compile materials to prevent jank on first scroll */}
                <Preload all />
            </Canvas>
        </Suspense>
        
        {/*
          * Background Overlays:
          * Smoothly transitions the 3D scene into the page background.
        */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.9)_100%)]" />
    </div>
);

export default CertificationsCanvas;