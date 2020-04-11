import { merge } from 'lodash-es';
import { DeepPartial } from '../partial/deepPartial';

export class Merge {
  public static merge<T>(a: T, b: DeepPartial<T>): T {
    return merge(a, b);
  }

  public static mergeIterator<T>(a: T, b: (index: number) => DeepPartial<T>, index: number): T {
    return merge(a, b(index));
  }
}
