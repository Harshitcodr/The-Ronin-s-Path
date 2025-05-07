import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Float } from '@react-three/drei';

interface ModelProps {
  path: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

const Model = ({ path, position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: ModelProps) => {
  const group = useRef<THREE.Group>();
  const { scene } = useGLTF(path);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={group} position={position} rotation={rotation} scale={[scale, scale, scale]}>
      <primitive object={scene} />
    </group>
  );
};

interface Scene3DProps {
  modelPath?: string;
  environmentPath?: string;
  cameraPosition?: [number, number, number];
  interactive?: boolean;
}

const Scene3D: React.FC<Scene3DProps> = ({
  modelPath = '/assets/models/katana.glb',
  environmentPath = 'sunset',
  cameraPosition = [0, 0, 5],
  interactive = true
}) => {
  return (
    <div className="scene3d-container">
      <Canvas camera={{ position: cameraPosition, fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <Model path={modelPath} scale={1.5} />
        </Float>
        
        {interactive && <OrbitControls enableZoom={false} />}
        <Environment preset={environmentPath as any} />
      </Canvas>
    </div>
  );
};

export default Scene3D;