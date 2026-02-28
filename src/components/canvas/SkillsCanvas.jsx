import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid } from "@react-three/drei";

const DataGridBackground = () => {
    const gridRef = useRef();

    useFrame((state) => {
        // Slowly move grid towards camera to simulate data flow and structured backend processing
        if (gridRef.current) {
            gridRef.current.position.z = (state.clock.elapsedTime * 0.6) % 3;
        }
    });

    return (
        <group rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -3, -10]}>
            <Grid
                ref={gridRef}
                args={[60, 60]}
                cellSize={1}
                cellThickness={1}
                cellColor="#1e3a8a"
                sectionSize={4}
                sectionThickness={1.5}
                sectionColor="#3b82f6"
                fadeDistance={30}
                fadeStrength={1.5}
            />
        </group>
    );
};

const SkillsCanvas = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
            <Canvas camera={{ position: [0, 2, 5], fov: 60 }} gl={{ antialias: false, alpha: true }}>
                <ambientLight intensity={0.5} />
                <DataGridBackground />
            </Canvas>
            {/* Gradient overlay to blend grid neatly into the background */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)]" />
        </div>
    );
};

export default SkillsCanvas;
