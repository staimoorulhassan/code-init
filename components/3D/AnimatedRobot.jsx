// components/3D/AnimatedRobot.jsx
'use client'
import React, { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function AnimatedRobot({ isSpeaking = false, isActive = false }) {
  const groupRef = useRef()
  const headRef = useRef()
  const armRef = useRef()
  const mouthRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    
    // Head bob when speaking
    if (headRef.current) {
      if (isSpeaking) {
        headRef.current.position.y = Math.sin(t * 2) * 0.15
        headRef.current.rotation.z = Math.sin(t * 1.5) * 0.1
      } else {
        headRef.current.position.y = Math.sin(t * 0.5) * 0.05
      }
    }
    
    // Arm gestures
    if (armRef.current) {
      if (isSpeaking) {
        armRef.current.rotation.z = Math.sin(t * 1.2) * 0.5
      } else {
        armRef.current.rotation.z = Math.sin(t * 0.6) * 0.2
      }
    }

    // Eyes glow when speaking
    if (groupRef.current) {
      const eyes = groupRef.current.children.find(
        (child) => child.name === 'eyes'
      )
      if (eyes && isSpeaking) {
        eyes.children.forEach((eye) => {
          eye.material.emissiveIntensity = 2 + Math.sin(t * 3) * 0.5
        })
      }
    }
  })

  return (
    <group ref={groupRef} scale={isActive ? 1.2 : 1}>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 1.2, 0.3]} />
        <meshStandardMaterial 
          color="#f5f5f5" 
          metalness={0.2} 
          roughness={0.3}
          emissive={isActive ? '#00ff00' : '#000000'}
          emissiveIntensity={isActive ? 0.3 : 0}
        />
      </mesh>

      {/* Head */}
      <group ref={headRef} position={[0, 0.8, 0]}>
        <mesh>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial color="#e8e8e8" metalness={0.15} roughness={0.4} />
        </mesh>

        {/* Eyes group */}
        <group name="eyes">
          <mesh position={[-0.12, 0.08, 0.35]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color="#00ffff"
              emissive="#00ffff"
              emissiveIntensity={2}
              toneMapped={false}
            />
          </mesh>
          <mesh position={[0.12, 0.08, 0.35]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color="#00ffff"
              emissive="#00ffff"
              emissiveIntensity={2}
              toneMapped={false}
            />
          </mesh>
        </group>

        {/* Headset */}
        <mesh position={[0, 0.25, 0]}>
          <torusGeometry args={[0.3, 0.08, 16, 100, Math.PI]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Headset ear cups */}
        <mesh position={[-0.32, 0.15, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.08, 16]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh position={[0.32, 0.15, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.08, 16]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      {/* Left Arm */}
      <group ref={armRef} position={[-0.35, 0.3, 0]}>
        <mesh>
          <boxGeometry args={[0.15, 0.6, 0.15]} />
          <meshStandardMaterial color="#f5f5f5" />
        </mesh>
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[0.2, 0.25, 0.15]} />
          <meshStandardMaterial color="#e0e0e0" />
        </mesh>
      </group>

      {/* Right Arm */}
      <group position={[0.35, 0.3, 0]} rotation={[0, 0, -0.2]}>
        <mesh>
          <boxGeometry args={[0.15, 0.6, 0.15]} />
          <meshStandardMaterial color="#f5f5f5" />
        </mesh>
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[0.2, 0.25, 0.15]} />
          <meshStandardMaterial color="#e0e0e0" />
        </mesh>
      </group>

      {/* Shoulder accents */}
      <mesh position={[-0.35, 0.5, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[0.35, 0.5, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.3} />
      </mesh>
    </group>
  )
}
