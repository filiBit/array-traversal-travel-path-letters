import { makeCharacterMap } from "../character-map/character-map.js";
import { makeMatrix } from "../lib/make-matrix.js";
import { travel } from "../travel.js";

console.log(travel(makeCharacterMap(makeMatrix(process.argv[2]))));
