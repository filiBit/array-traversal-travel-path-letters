/**
 * @type {{ characters: Set<string>, handle: import("./type.js").CharacterHandler}[]}
 */
export const Handlers = [];

/**
 * @type {import("./type.js").CharacterHandler}
 */
export function handleCharacter(map, position, direction) {
    const char = map[position[0]][position[1]];
    const handle = Handlers.find((h) => h.characters.has(char))?.handle;

    if (!handle) {
        throw new Error(
            `Handler not found for character "${char}" at position ${position}`,
            {
                cause: `row=${position[0]}\ncol=${position[1]}`,
            },
        );
    }

    return handle(map, position, direction);
}
