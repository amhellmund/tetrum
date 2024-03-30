import { useState } from 'react'
import { Stage, Layer, Rect, Text, Line} from 'react-konva';

import './tetrum.css'

import getGameData from './data';

export type TetrumProperties = {
  width: number;
  height: number;
};


export default function Tetrum(props: TetrumProperties) {
  
  
  return (
    <>
      <div tabIndex={1}>
        <Stage
          className="stage"
          width={600}
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
                  //setHoverRect(hover)
                }
                else {
                  hover.fill(false)
                  //setHoverRect(hover)
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
                //setHoverRect(hover)
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
                  //setHoverRect(hover)
                }
                else {
                  hover.fill(false)
                  //setHoverRect(hover)
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
                //setHoverRect(hover)
              }}
            />


            <Line
              draggable={true}
              x={400}
              y={200}
              closed={true}
              points={[0, 0, 0, 2*BOX_SIZE, 2*BOX_SIZE, 2*BOX_SIZE, 2*BOX_SIZE, BOX_SIZE, BOX_SIZE, BOX_SIZE, BOX_SIZE, 0]}
              fill="rgba(0, 0, 255, 0.5)"
              stroke="black"
              strokeWidth={3}
              opacity={1}
            />

          </Layer>
        </Stage>
        <div>{message1}</div><div>{message2}</div>
      </div>
    </>
  )
}