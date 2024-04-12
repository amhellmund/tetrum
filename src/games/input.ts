import { Size } from "../utils/ui_utils";
import Ajv, { JSONSchemaType } from "ajv";


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