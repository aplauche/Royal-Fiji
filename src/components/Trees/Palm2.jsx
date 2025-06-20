/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 ./public/models/palm-2.glb 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Palm2(props) {
  const { nodes, materials } = useGLTF('/models/palm-2.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[0,0,0]} scale={0.2}>
        <mesh geometry={nodes.PaperTreesMesh069.geometry} material={materials['Paper Trees Leaves']} />
        <mesh geometry={nodes.PaperTreesMesh069_1.geometry} material={materials['Paper Trees Stem']} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/palm-2.glb')
