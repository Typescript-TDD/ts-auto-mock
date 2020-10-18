import { mergeWith, isObject } from 'lodash-es';
import { ɵMarker as Marker } from 'ts-auto-mock/extension';
import { PartialDeep } from '../partial/partial';

export class Merge {
  public static merge<T>(a: T, b: PartialDeep<T>): T {
    return mergeWith(a, b, (objValue: unknown, srcValue: unknown) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (isObject(srcValue) && srcValue[Marker.instance.get()]) {
        return srcValue;
      }
    });
  }

  public static mergeIterator<T>(
    a: T,
    b: (index: number) => PartialDeep<T>,
    index: number
  ): T {
    return Merge.merge(a, b(index));
  }
}
