import { STAGE_PADDING } from "./ui_utils"

export type Position = {
    i: number;
    j: number;
}

export type Coordinate = {
    x: number;
    y: number;
}

export function transformToCoordinate(pos: Position, box_size: number): Coordinate {
    return {
        x: pos.j * box_size + STAGE_PADDING,
        y: pos.i * box_size + STAGE_PADDING,
    }
}

export function transformToPosition(coordinate: Coordinate, box_size: number): Position {
    return {
        i: Math.round((coordinate.y - STAGE_PADDING) / box_size),
        j: Math.round((coordinate.x - STAGE_PADDING) / box_size),
    }
}