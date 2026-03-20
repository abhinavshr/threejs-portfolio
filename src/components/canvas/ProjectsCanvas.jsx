// ProjectsCanvas.jsx  ─────────────────────────────────────────────
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Geometry + material created ONCE outside component (module scope)
const sphereGeo = new THREE.SphereGeometry(1, 8, 8); // 8×8 is plenty for bg blobs
const sphereMat = new THREE.MeshBasicMaterial(); // shared, overridden per instance

const NODE_DATA = [
    { pos: [0, 0, 0], color: "#3b82f6", scale: 0.40 },
    { pos: [3, 2, -1], color: "#8b5cf6", scale: 0.20 },
    { pos: [-2, -3, 2], color: "#ec4899", scale: 0.25 },
    { pos: [2, -2, -2], color: "#06b6d4", scale: 0.15 },
    { pos: [-3, 1, -1], color: "#8b5cf6", scale: 0.30 },
];

// Flat array of line pairs [start, end] reused across renders
const LINE_PAIRS = [
    [0, 0, 0, 3, 2, -1],
    [0, 0, 0, -2, -3, 2],
    [0, 0, 0, 2, -2, -2],
    [0, 0, 0, -3, 1, -1],
    [-3, 1, -1, -2, -3, 2],
    [3, 2, -1, 2, -2, -2],
];

/**
 * ConstellationNodes Component
 * Manages the logic for a 3D animated star-constellation background.
 * Uses an instanced mesh for the star nodes and line segments for the connections.
 */
const ConstellationNodes = () => {
    const groupRef = useRef();
    const meshRef = useRef();
    const { invalidate } = useThree();

    /**
     * Side Effect: Matrix & Color initialization
     * Runs once on mount to set properties for each instanced sphere.
     * Instancing allows drawing all 5 nodes in a single draw-call.
     */
    useEffect(() => {
        const mesh = meshRef.current;
        if (!mesh) return;
        const m = new THREE.Matrix4();
        const c = new THREE.Color();
        NODE_DATA.forEach(({ pos, scale, color }, i) => {
            m.makeScale(scale, scale, scale);
            m.setPosition(...pos);
            mesh.setMatrixAt(i, m);
            mesh.setColorAt(i, c.set(color));
        });
        mesh.instanceMatrix.needsUpdate = true;
        mesh.instanceColor.needsUpdate = true;
    }, []);

    /**
     * useMemo Side Effect (Geometry)
     * Builds the BufferGeometry for the connected lines exactly once.
     */
    const linesGeo = useMemo(() => {
        const pts = LINE_PAIRS.flatMap(p => [p[0], p[1], p[2], p[3], p[4], p[5]]);
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
        return g;
    }, []);

    /**
     * useMemo Side Effect (Material)
     * Builds the shared material for the constellation lines.
     */
    const linesMat = useMemo(() =>
        new THREE.LineBasicMaterial({ color: "#3b82f6", transparent: true, opacity: 0.25 }),
        []);

    /**
     * Animation Loop (useFrame)
     * Handles the slow systemic rotation of the constellation.
     * Uses 'demand' rendering (invalidate()) to save CPU/GPU cycles.
     */
    useFrame((_, delta) => {
        if (!groupRef.current) return;
        // Apply slow constant rotation on two axes
        groupRef.current.rotation.y += delta * 0.05;
        groupRef.current.rotation.x += delta * 0.02;
        // Inform the Canvas that a re-render is needed
        invalidate();
    });

    return (
        <group ref={groupRef} position={[0, 0, -5]}>
            {/* The nodes (stars) using InstancedMesh for performance */}
            <instancedMesh ref={meshRef} args={[sphereGeo, sphereMat, NODE_DATA.length]}>
                <meshBasicMaterial vertexColors />
            </instancedMesh>
            {/* The connections (constellation lines) */}
            <lineSegments geometry={linesGeo} material={linesMat} />
        </group>
    );
};

/**
 * ProjectsCanvas Component
 * Sets up the base R3F environment for the constellation background.
 * Optimized for performance using 'demand' frameloop and fixed DPR.
 */
const ProjectsCanvas = () => (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-20 md:opacity-40">
        <Canvas
            frameloop="demand"          // Dramatically reduces energy/resource usage
            camera={{ position: [0, 0, 8], fov: 60 }}
            gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
            dpr={1}                     // No high-DPI scaling needed for background aesthetics
        >
            <ConstellationNodes />
        </Canvas>
        
        {/*
          * Thematic Gradients:
          * Smoothly fade the 3D scene into the page's background colors.
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.9)_100%)]" />
    </div>
);

export default ProjectsCanvas;