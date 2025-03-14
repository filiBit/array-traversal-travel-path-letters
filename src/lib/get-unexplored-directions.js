import { TURN_CHARACTER } from "../characters.js";
import { CrossroadRepository } from "../crossroad-repository.js";
import {
    DIRECTION,
    OPPOSITE_DIRECTION,
    PERPENDICULAR_DIRECTION,
} from "../position/direction.js";
import { isPathTraversible } from "./is-path-traversible.js";

/**
 * @param {import("../character-map/type.js").CharacterMap} map
 * @param {import("../position/type.js").Vector} position
 * @param {import("../position/type.js").Direction} direction
 * @returns {import("../position/type.js").Direction[]}
 */
export function getUnexploredDirections(map, position, direction) {
    return Object.values(DIRECTION)
        .filter(
            (d) =>
                isPathTraversible(map, position, d) &&
                !CrossroadRepository.isGateLocked(position, d),
        )
        .filter(
            (d) =>
                (map[position[0]][position[1]] === TURN_CHARACTER
                    ? PERPENDICULAR_DIRECTION[direction].includes(d)
                    : true) && d !== OPPOSITE_DIRECTION[direction],
        );
}
