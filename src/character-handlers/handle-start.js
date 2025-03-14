import { CrossroadRepository } from "../crossroad-repository.js";
import { BROKEN_PATH, MULTIPLE_STARTING_PATHS } from "../errors.js";
import { getAllDirections } from "../lib/get-available-directions.js";
import { move } from "../lib/move.js";

/**
 * @param {import("../character-map/type.js").CharacterMap} map
 * @param {import("../position/type.js").Vector} position
 * @returns {[string, string]}
 */
export function handleStart(map, position) {
    CrossroadRepository.clear();
    const availableDirections = getAllDirections(map, position);

    if (availableDirections.length === 0) {
        throw new Error(BROKEN_PATH, {
            cause: `row=${position[0]}\ncol=${position[1]}`,
        });
    }

    if (availableDirections.length > 1) {
        throw new Error(MULTIPLE_STARTING_PATHS, {
            cause: `row=${position[0]}\ncol=${position[1]}`,
        });
    }

    const result = move(map, position, availableDirections[0]);

    return [result[0], "@" + result[1]];
}
