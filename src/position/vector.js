import { DIRECTION } from "./direction.js";

/**
 * @type {Object.<string, import("./type.js").Vector>}
 */
export const VECTOR = {
    [DIRECTION.UP]: [-1, 0],
    [DIRECTION.RIGHT]: [0, 1],
    [DIRECTION.DOWN]: [1, 0],
    [DIRECTION.LEFT]: [0, -1],
};

/**
 * @param {import("./type.js").Vector} v1
 * @param {import("./type.js").Vector} v2
 * @returns {import("./type.js").Vector}
 */
export function addVectors(v1, v2) {
    if (v1.length !== 2) {
        throw new Error("Invalid vector", { cause: v1 });
    }

    if (v2.length !== 2) {
        throw new Error("Invalid vector", { cause: v2 });
    }

    return [v1[0] + v2[0], v1[1] + v2[1]];
}
