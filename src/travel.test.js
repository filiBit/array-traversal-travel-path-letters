import {
    BROKEN_PATH,
    FAKE_TURN_REACHED,
    FORK_DETECTED,
    MISSING_END_CHARACTER,
    MISSING_START_CHARACTER,
    MULTIPLE_START_CHARACTERS,
} from "./errors";
import { travel } from "./travel";

describe("Given a map that is missing a start character", () => {
    describe("When the function is invoked", () => {
        test("Then an Error is thrown", () => {
            expect(() =>
                travel([
                    [" ", " ", " ", " ", " ", "-", "A", "-", "-", "-", "+"],
                    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
                    [" ", " ", "x", "-", "B", "-", "+", " ", " ", " ", "C"],
                    [" ", " ", " ", " ", " ", " ", "|", " ", " ", " ", "|"],
                    [" ", " ", " ", " ", " ", " ", "+", "-", "-", "-", "+"],
                ]),
            ).toThrow(new Error(MISSING_START_CHARACTER));
        });
    });
});

describe("Given a map that is missing an end character", () => {
    describe("When the function is invoked", () => {
        test("Then an Error is thrown", () => {
            expect(() =>
                travel([
                    [" ", " ", " ", "@", "-", "-", "A", "-", "-", "-", "+"],
                    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
                    [" ", " ", " ", " ", "B", "-", "+", " ", " ", " ", "C"],
                    [" ", " ", " ", " ", " ", " ", "|", " ", " ", " ", "|"],
                    [" ", " ", " ", " ", " ", " ", "+", "-", "-", "-", "+"],
                ]),
            ).toThrow(new Error(MISSING_END_CHARACTER));
        });
    });
});

describe("Given a map that has multiple start characters", () => {
    describe("When the function is invoked", () => {
        test("Then an Error is thrown", () => {
            expect(() =>
                travel([
                    [" ", " ", " ", "@", "-", "-", "A", "-", "@", "-", "+"],
                    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
                    [" ", " ", "x", "-", "B", "-", "+", " ", " ", " ", "C"],
                    [" ", " ", " ", " ", " ", " ", "|", " ", " ", " ", "|"],
                    [" ", " ", " ", " ", " ", " ", "+", "-", "-", "-", "+"],
                ]),
            ).toThrow(new Error(MULTIPLE_START_CHARACTERS));

            expect(() =>
                travel([
                    [" ", " ", " ", "@", "-", "-", "A", "-", "-", "-", "+"],
                    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
                    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "C"],
                    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "x"],
                    [" ", " ", " ", " ", " ", " ", "@", "-", "B", "-", "+"],
                ]),
            ).toThrow(new Error(MULTIPLE_START_CHARACTERS));

            expect(() =>
                travel([
                    [" ", " ", " ", "@", "-", "-", "A", "-", "-", "x"],
                    [],
                    [" ", " ", "x", "-", "B", "-", "+"],
                    [" ", " ", " ", " ", " ", " ", "|"],
                    [" ", " ", " ", " ", " ", " ", "@"],
                ]),
            ).toThrow(new Error(MULTIPLE_START_CHARACTERS));
        });
    });
});

describe("Given a map that contains a fork", () => {
    describe("When the function is invoked", () => {
        test("Then an Error is thrown", () => {
            expect(() =>
                travel([
                    [" ", " ", "@", "-", "-", "A"],
                    [" ", " ", " ", " ", " ", "|"],
                    [" ", " ", " ", "B", "-", "+", "-", "C"],
                    [" ", " ", " ", "|", " ", " ", " ", "|"],
                    [" ", " ", " ", "+", "-", "x", "-", "+"],
                ]),
            ).toThrow(new Error(FORK_DETECTED));

            expect(() =>
                travel([
                    [" ", " ", "@", "-", "-", "A"],
                    [" ", " ", " ", " ", " ", "|"],
                    [" ", " ", " ", "B", "-", "+", "-", "C"],
                    [" ", " ", " ", "|", " ", "|", " ", "|"],
                    [" ", " ", " ", "+", "-", "x", "-", "+"],
                ]),
            ).toThrow(new Error(FORK_DETECTED));

            expect(() => travel([[], [" ", " ", "+", "-", "+"], ["@", "-", "+", "G", "+", "-", "x"], [], []])).toThrow(
                new Error(FORK_DETECTED),
            );
        });
    });
});

