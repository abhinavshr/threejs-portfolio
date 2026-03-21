import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Preload } from "@react-three/drei";

// ── Canvas config constants — stable R3F references ───────────────────────────
const CAMERA = { position: [0, 0, 10], fov: 60 };
const GL     = { antialias: false, alpha: true, powerPreference: "high-performance" };
const DPR    = [1, 1.5];
const PERF   = { min: 0.5 };

// ── Directional light position ────────────────────────────────────────────────
const DIR_LIGHT_POS = [10, 10, 5];

// ── Geometry args — shared, stable ───────────────────────────────────────────
const SPHERE_ARGS = [1, 16, 16];

// ── Float props — shared base, stable ────────────────────────────────────────
const FLOAT_PROPS = { speed: 2, rotationIntensity: 0.5, floatIntensity: 1 };

// ── Sphere positions — desktop and mobile variants, defined once ──────────────
// Replaces the useState/useEffect/resize-listener pattern in ContactCanvas.
// CSS handles the visual opacity difference (opacity-10 md:opacity-30).
// The position difference between mobile/desktop is subtle enough that
// two static desktop positions work fine for all viewports — eliminates
// a resize listener, two state allocations, and a useEffect entirely.
const CONNECTIONS = [
    { position: [-7,  4, -2], color: "#3b82f6" },
    { position: [ 7, -4, -2], color: "#8b5cf6" },
];

/**
 * FloatingConnection Component
 * Renders a distorted 3D sphere representing an abstract 'connection'.
 * 
 * @param {Array} position - [x, y, z] coordinates for the sphere.
 * @param {string} color - Hex color for the material.
 */
const FloatingConnection = ({ position, color }) => {
    const meshRef = useRef();

    /**
     * Animation Loop (useFrame)
     * Slowly rotates the sphere on its Y-axis for constant motion.
     */
    useFrame((_, delta) => {
        // Slow constant rotation
        meshRef.current.rotation.y += delta * 0.3;
    });

    return (
        /* Float: R3F helper that adds Sinusoidal floating/wobbling movement */
        <Float {...FLOAT_PROPS} position={position}>
            <Sphere ref={meshRef} args={SPHERE_ARGS}>
                {/* 
                  * MeshDistortMaterial: Creates the 'living' blob effect. 
                  * Distort and Speed parameters control the frequency and intensity 
                  * of the vertex displacement.
                */}
                <MeshDistortMaterial
                    color={color}
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                    transparent
                    opacity={0.3}
                />
            </Sphere>
        </Float>
    );
};

/**
 * ContactCanvas Component
 * The high-level R3F wrapper that renders distorted spheres in the background.
 * Simplified to use static positions for cross-viewport stability.
 */
const ContactCanvas = () => (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-10 md:opacity-30">
        <Suspense fallback={null}>
            <Canvas camera={CAMERA} gl={GL} dpr={DPR} performance={PERF}>
                {/* 
                  * Ambient lighting ensures constant visibility, 
                  * directional lighting creates depth via reflections on the metalness material.
                */}
                <ambientLight intensity={0.5} />
                <directionalLight position={DIR_LIGHT_POS} intensity={1} />
                
                {/* Map through Connection data to render individual floating nodes */}
                {CONNECTIONS.map((c) => (
                    <FloatingConnection key={c.color} {...c} />
                ))}
                
                <Preload all />
            </Canvas>
        </Suspense>
        
        {/* Simple vertical gradient to blend with global dark theme */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950" />
    </div>
);

export default ContactCanvas;