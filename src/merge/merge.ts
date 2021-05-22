import { mergeWith, isObject, set } from 'lodash-es';
import { ɵMarker as Marker } from 'ts-auto-mock/extension';
import { PartialDeep } from '../partial/partial';

export class Merge {
  public static merge<T>(a: T, b: PartialDeep<T>): T {
    return mergeWith(
      a,
      b,
      (
        objValue: unknown,
        srcValue: unknown,
        oneLevelPath: string,
        objContainer: object,
        srcContainer: object
      ) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (isObject(srcValue) && srcValue[Marker.instance.get()]) {
          return srcValue;
        }

        if (
          srcContainer.hasOwnProperty(oneLevelPath) &&
          srcValue === undefined
        ) {
          set(objContainer, [oneLevelPath], undefined);
        }
      }
    );
  }

  public static mergeIterator<T>(
    a: T,
    b: (index: number) => PartialDeep<T>,
    index: number
  ): T {
    return Merge.merge(a, b(index));
  }
}
