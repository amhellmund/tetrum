import { getGameDimensions, getShapeDimensions } from "./utils";

import { MOCK_GAME } from "./mock_data";

test("game dimensions", () => {
    expect(getShapeDimensions(MOCK_GAME)).toStrictEqual({width: 8, height: 9});
    expect(getGameDimensions(MOCK_GAME)).toStrictEqual({width: 14, height: 15});
});