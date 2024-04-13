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

import { constructColor } from "./types";

test("construct color from array", () => {
    expect(constructColor([10, 20, 40, 0.5])).toStrictEqual({
        red: 10,
        green: 20,
        blue: 40,
        alpha: 0.5,
    })
});