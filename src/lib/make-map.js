export function makeMap(input) {
    return input.split("\n").map((row) => row.trimEnd().split(""));
}
