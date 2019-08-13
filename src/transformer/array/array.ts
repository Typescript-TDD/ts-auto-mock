export function ArrayFromLength(length: number): Array<number> {
    return Array.from(Array(length), (value: undefined, index: number) => index);
}
