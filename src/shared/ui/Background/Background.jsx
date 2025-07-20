 import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, Sphere, Box, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// 고양이 발자국 컴포넌트
const CatPaw = ({ position, rotation, scale = 1 }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
      {/* 고양이 발자국 모양 */}
      <mesh>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#f39c12" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0.15, 0, 0.1]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#e67e22" transparent opacity={0.5} />
      </mesh>
      <mesh position={[0.15, 0, -0.1]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#e67e22" transparent opacity={0.5} />
      </mesh>
      <mesh position={[0.3, 0, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#d35400" transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

// 떠다니는 고양이 모양 구체
const FloatingCat = ({ position, color = "#f39c12" }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
      
      // 호버 시 크기 변화
      if (hovered) {
        meshRef.current.scale.setScalar(1.2);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh 
        ref={meshRef} 
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial 
          color={hovered ? "#e67e22" : color} 
          transparent 
          opacity={hovered ? 0.6 : 0.3} 
        />
      </mesh>
    </Float>
  );
};

// 고양이 귀 모양
const CatEar = ({ position, rotation = [0, 0, 0] }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.1;
      
      // 호버 시 크기 변화
      if (hovered) {
        meshRef.current.scale.setScalar(1.3);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <coneGeometry args={[0.1, 0.3, 8]} />
      <meshStandardMaterial 
        color={hovered ? "#d35400" : "#e67e22"} 
        transparent 
        opacity={hovered ? 0.7 : 0.4} 
      />
    </mesh>
  );
};

// 고양이 꼬리
const CatTail = ({ position }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.3;
      
      // 호버 시 크기 변화
      if (hovered) {
        meshRef.current.scale.setScalar(1.4);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <cylinderGeometry args={[0.05, 0.02, 1, 8]} />
      <meshStandardMaterial 
        color={hovered ? "#e74c3c" : "#d35400"} 
        transparent 
        opacity={hovered ? 0.8 : 0.5} 
      />
    </mesh>
  );
};

// 배경 입자들
const BackgroundParticles = () => {
  const particlesRef = useRef();
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 80; i++) {
      const time = Math.random() * 100;
      const factor = Math.random() * 20 + 10;
      const speed = Math.random() * 0.01 + 0.01;
      const x = Math.random() * 20 - 10;
      const y = Math.random() * 20 - 10;
      const z = Math.random() * 20 - 10;
      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      particles.forEach((particle, i) => {
        const mesh = particlesRef.current.children[i];
        if (mesh) {
          particle.time += particle.speed;
          mesh.position.x = particle.x + Math.sin(particle.time) * particle.factor;
          mesh.position.y = particle.y + Math.cos(particle.time) * particle.factor;
          mesh.position.z = particle.z + Math.sin(particle.time * 0.5) * particle.factor;
        }
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={[particle.x, particle.y, particle.z]}>
          <sphereGeometry args={[0.02, 4, 4]} />
          <meshStandardMaterial color="#f39c12" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
};

// 고양이 눈
const CatEye = ({ position, rotation = [0, 0, 0] }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      
      if (hovered) {
        meshRef.current.scale.setScalar(1.5);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial 
        color={hovered ? "#2c3e50" : "#34495e"} 
        transparent 
        opacity={hovered ? 0.9 : 0.6} 
      />
    </mesh>
  );
};

// 고양이 코
const CatNose = ({ position }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
      
      if (hovered) {
        meshRef.current.scale.setScalar(1.3);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshStandardMaterial 
        color={hovered ? "#e74c3c" : "#c0392b"} 
        transparent 
        opacity={hovered ? 0.8 : 0.5} 
      />
    </mesh>
  );
};

// 고양이 수염
const CatWhisker = ({ position, rotation = [0, 0, 0] }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.8) * 0.05;
      
      if (hovered) {
        meshRef.current.scale.setScalar(1.2);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <cylinderGeometry args={[0.01, 0.01, 0.8, 4]} />
      <meshStandardMaterial 
        color={hovered ? "#95a5a6" : "#7f8c8d"} 
        transparent 
        opacity={hovered ? 0.7 : 0.4} 
      />
    </mesh>
  );
};

// 회전하는 고양이 토이
const RotatingCatToy = ({ position, color = "#e74c3c" }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.02;
      meshRef.current.rotation.y += 0.03;
      meshRef.current.rotation.z += 0.01;
      
      // 호버 시 더 빠른 회전
      if (hovered) {
        meshRef.current.rotation.x += 0.05;
        meshRef.current.rotation.y += 0.08;
      }
    }
  });

  return (
    <group position={position}>
      <mesh 
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial 
          color={hovered ? "#c0392b" : color} 
          transparent 
          opacity={hovered ? 0.9 : 0.6} 
        />
      </mesh>
      {/* 고양이 귀 모양 추가 */}
      <mesh position={[0, 0.3, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.05, 0.15, 8]} />
        <meshStandardMaterial color="#e67e22" transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, -0.3, 0]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.05, 0.15, 8]} />
        <meshStandardMaterial color="#e67e22" transparent opacity={0.7} />
      </mesh>
    </group>
  );
};

