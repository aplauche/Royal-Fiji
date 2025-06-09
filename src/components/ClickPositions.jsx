import { useState } from 'react';
import { Html } from '@react-three/drei';

function Marker({ position }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.5, 8, 8]} />
      <meshStandardMaterial color="yellow" />
    </mesh>
  );
}

function Overlay({ positions, onExport, onClear }) {
  return (
    <Html position={[0, 0, 0]} zIndexRange={[10, 0]} fullscreen>
      <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        background: 'rgba(0,0,0,0.7)',
        padding: 10,
        color: 'white',
        fontFamily: 'monospace',
        fontSize: 12,
        borderRadius: 4,
        maxWidth: 300,
      }}>
        <div><strong>Clicked Positions: {positions.length}</strong></div>
        <button onClick={onExport} style={{ marginTop: 4 }}>📋 Copy JSON</button>
        <button onClick={onClear} style={{ marginLeft: 4 }}>🗑 Clear</button>
        <ul style={{ maxHeight: 200, overflowY: 'scroll', marginTop: 8 }}>
          {positions.map((p, i) => (
            <li key={i}>
              [{p.x.toFixed(2)}, {p.y.toFixed(2)}, {p.z.toFixed(2)}]
            </li>
          ))}
        </ul>
      </div>
    </Html>
  );
}

export function ClickPositions({ children }) {
  const [positions, setPositions] = useState([]);

  const handleClick = (e) => {
    setPositions((prev) => [...prev, e.point.clone()]);
  };

  return (
    <>
      {/* Wrap children in a group that listens to clicks */}
      <group onClick={handleClick}>
        {children}
      </group>

      {/* Render markers at clicked positions */}
      {positions.map((pos, i) => (
        <Marker key={i} position={pos} />
      ))}

      {/* UI for export and clear */}
      <Overlay
        positions={positions}
        onExport={() => {
          const formatted = positions.map((p) => ([
            parseFloat(p.x.toFixed(2)),
            parseFloat(p.y.toFixed(2)),
            parseFloat(p.z.toFixed(2)),
          ]));
          navigator.clipboard.writeText(JSON.stringify(formatted, null, 2));
          alert('Copied coordinates to clipboard!');
        }}
        onClear={() => setPositions([])}
      />
    </>
  );
}
