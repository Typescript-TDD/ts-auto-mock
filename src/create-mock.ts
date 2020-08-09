import { NoTransformerError } from './errors/no-transformer.error';
import { PartialDeep } from './partial/partial';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createMock<T extends object>(values?: PartialDeep<T>): T {
  throw new Error(NoTransformerError);
}