// 춤추는 고양이
const DancingCat = ({ position }) => {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (groupRef.current) {
      // 춤추는 애니메이션
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.2;
      
      if (hovered) {
        groupRef.current.rotation.y += 0.1;
        groupRef.current.scale.setScalar(1.3);
      } else {
        groupRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* 고양이 몸체 */}
      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial 
          color={hovered ? "#f39c12" : "#e67e22"} 
          transparent 
          opacity={hovered ? 0.8 : 0.6} 
        />
      </mesh>
      
      {/* 고양이 귀 */}
      <mesh position={[0.2, 0.5, 0]} rotation={[0, 0, Math.PI / 6]}>
        <coneGeometry args={[0.08, 0.2, 8]} />
        <meshStandardMaterial color="#d35400" transparent opacity={0.7} />
      </mesh>
      <mesh position={[-0.2, 0.5, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <coneGeometry args={[0.08, 0.2, 8]} />
        <meshStandardMaterial color="#d35400" transparent opacity={0.7} />
      </mesh>
      
      {/* 고양이 눈 */}
      <mesh position={[0.15, 0.2, 0.3]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#2c3e50" transparent opacity={0.8} />
      </mesh>
      <mesh position={[-0.15, 0.2, 0.3]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#2c3e50" transparent opacity={0.8} />
      </mesh>
      
      {/* 고양이 코 */}
      <mesh position={[0, 0.1, 0.4]}>
        <sphereGeometry args={[0.03, 6, 6]} />
        <meshStandardMaterial color="#e74c3c" transparent opacity={0.7} />
      </mesh>
    </group>
  );
};

// 파티클 시스템
const ParticleSystem = () => {
  const particlesRef = useRef();
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 50; i++) {
      const time = Math.random() * 100;
      const factor = Math.random() * 15 + 5;
      const speed = Math.random() * 0.02 + 0.01;
      const x = Math.random() * 20 - 10;
      const y = Math.random() * 20 - 10;
      const z = Math.random() * 20 - 10;
      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      particles.forEach((particle, i) => {
        const mesh = particlesRef.current.children[i];
        if (mesh) {
          particle.time += particle.speed;
          mesh.position.x = particle.x + Math.sin(particle.time) * particle.factor;
          mesh.position.y = particle.y + Math.cos(particle.time) * particle.factor;
          mesh.position.z = particle.z + Math.sin(particle.time * 0.5) * particle.factor;
          
          // 파티클 회전
          mesh.rotation.x += 0.01;
          mesh.rotation.y += 0.01;
        }
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={[particle.x, particle.y, particle.z]}>
          <sphereGeometry args={[0.03, 6, 6]} />
          <meshStandardMaterial 
            color={i % 3 === 0 ? "#f39c12" : i % 3 === 1 ? "#e67e22" : "#d35400"} 
            transparent 
            opacity={0.4} 
          />
        </mesh>
      ))}
    </group>
  );
};

// 고양이 집
const CatHouse = ({ position }) => {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (groupRef.current) {
      // 부드러운 회전
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      if (hovered) {
        groupRef.current.scale.setScalar(1.2);
      } else {
        groupRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* 집 바닥 */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 0.1, 1.5]} />
        <meshStandardMaterial 
          color={hovered ? "#8e44ad" : "#9b59b6"} 
          transparent 
          opacity={0.8} 
        />
      </mesh>
      
      {/* 집 벽 */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.5, 1, 1.5]} />
        <meshStandardMaterial 
          color={hovered ? "#e67e22" : "#f39c12"} 
          transparent 
          opacity={0.6} 
        />
      </mesh>
      
      {/* 집 지붕 */}
      <mesh position={[0, 1.2, 0]} rotation={[0, 0, Math.PI / 4]}>
        <coneGeometry args={[1.2, 0.8, 4]} />
        <meshStandardMaterial 
          color={hovered ? "#d35400" : "#e67e22"} 
          transparent 
          opacity={0.7} 
        />
      </mesh>
      
      {/* 입구 */}
      <mesh position={[0, 0.3, 0.75]}>
        <cylinderGeometry args={[0.3, 0.3, 0.1, 8]} />
        <meshStandardMaterial 
          color={hovered ? "#2c3e50" : "#34495e"} 
          transparent 
          opacity={0.9} 
        />
      </mesh>
    </group>
  );
};

