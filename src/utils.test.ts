import {
    checkGameSolution,
    computeBoxSize,
    computeCoordinate,
    computeShapeAreaStartPos,
    computeStageSize,
    computeGameSize,
    composeColorString,
    computePosition,
    STAGE_PADDING,
    BOARD_STAGE_AREA_SEPERATOR_WIDTH,
} from "./utils";

import { Position } from "./types";

import { MOCK_GAME } from "./mock_data";

test("game dimensions", () => {
    const game_sizes = computeGameSize(MOCK_GAME);

    expect(game_sizes.overall).toStrictEqual({ width: 16, height: 9 });
    expect(game_sizes.shapes).toStrictEqual({ width: 8, height: 9 });
    expect(game_sizes.board).toStrictEqual({ width: 6, height: 6 });
});

test("box size", () => {
    expect(computeBoxSize({ width: 6, height: 6 }, { width: 1000, height: 1200 })).toBe(Math.floor(1000 / 6));
    expect(computeBoxSize({ width: 6, height: 6 }, { width: 1000, height: 600 })).toBe(Math.floor(600 / 6));
});

test("stage size", () => {
    const stage_size = computeStageSize({ width: 10, height: 5 }, 50);
    expect(stage_size.width).toBe(500 + 2 * STAGE_PADDING);
    expect(stage_size.height).toBe(250 + 2 * STAGE_PADDING);
});

test("coordinate", () => {
    expect(computeCoordinate({ i: 0, j: 0 }, 60)).toStrictEqual({ x: 0 + STAGE_PADDING, y: 0 + STAGE_PADDING });
    expect(computeCoordinate({ i: 1, j: 1 }, 60)).toStrictEqual({ x: 60 + STAGE_PADDING, y: 60 + STAGE_PADDING });
    expect(computeCoordinate({ i: 5, j: 6 }, 60)).toStrictEqual({ x: 360 + STAGE_PADDING, y: 300 + STAGE_PADDING });
});

test("position", () => {
    expect(computePosition({ x: 0 + STAGE_PADDING, y: 0 + STAGE_PADDING }, 60)).toStrictEqual({ i: 0, j: 0 });
    expect(computePosition({ x: 120 + STAGE_PADDING, y: 110 + STAGE_PADDING }, 60)).toStrictEqual({ i: 2, j: 2 })
    expect(computePosition({ x: -50 + STAGE_PADDING, y: -120 + STAGE_PADDING }, 60)).toStrictEqual({ i: -2, j: -1 });
});

test("shape area start position", () => {
    const game_size = computeGameSize(MOCK_GAME);
    const start_pos = computeShapeAreaStartPos(game_size);

    expect(start_pos).toStrictEqual({ i: 0, j: game_size.board.width + BOARD_STAGE_AREA_SEPERATOR_WIDTH })
});

test("color", () => {
    expect(composeColorString({ red: 128, green: 200, blue: 255, alpha: 0.5 })).toBe("rgba(128,200,255,0.5)");
});

test("check solution with board not being covered", () => {
    const result = checkGameSolution(MOCK_GAME.board, MOCK_GAME.shapes, new Map<number, Position>());
    expect(result.success).toBe(false);
    expect(result.violation_message).not.toBe(null);
    expect(result.violation_message).toContain("not covered");
});

test("check solution with shape size mismatch", () => {
    const shape_positions = new Map<number, Position>([
        [0, { i: 0, j: 0 }],
    ]);

    const result = checkGameSolution(MOCK_GAME.board, MOCK_GAME.shapes, shape_positions);

    expect(result.success).toBe(false);
    expect(result.violation_message).not.toBe(null);
    expect(result.violation_message).toContain("size mismatch");
});

test("check solution all shapes being correctly placed", () => {
    const shape_positions = new Map<number, Position>([
        [0, { i: 2, j: 1 }],
        [1, { i: 4, j: 2 }],
        [2, { i: 0, j: 0 }],
        [3, { i: 1, j: 4 }],
        [4, { i: 0, j: 2 }],
        [5, { i: 4, j: 0 }],
    ]);

    const result = checkGameSolution(MOCK_GAME.board, MOCK_GAME.shapes, shape_positions);

    expect(result.success).toBe(true);
    expect(result.violation_message).toBe(null);
});