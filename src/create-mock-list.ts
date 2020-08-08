import { NoTransformerError } from './errors/no-transformer.error';
import { DeepPartial } from './partial/deepPartial';

export function createMockList<T extends object>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  quantity: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  iterator?: (index: number) => DeepPartial<T>
): T[] {
  throw new Error(NoTransformerError);
}
