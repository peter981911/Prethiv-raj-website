import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Wireframe, Sphere, ScreenSpace, Icosahedron, MeshDistortMaterial, Trail } from '@react-three/drei';

const AbstractShape = () => {
    const meshRef = useRef();

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
            // Add subtle mouse follow
            meshRef.current.position.x = (state.mouse.x * 0.5);
            meshRef.current.position.y = (state.mouse.y * 0.5);
        }
    });

    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <Icosahedron ref={meshRef} args={[1.5, 0]}>
                <meshStandardMaterial
                    color="#8a2be2"
                    wireframe
                    wireframeLinewidth={2}
                    emissive="#8a2be2"
                    emissiveIntensity={0.5}
                />
            </Icosahedron>

            {/* Inner glowing core */}
            <Sphere args={[0.8, 32, 32]}>
                <MeshDistortMaterial
                    color="#00f0ff"
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0}
                    emissive="#00f0ff"
                    emissiveIntensity={1}
                />
            </Sphere>
        </Float>
    );
};

const Hero3D = () => {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true, antialias: true }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8a2be2" />

                <AbstractShape />
            </Canvas>
        </div>
    );
};

export default Hero3D;
