import { TRAVERSABLE_HORIZONTAL, TRAVERSABLE_VERTICAL } from "../characters.js";
import {
    DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL,
} from "../position/direction.js";
import { addVectors, VECTOR } from "../position/vector.js";

/**
 * @param {import("../character-map/type.js").CharacterMap} map
 * @param {import("../position/type.js").Vector} position
 * @param {import("../position/type.js").Direction} direction
 * @returns {boolean}
 */
export function isPathTraversible(map, position, direction) {
    return (
        isRoadTraversible(map, position, direction) ||
        isUnderpass(map, position, direction)
    );
}

/**
 * @param {import("../character-map/type.js").CharacterMap} map
 * @param {import("../position/type.js").Vector} position
 * @param {import("../position/type.js").Direction} direction
 * @returns {boolean}
 */
function isRoadTraversible(map, position, direction) {
    const nextPos = addVectors(position, VECTOR[direction]);
    const char = map[nextPos[0]]?.[nextPos[1]];

    if (
        DIRECTION_HORIZONTAL.has(direction) &&
        TRAVERSABLE_HORIZONTAL.has(char)
    ) {
        return true;
    }

    if (DIRECTION_VERTICAL.has(direction) && TRAVERSABLE_VERTICAL.has(char)) {
        return true;
    }

    return false;
}

/**
 * @param {import("../character-map/type.js").CharacterMap} map
 * @param {import("../position/type.js").Vector} position
 * @param {import("../position/type.js").Direction} direction
 * @returns {boolean}
 */
export function isUnderpass(map, position, direction) {
    const pos1 = addVectors(position, VECTOR[direction]);
    const char1 = map[pos1[0]]?.[pos1[1]];
    const pos2 = addVectors(pos1, VECTOR[direction]);
    const char2 = map[pos2[0]]?.[pos2[1]];

    if (
        DIRECTION_HORIZONTAL.has(direction) &&
        TRAVERSABLE_VERTICAL.has(char1) &&
        TRAVERSABLE_HORIZONTAL.has(char2)
    ) {
        return true;
    }

    if (
        DIRECTION_VERTICAL.has(direction) &&
        TRAVERSABLE_HORIZONTAL.has(char1) &&
        TRAVERSABLE_VERTICAL.has(char2)
    ) {
        return true;
    }

    return false;
}
