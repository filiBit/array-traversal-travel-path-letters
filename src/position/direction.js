export const DIRECTION = {
    /** @type {import("./type.js").Direction}} */
    UP: "UP",
    /** @type {import("./type.js").Direction}} */
    RIGHT: "RIGHT",
    /** @type {import("./type.js").Direction}} */
    DOWN: "DOWN",
    /** @type {import("./type.js").Direction}} */
    LEFT: "LEFT",
};

export const OPPOSITE_DIRECTION = {
    /** @type {import("./type.js").Direction}} */
    UP: DIRECTION.DOWN,
    /** @type {import("./type.js").Direction}} */
    RIGHT: DIRECTION.LEFT,
    /** @type {import("./type.js").Direction}} */
    DOWN: DIRECTION.UP,
    /** @type {import("./type.js").Direction}} */
    LEFT: DIRECTION.RIGHT,
};

export const PERPENDICULAR_DIRECTION = {
    [DIRECTION.UP]: [DIRECTION.LEFT, DIRECTION.RIGHT],
    [DIRECTION.RIGHT]: [DIRECTION.UP, DIRECTION.DOWN],
    [DIRECTION.DOWN]: [DIRECTION.LEFT, DIRECTION.RIGHT],
    [DIRECTION.LEFT]: [DIRECTION.UP, DIRECTION.DOWN],
};

export const DIRECTION_HORIZONTAL = new Set([DIRECTION.LEFT, DIRECTION.RIGHT]);
export const DIRECTION_VERTICAL = new Set([DIRECTION.UP, DIRECTION.DOWN]);
