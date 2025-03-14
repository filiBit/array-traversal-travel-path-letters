import { DIRECTION } from "../position/direction.js";
import { isPathTraversible } from "./is-path-traversible.js";

/**
 * @param {import("../character-map/type.js").CharacterMap} map
 * @param {import("../position/type.js").Vector} position
 * @returns {import("../position/type.js").Direction[]}
 */
export function getAllDirections(map, position) {
    return Object.values(DIRECTION).filter((d) =>
        isPathTraversible(map, position, d),
    );
}
