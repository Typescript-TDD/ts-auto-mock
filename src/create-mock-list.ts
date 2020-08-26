import { NoTransformerError } from './errors/no-transformer.error';
import { PartialDeep } from './partial/partial';

export function createMockList<T extends object>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  quantity: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  iterator?: (index: number) => PartialDeep<T>
): T[] {
  throw new Error(NoTransformerError);
}
