import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, Preload } from "@react-three/drei";

const DataGridBackground = () => {
    const gridRef = useRef();

    useFrame((state) => {
        // Slowly move grid towards camera to simulate data flow and structured backend processing
        if (gridRef.current) {
            gridRef.current.position.z = (state.clock.elapsedTime * 0.4) % 3; // Slowed down slightly
        }
    });

    return (
        <group rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -3, -10]}>
            <Grid
                ref={gridRef}
                args={[60, 60]} // Size of grid
                cellSize={1} // Base cell size
                cellThickness={0.5} // Thinner cells for performance
                cellColor="#1e3a8a"
                sectionSize={4} // Size of major grid sections
                sectionThickness={1} // Thinner sections
                sectionColor="#3b82f6"
                fadeDistance={25} // Reduced fade distance to draw less geometry
                fadeStrength={1}
            />
        </group>
    );
};

const SkillsCanvas = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
            <Suspense fallback={null}>
                <Canvas
                    camera={{ position: [0, 2, 5], fov: 60 }}
                    gl={{
                        antialias: false, // Turn off antialiasing for grids to save massive performance overhead
                        alpha: true,
                        powerPreference: "high-performance"
                    }}
                    dpr={[1, 1.5]} // Low pixel ratio bounds for grid background
                    performance={{ min: 0.5 }}
                >
                    <ambientLight intensity={0.5} />
                    <DataGridBackground />
                    <Preload all />
                </Canvas>
            </Suspense>
            {/* Gradient overlay to blend grid neatly into the background */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)]" />
        </div>
    );
};

export default SkillsCanvas;
