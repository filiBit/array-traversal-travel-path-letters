export const LETTERS = new Set([
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
]);
export const START_CHARACTER = "@";
export const END_CHARACTER = "x";
export const TURN_CHARACTER = "+";
export const ROAD_HORIZONTAL = "-";
export const ROAD_VERTICAL = "|";
export const EMPTY_CHARACTER = " ";

export const TRAVERSABLE = new Set([
    ...LETTERS,
    END_CHARACTER,
    TURN_CHARACTER,
    ROAD_HORIZONTAL,
    ROAD_VERTICAL,
    START_CHARACTER,
]);

export const TRAVERSABLE_HORIZONTAL = new Set([
    ...LETTERS,
    END_CHARACTER,
    TURN_CHARACTER,
    ROAD_HORIZONTAL,
    START_CHARACTER,
]);

export const TRAVERSABLE_VERTICAL = new Set([
    ...LETTERS,
    END_CHARACTER,
    TURN_CHARACTER,
    ROAD_VERTICAL,
    START_CHARACTER,
]);

export const CHARACTERS = new Set([
    START_CHARACTER,
    END_CHARACTER,
    ROAD_HORIZONTAL,
    ROAD_VERTICAL,
    ...LETTERS,
    TURN_CHARACTER,
    EMPTY_CHARACTER,
]);
