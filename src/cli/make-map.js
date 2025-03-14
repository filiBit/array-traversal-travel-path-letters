import { makeCharacterMap } from "../character-map/character-map.js";
import { makeMatrix } from "../lib/make-matrix.js";

console.log(makeMapFromString(process.argv[2]));

/**
 *
 * @param {string} stringMap
 * @returns {import("../character-map/type.js").CharacterMap}
 */
export function makeMapFromString(stringMap) {
    return makeCharacterMap(makeMatrix(stringMap));
}
