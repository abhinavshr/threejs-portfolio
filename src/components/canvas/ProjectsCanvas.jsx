// ProjectsCanvas.jsx  ─────────────────────────────────────────────
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../../context/ThemeContext";

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
const ConstellationNodes = ({ isDark }) => {
    const groupRef = useRef();
    const meshRef = useRef();

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
            mesh.setColorAt(i, c.set(isDark ? color : "#1d4ed8"));
        });
        mesh.instanceMatrix.needsUpdate = true;
        mesh.instanceColor.needsUpdate = true;
    }, [isDark]);

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
        new THREE.LineBasicMaterial({ color: isDark ? "#3b82f6" : "#2563eb", transparent: true, opacity: 0.25 }),
        [isDark]);

    // Track mouse on the window so we don't need pointer events on the canvas wrapper
    const mousePos = useRef({ x: 0, y: 0 });
    useEffect(() => {
        const handleMouseMove = (e) => {
            mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    /**
     * Animation Loop (useFrame)
     * Handles the slow systemic rotation and continuous interactive mouse tracking.
     */
    useFrame((_, delta) => {
        if (!groupRef.current) return;
        
        // Base auto-rotation
        groupRef.current.rotation.y += delta * 0.05;
        groupRef.current.rotation.x += delta * 0.02;

        // Interactive mouse tracking offset
        const targetX = mousePos.current.y * 0.3;
        const targetY = mousePos.current.x * 0.3;

        // Smoothly interpolate current rotation towards target mouse offset
        groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
        groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
    });

    return (
        <group ref={groupRef} position={[0, 0, -5]}>
            <instancedMesh ref={meshRef} args={[sphereGeo, sphereMat, NODE_DATA.length]}>
                <meshBasicMaterial vertexColors />
            </instancedMesh>
            <lineSegments geometry={linesGeo} material={linesMat} />
        </group>
    );
};

/**
 * ProjectsCanvas Component
 * Sets up the base R3F environment for the constellation background.
 */
const ProjectsCanvas = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30 md:opacity-50 transition-opacity duration-1000">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
                dpr={1}
            >
                <ConstellationNodes isDark={isDark} />
            </Canvas>
            
            {/* Thematic Gradients */}
            <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-slate-950 to-slate-950' : 'from-slate-50 to-slate-50'} via-transparent transition-colors duration-700`} />
            <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,${isDark ? 'rgba(2,6,23,0.9)' : 'rgba(248,250,252,0.9)'}_100%)] transition-colors duration-700`} />
        </div>
    );
};

export default ProjectsCanvas;