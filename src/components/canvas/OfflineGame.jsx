import React, { useRef, useState, useEffect, Suspense, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Preload } from "@react-three/drei";
import * as THREE from "three";

const Player = ({ position, color }) => {
  const meshRef = useRef();
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.05;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, position.x, 0.2);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -1.5, 0]}>
      <octahedronGeometry args={[0.3, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      <pointLight intensity={1} color={color} />
    </mesh>
  );
};

const ObstacleInstance = ({ data, speedRef, onReset, playerPosition, onCollision, isPlaying }) => {
  const ref = useRef();

  useFrame(() => {
    if (!isPlaying || !ref.current) return;
    
    ref.current.position.z += speedRef.current;
    
    const dx = Math.abs(ref.current.position.x - playerPosition.x);
    const dz = Math.abs(ref.current.position.z - 0);
    
    if (dz < 0.4 && dx < 0.4) {
      onCollision();
    }

    if (ref.current.position.z > 5) {
      onReset();
      ref.current.position.z = -25;
      ref.current.position.x = (Math.random() - 0.5) * 4;
    }
  });

  return (
    <mesh ref={ref} position={[data.x, -1.5, data.z]}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
    </mesh>
  );
};

const OfflineGame = ({ isPlaying, onGameOver, setScore }) => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0 });
  const [obstacles, setObstacles] = useState(() => 
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 4,
      z: -10 - i * 5
    }))
  );
  
  const obstacleSpeed = useRef(0.1);
  const gameActive = useRef(isPlaying);

  // Synchronize game active ref
  useEffect(() => {
    gameActive.current = isPlaying;
  }, [isPlaying]);

  // Handle controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPlaying) return;
      if (e.key === "ArrowLeft") setPlayerPosition(p => ({ x: Math.max(p.x - 0.8, -2) }));
      if (e.key === "ArrowRight") setPlayerPosition(p => ({ x: Math.min(p.x + 0.8, 2) }));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying]);

  const resetObstacle = useCallback((id) => {
    setObstacles(prev => prev.map(obs => 
      obs.id === id ? { ...obs, x: (Math.random() - 0.5) * 4, z: -25 } : obs
    ));
    if (gameActive.current) {
      setScore(s => s + 1);
      obstacleSpeed.current += 0.002;
    }
  }, [setScore]);

  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {isPlaying && (
        <>
          <Player position={playerPosition} color="#3b82f6" />
          {obstacles.map(obs => (
            <ObstacleInstance 
              key={obs.id} 
              data={obs} 
              speedRef={obstacleSpeed} 
              onReset={() => resetObstacle(obs.id)}
              playerPosition={playerPosition}
              onCollision={onGameOver}
              isPlaying={isPlaying}
            />
          ))}
          <gridHelper args={[20, 20, "#1e293b", "#0f172a"]} position={[0, -2, 0]} />
        </>
      )}
    </>
  );
};

const OfflineGameCanvas = ({ isPlaying, onGameOver, setScore }) => {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas shadows camera={{ position: [0, 2, 7], fov: 50 }}>
        <Suspense fallback={null}>
          <OfflineGame 
            isPlaying={isPlaying} 
            onGameOver={onGameOver} 
            setScore={setScore} 
          />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default OfflineGameCanvas;
