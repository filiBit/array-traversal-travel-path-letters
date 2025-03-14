import { TURN_CHARACTER, END_CHARACTER } from "../characters.js";
import { CrossroadRepository } from "../crossroad-repository.js";
import { FORK_DETECTED } from "../errors.js";
import { getAllDirections } from "../lib/get-available-directions.js";
import { getUnexploredDirections } from "../lib/get-unexplored-directions.js";
import { move } from "../lib/move.js";
import {
    OPPOSITE_DIRECTION,
    PERPENDICULAR_DIRECTION,
} from "../position/direction.js";

/**
 * @type {import("./type.js").CharacterHandler}
 */
export function handleCrossroad(map, position, direction) {
    CrossroadRepository.lockGate(position, OPPOSITE_DIRECTION[direction]);

    let availableDirections = getUnexploredDirections(map, position, direction);
    const allDirections = getAllDirections(map, position);

    if (allDirections.length === 3) {
        throw new Error(FORK_DETECTED, {
            cause: `row=${position[0]}\ncol=${position[1]}`,
        });
    }

    /**
     * @type {[string, string]}
     */
    let finalResult = ["", ""];

    let endResult = ["", ""];

    while (availableDirections.length) {
        CrossroadRepository.lockGate(position, availableDirections[0]);

        const [newLetters, newCharTrail] = move(
            map,
            position,
            availableDirections[0],
        );
        if (newCharTrail.at(-1) === END_CHARACTER) {
            if (endResult[1].length) {
                throw new Error(FORK_DETECTED, {
                    cause: `row=${position[0]}\ncol=${position[1]}`,
                });
            }
            endResult = [newLetters, newCharTrail];
        } else {
            finalResult[0] += newLetters;
            finalResult[1] += newCharTrail;
        }

        availableDirections = getUnexploredDirections(
            map,
            position,
            direction,
        ).filter(
            (d) =>
                (map[position[0]][position[1]] === TURN_CHARACTER
                    ? PERPENDICULAR_DIRECTION[direction].includes(d)
                    : true) && d !== OPPOSITE_DIRECTION[direction],
        );
    }

    finalResult[0] += endResult[0];
    finalResult[1] += endResult[1];

    return finalResult;
}
