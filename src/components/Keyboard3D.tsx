import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, useGLTF, ContactShadows, Center, Html } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io5';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiVite } from 'react-icons/si';

useGLTF.preload('/models/keyboard.glb');

// ข้อมูลไอคอนภาษาต่างๆ ที่จะให้ลอยอยู่เหนือคีย์บอร์ด
const techIcons = [
  { id: 'js', icon: <IoLogoJavascript color="#f7df1e" size={40} />, position: [-3, 1.5, -1] },
  { id: 'ts', icon: <SiTypescript color="#3178c6" size={40} />, position: [-1.5, 2, -1.5] },
  { id: 'react', icon: <FaReact color="#61dafb" size={45} />, position: [0, 2.5, -2] },
  { id: 'next', icon: <SiNextdotjs color="#000000" size={40} />, position: [1.5, 2, -1.5] },
  { id: 'node', icon: <FaNodeJs color="#339933" size={40} />, position: [3, 1.5, -1] },
  
  { id: 'html', icon: <FaHtml5 color="#e34f26" size={35} />, position: [-2.5, 1, 1] },
  { id: 'css', icon: <FaCss3Alt color="#1572b6" size={35} />, position: [-1, 1.2, 1.5] },
  { id: 'tailwind', icon: <SiTailwindcss color="#06b6d4" size={35} />, position: [1, 1.2, 1.5] },
  { id: 'vite', icon: <SiVite color="#646cff" size={35} />, position: [2.5, 1, 1] },
];

function KeyboardModel() {
  const { scene } = useGLTF('/models/keyboard.glb');
  
  // ให้โมเดลรับและทอดเงา
  scene.traverse((child: THREE.Object3D) => {
    if ((child as THREE.Mesh).isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <primitive object={scene} scale={6} rotation={[0.4, -0.2, 0]} />
  );
}

export default function Keyboard3D() {
  return (
    <div style={{ width: '100%', minHeight: '500px', height: '100%', cursor: 'grab', position: 'relative' }}>
      <Canvas camera={{ position: [0, 5, 10], fov: 45 }} shadows>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 15, 10]} intensity={2} castShadow shadow-mapSize={[2048, 2048]} />
        
        <Suspense fallback={null}>
          <Center>
            <group>
              {/* โมเดลคีย์บอร์ดสีขาวของคุณ */}
              <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
                <KeyboardModel />
              </Float>

              {/* ไอคอนภาษาที่ลอยอยู่เหนือคีย์บอร์ด */}
              {techIcons.map((tech, index) => (
                <Float
                  key={tech.id}
                  speed={2 + index * 0.5} // ให้แต่ละอันลอยด้วยความเร็วไม่เท่ากัน
                  rotationIntensity={0.5}
                  floatIntensity={1}
                  position={new THREE.Vector3(...tech.position)}
                >
                  {/* Html component ช่วยให้เราเอา HTML/React Icons ไปแปะใน 3D ได้ */}
                  <Html transform distanceFactor={10} zIndexRange={[100, 0]}>
                    <div className="floating-tech-icon" style={{
                      background: 'rgba(255, 255, 255, 0.9)',
                      padding: '10px',
                      borderRadius: '50%',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: '2px solid rgba(255,255,255,0.5)',
                      backdropFilter: 'blur(4px)'
                    }}>
                      {tech.icon}
                    </div>
                  </Html>
                </Float>
              ))}
            </group>
          </Center>
          
          <ContactShadows position={[0, -3.5, 0]} opacity={0.6} scale={25} blur={2.5} far={4} />
        </Suspense>
        
        <OrbitControls enableZoom={true} enablePan={true} maxPolarAngle={Math.PI / 2} minPolarAngle={0} />
      </Canvas>
    </div>
  );
}
