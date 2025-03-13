// @ts-nocheck

import {
    BROKEN_PATH,
    FAKE_TURN_REACHED,
    FORK_DETECTED,
    INVALID_TYPE,
    MISSING_END_CHARACTER,
    MISSING_START_CHARACTER,
    MULTIPLE_START_CHARACTERS,
    MULTIPLE_STARTING_PATHS,
    UNSUPPORTED_CHARACTER,
} from "./errors";
import { travel } from "./travel";

describe("Given the `map` argument has an invalid type", () => {
    test("Then an Error is thrown", () => {
        expect(() => travel(undefined)).toThrow(new Error(INVALID_TYPE));
        expect(() => travel(null)).toThrow(new Error(INVALID_TYPE));
        expect(() => travel(42)).toThrow(new Error(INVALID_TYPE));
        expect(() => travel("Goodbye world")).toThrow(new Error(INVALID_TYPE));
        expect(() => travel({ abc: "def" })).toThrow(new Error(INVALID_TYPE));
        expect(() => travel([])).toThrow(new Error(INVALID_TYPE));
        expect(() => travel(["howdy"])).toThrow(new Error(INVALID_TYPE));
        expect(() => travel([7])).toThrow(new Error(INVALID_TYPE));
    });
});

describe("Given a map that contains unsupported characters", () => {
    test("Then an Error is thrown", () => {
        expect(() => travel([[" ", " ", "x", "-", "B", "*", "+", "@"]])).toThrow(new Error(UNSUPPORTED_CHARACTER));
        expect(() => travel([[" ", "#", "x", "-", "B", "-", "+", "@"]])).toThrow(new Error(UNSUPPORTED_CHARACTER));
        expect(() => travel([[undefined, "x", "-", "B", "-", "+", "@"]])).toThrow(new Error(UNSUPPORTED_CHARACTER));
        expect(() => travel([["", " ", "x", "-", "B", "-", "+", "@"]])).toThrow(new Error(UNSUPPORTED_CHARACTER));
        expect(() => travel([[{}, " ", "x", "-", "B", "-", "+", "@"]])).toThrow(new Error(UNSUPPORTED_CHARACTER));
        expect(() => travel([[7, " ", "x", "-", "B", "-", "+", "@"]])).toThrow(new Error(UNSUPPORTED_CHARACTER));
    });
});

