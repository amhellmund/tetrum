import { Rect, Text } from 'react-konva';
import { Board, Position } from './types';
import { computeCoordinate } from './utils';


export type BoardProperties = {
  box_size: number;
  data: Board;
}

export function BoardUI(props: BoardProperties) {
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