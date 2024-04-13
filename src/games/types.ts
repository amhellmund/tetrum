import { Position } from "../utils/location_utils";
import { Size } from "../utils/ui_utils";

export type Game = {
    id: string;
    board: Board;
    shapes: Shape[];
}

export type Board = {
    size: Size;
    fields: (number | null)[];
}

export type Color = {
    red: number;
    green: number;
    blue: number;
    alpha: number;
}

export type Shape = {
    pos: Position;
    size: Size;
    fields: boolean[];
    coordinates: number[];
    color: Color;
}

export function constructColor(rgba: [number, number, number, number]): Color {
    return {
        red: rgba[0],
        green: rgba[1],
        blue: rgba[2],
        alpha: rgba[3],
    }
}