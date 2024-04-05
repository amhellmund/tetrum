import { v4 as uuidv4 } from "uuid";
import { Game, Board, Shape } from "./types"

const BOARD: Board = {
    size: {
        width: 2,
        height: 4,
    },
    fields: [
        2, 1,
        0, -1,
        3, null,
        0, 2
    ],
};

const SHAPES: Shape[] = [
    {
        size: {
            width: 2,
            height: 3,
        },
        pos: {
            i: 0,
            j: 0,
        },
        fields: [
            true, false,
            true, true,
            true, false,
        ],
        coordinates: [
            0, 0, 0, 3, 1, 3, 1, 2, 2, 2, 2, 1, 1, 1, 1, 0,
        ],
        color: {
            red: 255,
            green: 0,
            blue: 0,
            alpha: 0.5,
        }
    },
    {
        size: {
            width: 2,
            height: 1,
        },
        pos: {
            i: 0,
            j: 3,
        },
        fields: [
            true, true,
        ],
        coordinates: [
            0, 0, 0, 1, 2, 1, 2, 0,
        ],
        color: {
            red: 255,
            green: 255,
            blue: 0,
            alpha: 0.5,
        }
    },
    {
        size: {
            width: 1,
            height: 1,
        },
        pos: {
            i: 2,
            j: 3,
        },
        fields: [
            true,
        ],
        coordinates: [
            0, 0, 0, 1, 1, 1, 1, 0,
        ],
        color: {
            red: 255,
            green: 0,
            blue: 255,
            alpha: 0.5,
        }
    },
]

export const MOCK_GAME: Game = {
    id: uuidv4(),
    board: BOARD,
    shapes: SHAPES,
}