describe("Given a map that contains a broken path", () => {
    describe("When the function is invoked", () => {
        test("Then an Error is thrown", () => {
            expect(() =>
                travel([
                    [" ", " ", " ", "@", "-", "-", "A", "-", "+"],
                    [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
                    [],
                    [" ", " ", " ", " ", " ", " ", " ", " ", "B", "-", "x"],
                ]),
            ).toThrow(new Error(BROKEN_PATH));
        });
    });
});

describe("Given a map that contains a fake turn that's reachable", () => {
    describe("When the function is invoked", () => {
        test("Then an Error is thrown", () => {
            expect(() => travel([[" ", " ", "@", "-", "A", "-", "+", "-", "B", "-", "x"]])).toThrow(
                new Error(FAKE_TURN_REACHED),
            );

            expect(() => travel([["@"], ["|"], ["+"], ["|"], ["F"], ["x"]])).toThrow(new Error(FAKE_TURN_REACHED));
        });
    });
});

describe("Given a valid map", () => {
    describe("When the function is invoked", () => {
        test("Then the function returns a correct value", () => {
            expect(
                travel([
                    [" ", " ", "@", "-", "-", "-", "A", "-", "-", "-", "+"],
                    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
                    [" ", " ", "x", "-", "B", "-", "+", " ", " ", " ", "C"],
                    [" ", " ", " ", " ", " ", " ", "|", " ", " ", " ", "|"],
                    [" ", " ", " ", " ", " ", " ", "+", "-", "-", "-", "+"],
                ]),
            ).toBe(["ACB", "@---A---+|C|+---+|+-B-x"]);

            expect(
                travel([
                    [" ", " ", "@"],
                    [" ", " ", "|", " ", "+", "-", "C", "-", "-", "+"],
                    [" ", " ", "A", " ", "|", " ", " ", " ", " ", "|"],
                    [" ", " ", "+", "-", "-", "-", "B", "-", "-", "+"],
                    [" ", " ", " ", " ", "|", " ", " ", " ", " ", " ", " ", "x"],
                    [" ", " ", " ", " ", "|", " ", " ", " ", " ", " ", " ", "|"],
                    [" ", " ", " ", " ", "+", "-", "-", "-", "D", "-", "-", "+"],
                ]),
            ).toBe(["ABCD", "@|A+---B--+|+--C-+|-||+---D--+|x"]);

            expect(
                travel([
                    [" ", " ", "@", "-", "-", "-", "A", "-", "-", "-", "+"],
                    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
                    [" ", " ", "x", "-", "B", "-", "+", " ", " ", " ", "|"],
                    [" ", " ", " ", " ", " ", " ", "|", " ", " ", " ", "|"],
                    [" ", " ", " ", " ", " ", " ", "+", "-", "-", "-", "C"],
                ]),
            ).toBe(["ACB", "@---A---+|||C---+|+-B-x"]);

            expect(
                travel([
                    [" ", " ", " ", " ", " ", "+", "-", "O", "-", "N", "-", "+"],
                    [" ", " ", " ", " ", " ", "|", " ", " ", " ", " ", " ", "|"],
                    [" ", " ", " ", " ", " ", "|", " ", " ", " ", "+", "-", "I", "-", "+"],
                    [" ", "@", "-", "G", "-", "O", "-", "+", " ", "|", " ", "|", " ", "|"],
                    [" ", " ", " ", " ", " ", "|", " ", "|", " ", "+", "-", "+", " ", "E"],
                    [" ", " ", " ", " ", " ", "+", "-", "+", " ", " ", " ", " ", " ", "S"],
                    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
                    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "x"],
                ]),
            ).toBe(["GOONIES", "@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x"]);

            expect(
                travel([
                    [" ", "+", "-", "L", "-", "+"],
                    [" ", "|", " ", " ", "+", "A", "-", "+"],
                    ["@", "B", "+", " ", "+", "+", " ", "H"],
                    [" ", "+", "+", " ", " ", " ", " ", "x"],
                ]),
            ).toBe(["BLAH", "@B+++B|+-L-+A+++A-+Hx"]);

            expect(
                travel([
                    [" ", " ", "@", "-", "A", "-", "-", "+"],
                    [" ", " ", " ", " ", " ", " ", " ", "|"],
                    [" ", " ", " ", " ", " ", " ", " ", "+", "-", "B", "-", "-", "x", "-", "C", "-", "-", "D"],
                ]),
            ).toBe(["ABCD", "@|A+---B--+|+--C-+|-||+---D--+|x"]);
        });
    });
});
