import { Coordinate, Game, Size, Position, Color, Shape, Board } from "./types";

export type GameSize = {
    overall: Size;
    board: Size;
    shapes: Size;
}

export const BOARD_STAGE_AREA_SEPERATOR_WIDTH = 2;

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

export const STAGE_PADDING = 50;

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

export function computeCoordinate(pos: Position, box_size: number): Coordinate {
    return {
        x: pos.j * box_size + STAGE_PADDING,
        y: pos.i * box_size + STAGE_PADDING,
    }
}

export function computePosition(coordinate: Coordinate, box_size: number): Position {
    return {
        i: Math.round((coordinate.y - STAGE_PADDING) / box_size),
        j: Math.round((coordinate.x - STAGE_PADDING) / box_size),
    }
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

export function clipShapeToStage(shape: Shape, coordinate: Coordinate, box_size: number, stage_size: Size): Coordinate {
    return {
        x: Math.min(Math.max(0, coordinate.x), stage_size.width - shape.size.width * box_size),
        y: Math.min(Math.max(0, coordinate.y), stage_size.height - shape.size.height * box_size),
    }
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

export type GameSolutionCheck = {
    success: boolean;
    violation_message: string | null;
}

export function checkGameSolution(board: Board, shapes: Shape[], shape_positions: Map<number, Position | null>): GameSolutionCheck {
    const board_coverage = new Array(board.size.width * board.size.height).fill(false);

    for (const [index, pos] of shape_positions.entries()) {
        const shape = shapes[index];
        const shape_size = shape.fields.reduce((acc, value) => acc + (value == true ? 1 : 0), 0);
        if (pos !== null) {
            console.log(`Shape: ${shape.pos.i} - ${shape.pos.j} --- ${pos.i} - ${pos.j}`)
            let covered_board_numbers_sum = 0;
            for (let i = 0; i < shape.size.height; ++i) {
                for (let j = 0; j < shape.size.width; ++j) {
                    if (shape.fields[i * shape.size.width + j] == true) {
                        const cur_pos = {
                            i: pos.i + i,
                            j: pos.j + j,
                        };
                        if (isPosInBoard(cur_pos, board.size)) {
                            const board_field = board.fields[cur_pos.i * board.size.width + cur_pos.j];
                            if (board_field !== null) {
                                console.log(`Acc: ${cur_pos.i} - ${cur_pos.j} - ${board_field}`)
                                covered_board_numbers_sum += board_field;
                                board_coverage[cur_pos.i * board.size.width + cur_pos.j] = true;
                            }
                        }
                    }
                }
            }
            if (shape_size != covered_board_numbers_sum) {
                console.log(`Mismatch: ${shape_size} - ${covered_board_numbers_sum}`)
                return {
                    success: false,
                    violation_message: "Shape size mismatches accumulated board numbers",
                }
            }
        }
    }
    for (let i = 0; i < board.size.height; ++i) {
        for (let j = 0; j < board.size.width; ++j) {
            const index = i * board.size.width + j;
            if (board.fields[index] !== null && board_coverage[index] == false) {
                return {
                    success: false,
                    violation_message: "Board elements are not covered",
                }
            }
        }
    }
    return {
        success: true,
        violation_message: null,
    }
}

function isPosInBoard(pos: Position, board_size: Size): boolean {
    return (pos.i >= 0 && pos.j >= 0 && pos.i < board_size.height && pos.j < board_size.width);
}