import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import {
    Stars,
    Float,
    Text,
    Sparkles,
    MeshDistortMaterial,
    TorusKnot,
    Sphere
} from '@react-three/drei';

function AnimatedShapes() {
    return (
        <>
            <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
                <Sphere args={[1, 64, 64]} position={[-3, 1, -2]}>
                    <MeshDistortMaterial
                        color="#4f46e5"
                        attach="material"
                        distort={0.5}
                        speed={2}
                        roughness={0.2}
                        metalness={0.8}
                    />
                </Sphere>
            </Float>

            <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
                <TorusKnot args={[0.8, 0.3, 128, 16]} position={[3, -1, -5]}>
                    <meshStandardMaterial
                        color="#8b5cf6"
                        roughness={0.1}
                        metalness={0.8}
                    />
                </TorusKnot>
            </Float>

            <Float speed={3} rotationIntensity={1} floatIntensity={2}>
                <Sphere args={[0.5, 32, 32]} position={[0, -3, 2]}>
                    <MeshDistortMaterial
                        color="#ec4899"
                        attach="material"
                        distort={0.6}
                        speed={3}
                        roughness={0.3}
                        metalness={0.5}
                    />
                </Sphere>
            </Float>
        </>
    );
}

function Scene() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />
            <pointLight position={[10, -10, 10]} intensity={0.5} color="#8b5cf6" />

            <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={100} scale={12} size={2} speed={0.4} opacity={0.5} color="#c084fc" />

            <AnimatedShapes />

            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <Text
                    fontSize={6}
                    maxWidth={200}
                    lineHeight={1}
                    letterSpacing={0.02}
                    textAlign={'center'}
                    anchorX="center"
                    anchorY="middle"
                    position={[0, 0.5, 0]}
                >
                    404
                    <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.4} />
                </Text>
            </Float>
        </>
    );
}

const NotFound = () => {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100 relative overflow-hidden">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0 opacity-80 w-full h-full pointer-events-none">
                <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                    <Suspense fallback={null}>
                        <Scene />
                    </Suspense>
                </Canvas>
            </div>

            {/* Foreground Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="relative z-10 flex flex-col items-center text-center px-6 mt-[40vh] pointer-events-none"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mb-8"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 drop-shadow-sm">
                        Lost in Space
                    </h2>
                    <p className="text-slate-300 text-lg md:text-xl max-w-md mx-auto font-light">
                        The page you're looking for has drifted off into another dimension.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 pointer-events-auto"
                >
                    <Link
                        to="/"
                        className="group relative px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-medium text-lg flex items-center justify-center gap-2 overflow-hidden transition-all hover:scale-105 hover:bg-white/20 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                    >
                        <Home className="w-5 h-5 relative z-10 transition-transform group-hover:-translate-y-1 group-hover:scale-110" />
                        <span className="relative z-10">Back to Earth</span>
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="group px-8 py-4 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-600 rounded-full font-medium text-lg flex items-center justify-center gap-2 transition-all hover:bg-slate-900/50 backdrop-blur-sm"
                    >
                        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        <span>Go Back</span>
                    </button>
                </motion.div>
            </motion.div>

            {/* Decorative gradients */}
            <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-slate-950 to-transparent z-0 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
        </div>
    );
};

export default NotFound;
