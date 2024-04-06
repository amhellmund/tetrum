
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
