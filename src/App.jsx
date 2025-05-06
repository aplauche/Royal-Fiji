import { useState } from 'react'

import { AdaptiveDpr } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Experience } from './components/Experience'

function App() {

  return (
    <>
          <Canvas camera={{ position: [30, 10, -30], fov: 35 }} shadows>
            <Experience />
            {/* <AdaptiveDpr pixelated /> */}
          </Canvas>
    </>
  )
}

export default App
