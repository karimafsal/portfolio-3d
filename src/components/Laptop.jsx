import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Laptop(props) {
  const group = useRef();
  const { scene } = useGLTF("/assets/models/laptop.glb");

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.2) * 0.15;
    }
  });

  return (
    <primitive
      ref={group}
      object={scene}
      scale={[0.35, 0.35, 0.35]}
      position={[0, 0.02, 0]}
      castShadow
      receiveShadow
      {...props}
    />
  );
}
