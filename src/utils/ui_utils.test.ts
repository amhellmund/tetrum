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

import { computeGameSize, computeBoxSize, computeStageSize, STAGE_PADDING, computeShapeAreaStartPos, BOARD_STAGE_AREA_SEPERATOR_WIDTH, composeColorString } from "./ui_utils";

import { MOCK_GAME } from "../games/mock_game";

test("game dimensions", () => {
    const game_sizes = computeGameSize(MOCK_GAME);

    expect(game_sizes.overall).toStrictEqual({ width: 9, height: 4 });
    expect(game_sizes.shapes).toStrictEqual({ width: 5, height: 3 });
    expect(game_sizes.board).toStrictEqual({ width: 2, height: 4 });
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

test("shape area start position", () => {
    const game_size = computeGameSize(MOCK_GAME);
    const start_pos = computeShapeAreaStartPos(game_size);

    expect(start_pos).toStrictEqual({ i: 0, j: game_size.board.width + BOARD_STAGE_AREA_SEPERATOR_WIDTH })
});

test("color", () => {
    expect(composeColorString({ red: 128, green: 200, blue: 255, alpha: 0.5 })).toBe("rgba(128,200,255,0.5)");
});