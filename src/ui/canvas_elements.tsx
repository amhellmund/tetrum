// Copyright 2024 Andi Hellmund

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { useState } from 'react';
import { Line, Rect, Text } from 'react-konva';
import { Board, Shape } from '../games/types';
import { Position, transformToCoordinate, transformToPosition } from '../utils/location_utils';
import { composeColorString, isShapeInBoard, isShapeInStage, Size } from '../utils/ui_utils';
import { GameState } from '../mechanics/types';
import { GameArea } from './game_stage';

export type CanvasElementBoardProperties = {
  boxSize: number;
  data: Board;
}

export function CanvasElementBoard(props: CanvasElementBoardProperties) {
  const board_elements = [];

  for (let i = 0; i < props.data.size.height; ++i) {
    for (let j = 0; j < props.data.size.width; ++j) {
      const field = props.data.fields[i * props.data.size.width + j];
      if (field !== null) {
        board_elements.push(
          <BoardRect
            key={`board-element-${i}-${j}`}
            boxSize={props.boxSize}
            pos={{
              i: i,
              j: j,
            }}
            value={field}
          />
        )
      }
    }
  }
  return (
    <>
      {
        board_elements
      }
    </>
  )
}

export type BoardRectProperties = {
  boxSize: number;
  pos: Position;
  value: number;
}

function BoardRect(props: BoardRectProperties) {
  const coordinate = transformToCoordinate(props.pos, props.boxSize);

  return (
    <>
      <Rect
        key={`board-rect-${props.pos.i}-${props.pos.j}`}
        width={props.boxSize}
        height={props.boxSize}
        fill="white"
        stroke="black"
        strokeWidth={1}
        x={coordinate.x}
        y={coordinate.y}
      />
      <Text
        key={`board-text-${props.pos.i}-${props.pos.j}`}
        text={props.value == 0 ? "" : (props.value > 0 ? props.value.toString() : `- ${Math.abs(props.value).toString()}`)}
        width={props.boxSize}
        height={props.boxSize}
        x={coordinate.x}
        y={coordinate.y}
        align="center"
        verticalAlign="middle"
      />
    </>
  )
}

export type CanvasElementShapeAreaProperties = {
  boxSize: number;
  startPos: Position;
  size: Size;
}

export function CanvasElementShapeArea(props: CanvasElementShapeAreaProperties) {
  const shape_area_elements = [];

  for (let i = 0; i < props.size.height; ++i) {
    for (let j = 0; j < props.size.width; ++j) {
      const coordinate = transformToCoordinate({ i: props.startPos.i + i, j: props.startPos.j + j }, props.boxSize);
      shape_area_elements.push(
        <Rect
          key={`shape-area-${i}-${j}`}
          width={props.boxSize}
          height={props.boxSize}
          fill="white"
          stroke="rgba(200, 200, 200, 255)"
          strokeWidth={1}
          x={coordinate.x}
          y={coordinate.y}
        />
      )
    }
  }

  return (
    <>
      {
        shape_area_elements
      }
    </>
  )
}

export type CanvasElementShapesProperties = {
  boxSize: number;
  startPos: Position;
  data: Shape[];
  boardSize: Size;
  stageSize: Size;
  gameState: GameState;
  handleActiveArea: (area: GameArea | null) => void;
  handleShapeMove: () => void;
  handleShapePositionUpdate: (shape_index: number, new_pos: Position | null) => void;
}

export function CanvasElementShapes(props: CanvasElementShapesProperties) {
  const shapes = []
  for (const index in props.data) {
    const shape = props.data[index];
    shapes.push(
      <CanvasElementShape
        key={`shape-${index}`}
        shapeIndex={parseInt(index)}
        boxSize={props.boxSize}
        startPos={props.startPos}
        data={shape}
        boardSize={props.boardSize}
        stageSize={props.stageSize}
        gameState={props.gameState}
        handleActiveArea={props.handleActiveArea}
        handleShapeMove={props.handleShapeMove}
        handleShapePositionUpdate={props.handleShapePositionUpdate}
      />
    );
  }

  return (
    <>
      {
        shapes
      }
    </>
  )
}

type CanvasElementShapeProperties = {
  shapeIndex: number;
  boxSize: number;
  startPos: Position;
  data: Shape;
  boardSize: Size;
  stageSize: Size;
  gameState: GameState;
  handleActiveArea: (area: GameArea | null) => void;
  handleShapeMove: () => void;
  handleShapePositionUpdate: (shape_index: number, new_pos: Position | null) => void;
};

