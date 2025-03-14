import { BROKEN_PATH, FAKE_TURN_REACHED } from "../errors.js";
import { getAllDirections } from "../lib/get-available-directions.js";
import { PERPENDICULAR_DIRECTION } from "../position/direction.js";
import { handleCrossroad } from "./handle-crossroad.js";

/**
 * @type {import("./type.js").CharacterHandler}
 */
export function handleTurn(map, position, direction) {
    const allDirs = getAllDirections(map, position);

    const allPotentialDirs = getAllDirections(map, position).filter((d) =>
        PERPENDICULAR_DIRECTION[direction].includes(d),
    );

    if (allDirs.length === 0) {
        throw new Error(BROKEN_PATH, {
            cause: `row=${position[0]}\ncol=${position[1]}`,
        });
    }

    if (allPotentialDirs.length === 0) {
        throw new Error(FAKE_TURN_REACHED, {
            cause: `row=${position[0]}\ncol=${position[1]}`,
        });
    }

    const crossroadResult = handleCrossroad(map, position, direction);

    return [crossroadResult[0], crossroadResult[1]];
}
