// Copyright 2024 Andi Hellmund

import { Shape } from "react-konva";
import { ShapeLayout } from "./types";

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

export enum ShapeName {
    Square1 = "square1",
    Square2 = "square2",
    Square3 = "square3",
    Rect1x2 = "rect1x2",
    Rect1x3 = "rect1x3",
    Rect2x1 = "rect2x1",
    Rect3x1 = "rect3x1",
    Rect2x3 = "rect2x3",
    Rect3x2 = "rect3x2",
    Rect2x4 = "rect2x4",
    Rect4x2 = "rect4x2",
    LTopLeft2x2 = "l-top-left-2x2",
    LTopLeft2x3 = "l-top-left-2x3",
    LTopLeft3x2 = "l-top-left-3x2",
    LTopLeft3x3 = "l-top-left-3x3",
    LBottomLeft2x2 = "l-bottom-left-2x2",
    LBottomLeft2x3 = "l-bottom-left-2x3",
    LBottomLeft3x2 = "l-bottom-left-3x2",
    LBottomLeft3x3 = "l-bottom-left-3x3",
    LTopRight2x2 = "l-top-right-2x2",
    LTopRight2x3 = "l-top-right-2x3",
    LTopRight3x2 = "l-top-right-3x2",
    LTopRight3x3 = "l-top-right-3x3",
    LBottomRight2x2 = "l-bottom-right-2x2",
    LBottomRight2x3 = "l-bottom-right-2x3",
    LBottomRight3x2 = "l-bottom-right-3x2",
    LBottomRight3x3 = "l-bottom-right-3x3",
    // T 
    // U
    // S  
}

export function getShapeLayout(name: string): ShapeLayout {
    switch (name) {
        case ShapeName.Square1:
            return constructSquare(1);
        case ShapeName.Square2:
            return constructSquare(2);
        case ShapeName.Square3:
            return constructSquare(3);
        case ShapeName.Rect1x2:
            return constructRect(1, 2);
        case ShapeName.Rect1x3:
            return constructRect(1, 3);
        case ShapeName.Rect2x1:
            return constructRect(2, 1);
        case ShapeName.Rect3x1:
            return constructRect(3, 1);
        case ShapeName.Rect2x3:
            return constructRect(2, 3);
        case ShapeName.Rect3x2:
            return constructRect(3, 2);
        case ShapeName.Rect2x4:
            return constructRect(2, 4);
        case ShapeName.Rect4x2:
            return constructRect(4, 2);
        case ShapeName.LTopLeft2x2:
            return constructLTopLeft(2, 2);
        case ShapeName.LTopLeft2x3:
            return constructLTopLeft(2, 3);
        case ShapeName.LTopLeft3x2:
            return constructLTopLeft(3, 2);
        case ShapeName.LTopLeft3x3:
            return constructLTopLeft(3, 3);
        case ShapeName.LBottomLeft2x2:
            return constructLBottomLeft(2, 2);
        case ShapeName.LBottomLeft2x3:
            return constructLBottomLeft(2, 3);
        case ShapeName.LBottomLeft3x2:
            return constructLBottomLeft(3, 2);
        case ShapeName.LBottomLeft3x3:
            return constructLBottomLeft(3, 3);
        case ShapeName.LTopRight2x2:
            return constructLTopRight(2, 2);
        case ShapeName.LTopRight2x3:
            return constructLTopRight(2, 3);
        case ShapeName.LTopRight3x2:
            return constructLTopRight(3, 2);
        case ShapeName.LTopRight3x3:
            return constructLTopRight(3, 3);
        case ShapeName.LBottomRight2x2:
            return constructLBottomRight(2, 2);
        case ShapeName.LBottomRight2x3:
            return constructLBottomRight(2, 3);
        case ShapeName.LBottomRight3x2:
            return constructLBottomRight(3, 2);
        case ShapeName.LBottomRight3x3:
            return constructLBottomRight(3, 3);
        default:
            throw new Error(`Shape ${name} is not known`)
    }
}


function constructSquare(size: number): ShapeLayout {
    return {
        size: { width: size, height: size },
        fields: new Array(size * size).fill(true),
        coordinates: [0, 0, 0, size, size, size, size, 0],
    }
}

function constructRect(width: number, height: number): ShapeLayout {
    return {
        size: { width, height },
        fields: new Array(width * height).fill(true),
        coordinates: [0, 0, 0, height, width, height, width, 0],
    }
}

function constructLTopLeft(width: number, height: number): ShapeLayout {
    // Example Shapes
    // ##  ###  ##  ###
    // #   #    #   #
    //          #   #
    return {
        size: { width, height },
        fields: constructFieldsForLShape(width, height, 0, 0),
        coordinates: [0, 0, 0, height, 1, height, 1, 1, width, 1, width, 0],
    }
}

function constructLBottomLeft(width: number, height: number): ShapeLayout {
    // Example Shapes
    // #   #    #   #
    // ##  ###  #   #
    //          ##  ###
    return {
        size: { width, height },
        fields: constructFieldsForLShape(width, height, height - 1, 0),
        coordinates: [0, 0, 0, height, width, height, width, height - 1, 1, height - 1, 1, 0],
    }
}

function constructLTopRight(width: number, height: number): ShapeLayout {
    // Example Shapes
    // ##  ###  ##  ###
    //  #    #   #    #
    //           #    #
    return {
        size: { width, height },
        fields: constructFieldsForLShape(width, height, 0, width - 1),
        coordinates: [0, 0, 0, 1, width - 1, 1, width - 1, height, width, height, width, 0],
    }
}

function constructLBottomRight(width: number, height: number): ShapeLayout {
    // Example Shapes
    //  #    #   #    #
    // ##  ###   #    #
    //          ##  ###
    return {
        size: { width, height },
        fields: constructFieldsForLShape(width, height, height - 1, width - 1),
        coordinates: [0, height - 1, 0, height, width, height, width, 0, width - 1, 0, width - 1, height - 1],
    }
}

function constructFieldsForLShape(width: number, height: number, row: number, column: number): boolean[] {
    const fields = new Array(width * height).fill(false);
    // fill the column
    for (let i = 0; i < height; ++i) {
        fields[i * width + column] = true;
    }
    // fill the column
    for (let j = 0; j < width; ++j) {
        fields[row * width + j] = true;
    }
    return fields;
}