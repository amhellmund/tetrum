import { useState } from 'react'
import { Stage, Layer, Rect, Text, Line } from 'react-konva';

import './tetrum.css'

import getGameData from './data';
import { computeBoxSize, getGameSize, computeStageSize } from './utils';
import { BoardUI } from './board';

export type TetrumProperties = {
  width: number;
  height: number;
};


export default function Tetrum(props: TetrumProperties) {
  const game = getGameData();
  const game_size = getGameSize(game);
  const box_size = computeBoxSize(game_size.overall, { width: props.width, height: props.height });

  const stage_size = computeStageSize(game_size.overall, box_size);

  return (
    <>
      <div tabIndex={1}>
        <Stage
          className="stage"
          width={stage_size.width}
          height={stage_size.height}
        >
          <Layer name="game-board">
            <BoardUI
              box_size={box_size}
              data={game.board}
            />
          </Layer>

        </Stage>
      </div>
    </>
  )
}