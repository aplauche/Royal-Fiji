import { Dock } from "./Dock/index.jsx"
import { Terrain } from "./Terrain/index.jsx"
import { Palm } from "./Trees/Palm.jsx"
import Water from "./Water/index.jsx"


const palmSettings = [
  {
    position: [2,1,1],
    scale: 1,
    rotationY: 0
  },
  {
    position: [0,1,-1.5],
    scale: 1,
    rotationY: 0
  },
  {
    position: [-2,1,0.2],
    scale: 1,
    rotationY: 0
  },
]

export const Scene = () => {


  return (
    <>
      <Water />
      <Terrain />
      <Dock />
      {palmSettings.map((settings, idx) => (
        <Palm key={`palm-${idx}`} position={settings.position} rotation-y={settings.rotationY} scale={settings.scale} />
      ))}
    </>
  )
}
