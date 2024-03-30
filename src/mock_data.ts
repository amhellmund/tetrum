import {v4 as uuidv4} from "uuid";
import { Game, Board, Shape} from "./types" 

const BOARD: Board = {
    dim: {
        width: 6,
        height: 6,
    },
    fields: [
        1, 1, 0, 1, null, null,
        0, 2, 3, 0, 1, null,
        null, 0, 2, 0, 2, 0,
        null, 2, 2, 0, 1, 1,
        1, 0, 0, 2, 1, 0,
        2, 1, 2, 2, null, null,
    ],
};

const SHAPES: Shape[] = [
    {
        dim: {
            width: 3,
            height: 2,
        },
        pos: {
            x: 0,
            y: 0,
        },
        fields: [
            true, true, true,
            true, true, true,
        ],
    },
    {
        dim: {
            width: 4,
            height: 2,
        },
        pos: {
            x: 0,
            y: 3,
        },
        fields: [
            true, true, true, true,
            false, true, false, true,
        ],
    },
    {
        dim: {
            width: 2,
            height: 2,
        },
        pos: {
            x: 0,
            y: 6,
        },
        fields: [
            true, true,
            true, true,
        ],
    },
    {
        dim: {
            width: 2,
            height: 3,
        },
        pos: {
            x: 5,
            y: 0,
        },
        fields: [
            true, false,
            true, true,
            true, true,
        ],
    },
    {
        dim: {
            width: 2,
            height: 2,
        },
        pos: {
            x: 5,
            y: 4,
        },
        fields: [
            true, true,
            true, true,
        ],
    },
    {
        dim: {
            width: 3,
            height: 2,
        },
        pos: {
            x: 5,
            y: 7,
        },
        fields: [
            true, true, false,
            true, true, true,
        ]
    }
]

export const MOCK_GAME: Game = {
    id: uuidv4(),
    board: BOARD,
    shapes: SHAPES,
}