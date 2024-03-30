import { useState } from 'react'
import { Stage, Layer, Rect, Text, Line } from 'react-konva';

import './tetrum.css'

import getGameData from './data';
import { computeBoxSize, computeGameSize, computeStageSize, computeShapeAreaStartPos } from './utils';
import { BoardUI, ShapeAreaUI, ShapesUI } from './game_ui';

export type TetrumProperties = {
  width: number;
  height: number;
};


export default function Tetrum(props: TetrumProperties) {
  const game = getGameData();
  const game_size = computeGameSize(game);
  const box_size = computeBoxSize(game_size.overall, { width: props.width, height: props.height });

  const stage_size = computeStageSize(game_size.overall, box_size);
  const shape_area_start_pos = computeShapeAreaStartPos(game_size);

  return (
    <>
      <div tabIndex={1}>
        <Stage
          className="stage"
          width={stage_size.width}
          height={stage_size.height}
        >
          <Layer key="game-board">
            <BoardUI
              key="game-board-ui"
              box_size={box_size}
              data={game.board}
            />
          </Layer>
          <Layer key="shapes-area">
            <ShapeAreaUI
              key="shapes-area-ui"
              box_size={box_size}
              start_pos={shape_area_start_pos}
              size={game_size.shapes}
            />
          </Layer>
          <Layer key="shapes">
            <ShapesUI
              key="shapes-ui"
              box_size={box_size}
              start_pos={shape_area_start_pos}
              data={game.shapes}
              board_size={game_size.board}
            />
          </Layer>

        </Stage>
      </div>
    </>
  )
}