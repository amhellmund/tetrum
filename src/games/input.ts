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

export function convertToCoordinates(size: Size, fields: boolean[]): number[] {
    return [fields.length, size.height, size.width];
}