export namespace ArrayHelper {
  export function AreEqual<T>(array1: T[], array2: T[]): boolean {
    const array1Length: number = array1.length;

    if (array1Length !== array2.length) {
      return false;
    }

    for (let i: number = 0; i < array1Length; i++) {
      if (!array2.includes(array1[i])) {
        return false;
      }
    }

    for (let i: number = 0; i < array1Length; i++) {
      if (!array1.includes(array2[i])) {
        return false;
      }
    }

    return true;
  }

  export function ArrayFromLength(length: number): Array<number> {
    return Array.from(
      Array(length),
      (value: undefined, index: number) => index
    );
  }
}
