import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { Wireframe } from 'three/examples/jsm/lines/Wireframe';
import { WireframeGeometry2 } from 'three/examples/jsm/lines/WireframeGeometry2';

// Extend the component to use three.js extras
extend({ OrbitControls, LineMaterial, Wireframe, WireframeGeometry2 });

const WireframeComponent = () => {
  const { scene, camera, gl, size } = useThree();
  const wireframeRef = useRef();
  const controlsRef = useRef();

  useEffect(() => {
    // Setup camera
    camera.position.set(30, 30, 30);
    camera.lookAt(0, 0, 0);

    // Create geometry and material for the wireframe
    const geo = new THREE.IcosahedronGeometry(20, 1);
    const geometry = new WireframeGeometry2(geo);
    const matLine = new LineMaterial({
      color: 0x4080ff,
      linewidth: 5, // in pixels
      dashed: false,
    });

    // Create and add wireframe to the scene
    const wireframe = new Wireframe(geometry, matLine);
    wireframe.computeLineDistances();
    wireframe.scale.set(0.7, 0.7, 0.7);
    scene.add(wireframe);
    wireframeRef.current = wireframe;

    // Setup orbit controls
    const controls = new OrbitControls(camera, gl.domElement);
    controls.minDistance = 10;
    controls.maxDistance = 500;
    controlsRef.current = controls;

    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      gl.setSize(innerWidth, innerHeight);
      matLine.resolution.set(innerWidth, innerHeight);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      scene.remove(wireframe);
      controls.dispose();
    };
  }, [camera, gl, scene]);

  useFrame(() => {
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x += 0.01;
      wireframeRef.current.rotation.y += 0.01;
    }
  });

  return null;
};

const ThreeScene = () => {
  return (
    <Canvas style={{ width: '100vw', height: '100vh' }}>
      <ambientLight />
      <WireframeComponent />
    </Canvas>
  );
};

export default ThreeScene;
