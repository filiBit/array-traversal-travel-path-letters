/**
 *
 * @param {import("../character-map/type.js").CharacterMap} map
 * @param {string} character
 * @returns {import("../position/type.js").Vector}
 */
export function getCharPosition(map, character) {
    for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
        const row = map[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            if (row[colIndex] === character) return [rowIndex, colIndex];
        }
    }

    throw new Error(`Character "${character} not found`);
}
