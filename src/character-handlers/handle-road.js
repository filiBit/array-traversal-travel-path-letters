import { BROKEN_PATH } from "../errors.js";
import { isPathTraversible } from "../lib/is-path-traversible.js";
import { move } from "../lib/move.js";

/**
 * @type {import("./type.js").CharacterHandler}
 */
export function handleRoad(map, position, direction) {
    if (!isPathTraversible(map, position, direction)) {
        throw new Error(BROKEN_PATH, { cause: "f" });
    }

    return move(map, position, direction);
}
