import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import Lights from "./Lights.jsx";
import Laptop from "./Laptop.jsx";

function CameraRig({ activeSection }) {
  const controlsRef = useRef();
  const cameraRef = useRef();

  useEffect(() => {
    if (!cameraRef.current || !controlsRef.current) return;

    const camera = cameraRef.current;
    const controls = controlsRef.current;

    let targetPos = { x: 3.8, y: 2.2, z: 5 };

    switch (activeSection) {
      case "about":
        targetPos = { x: 2, y: 1.8, z: 3 };
        break;
      case "projects":
        targetPos = { x: 4, y: 1.6, z: 3 };
        break;
      case "skills":
        targetPos = { x: 3, y: 1.8, z: 4.5 };
        break;
      case "contact":
        targetPos = { x: -2, y: 1.8, z: 3 };
        break;
      default:
        targetPos = { x: 3.8, y: 2.2, z: 5 };
    }

    gsap.to(camera.position, {
      x: targetPos.x,
      y: targetPos.y,
      z: targetPos.z,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        camera.lookAt(0, 0.3, 0);
        controls.update();
      },
    });

    gsap.to(controls.target, {
      x: 0,
      y: 0.3,
      z: 0,
      duration: 1.5,
      ease: "power2.inOut",
    });
  }, [activeSection]);

  return (
    <>
      {/* Set up R3F camera + controls via Canvas props */}
      <OrbitControls ref={controlsRef} target={[0, 0.3, 0]} enableDamping />
      <perspectiveCamera
        ref={cameraRef}
        fov={50}
        position={[3.8, 2.2, 5]}
        near={0.1}
        far={100}
        makeDefault
      />
    </>
  );
}

function Ground() {
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color={0x111318} roughness={0.9} metalness={0.1} />
    </mesh>
  );
}

function SceneContent({ activeSection }) {
  return (
    <>
      <color attach="background" args={["#05070a"]} />
      <fog attach="fog" args={["#05070a", 5, 12]} />
      <Lights />
      <Environment
        files="/assets/textures/studio_small_08_1k.hdr"
        background={false}
      />
      <Ground />
      <Laptop />
      <CameraRig activeSection={activeSection} />
    </>
  );
}

export default function CanvasScene({ activeSection }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [3.8, 2.2, 5], fov: 50 }}
      style={{ position: "fixed", inset: 0 }}
    >
      <SceneContent activeSection={activeSection} />
    </Canvas>
  );
}
