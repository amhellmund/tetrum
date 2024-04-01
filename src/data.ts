
import { Game } from "./types";
import { MOCK_GAME } from "./mock_data";

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
        ["Example", [createDescription("test", "Test Game")]],
        ["Easy (6x6)", [createDescription("easy1", "Game Easy 1")]],
        ["Advanced (8x8)", [createDescription("advanced1", "Game Advanced 1")]],
        ["Expert (10x10)", [createDescription("expert1", "Game Expert 1")]],
    ]);
}

export function getGameData(game_id: string): Game {
    return MOCK_GAME;
}
