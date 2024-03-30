import { Line, Rect, Text } from 'react-konva';
import { Board, Position, Shape, Size } from './types';
import { computeCoordinate, getColorString } from './utils';


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
        width={props.box_size}
        height={props.box_size}
        fill="white"
        stroke="black"
        strokeWidth={1}
        x={coordinate.x}
        y={coordinate.y}
      />
      <Text
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
}

export function ShapesUI(props: ShapesUIProperties) {
  const shapes = []
  for (const shape of props.data) {
    const coordinate = computeCoordinate({ i: props.start_pos.i + shape.pos.i, j: props.start_pos.j + shape.pos.j }, props.box_size);
    const line_points = shape.coordinates.map((coordinate) => coordinate * props.box_size);
    shapes.push(
      <Line
        draggable={true}
        x={coordinate.x}
        y={coordinate.y}
        closed={true}
        points={line_points}
        fill={getColorString(shape.color)}
        stroke="black"
        strokeWidth={2}
        opacity={1}
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