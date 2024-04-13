import { convertToGame, parseInput, GameInput } from "./input";

test("parseInput with correct game input", () => {
    const TEST_DATA = {
        id: "uuid",
        board: {
            size: {
                width: 2,
                height: 1,
            },
            fields: [0, null],
        },
        shapes: [
            {
                size: {
                    width: 1,
                    height: 1,
                },
                fields: [true],
            }
        ]
    }

    const game_input = parseInput(TEST_DATA);

    expect(game_input).not.toBe(null);
});

test("parseInput with incorrect game input", () => {
    const TEST_DATA = {
        id: 12,
        board: {
            size: {
                widthh: 2,
                height: 1,
            },
            fields: ["abc", null],
        },
        shapes: [
            {
                size: {
                    width: 1,
                    height: 1,
                },
                fields: [true],
            }
        ]
    }

    const game_input = parseInput(TEST_DATA);

    expect(game_input).toBe(null);
});

test("convert game input to game", () => {
    const TEST_DATA: GameInput = {
        id: "uuid",
        board: {
            size: {
                width: 2,
                height: 1
            },
            fields: [0, null],
        },
        shapes: [
            {
                size: {
                    width: 1,
                    height: 1,
                },
                fields: [true],
            },
            {
                size: {
                    width: 1,
                    height: 2,
                },
                fields: [true, false],
            }
        ]
    }

    const game = convertToGame(TEST_DATA);

    expect(game.id).toBe(TEST_DATA.id);
    expect(game.board).toStrictEqual(TEST_DATA.board);

    for (const index in game.shapes) {
        expect(game.shapes[index].size).toStrictEqual(TEST_DATA.shapes[index].size);
        expect(game.shapes[index].fields).toStrictEqual(TEST_DATA.shapes[index].fields);
        expect(game.shapes[index].pos).toStrictEqual({ i: 0, j: 0 });
        expect(game.shapes[index].coordinates).toStrictEqual([0, 0, 1, 1]);
    }

    const color_set = new Set(game.shapes.map((shape) => shape.color));
    expect(color_set.size).toBe(game.shapes.length);
})