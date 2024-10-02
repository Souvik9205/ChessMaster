import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { MutableRefObject } from "react";
import * as THREE from "three";

type GLTFResult = {
  scene: THREE.Group;
};

function ChessboardModel() {
  const { scene } = useGLTF("/chess.glb") as unknown as GLTFResult;
  const chessboardRef = useRef<THREE.Group>() as MutableRefObject<THREE.Group>;

  useFrame(() => {
    if (chessboardRef.current) {
      chessboardRef.current.rotation.y += 0.002;
    }
  });

  return (
    <primitive
      ref={chessboardRef}
      object={scene}
      scale={0.04}
      position={[0, -1, 0]}
    />
  );
}

const Chessboard: React.FC = () => {
  return (
    <div
      style={{ width: "100vw", height: "100vh" }}
      className="drop-shadow-2xl shadow-white"
    >
      <Canvas camera={{ position: [-6, 3, 3], fov: 60 }} dpr={[1, 2]} shadows>
        <Suspense fallback={null}>
          <ambientLight intensity={1.5} />
          <directionalLight
            position={[-8, 2, -2]}
            intensity={5}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <OrbitControls enableZoom={false} />
          <ChessboardModel />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Chessboard;
