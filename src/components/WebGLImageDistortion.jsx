import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { useTexture, shaderMaterial, OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';

const LiquidShaderMaterial = shaderMaterial(
    {
        uTexture: new THREE.Texture(),
        uHover: 0,
        uTime: 0,
    },
    // Vertex Shader
    `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    // Fragment Shader
    `
    uniform sampler2D uTexture;
    uniform float uHover;
    uniform float uTime;
    varying vec2 vUv;

    // Simple 2D Noise function
    float random (in vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
        vec2 p = vUv;

        // Apply wave distortion based on hover state
        float wave1 = sin(p.y * 10.0 + uTime * 2.0) * 0.05 * uHover;
        float wave2 = sin(p.x * 10.0 + uTime * 2.0) * 0.05 * uHover;

        p.x += wave1;
        p.y += wave2;

        vec4 color = texture2D(uTexture, p);
        
        // Slightly boost brightness on hover
        color.rgb += uHover * 0.15;

        gl_FragColor = color;
    }
    `
);

const LiquidImage = ({ url }) => {
    const materialRef = useRef();
    const texture = useTexture(url);
    const [hovered, setHover] = useState(false);

    useFrame((state, delta) => {
        if (materialRef.current) {
            materialRef.current.uTime += delta;
            // Lerp the hover value for smooth transitions
            materialRef.current.uHover = THREE.MathUtils.lerp(
                materialRef.current.uHover,
                hovered ? 1 : 0,
                0.1
            );
        }
    });

    const { viewport } = useThree();

    return (
        <mesh
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <planeGeometry args={[viewport.width, viewport.height]} />
            <liquidShaderMaterial
                ref={materialRef}
                uTexture={texture}
                transparent={true}
            />
        </mesh>
    );
};

const WebGLImageDistortion = ({ imageUrl }) => {
    return (
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, overflow: 'hidden', borderRadius: '16px' }}>
            <Canvas>
                <OrthographicCamera makeDefault position={[0, 0, 1]} zoom={1} />
                <React.Suspense fallback={null}>
                    <LiquidImage url={imageUrl} />
                </React.Suspense>
            </Canvas>
        </div>
    );
};

export default WebGLImageDistortion;