function CanvasElementShape(props: CanvasElementShapeProperties) {
  const initial_coordinate = transformToCoordinate({ i: props.startPos.i + props.data.pos.i, j: props.startPos.j + props.data.pos.j }, props.boxSize);
  const line_points = props.data.coordinates.map((coordinate) => coordinate * props.boxSize);

  const [shapePos, setShapePos] = useState(initial_coordinate);
  const [lastArea, setLastArea] = useState(GameArea.Shapes);
  const [lastBoardPos, setLastBoardPos] = useState<Position | null>(null);

  return (
    <Line
      draggable={props.gameState == GameState.Started}
      visible={props.gameState == GameState.Started || props.gameState == GameState.Finished}
      x={shapePos.x}
      y={shapePos.y}
      closed={true}
      points={line_points}
      fill={composeColorString(props.data.color)}
      stroke="black"
      strokeWidth={2}
      opacity={1}
      onDragStart={(e) => {
        const pos = transformToPosition({ x: e.target.x(), y: e.target.y() }, props.boxSize);
        if (isShapeInBoard(props.data, pos, props.boardSize)) {
          setLastArea(GameArea.Board);
          setLastBoardPos(pos);
        }
        else {
          setLastArea(GameArea.Shapes);
          setLastBoardPos(null);
        }
      }}
      onDragMove={(e) => {
        const current_coordinate = {
          x: e.target.x(),
          y: e.target.y(),
        }
        if (isShapeInStage(props.data, current_coordinate, props.boxSize, props.stageSize)) {
          const pos = transformToPosition({ x: e.target.x(), y: e.target.y() }, props.boxSize);
          if (isShapeInBoard(props.data, pos, props.boardSize)) {
            props.handleActiveArea(GameArea.Board);
          }
          else {
            props.handleActiveArea(GameArea.Shapes);
          }
        }
        else {
          props.handleActiveArea(GameArea.Shapes);
        }
        setShapePos(current_coordinate);
      }}
      onDragEnd={(e) => {
        const handleShapeMove = (new_area: GameArea, new_board_pos: Position | null) => {
          if (new_area === lastArea) {
            if (new_area === GameArea.Board && new_board_pos !== null &&
              lastBoardPos !== null && (new_board_pos.i !== lastBoardPos.i || new_board_pos.j !== lastBoardPos.j)) {
              props.handleShapeMove();
            }
          }
          else {
            props.handleShapeMove()
          }
        };

        const current_coordinate = {
          x: e.target.x(),
          y: e.target.y(),
        }
        if (isShapeInStage(props.data, current_coordinate, props.boxSize, props.stageSize)) {
          const pos = transformToPosition({ x: e.target.x(), y: e.target.y() }, props.boxSize);
          if (isShapeInBoard(props.data, pos, props.boardSize)) {
            const snapped_coordinate = transformToCoordinate(pos, props.boxSize);
            setShapePos(snapped_coordinate);
            handleShapeMove(GameArea.Board, pos);
            props.handleShapePositionUpdate(props.shapeIndex, pos);
          }
          else {
            setShapePos(initial_coordinate);
            handleShapeMove(GameArea.Shapes, null);
          }
        }
        else {
          setShapePos(initial_coordinate);
          handleShapeMove(GameArea.Shapes, null);
        }
        props.handleActiveArea(null);
      }}
    />
  )
}

export type CanvasElementActiveAreaProperties = {
  boxSize: number,
  boardSize: Size,
  shapesAreaStartPos: Position,
  shapesAreaSize: Size,
  activeArea: string | null;
}

export function CanvasElementActiveArea(props: CanvasElementActiveAreaProperties) {
  const coordinate_board = transformToCoordinate({ i: 0, j: 0 }, props.boxSize);
  const coordinate_shapes = transformToCoordinate(props.shapesAreaStartPos, props.boxSize);
  return (
    <>
      <Rect
        key={`active-area-marker-board`}
        width={props.boardSize.width * props.boxSize}
        height={props.boardSize.height * props.boxSize}
        stroke="rgba(0, 255, 255, 0.4)"
        strokeWidth={(props.activeArea === null || props.activeArea === GameArea.Shapes) ? 0 : 3}
        x={coordinate_board.x}
        y={coordinate_board.y}
      />
      <Rect
        key={`active-area-marker-shapes`}
        width={props.shapesAreaSize.width * props.boxSize}
        height={props.boardSize.height * props.boxSize}
        stroke="rgba(0, 255, 255, 0.4)"
        strokeWidth={(props.activeArea === null || props.activeArea === GameArea.Board) ? 0 : 3}
        x={coordinate_shapes.x}
        y={coordinate_shapes.y}
      />
    </>
  )
}