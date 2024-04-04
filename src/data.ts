
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
        ["Easy", [createDescription("test", "Test Game")]],
    ]);
}
