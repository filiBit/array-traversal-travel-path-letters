import { CrossroadRepository } from "../crossroad-repository.js";
import { handleCrossroad } from "./handle-crossroad.js";

/**
 * @type {import("./type.js").CharacterHandler}
 */
export function handleLetter(map, position, direction) {
    const letter = CrossroadRepository.isVisited(position)
        ? ""
        : map[position[0]][position[1]];

    const crossroadResult = handleCrossroad(map, position, direction);

    return [letter + crossroadResult[0], crossroadResult[1]];
}
