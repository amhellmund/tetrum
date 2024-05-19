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

import { Size } from "../utils/ui_utils";
import Ajv, { JSONSchemaType } from "ajv";
import { Game, Shape, constructColor } from "./types";
import createColormap from "colormap";
import { Position } from "../utils/location_utils";


export type BoardInput = {
    size: Size;
    fields: (number | null)[];
}

export type ShapeInput = {
    size: Size;
    fields: boolean[];
}

export type GameInput = {
    id: string;
    board: BoardInput;
    shapes: ShapeInput[];
}

const size_schema: JSONSchemaType<Size> = {
    type: "object",
    properties: {
        width: { type: "number" },
        height: { type: "number" },
    },
    required: ["width", "height",]
}

const board_schema: JSONSchemaType<BoardInput> = {
    type: "object",
    properties: {
        size: size_schema,
        fields: {
            type: "array",
            items: { type: "number", nullable: true }
        }
    },
    required: ["size", "fields"]
}

const shape_schema: JSONSchemaType<ShapeInput> = {
    type: "object",
    properties: {
        size: size_schema,
        fields: {
            type: "array",
            items: { type: "boolean" }
        }
    },
    required: ["size", "fields"],
}

const game_schema: JSONSchemaType<GameInput> = {
    type: "object",
    properties: {
        id: { type: "string" },
        board: board_schema,
        shapes: {
            type: "array",
            items: shape_schema
        },
    },
    required: ["id", "board", "shapes"]
}

export function parseInput(data: Record<string, unknown>): GameInput | null {
    const validate = new Ajv().compile(game_schema);
    if (validate(data)) {
        return data;
    }
    else {
        if (validate.errors !== undefined && validate.errors !== null) {
            for (const error of validate.errors) {
                console.log(`${error.instancePath}: ${error.message} [${error.keyword}]`)
            }
        }
        return null;
    }
}

export function convertToGame(input: GameInput): Game {
    return {
        id: input.id,
        board: input.board,
        shapes: convertToShapes(input.shapes),
    }
}

function convertToShapes(input: ShapeInput[]): Shape[] {
    const SHAPE_ALPHA = 0.5;
    const colormap = createColormap(
        {
            colormap: "jet",
            format: "rgba",
            // the "jet" color map requires at least 6 shades
            nshades: Math.max(input.length, 6),
        }
    )

    return input.map((shape, index) => {
        return {
            size: shape.size,
            fields: shape.fields,
            coordinates: [0, 0, 1, 1],
            color: constructColor([colormap[index][0], colormap[index][1], colormap[index][2], SHAPE_ALPHA]),
            pos: {
                i: 0,
                j: 0,
            }
        }
    });
}


/**
 * Converts a shape specification into a list of drawable coordinates.
 * 
 * This function assumes that the shape is solid without holes inside.
 * 
 * @param size The size of the shape as rectangle.
 * @param fields The indication which cells the shape are used for game.
 * @returns The list of drawable coordinates [[x1, y1], ... [xN, yN]]. 
 * The x-coordinate points in horizontal direction, while the y-coordinate
 * points into the vertical direction.
 */
export function convertToCoordinates(size: Size, fields: boolean[]): number[][] {
    // Each shape is represented by a rectangle of the given size. To find the coordinates
    // of the hull, we iterate in the counter-clockwise direction over the outer cells. We
    // start from the top-left corner and move in the vertical direction until we reach the
    // either the end or a cell with a value of false.

    const cells_of_hull_counter_clockwise: Position[] = [];

    const first_cell_left_border = findFirstCellOnLeftBorder(size, fields);
    cells_of_hull_counter_clockwise.push(first_cell_left_border);

    // traverse the left border
    const left_border_traversal = traverse(size, fields, first_cell_left_border, [1, 0], [0, 1]);

    // traverse the bottom border

    // traverse the right border

    // traverse the top border

    // flatten the coordinates
    return coordinates;
}

function findFirstCellOnLeftBorder(size: Size, fields: boolean[]): Position | never {
    for (let i = 0; i < size.height; i++) {
        if (fields[i * size.width]) {
            return { i, j };
        }
    }
    throw new Error("No cell found on the left border.");
}