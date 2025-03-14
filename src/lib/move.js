import { handleCharacter } from "../character-handlers/index.js";
import { addVectors, VECTOR } from "../position/vector.js";

/**
 * @param {import("../character-map/type.js").CharacterMap} map
 * @param {import("../position/type.js").Vector} position
 * @param {import("../position/type.js").Direction} direction
 * @returns {[string, string]}
 */
export function move(map, position, direction) {
    const newPos = addVectors(position, VECTOR[direction]);
    const char = map[newPos[0]][newPos[1]];

    const result = handleCharacter(map, newPos, direction);

    return [result[0], char + result[1]];
}
