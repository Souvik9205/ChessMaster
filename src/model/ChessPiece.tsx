import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  useGLTF,
} from "@react-three/drei";

const ChessPieces: React.FC = () => {
  const { scene } = useGLTF("/chess_pieces.glb");

  return (
    <div
      style={{ width: "100vw", height: "80vh" }}
      className="drop-shadow-2xl shadow-white"
    >
      <Canvas shadows>
        <PerspectiveCamera makeDefault fov={60} position={[-3, 2, 6]} />

        <ambientLight intensity={1.4} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <spotLight
          position={[-10, 15, 10]}
          intensity={1}
          angle={0.3}
          penumbra={1}
          castShadow
        />
        <primitive object={scene} scale={20} />

        <Environment preset="sunset" />

        <OrbitControls enablePan enableZoom enableRotate />
      </Canvas>
    </div>
  );
};

export default ChessPieces;
