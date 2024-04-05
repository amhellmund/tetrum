import { MOCK_GAME } from "../games/mock_game";
import { Position } from "../utils/location_utils";
import { checkGameSolution } from "./solution_check";






test("check solution with board not being covered", () => {
    const result = checkGameSolution(MOCK_GAME.board, MOCK_GAME.shapes, new Map<number, Position>());
    expect(result.success).toBe(false);
    expect(result.violation_message).not.toBe(null);
    expect(result.violation_message).toContain("not covered");
});

test("check solution with shape size mismatch", () => {
    const shape_positions = new Map<number, Position>([
        [0, { i: 0, j: 1 }],
    ]);

    const result = checkGameSolution(MOCK_GAME.board, MOCK_GAME.shapes, shape_positions);

    expect(result.success).toBe(false);
    expect(result.violation_message).not.toBe(null);
    expect(result.violation_message).toContain("size mismatch");
});

test("check solution all shapes being correctly placed", () => {
    const shape_positions = new Map<number, Position>([
        [0, { i: 0, j: 0 }],
        [1, { i: 3, j: 0 }],
        [2, { i: 0, j: 1 }],
    ]);

    const result = checkGameSolution(MOCK_GAME.board, MOCK_GAME.shapes, shape_positions);

    expect(result.success).toBe(true);
    expect(result.violation_message).toBe(null);
});