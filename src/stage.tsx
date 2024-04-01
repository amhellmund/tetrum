import { Stage, Layer } from 'react-konva';

import './css/game_stage.css'

import getGameData from './data';
import { computeBoxSize, computeGameSize, computeStageSize, computeShapeAreaStartPos } from './utils';
import { BoardUI, ShapeAreaUI, ShapesUI, ActiveAreaMarkerUI } from './elements';
import { useState } from 'react';
import { GameArea, GameState, Position } from './types';

export type TetrumProperties = {
  game: Game
  width: number;
  height: number;
  gameState: GameState;
  handleShapeMove: () => void;
  handleShapePositionUpdate: (shape_index: number, new_pos: Position | null) => void;
};


export default function GameStage(props: TetrumProperties) {
  const game_size = computeGameSize(props.game);
  const box_size = computeBoxSize(game_size.overall, { width: props.width, height: props.height });

  const stage_size = computeStageSize(game_size.overall, box_size);
  const shape_area_start_pos = computeShapeAreaStartPos(game_size);

  const [activeArea, setActiveArea] = useState<GameArea | null>(null);

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
              boxSize={box_size}
              data={props.game.board}
            />
          </Layer>
          <Layer key="shapes-area">
            <ShapeAreaUI
              key="shapes-area-ui"
              boxSize={box_size}
              startPos={shape_area_start_pos}
              size={game_size.shapes}
            />
          </Layer>
          <Layer key="active-region-marker">
            <ActiveAreaMarkerUI
              boxSize={box_size}
              boardSize={game_size.board}
              shapesAreaStartPos={shape_area_start_pos}
              shapesAreaSize={game_size.shapes}
              activeArea={activeArea}
            />
          </Layer>
          <Layer key="shapes">
            <ShapesUI
              key="shapes-ui"
              boxSize={box_size}
              startPos={shape_area_start_pos}
              data={props.game.shapes}
              boardSize={game_size.board}
              stageSize={stage_size}
              gameState={props.gameState}
              handleActiveArea={(active_area) => setActiveArea(active_area)}
              handleShapeMove={props.handleShapeMove}
              handleShapePositionUpdate={props.handleShapePositionUpdate}
            />
          </Layer>

        </Stage>
      </div>
    </>
  )
}