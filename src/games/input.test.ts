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

import { createSize, Size } from "../utils/ui_utils";
import { convertToGame, convertToCoordinates, parseInput, GameInput } from "./input";

test("parseInput with correct game input", () => {
    const TEST_DATA = {
        id: "uuid",
        board: {
            size: {
                width: 2,
                height: 1,
            },
            fields: [0, null],
        },
        shapes: [
            {
                size: {
                    width: 1,
                    height: 1,
                },
                fields: [true],
            }
        ]
    }

    const game_input = parseInput(TEST_DATA);

    expect(game_input).not.toBe(null);
});

test("parseInput with incorrect game input", () => {
    const TEST_DATA = {
        id: 12,
        board: {
            size: {
                widthh: 2,
                height: 1,
            },
            fields: ["abc", null],
        },
        shapes: [
            {
                size: {
                    width: 1,
                    height: 1,
                },
                fields: [true],
            }
        ]
    }

    const game_input = parseInput(TEST_DATA);

    expect(game_input).toBe(null);
});

test("convert game input to game", () => {
    const TEST_DATA: GameInput = {
        id: "uuid",
        board: {
            size: {
                width: 2,
                height: 1
            },
            fields: [0, null],
        },
        shapes: [
            {
                size: {
                    width: 1,
                    height: 1,
                },
                fields: [true],
            },
            {
                size: {
                    width: 1,
                    height: 2,
                },
                fields: [true, false],
            }
        ]
    }

    const game = convertToGame(TEST_DATA);

    expect(game.id).toBe(TEST_DATA.id);
    expect(game.board).toStrictEqual(TEST_DATA.board);

    for (const index in game.shapes) {
        expect(game.shapes[index].size).toStrictEqual(TEST_DATA.shapes[index].size);
        expect(game.shapes[index].fields).toStrictEqual(TEST_DATA.shapes[index].fields);
        expect(game.shapes[index].pos).toStrictEqual({ i: 0, j: 0 });
        expect(game.shapes[index].coordinates).toStrictEqual([0, 0, 1, 1]);
    }

    const color_set = new Set(game.shapes.map((shape) => shape.color));
    expect(color_set.size).toBe(game.shapes.length);
})

type FieldsToCoordinatesTestData = {
    size: Size;
    fields: boolean[];
    coordinates: number[];
}

function createTestData(width: number, height: number, fields: boolean[], coordinates: number[]): FieldsToCoordinatesTestData {
    return {
        size: createSize(width, height),
        fields: fields,
        coordinates: coordinates,
    }
}

const TEST_DATA = [
    // Shape:
    //   ##
    //   #
    createTestData(2, 2, [
        true, true,
        true, false
    ], [
        0, 0, 0, 2, 1, 2, 1, 1, 2, 1, 2, 0
    ]),
    // Shape:
    //    #
    //    #
    //   ##
    createTestData(2, 3, [
        false, true,
        false, true,
        true, true
    ], [
        0, 2, 0, 3, 2, 3, 2, 0, 1, 0, 1, 2
    ]),
    // Shape:
    //   #
    createTestData(1, 1, [true], [
        0, 0, 0, 1, 1, 1, 1, 0
    ]),
    // Shape:
    //    #
    //   ###
    createTestData(3, 2, [
        false, true, false,
        true, true, true
    ], [
        1, 0, 1, 1, 0, 1, 0, 2, 3, 2, 3, 1, 2, 1, 2, 0
    ]),
    // Shape:
    //   #
    //   #
    //   #
    createTestData(1, 3, [
        true,
        true,
        true
    ], [
        0, 0, 0, 3, 1, 3, 1, 0
    ]),
    // Shape:
    //   ####
    //      #
    //      #
    createTestData(4, 3, [
        true, true, true, true,
        false, false, false, true,
        false, false, false, true
    ], [
        0, 0, 0, 1, 3, 1, 3, 3, 4, 3, 4, 0
    ]),
    // Shape:
    //   ###
    //   #
    //   #
    createTestData(3, 3, [
        true, true, true,
        true, false, false,
        true, false, false
    ], [
        0, 0, 0, 3, 1, 3, 1, 1, 3, 1, 3, 0
    ]),
    // Shape:
    //   ##
    //   #
    //   ##
    createTestData(2, 3, [
        true, true,
        true, false,
        true, true
    ], [
        0, 0, 0, 3, 2, 3, 2, 2, 1, 2, 1, 1, 2, 1, 2, 0
    ]),
    // Shape:
    //   ##
    //    #
    //    ##
    createTestData(3, 3, [
        true, true, false,
        false, true, false,
        false, true, true
    ], [
        0, 0, 0, 1, 1, 1, 1, 3, 3, 3, 3, 2, 2, 2, 2, 0
    ])
]

describe("fields to coordinates conversion", () => {
    it.each(TEST_DATA)("conversion with test data %p", (data: FieldsToCoordinatesTestData) => {
        expect(convertToCoordinates(data.size, data.fields)).toStrictEqual(data.coordinates)
    })
})