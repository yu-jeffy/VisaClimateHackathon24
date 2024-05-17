import React, { useRef } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { CylinderGeometry, Vector3 } from 'three';
import { MeshStandardMaterial, Mesh } from 'three';

// Extend the THREE namespace to include CylinderGeometry
extend({ CylinderGeometry });

function Arrow({ position, rotation }) {
  const meshRef = useRef();

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <cylinderGeometry args={[0.1, 0.1, 2, 32]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function Arrows() {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
      groupRef.current.children.forEach((child, index) => {
        const angle = (performance.now() / 1000 + index * (Math.PI * 2) / 3) % (Math.PI * 2);
        child.position.set(Math.cos(angle) * 2, 0, Math.sin(angle) * 2);
        child.rotation.set(0, -angle, Math.PI / 2);
      });
    }
  });

  return (
    <group ref={groupRef}>
      <Arrow />
      <Arrow />
      <Arrow />
    </group>
  );
}

export default function ThreeScene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Arrows />
    </Canvas>
  );
}
