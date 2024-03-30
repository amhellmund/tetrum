export type Dimensions = {
    width: number;
    height: number;
}

export type Position = {
    x: number;
    y: number; 
}

export type Game = {
    id: string;
    board: Board;
    shapes: Shape[];
}

export type Board = {
    dim: Dimensions;
    fields: (number | null)[];
}

export type Shape = {
    pos: Position;
    dim: Dimensions;
    fields: boolean[];
}
