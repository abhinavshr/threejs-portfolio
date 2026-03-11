import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls, Stars, Preload } from "@react-three/drei";
import * as THREE from "three";

const GlitchSphere = () => {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.2;
      meshRef.current.rotation.z = time * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#3b82f6"
          attach="material"
          distort={0.4}
          speed={3}
          roughness={0.2}
          metalness={0.8}
          emissive="#1e40af"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
};

const OfflineCanvas = () => {
  return (
    <div className="w-full h-screen absolute inset-0 z-0">
      <Suspense fallback={null}>
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          camera={{ position: [0, 0, 5], fov: 50 }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#60a5fa" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#f87171" />
          <spotLight position={[5, 5, 5]} angle={0.25} penumbra={1} intensity={2} castShadow />
          
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          <GlitchSphere />
          
          {/* Subdued background to maintain contrast */}
          <mesh position={[0, 0, -5]}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#020617" />
          </mesh>

          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate 
            autoRotateSpeed={0.5} 
          />
          <Preload all />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default OfflineCanvas;
