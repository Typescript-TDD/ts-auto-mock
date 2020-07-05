import { NoTransformerError } from './errors/no-transformer.error';
import { DeepPartial } from './partial/deepPartial';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createMockList<T extends object>(quantity: number, iterator?: (index: number) => DeepPartial<T>): T[] {
  throw new Error(NoTransformerError);
}
