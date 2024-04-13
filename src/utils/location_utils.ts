// Copyright 2024 Andi Hellmund

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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