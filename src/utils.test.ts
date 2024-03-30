import { computeBoxSize, computeCoordinate, getGameSize } from "./utils";

import { MOCK_GAME } from "./mock_data";

test("game dimensions", () => {
    const game_sizes = getGameSize(MOCK_GAME);

    expect(game_sizes.overall).toStrictEqual({width: 17, height: 9});
    expect(game_sizes.shapes).toStrictEqual({width: 8, height: 9});
    expect(game_sizes.board).toStrictEqual({width: 6, height: 6 });
});

test("box size", () => {
    expect(computeBoxSize({width: 6, height: 6}, {width: 1000, height: 600})).toBe(Math.floor(1000 / 6));
});

test("coordinate", () => {
    expect(computeCoordinate({i: 0, j: 0}, 60)).toStrictEqual({x: 0, y: 0});
    expect(computeCoordinate({i: 1, j: 1}, 60)).toStrictEqual({x: 60, y: 60});
    expect(computeCoordinate({i: 5, j: 6}, 60)).toStrictEqual({x: 300, y: 360});
});