export type Size = {
    width: number;
    height: number;
}

export type Position = {
    i: number;
    j: number;
}

export type Coordinate = {
    x: number;
    y: number;
}

export type Game = {
    id: string;
    board: Board;
    shapes: Shape[];
}

export type Board = {
    size: Size;
    fields: (number | null)[];
}

export type Shape = {
    pos: Position;
    size: Size;
    fields: boolean[];
}
