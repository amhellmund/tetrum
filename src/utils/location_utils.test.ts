import { transformToCoordinate, transformToPosition } from "./location_utils";
import { STAGE_PADDING } from "./ui_utils";

test("transformation to coordinate", () => {
    expect(transformToCoordinate({ i: 0, j: 0 }, 60)).toStrictEqual({ x: 0 + STAGE_PADDING, y: 0 + STAGE_PADDING });
    expect(transformToCoordinate({ i: 1, j: 1 }, 60)).toStrictEqual({ x: 60 + STAGE_PADDING, y: 60 + STAGE_PADDING });
    expect(transformToCoordinate({ i: 5, j: 6 }, 60)).toStrictEqual({ x: 360 + STAGE_PADDING, y: 300 + STAGE_PADDING });
});

test("transformation to position", () => {
    expect(transformToPosition({ x: 0 + STAGE_PADDING, y: 0 + STAGE_PADDING }, 60)).toStrictEqual({ i: 0, j: 0 });
    expect(transformToPosition({ x: 120 + STAGE_PADDING, y: 110 + STAGE_PADDING }, 60)).toStrictEqual({ i: 2, j: 2 })
    expect(transformToPosition({ x: -50 + STAGE_PADDING, y: -120 + STAGE_PADDING }, 60)).toStrictEqual({ i: -2, j: -1 });
});