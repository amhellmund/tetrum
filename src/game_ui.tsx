import { useState } from 'react';
import { Line, Rect, Text } from 'react-konva';
import { Board, Position, Shape, Size } from './types';
import { computeCoordinate, composeColorString, computePosition, clipShapeToStage, isShapeInStage, isShapeInBoard } from './utils';


export type BoardUIProperties = {
  box_size: number;
  data: Board;
}

export function BoardUI(props: BoardUIProperties) {
  const board_elements = [];

  for (let i = 0; i < props.data.size.width; ++i) {
    for (let j = 0; j < props.data.size.height; ++j) {
      const field = props.data.fields[j * props.data.size.width + i];
      if (field !== null) {
        board_elements.push(
          <BoardRect
            key={`board-element-${i}-${j}`}
            box_size={props.box_size}
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
  box_size: number;
  pos: Position;
  value: number;
}

function BoardRect(props: BoardRectProperties) {
  const coordinate = computeCoordinate(props.pos, props.box_size);

  return (
    <>
      <Rect
        key={`board-rect-${props.pos.i}-${props.pos.j}`}
        width={props.box_size}
        height={props.box_size}
        fill="white"
        stroke="black"
        strokeWidth={1}
        x={coordinate.x}
        y={coordinate.y}
      />
      <Text
        key={`board-text-${props.pos.i}-${props.pos.j}`}
        text={props.value > 0 ? props.value.toString() : ""}
        width={props.box_size}
        height={props.box_size}
        x={coordinate.x}
        y={coordinate.y}
        align="center"
        verticalAlign="middle"
      />
    </>
  )
}

export type ShapeAreaUIProperties = {
  box_size: number;
  start_pos: Position;
  size: Size;
}

export function ShapeAreaUI(props: ShapeAreaUIProperties) {
  const shape_area_elements = [];

  for (let i = 0; i < props.size.width; ++i) {
    for (let j = 0; j < props.size.height; ++j) {
      const coordinate = computeCoordinate({ i: props.start_pos.i + i, j: props.start_pos.j + j }, props.box_size);
      shape_area_elements.push(
        <Rect
          key={`shape-area-${i}-${j}`}
          width={props.box_size}
          height={props.box_size}
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

export type ShapesUIProperties = {
  box_size: number;
  start_pos: Position;
  data: Shape[];
  board_size: Size;
  stage_size: Size;
}

export function ShapesUI(props: ShapesUIProperties) {
  const shapes = []
  for (const index in props.data) {
    const shape = props.data[index];
    shapes.push(
      <ShapeUI
        key={`shape-${index}`}
        box_size={props.box_size}
        start_pos={props.start_pos}
        data={shape}
        board_size={props.board_size}
        stage_size={props.stage_size}
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

type ShapeUIProperties = {
  box_size: number;
  start_pos: Position;
  data: Shape;
  board_size: Size;
  stage_size: Size;
};

function ShapeUI(props: ShapeUIProperties) {
  const initial_coordinate = computeCoordinate({ i: props.start_pos.i + props.data.pos.i, j: props.start_pos.j + props.data.pos.j }, props.box_size);
  const line_points = props.data.coordinates.map((coordinate) => coordinate * props.box_size);

  const [shapePos, setShapePos] = useState(initial_coordinate);

  return (
    <Line
      draggable={true}
      x={shapePos.x}
      y={shapePos.y}
      closed={true}
      points={line_points}
      fill={composeColorString(props.data.color)}
      stroke="black"
      strokeWidth={2}
      opacity={1}
      onDragMove={(e) => {
        const clipped = clipShapeToStage(props.data, { x: e.target.x(), y: e.target.y() }, props.box_size, props.stage_size);
        setShapePos({ x: clipped.x, y: clipped.y });
      }}
      onDragEnd={(e) => {
        const current_coordinate = {
          x: e.target.x(),
          y: e.target.y(),
        }
        if (isShapeInStage(props.data, current_coordinate, props.box_size, props.stage_size)) {
          const pos = computePosition({ x: e.target.x(), y: e.target.y() }, props.box_size);
          if (isShapeInBoard(props.data, pos, props.board_size)) {
            const snapped_coordinate = computeCoordinate(pos, props.box_size);
            setShapePos(snapped_coordinate);
          }
          else {
            setShapePos(initial_coordinate);
          }
        }
        else {
          setShapePos(initial_coordinate);
        }
      }}
    />
  )
}