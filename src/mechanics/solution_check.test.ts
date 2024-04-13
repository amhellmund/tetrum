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