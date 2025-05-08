import { Terrain } from "./Terrain/index.jsx"
import { Palm } from "./Trees/Palm.jsx"
import Water from "./Water/index.jsx"


export const Scene = () => {
  return (
    <>
      <Water />
      <Terrain />
      <Palm position={[2,1,1]}/>
      <Palm position={[0,1,-1.5]} scale={1.2}/>
      <Palm position={[-2,1,0.2]}/>
    </>
  )
}
