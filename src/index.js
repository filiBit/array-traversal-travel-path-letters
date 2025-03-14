import { makeCharacterMap } from "./character-map/character-map.js";
import { makeMatrix } from "./lib/make-matrix.js";
import { travel } from "./travel.js";

const STRING_MAP = `  @---A---+
          |
  x-B-+   C
      |   |
      +---+`;

const matrix = makeMatrix(STRING_MAP);
const charMap = makeCharacterMap(matrix);

travel(charMap);
