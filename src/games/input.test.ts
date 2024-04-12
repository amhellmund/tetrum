import { parseInput } from "./input";

test("parseInput with correct game input", () => {
    const TEST_DATA = {
        id: "uuid",
        board: {
            size: {
                width: 2,
                height: 1
            },
            fields: [0, null]
        },
        shapes: [
            {
                size: {
                    width: 1,
                    height: 1
                },
                fields: [true]
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
                height: 1
            },
            fields: ["abc", null]
        },
        shapes: [
            {
                size: {
                    width: 1,
                    height: 1
                },
                fields: [true]
            }
        ]
    }

    const game_input = parseInput(TEST_DATA);

    expect(game_input).toBe(null);
});