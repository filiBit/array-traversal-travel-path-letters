import { CHARACTERS, END_CHARACTER, START_CHARACTER } from "../characters.js";
import {
    INVALID_TYPE,
    MISSING_END_CHARACTER,
    MISSING_START_CHARACTER,
    MULTIPLE_START_CHARACTERS,
    UNSUPPORTED_CHARACTER,
} from "../errors.js";

/**
 *
 * @param {unknown} inputMap
 * @returns {import("./type.js").CharacterMap}
 *
 */
export function makeCharacterMap(inputMap) {
    const charMap = copy(inputMap);
    assertType(charMap);
    assertAllCharactersSupported(charMap);
    assertGlobalRules(charMap);
    return charMap;
}

/**
 *
 * @param {unknown} inputMap
 * @returns {asserts inputMap is import("./type.js").CharacterMap}
 *
 */
function assertType(inputMap) {
    if (!Array.isArray(inputMap)) throw new Error(INVALID_TYPE);

    if (inputMap.length === 0) throw new Error(INVALID_TYPE);

    inputMap.forEach((row, rowIndex) => {
        if (!Array.isArray(row)) {
            throw new Error(INVALID_TYPE);
        }
        row.forEach((cell, columnIndex) => {
            if (typeof cell !== "string" || !CHARACTERS.has(cell)) {
                throw new Error(UNSUPPORTED_CHARACTER, {
                    cause: `character="${cell}\nrow=${rowIndex}\ncol=${columnIndex}`,
                });
            }
        });
    });
}

/**
 * @param {import("./type.js").CharacterMap} charMap
 */
function assertAllCharactersSupported(charMap) {
    if (countCharacter(START_CHARACTER, charMap) > 1) {
        throw new Error(MULTIPLE_START_CHARACTERS);
    }

    if (countCharacter(END_CHARACTER, charMap) === 0) {
        throw new Error(MISSING_END_CHARACTER);
    }
}

/**
 * @param {string[][]} map
 * @returns
 */
export function assertGlobalRules(map) {
    const startPointCount = countCharacter(START_CHARACTER, map);
    if (startPointCount > 1) throw new Error(MULTIPLE_START_CHARACTERS);
    if (startPointCount === 0) throw new Error(MISSING_START_CHARACTER);

    const endPointCount = countCharacter(START_CHARACTER, map);
    if (endPointCount === 0) throw new Error(MISSING_END_CHARACTER);
}

/**
 *
 * @param {unknown} inputMap
 * @returns {unknown}
 *
 */
function copy(inputMap) {
    try {
        return JSON.parse(JSON.stringify(inputMap));
    } catch {
        throw new Error(INVALID_TYPE);
    }
}

/**
 * @param {string} character
 * @param {string[][]} map
 * @returns
 */
export function countCharacter(character, map) {
    return map.reduce(
        (acc, curr) => acc + curr.filter((c) => c === character).length,
        0,
    );
}
