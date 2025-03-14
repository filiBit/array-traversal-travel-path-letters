import {
    TURN_CHARACTER,
    LETTERS,
    ROAD_HORIZONTAL,
    ROAD_VERTICAL,
    END_CHARACTER,
} from "../characters.js";
import { handleEnd } from "./handle-end.js";
import { handleLetter } from "./handle-letter.js";
import { handleRoad } from "./handle-road.js";
import { handleTurn } from "./handle-turn.js";

/**
 * @type {{ characters: Set<string>, handle: import("./type.js").CharacterHandler}[]}
 */
export const Handlers = [
    { characters: LETTERS, handle: handleLetter },
    { characters: new Set([TURN_CHARACTER]), handle: handleTurn },
    {
        characters: new Set([ROAD_HORIZONTAL, ROAD_VERTICAL]),
        handle: handleRoad,
    },
    { characters: new Set([END_CHARACTER]), handle: handleEnd },
];

/**
 * @type {import("./type.js").CharacterHandler}
 */
export function handleCharacter(map, position, direction) {
    const char = map[position[0]][position[1]];
    const handle = Handlers.find((h) => h.characters.has(char))?.handle;

    if (!handle) {
        throw new Error(
            `Handler not found for character "${char}" at position ${position}`,
            {
                cause: `row=${position[0]}\ncol=${position[1]}`,
            },
        );
    }

    return handle(map, position, direction);
}
