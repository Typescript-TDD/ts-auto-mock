import { merge } from 'lodash-es';
import { PartialDeep } from '../partial/partial';

export class Merge {
  public static merge<T>(a: T, b: PartialDeep<T>): T {
    return merge(a, b);
  }

  public static mergeIterator<T>(
    a: T,
    b: (index: number) => PartialDeep<T>,
    index: number
  ): T {
    return merge(a, b(index));
  }
}
