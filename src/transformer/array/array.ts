export namespace ArrayHelper {
    export function AreEqual<T>(array1: T[], array2: T[]): boolean {
        if (array1.length !== array2.length) {
            return false;
        }

        const array2Copy: T[] = [...array2];

        array1.forEach((item: T) => {
            const index: number = array2Copy.indexOf(item);
            if (index >= 0) {
                array2Copy.splice(index, 1);
            }
        });

        return array2Copy.length === 0;
    }

    export function ArrayFromLength(length: number): Array<number> {
        return Array.from(Array(length), (value: undefined, index: number) => index);
    }
}
