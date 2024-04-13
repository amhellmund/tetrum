import { constructColor } from "./types";

test("construct color from array", () => {
    expect(constructColor([10, 20, 40, 0.5])).toStrictEqual({
        red: 10,
        green: 20,
        blue: 40,
        alpha: 0.5,
    })
});