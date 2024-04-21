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

import { Color, Game, Shape } from "../games/types";
import { Coordinate, Position } from "./location_utils";

export const STAGE_PADDING = 50;
export const BOARD_STAGE_AREA_SEPERATOR_WIDTH = 2;

export type Size = {
    width: number;
    height: number;
}

export function createSize(width: number, height: number): Size {
    return {
        width: width,
        height: height,
    }
}

export type GameSize = {
    overall: Size;
    board: Size;
    shapes: Size;
}

export function computeGameSize(game: Game): GameSize {

    const board_size = game.board.size;
    const shapes_size = getShapeSize(game);

    return {
        overall: {
            width: board_size.width + shapes_size.width + BOARD_STAGE_AREA_SEPERATOR_WIDTH,
            height: Math.max(board_size.height, shapes_size.height),
        },
        board: board_size,
        shapes: shapes_size,
    }
}

function getShapeSize(game: Game): Size {
    const max_i_for_shapes = Math.max(
        ...game.shapes.map((shape) => shape.pos.i + shape.size.height), 0
    );
    const max_j_for_shapes = Math.max(
        ...game.shapes.map((shape) => shape.pos.j + shape.size.width), 0
    );

    return {
        width: max_j_for_shapes,
        height: max_i_for_shapes,
    }
}

export function computeStageSize(game_size: Size, box_size: number): Size {
    return {
        width: game_size.width * box_size + 2 * STAGE_PADDING,
        height: game_size.height * box_size + 2 * STAGE_PADDING,
    }
}

export function computeBoxSize(game_size: Size, screen_size: Size): number {
    return Math.min(
        Math.floor(screen_size.width / game_size.width),
        Math.floor(screen_size.height / game_size.height),
    )
}

export function computeShapeAreaStartPos(game_size: GameSize): Position {
    return {
        i: 0,
        j: game_size.board.width + BOARD_STAGE_AREA_SEPERATOR_WIDTH,
    }
}

export function composeColorString(color: Color): string {
    return `rgba(${color.red},${color.green},${color.blue},${color.alpha})`
}

export function isShapeInStage(shape: Shape, coordinate: Coordinate, box_size: number, stage_size: Size): boolean {
    return coordinate.x >= 0 &&
        coordinate.y >= 0 &&
        coordinate.x <= stage_size.width - shape.size.width * box_size &&
        coordinate.y <= stage_size.height - shape.size.height * box_size;
}

export function isShapeInBoard(shape: Shape, pos: Position, board_size: Size): boolean {
    return pos.i >= 0 &&
        pos.j >= 0 &&
        pos.i + shape.size.height <= board_size.height + BOARD_STAGE_AREA_SEPERATOR_WIDTH / 2 &&
        pos.j + shape.size.width <= board_size.width + BOARD_STAGE_AREA_SEPERATOR_WIDTH / 2;
}