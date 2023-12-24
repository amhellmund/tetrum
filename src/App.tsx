import { useState, useRef } from 'react'
import { Stage, Layer, Rect, Text, Group } from 'react-konva';
import './App.css'

interface SpecialRectProps {
  x: number;
  y: number;
  color: string;
  hover: boolean;
  number: string;
}

const BOX_SIZE = 60

function SpecialRect (props: SpecialRectProps) {
  return (
    <>
      <Rect 
        width={BOX_SIZE}
        height={BOX_SIZE}
        fill={props.hover ? "red" : "white"}
        stroke="black"
        x={props.x}
        y={props.y}
      />
      <Text
        text={props.number}
        width={BOX_SIZE}
        height={BOX_SIZE}
        x={props.x}
        y={props.y}
        align="center"
        verticalAlign="middle"
      />
    </>
  )
}

function App() {
  const [message1, setMessage1] = useState("<no message>")
  const [message2, setMessage2] = useState("<no message>")
  const [pos, setPos] = useState({x: 400, y: 10})
  const [pos1, setPos1] = useState({x: 400, y: 100})
  const [lastPos, setLastPos] = useState(pos)
  const [lastPos1, setLastPos1] = useState(pos)
  const hover = new Array(25);
  hover.fill(false)
  const [hoverRect, setHoverRect] = useState(hover)

  const rects = [];
  
  for (let i = 0; i < 5; ++i) {
    for (let j = 0; j < 5; ++j) {
      rects.push(<SpecialRect x={10 + i*BOX_SIZE} y={10 + j*BOX_SIZE} hover={hoverRect[i*5 + j]} number={(i*5+j).toString()} />)
    }
  }

  return (
    <>
      <h1>Tetrum</h1>
      <div
        tabIndex={1}
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
              x={pos.x}
              y={pos.y}
              fill="rgba(0, 0, 255, 0.5)"
              stroke="black"
              strokeWidth={3}
              width={2*BOX_SIZE}
              height={BOX_SIZE}
              opacity={1}
              onDragMove={(e) => {
                setPos({x: e.target.x(), y: e.target.y()})
                if (e.target.x() >= 10 && e.target.x() <= (10 + 5*BOX_SIZE) && e.target.y() >= 10 && e.target.y() <= (10 + 5 * BOX_SIZE)) {
                  const x = Math.floor((e.target.x() - 10) / BOX_SIZE)
                  const y = Math.floor((e.target.y() - 10) / BOX_SIZE)
                  hover.fill(false)
                  hover[x * 5 + y] = true
                  setHoverRect(hover)
                }
                else {
                  hover.fill(false)
                  setHoverRect(hover)
                }             
              }}
              onDragEnd={(e) => {
                if (e.target.x() >= 10 && e.target.x() <= (10 + 5*BOX_SIZE) && e.target.y() >= 10 && e.target.y() <= (10 + 5 * BOX_SIZE)) {
                  const targetX = Math.max(10, 10 + (Math.round((e.target.x() - 10) / BOX_SIZE) * BOX_SIZE))
                  const targetY = Math.max(10, 10 + (Math.round((e.target.y() - 10) / BOX_SIZE) * BOX_SIZE))
                  setPos({x: targetX, y: targetY})
                  setLastPos({x: targetX, y: targetY})
                }
                else {
                  setPos(lastPos)
                }
                hover.fill(false)
                setHoverRect(hover)
              }}
            />
            <Rect
              draggable={true}
              x={pos1.x}
              y={pos1.y}
              fill="rgba(0, 0, 255, 0.5)"
              stroke="black"
              strokeWidth={3}
              width={2*BOX_SIZE}
              height={2*BOX_SIZE}
              opacity={1}
              onDragMove={(e) => {
                setPos1({x: e.target.x(), y: e.target.y()})
                if (e.target.x() >= 10 && e.target.x() <= (10 + 5*BOX_SIZE) && e.target.y() >= 10 && e.target.y() <= (10 + 5 * BOX_SIZE)) {
                  const x = Math.floor((e.target.x() - 10) / BOX_SIZE)
                  const y = Math.floor((e.target.y() - 10) / BOX_SIZE)
                  hover.fill(false)
                  hover[x * 5 + y] = true
                  setHoverRect(hover)
                }
                else {
                  hover.fill(false)
                  setHoverRect(hover)
                }             
              }}
              onDragEnd={(e) => {
                if (e.target.x() >= 10 && e.target.x() <= (10 + 5*BOX_SIZE) && e.target.y() >= 10 && e.target.y() <= (10 + 5 * BOX_SIZE)) {
                  const targetX = Math.max(10, 10 + (Math.round((e.target.x() - 10) / BOX_SIZE) * BOX_SIZE))
                  const targetY = Math.max(10, 10 + (Math.round((e.target.y() - 10) / BOX_SIZE) * BOX_SIZE))
                  setPos1({x: targetX, y: targetY})
                  setLastPos1({x: targetX, y: targetY})
                }
                else {
                  setPos1(lastPos1)
                }
                hover.fill(false)
                setHoverRect(hover)
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