// 움직이는 고양이 공
const MovingCatBall = ({ position }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      // 공처럼 튀는 애니메이션
      meshRef.current.position.y = Math.abs(Math.sin(state.clock.elapsedTime * 3)) * 0.5;
      meshRef.current.rotation.x += 0.05;
      meshRef.current.rotation.z += 0.03;
      
      if (hovered) {
        meshRef.current.scale.setScalar(1.4);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.25, 16, 16]} />
      <meshStandardMaterial 
        color={hovered ? "#e74c3c" : "#f39c12"} 
        transparent 
        opacity={hovered ? 0.8 : 0.6} 
      />
    </mesh>
  );
};

// 메인 배경 컴포넌트
const BackgroundScene = () => {
  const groupRef = useRef();
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 고양이 발자국들 */}
      {/* <CatPaw position={[-5, 0, -3]} rotation={[0, 0, 0]} scale={1.2} />
      <CatPaw position={[3, 0, -5]} rotation={[0, Math.PI / 4, 0]} scale={1.0} />
      <CatPaw position={[-2, 0, 4]} rotation={[0, -Math.PI / 3, 0]} scale={0.8} /> */}
      
      {/* 떠다니는 고양이들 */}
      <FloatingCat position={[-4, 2, -2]} color="#f39c12" />
      <FloatingCat position={[4, 1, -3]} color="#e67e22" />
      <FloatingCat position={[-3, 3, 3]} color="#d35400" />
      
      {/* 고양이 귀들 */}
      <CatEar position={[-6, 1, 0]} rotation={[0, 0, Math.PI / 6]} />
      <CatEar position={[6, 1, 0]} rotation={[0, 0, -Math.PI / 6]} />
      
      {/* 고양이 꼬리들 */}
      <CatTail position={[-7, 0, -1]} />
      <CatTail position={[7, 0, 1]} />
      
      {/* 고양이 눈들 */}
      <CatEye position={[-3, 1, -4]} />
      <CatEye position={[3, 1, -4]} />
      
      {/* 고양이 코들 */}
      <CatNose position={[0, 1, -4.5]} />
      
      {/* 고양이 수염들 */}
      <CatWhisker position={[-0.5, 1, -4.3]} rotation={[0, 0, Math.PI / 6]} />
      <CatWhisker position={[0.5, 1, -4.3]} rotation={[0, 0, -Math.PI / 6]} />
      <CatWhisker position={[-0.3, 1.2, -4.2]} rotation={[0, 0, Math.PI / 12]} />
      <CatWhisker position={[0.3, 1.2, -4.2]} rotation={[0, 0, -Math.PI / 12]} />
      
      {/* 회전하는 고양이 토이들 */}
      <RotatingCatToy position={[-4, 1, -4]} color="#e74c3c" />
      <RotatingCatToy position={[4, 1, -4]} color="#f39c12" />
      <RotatingCatToy position={[0, 2, -6]} color="#e67e22" />
      
      {/* 춤추는 고양이들 */}
      <DancingCat position={[-6, 0, 2]} />
      <DancingCat position={[6, 0, -2]} />
      
      {/* 고양이 집들 */}
      <CatHouse position={[-8, 0, -4]} />
      <CatHouse position={[8, 0, 4]} />
      
      {/* 움직이는 고양이 공들
      <MovingCatBall position={[-3, 0, 6]} />
      <MovingCatBall position={[3, 0, -6]} />
      <MovingCatBall position={[0, 0, 8]} /> */}
      
      {/* 파티클 시스템 */}
      <ParticleSystem />
      
      {/* 배경 입자들 */}
      <BackgroundParticles />
    </group>
  );
};

const Background = () => {
  return (
    <div className="background-container">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#f39c12" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#e67e22" />
        <pointLight position={[0, 10, 0]} intensity={0.3} color="#ffffff" />
        <BackgroundScene />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default Background; 