import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Points, PointMaterial, Environment } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function Particles() {
  const count = 300;
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20;
      p[i * 3 + 1] = (Math.random() - 0.5) * 20;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return p;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      const scrollY = window.scrollY / window.innerHeight;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.005 + scrollY * 0.2;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.002 + scrollY * 0.1;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#a3a3a3" size={0.012} sizeAttenuation={true} depthWrite={false} opacity={0.1} />
    </Points>
  );
}

function GlassRing() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.01;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.005;
      
      const scrollY = window.scrollY / window.innerHeight;
      
      // Subtle parallax with mouse
      const targetX = (state.pointer.x * state.viewport.width) / 30;
      const targetY = (state.pointer.y * state.viewport.height) / 30;
      
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX + 4.5 - scrollY * 2, 0.015);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY + 1.5 + scrollY * 2, 0.015);
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, -6 - scrollY * 4, 0.015);
    }
  });

  return (
    <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.15}>
      <mesh ref={meshRef} position={[4.5, 1.5, -6]} scale={1.1}>
        <torusGeometry args={[1.4, 0.25, 64, 128]} />
        <MeshTransmissionMaterial
          transmission={0.6}
          transparent={true}
          opacity={0.3}
          roughness={0.4}
          thickness={0.5}
          ior={1.1}
          chromaticAberration={0.02}
          backside
          resolution={256}
        />
      </mesh>
    </Float>
  );
}

function ReactiveLighting() {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  
  useFrame((state) => {
    if (lightRef.current) {
      const targetX = state.pointer.x * 10;
      const targetY = state.pointer.y * 10;
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, targetX, 0.05);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, targetY + 5, 0.05);
    }
  });

  return (
    <>
      <ambientLight intensity={1.5} color="#ffffff" />
      <directionalLight ref={lightRef} position={[0, 5, 5]} intensity={2.5} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#e0e0e0" />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <ReactiveLighting />
        <Environment preset="city" />
        <Particles />
        
      </Canvas>
    </div>
  );
}
