/**
 * @param {string} stringMap
 * @returns {import("../character-map/type.js").CharacterMap}
 */
export function makeMatrix(stringMap) {
    return stringMap.split("\n").map((row) => row.trimEnd().split(""));
}
