// components/3D/Scene3D.jsx
'use client'
import React, { Suspense } from 'react'
import { Canvas, PerspectiveCamera } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera as Drei_PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { AnimatedRobot } from './AnimatedRobot'
import * as THREE from 'three'

function Scene3DContent({ isSpeaking, isActive, cameraPosition = [2, 1.5, 3.5] }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={cameraPosition} fov={75} near={0.1} far={100} />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        autoRotate 
        autoRotateSpeed={0.8}
        enableRotate={false}
      />

      {/* Lighting */}
      <ambientLight intensity={0.7} color="#aabbcc" />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[0, 1.5, 2]} intensity={1} color="#00ffff" distance={4} />
      <pointLight position={[-2, 1, 0]} intensity={0.6} color="#00ffff" distance={3} />

      {/* Robot */}
      <AnimatedRobot isSpeaking={isSpeaking} isActive={isActive} />

      {/* Background */}
      <mesh position={[0, 1, -4]} scale={[10, 8, 1]}>
        <planeGeometry />
        <meshStandardMaterial color="#0f1419" emissive="#1a2a3a" emissiveIntensity={0.5} />
      </mesh>

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} scale={[10, 10, 1]}>
        <planeGeometry />
        <meshStandardMaterial color="#1a1a2a" metalness={0.4} roughness={0.5} />
      </mesh>

      {/* Post-processing */}
      <EffectComposer multisampling={8}>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={1.8}
          kernelSize={5}
        />
      </EffectComposer>
    </>
  )
}

export function Scene3D({ isSpeaking = false, isActive = false, cameraPosition }) {
  return (
    <Canvas gl={{ antialias: true, dpr: [1, 2] }} shadows>
      <Suspense fallback={null}>
        <Scene3DContent isSpeaking={isSpeaking} isActive={isActive} cameraPosition={cameraPosition} />
      </Suspense>
    </Canvas>
  )
}
