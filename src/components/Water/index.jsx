import React, { useEffect, useMemo, useRef } from 'react'
import { useStore } from '../../hooks/useStore'
import { useControls } from 'leva'
import { useFrame } from '@react-three/fiber'
import CustomShaderMaterial from "three-custom-shader-material"
import * as THREE from 'three'
import vertexShader from "./shaders/vertex.glsl"
import fragmentShader from "./shaders/fragment.glsl"

const Water = () => {

  // Material
  const materialRef = useRef()
  
  // Global states
  const waterLevel = useStore((state) => state.waterLevel)
  const waveSpeed = useStore((state) => state.waveSpeed)
  const waveAmplitude = useStore((state) => state.waveAmplitude)

  // Interactive water parameters
  const {
    TEXTURE_SIZE, COLOR_BASE_FAR, COLOR_BASE_NEAR, WATER_LEVEL, WAVE_SPEED, WAVE_AMPLITUDE
  } = useControls("Water", {
    COLOR_BASE_NEAR: { value: "#00fccd", label: "Near" },
    COLOR_BASE_FAR: { value: "#00b1fc", label: "Far" },
    WATER_LEVEL: { value: waterLevel, min: 0.5, max: 5.0, step: 0.1, label: "Water Level" },
    WAVE_SPEED: { value: waveSpeed, min: 0.5, max: 2.0, step: 0.1, label: "Wave Speed" },
    WAVE_AMPLITUDE: { value: waveAmplitude, min: 0.05, max: 0.5, step: 0.05, label: "Wave Amplitude" },
    TEXTURE_SIZE: { value: 65, min: 1, max: 100, step: 1, label: "Texture Size" },
  })

  const COLOR_FAR = useMemo(
    () => new THREE.Color(COLOR_BASE_FAR),
    [COLOR_BASE_FAR]
  )

  // Update shader uniforms whenever control values change
  useEffect(() => {
    if (!materialRef.current) return
    materialRef.current.uniforms.uWaveSpeed.value = WAVE_SPEED
    materialRef.current.uniforms.uWaveAmplitude.value = WAVE_AMPLITUDE
    materialRef.current.uniforms.uColorFar.value = COLOR_FAR
  }, [WAVE_SPEED, WAVE_AMPLITUDE, COLOR_BASE_FAR])

  // Also Update global states on change so other components can use as well
  useEffect(() => {
    useStore.setState(() => ({
      waterLevel: WATER_LEVEL,
      waveSpeed: WAVE_SPEED,
      waveAmplitude: WAVE_AMPLITUDE
    }))
  }, [WAVE_SPEED, WAVE_AMPLITUDE, WATER_LEVEL])

  // Update shader time
  useFrame(({ clock }) => {
    if (!materialRef.current) return
    materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
  })



  return (
    <>
      {/* Add a plane for the water level */}
      <mesh
        rotation-x={-Math.PI / 2}
        position-y={waterLevel} // Moved it down to prevent the visual glitch from plane collision
        receiveShadow
      >
        {/* <meshStandardMaterial color={"lightblue"} /> */}
        <CustomShaderMaterial
          ref={materialRef}
          baseMaterial={THREE.MeshStandardMaterial}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uWaveSpeed: { value: WAVE_SPEED },
            uWaveAmplitude: { value: WAVE_AMPLITUDE },
            uColorFar: {value: COLOR_FAR},
            uTextureSize: {value: TEXTURE_SIZE}
          }}
          color={COLOR_BASE_NEAR}
          transparent
          opacity={0.4}
        />
        <planeGeometry args={[256, 256]} />
      </mesh>
    
    </>
  )
}

export default Water
