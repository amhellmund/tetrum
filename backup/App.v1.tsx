import { useState, useRef } from 'react'
import { Stage, Layer, Rect, Text, Group } from 'react-konva';
import './App.css'

interface SpecialRectProps {
  x: number;
  y: number;
  color: string;
}

function SpecialRect (props: SpecialRectProps) {
  const [color, setColor] = useState("white")

  return (
    <Rect 
      width={50}
      height={50}
      fill={color}
      stroke="black"
      x={props.x}
      y={props.y}
      onMouseOver={() => setColor("red")}
      onMouseLeave={() => setColor("white")}
    />
  )
}

function App() {
  const [message1, setMessage1] = useState("<no message>")
  const [message2, setMessage2] = useState("<no message>")
  // const [enableSnap, setEnableSnap] = useState(false)
  // const [snapposy, setSnapposy] = useState(-1)
  const [posBoxX, setPosBoxX] = useState(300)
  const [posBoxY, setPosBoxY] = useState(10)
  const [counter, setCounter] = useState(0)
  const [posXDelta, setPosXDelta] = useState(0)
  const [posYDelta, setPosYDelta] = useState(0)
  const ref_layer = useRef()
  const ref_rect = useRef()

  const rects = [];
  
  for (let i = 0; i < 5; ++i) {
    for (let j = 0; j < 5; ++j) {
      rects.push(<SpecialRect x={10 + i*50} y={10 + j*50} />)
    }
  }

  return (
    <>
      <h1>Tetrum</h1>
      <div
        tabIndex={1}
        onKeyDown={(e) => {
          setMessage(e.key)
          if (e.key === "Shift") {
            setEnableSnap(true);
          }
        }}
        onKeyUp={(e) => {
          if (e.key === "Shift") {
            setEnableSnap(false);
          }
        }}
      >
        <Stage
          className="stage"
          width={1024}
          height={600}
        >
          <Layer>
            {
              rects
            }
          </Layer>
          <Layer>
            <Rect
              draggable={true}
              x={rectPosX}
              y={rectPosY}
              fill="blue"
              stroke="black"
              width={100}
              height={50}
              opacity={0.5}
              onDragEnd={(e) => {
                setPosBoxX(Math.floor(e.target.x() / 10) * 10)
                setPosBoxY(Math.floor(e.target.y() / 10) * 10)
              }}
            />
          </Layer>
        </Stage>
        <div>{message1}</div><div>{message2}</div>
      </div>
    </>
  )
}

export default App
