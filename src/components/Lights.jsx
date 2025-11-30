import React from "react";

export default function Lights() {
  return (
    <>
      <hemisphereLight args={["#ffffff", "#101010", 0.6]} />
      <directionalLight
        color={0xffffff}
        intensity={2}
        position={[3, 5, 2]}
        castShadow
      />
      <directionalLight
        color={0x4f8cff}
        intensity={0.8}
        position={[-3, 2, -2]}
      />
      <directionalLight
        color={0xffffff}
        intensity={0.6}
        position={[0, 4, -3]}
      />
      <ambientLight intensity={0.4} />
    </>
  );
}
