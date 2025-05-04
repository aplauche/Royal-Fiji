import React, { useEffect, useRef } from 'react'
import { useStore } from '../../hooks/useStore'
import { useControls } from 'leva'
import { useFrame } from '@react-three/fiber'

const Water = () => {

  // Material
  const materialRef = useRef()
  
  // Global states
  const waterLevel = useStore((state) => state.waterLevel)
  const waveSpeed = useStore((state) => state.waveSpeed)
  const waveAmplitude = useStore((state) => state.waveAmplitude)

  // Interactive water parameters
  const {
    COLOR_BASE_NEAR, WATER_LEVEL, WAVE_SPEED, WAVE_AMPLITUDE
  } = useControls("Water", {
    COLOR_BASE_NEAR: { value: "#00fccd", label: "Near" },
    WATER_LEVEL: { value: waterLevel, min: 0.5, max: 5.0, step: 0.1, label: "Water Level" },
    WAVE_SPEED: { value: waveSpeed, min: 0.5, max: 2.0, step: 0.1, label: "Wave Speed" },
    WAVE_AMPLITUDE: { value: waveAmplitude, min: 0.05, max: 0.5, step: 0.05, label: "Wave Amplitude" },
  })



  // Update shader uniforms whenever control values change
  useEffect(() => {
    if (!materialRef.current) return
    materialRef.current.uniforms.uWaveSpeed.value = WAVE_SPEED
    materialRef.current.uniforms.uWaveAmplitude.value = WAVE_AMPLITUDE
  }, [WAVE_SPEED, WAVE_AMPLITUDE])

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
        <meshStandardMaterial color={"lightblue"} />
        <planeGeometry args={[256, 256]} />
      </mesh>
    
    </>
  )
}

export default Water
