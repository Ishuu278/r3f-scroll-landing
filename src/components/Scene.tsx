import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Environment, Stars, Preload } from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
  scrollState: React.RefObject<{
    positionX: number;
    positionY: number;
    positionZ: number;
    scale: number;
    rotationZ: number;
    rotationY: number;
    distort: number;
    speed: number;
  }>;
}

const Centerpiece: React.FC<SceneProps> = ({ scrollState }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const materialRef = useRef<any>(null);
  
  const mouse = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame((_, delta) => {
    // Idle rotation on the inner centerpiece mesh itself
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.rotation.x += delta * 0.08;
    }

    // Apply scroll transitions and mouse parallax to the group wrapper
    if (groupRef.current && scrollState.current) {
      const state = scrollState.current;
      
      // Update position and scale based on GSAP scroll variables
      groupRef.current.position.x = state.positionX;
      groupRef.current.position.y = state.positionY;
      groupRef.current.position.z = state.positionZ;
      
      groupRef.current.scale.setScalar(state.scale);
      
      // Combine mouse parallax offset and GSAP scroll rotation
      const targetX = mouse.current.y * 0.25;
      // Disable mouse parallax rotation on mobile for performance
      const targetY = (isMobile ? 0 : mouse.current.x * 0.25) + state.rotationY;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);
      groupRef.current.rotation.z = state.rotationZ;
    }

    // Adjust distorted material parameters on scroll
    if (materialRef.current && scrollState.current) {
      materialRef.current.distort = scrollState.current.distort;
      materialRef.current.speed = scrollState.current.speed;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[1.4, 64, 64]} />
        <MeshDistortMaterial
          ref={materialRef}
          color="#aa3bff"
          emissive="#2d004d"
          emissiveIntensity={0.6}
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>
      {/* Floating orbital particles for depth */}
      <mesh position={[2.5, 1.2, -1]} scale={0.18}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#00f2fe" roughness={0.1} metalness={0.8} />
      </mesh>
      <mesh position={[-2.5, -1.5, 1]} scale={0.25}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#c084fc" roughness={0.2} metalness={0.9} />
      </mesh>
    </group>
  );
};

export const Scene: React.FC<SceneProps> = (props) => {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        {/* Soft studio lighting setup */}
        <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
        <directionalLight position={[-5, 3, -3]} intensity={0.4} />
        <spotLight position={[0, 8, 2]} angle={0.4} penumbra={1} intensity={1.2} color="#aa3bff" />
        
        <Centerpiece {...props} />
        
        {/* City preset gives nice high-contrast reflections */}
        <Environment preset="city" />
        
        {/* Starfield background */}
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0.5} fade speed={1.5} />
        
        <Preload all />
      </Canvas>
    </div>
  );
};
