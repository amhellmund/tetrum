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

import { Position } from "../utils/location_utils";
import { Size } from "../utils/ui_utils";

export type Game = {
    id: string;
    board: Board;
    shapes: Shape[];
}

export type Board = {
    size: Size;
    fields: (number | null)[];
}

export type Color = {
    red: number;
    green: number;
    blue: number;
    alpha: number;
}

export type ShapeLayout = {
    size: Size;
    fields: boolean[];
    coordinates: number[];
}

export type Shape = {
    pos: Position;
    layout: ShapeLayout;
    color: Color;
}

export function constructColor(rgba: [number, number, number, number]): Color {
    return {
        red: rgba[0],
        green: rgba[1],
        blue: rgba[2],
        alpha: rgba[3],
    }
}