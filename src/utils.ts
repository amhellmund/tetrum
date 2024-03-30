import { Game, Dimensions } from "./types";

export function getGameDimensions (game: Game): Dimensions {
    const dim_shapes = getShapeDimensions(game);

    return {
        width: game.board.dim.width + dim_shapes.width,
        height: game.board.dim.height + dim_shapes.height,
    }
}

export function getShapeDimensions (game: Game): Dimensions {
    const max_x_for_shapes = Math.max(
        ...game.shapes.map((shape) => shape.pos.x + shape.dim.width), 0
    );
    const max_y_for_shapes = Math.max(
        ...game.shapes.map((shape) => shape.pos.y + shape.dim.height), 0
    );

    return {
        width: max_x_for_shapes,
        height: max_y_for_shapes,
    }
}