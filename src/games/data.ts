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

export type GameDescription = {
    id: string;
    name: string;
}

function createDescription(id: string, name: string): GameDescription {
    return {
        id: id,
        name: name,
    }
}

export function getAvailableGames(): Map<string, GameDescription[]> {
    return new Map<string, GameDescription[]>([
        [
            "Easy",
            [
                createDescription("easy1", "Easy1 (6x6)"),
                createDescription("easy2", "Easy2 (5x5)"),

            ]
        ],
        [
            "Advanced",
            [
                createDescription("advanced1", "Advanced1 (6x6)"),
                createDescription("advanced2", "Advanced2 (7x7)"),
            ]
        ],
    ]);
}
