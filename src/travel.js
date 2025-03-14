import { handleStart } from "./character-handlers/handle-start.js";
import { START_CHARACTER } from "./characters.js";
import { getCharPosition } from "./lib/get-char-position.js";
import { makeCharacterMap } from "./character-map/character-map.js";

/**
 *
 * @param {string[][]} inputMap
 */
export function travel(inputMap) {
    console.log("=== START ===");
    const charMap = makeCharacterMap(inputMap);

    const startPosition = getCharPosition(charMap, START_CHARACTER);

    console.log(`The map:\n\n${charMap.map((r) => r.join("")).join("\n")}`);

    const result = handleStart(charMap, startPosition);

    console.log(`Letters: ${result[0]}\nCharacter trail: ${result[1]}`);
    console.log("===  END  ===");
    return result;
}
