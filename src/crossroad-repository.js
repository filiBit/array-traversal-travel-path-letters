import { OPPOSITE_DIRECTION } from "./position/direction.js";
import { addVectors, VECTOR } from "./position/vector.js";

export class CrossroadRepository {
    /**
     * @private
     * @type {Map<string, Set<string>>}
     */
    static lockedGates = new Map();

    /**
     * @param {import("./position/type.js").Vector} position
     * @param {import("./position/type.js").Direction} direction
     * @returns {boolean}
     */
    static isGateLocked(position, direction) {
        return !!(
            this.lockedGates.get(position.join(","))?.has(direction) ||
            this.lockedGates
                .get(addVectors(position, VECTOR[direction]).join(","))
                ?.has(OPPOSITE_DIRECTION[direction])
        );
    }

    /**
     * @param {import("./position/type.js").Vector} position
     * @param {import("./position/type.js").Direction} direction
     */
    static lockGate(position, direction) {
        const paths = this.lockedGates.get(position.join(",")) || new Set();

        this.lockedGates.set(
            position.join(","),
            new Set([...paths, direction]),
        );
    }

    /**
     * @param {import("./position/type.js").Vector} position
     */
    static unlockGatesAt(position) {
        CrossroadRepository.lockedGates.delete(position.join(","));
    }

    /**
     * @param {import("./position/type.js").Vector} position
     * @param {import("./position/type.js").Direction} direction
     */
    static unlockGate(position, direction) {
        this.lockedGates.get(position.join(","))?.delete(direction);
    }

    /**
     * @param {import("./position/type.js").Vector} position
     */
    static isVisited(position) {
        return this.lockedGates.has(position.join(","));
    }

    static clear() {
        this.lockedGates.clear();
    }
}