describe("Given a map that is missing a start character", () => {
    test("Then an Error is thrown", () => {
        expect(() => travel([[" ", " ", " ", " ", " ", "x", "-", "-", "-"]])).toThrow(
            new Error(MISSING_START_CHARACTER),
        );

        expect(() => travel([[" ", " ", " ", " ", " ", "-", "-", "x"]])).toThrow(new Error(MISSING_START_CHARACTER));

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

describe("Given a map that is missing an end character", () => {
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

describe("Given a map that has multiple start characters", () => {
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
    });
});

describe("Given a map that contains multiple starting paths", () => {
    test("Then an Error is thrown", () => {
        expect(() => travel([["x", "-", "@", "-", "A", "-", "x"]])).toThrow(new Error(MULTIPLE_STARTING_PATHS));
        expect(() => travel([["|"], ["@", "-", "A", "-", "x"]])).toThrow(new Error(MULTIPLE_STARTING_PATHS));
        expect(() =>
            travel([
                [" ", " ", " ", " ", "+", "-", "+"],
                [" ", " ", " ", " ", "|", " ", " "],
                [" ", " ", "x", "-", "@", "-", "B"],
            ]),
        ).toThrow(new Error(MULTIPLE_STARTING_PATHS));
    });
});

describe("Given a map that contains a fork", () => {
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

        expect(() =>
            travel([
                [],
                [" ", " ", " ", " ", "+", "-", "+"],
                [" ", "@", "-", "-", "+", "G", "+", "-", " ", "x"],
                [],
                [],
            ]),
        ).toThrow(new Error(FORK_DETECTED));

        expect(() =>
            travel([
                [" ", " ", " ", " ", " ", "+", "-", "O", "-", "N", "-", "+"],
                [" ", " ", " ", " ", " ", "|", " ", " ", " ", "|", " ", "|"],
                [" ", " ", " ", " ", " ", "|", " ", " ", " ", "+", "-", "I", "-", "+"],
                [" ", "@", "-", "G", "-", "O", "-", "+", " ", "|", " ", "|", " ", "|"],
                [" ", " ", " ", " ", " ", "|", " ", "|", " ", "+", "-", "+", " ", "E"],
                [" ", " ", " ", " ", " ", "+", "-", "+", " ", " ", " ", " ", " ", "S"],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "x"],
            ]),
        ).toThrow(new Error(FORK_DETECTED));
    });
});

describe("Given a map that contains a broken path", () => {
    test("Then an Error is thrown", () => {
        expect(() => travel([[" ", "@", "-", "-", " ", "x"]])).toThrow(new Error(BROKEN_PATH));

        expect(() =>
            travel([
                [" ", " ", " ", " ", " ", "+", "-", "x"],
                [],
                [" ", " ", " ", " ", " ", "|"],
                [" ", " ", " ", " ", " ", "+", "A", "@"],
            ]),
        ).toThrow(new Error(BROKEN_PATH));

        expect(() =>
            travel([
                [" ", "@", "-", "-", "A", "-", "+"],
                [" ", " ", " ", " ", " ", " ", "|"],
                [" ", " ", " ", " ", " ", " ", " ", " ", "x"],
                [" ", " ", " ", " ", " ", " ", "|", " ", "|"],
                [" ", " ", " ", " ", " ", " ", "+", "-", "B"],
            ]),
        ).toThrow(new Error(BROKEN_PATH));

        expect(() =>
            travel([
                [" ", "@", "-", "-", "A"],
                [" ", " ", " ", " ", "|"],
                [" ", " ", "x", "-", "|", "+"],
                [" ", " ", " ", " ", "|", "|"],
                [" ", " ", " ", " ", "+", "-"],
            ]),
        ).toThrow(new Error(BROKEN_PATH));
    });
});

describe("Given a map that contains a fake turn that's reachable", () => {
    test("Then an Error is thrown", () => {
        expect(() => travel([["@", "-", "A", "-", "+", "-", "B", "-", "x"]])).toThrow(new Error(FAKE_TURN_REACHED));

        expect(() =>
            travel([
                [" ", "x"],
                [" ", "|"],
                [" ", "+", "-", "+", "-", "@"],
            ]),
        ).toThrow(new Error(FAKE_TURN_REACHED));

        expect(() => travel([["@"], ["|"], ["+"], ["|"], ["F"], ["x"]])).toThrow(new Error(FAKE_TURN_REACHED));
    });
});

describe("Given a valid map", () => {
    describe("Given a straight path", () => {
        test("Then the function returns a correct value", () => {
            expect(travel([["@", "-", "x"]])).toStrictEqual(["", "@-x"]);

            expect(travel([["x", "-", "-", "@"]])).toStrictEqual(["", "@--x"]);

            expect(
                travel([
                    [" ", " ", "@"],
                    [" ", " ", "|"],
                    [" ", " ", "|"],
                    [" ", " ", "x"],
                ]),
            ).toStrictEqual(["", "@||x"]);

            expect(
                travel([
                    [" ", " ", "x", " "],
                    [" ", " ", "|", " "],
                    [" ", " ", "|", " "],
                    [" ", " ", "@", " "],
                ]),
            ).toStrictEqual(["", "@||x"]);
        });

        describe("Given the path contains letters", () => {
            test("Then the function returns a correct value", () => {
                expect(travel([["@", "G", "x"]])).toStrictEqual(["G", "@Gx"]);

                expect(travel([["x", "-", "O", "@"]])).toStrictEqual(["O", "@O-x"]);

                expect(
                    travel([
                        [" ", " ", "@"],
                        [" ", " ", "U"],
                        [" ", " ", "|"],
                        [" ", " ", "x"],
                    ]),
                ).toStrictEqual(["U", "@U|x"]);

                expect(
                    travel([
                        [" ", " ", "x", " "],
                        [" ", " ", "I", " "],
                        [" ", " ", "E", " "],
                        [" ", " ", "@", " "],
                    ]),
                ).toStrictEqual(["EI", "@EIx"]);
            });
        });

        describe("Given a path with crossroads", () => {
            test("Then the function returns a correct value", () => {
                expect(
                    travel([
                        [" ", " ", "@", "-", "-", "+"],
                        [" ", " ", " ", " ", " ", "|"],
                        [" ", " ", " ", " ", " ", "x"],
                    ]),
                ).toStrictEqual(["", "@--+|x"]);

                expect(
                    travel([
                        [" ", " ", "@", "-", "-", "+"],
                        [" ", " ", " ", " ", " ", "|"],
                        [" ", " ", " ", "x", "-", "+"],
                    ]),
                ).toStrictEqual(["", "@--+|+-x"]);

                expect(
                    travel([
                        [" ", " ", "@", "-", "-", "-", "A", "-", "-", "-", "+"],
                        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
                        [" ", " ", "x", "-", "B", "-", "+", " ", " ", " ", "C"],
                        [" ", " ", " ", " ", " ", " ", "|", " ", " ", " ", "|"],
                        [" ", " ", " ", " ", " ", " ", "+", "-", "-", "-", "+"],
                    ]),
                ).toStrictEqual(["ACB", "@---A---+|C|+---+|+-B-x"]);

                expect(
                    travel([
                        [" ", " ", "@", "-", "-", "-", "A", "-", "-", "-", "+"],
                        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
                        [" ", " ", "x", "-", "B", "-", "+", " ", " ", " ", "|"],
                        [" ", " ", " ", " ", " ", " ", "|", " ", " ", " ", "|"],
                        [" ", " ", " ", " ", " ", " ", "+", "-", "-", "-", "C"],
                    ]),
                ).toStrictEqual(["ACB", "@---A---+|||C---+|+-B-x"]);

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
                ).toStrictEqual(["GOONIES", "@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x"]);

                expect(
                    travel([
                        [" ", "+", "-", "L", "-", "+"],
                        [" ", "|", " ", " ", "+", "A", "-", "+"],
                        ["@", "B", "+", " ", "+", "+", " ", "H"],
                        [" ", "+", "+", " ", " ", " ", " ", "x"],
                    ]),
                ).toStrictEqual(["BLAH", "@B+++B|+-L-+A+++A-+Hx"]);

                expect(
                    travel([
                        [" ", " ", "@", "-", "A", "-", "-", "+"],
                        [" ", " ", " ", " ", " ", " ", " ", "|"],
                        [" ", " ", " ", " ", " ", " ", " ", "+", "-", "B", "-", "-", "x", "-", "C", "-", "-", "D"],
                    ]),
                ).toStrictEqual(["AB", "@-A--+|+-B--x"]);
            });

            describe("Given a path with crossroads", () => {
                test("Then the function returns a correct value", () => {
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
                    ).toStrictEqual(["ABCD", "@|A+---B--+|+--C-+|-||+---D--+|x"]);

                    expect(
                        travel([
                            [" ", " ", "x", " ", "+", "-", "+", " "],
                            [" ", " ", "|", " ", "B", " ", "|", " "],
                            ["+", "-", "|", "-", "|", "-", "+", " "],
                            ["|", " ", "|", " ", "|", " ", " ", " "],
                            ["+", "-", "+", " ", "+", "-", "A", " "],
                            [" ", " ", " ", " ", " ", " ", "|", " "],
                            [" ", " ", " ", " ", " ", " ", "@", " "],
                        ]),
                    ).toStrictEqual(["AB", "@|A-+||B+-+|+-|-|-+|+-+|||x"]);
                });
            });
        });
    });
});
