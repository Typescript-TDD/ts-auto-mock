import { NoTransformerError } from './errors/no-transformer.error';
import { DeepPartial } from './partial/deepPartial';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createMock<T extends object>(values?: DeepPartial<T>): T {
  throw new Error(NoTransformerError);
}
