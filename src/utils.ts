import { Coordinate, Game, Size, Position, Color } from "./types";

export type GameSize = {
    overall: Size;
    board: Size;
    shapes: Size;
}

export const BOARD_STAGE_AREA_SEPERATOR_WIDTH = 3;

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
    const max_x_for_shapes = Math.max(
        ...game.shapes.map((shape) => shape.pos.i + shape.size.width), 0
    );
    const max_y_for_shapes = Math.max(
        ...game.shapes.map((shape) => shape.pos.j + shape.size.height), 0
    );

    return {
        width: max_x_for_shapes,
        height: max_y_for_shapes,
    }
}

export const STAGE_PADDING = 5;

export function computeStageSize(game_size: Size, box_size: number): Size {
    return {
        width: game_size.width * box_size + 2 * STAGE_PADDING,
        height: game_size.height * box_size + 2 * STAGE_PADDING,
    }
}

export function computeBoxSize(game_size: Size, screen_size: Size): number {
    return Math.floor(screen_size.width / game_size.width);
}

export function computeCoordinate(pos: Position, box_size: number): Coordinate {
    return {
        x: pos.i * box_size + STAGE_PADDING,
        y: pos.j * box_size + STAGE_PADDING,
    }
}

export function computeShapeAreaStartPos(game_size: GameSize): Position {
    return {
        i: game_size.board.width + BOARD_STAGE_AREA_SEPERATOR_WIDTH,
        j: 0,
    }
}

export function composeColorString(color: Color): string {
    return `rgba(${color.red},${color.green},${color.blue},${color.alpha})`
}