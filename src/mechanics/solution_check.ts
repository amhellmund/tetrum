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

import { Board, Shape } from "../games/types";
import { Position } from "../utils/location_utils";
import { Size } from "../utils/ui_utils";

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
                                covered_board_numbers_sum += board_field;
                                board_coverage[cur_pos.i * board.size.width + cur_pos.j] = true;
                            }
                        }
                    }
                }
            }
            if (shape_size != covered_board_numbers_sum) {
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