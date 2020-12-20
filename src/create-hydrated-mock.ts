import { NoTransformerError } from './errors/no-transformer.error';

import { PartialDeep } from './partial/partial';

export function createHydratedMock<T extends object>(
  _values?: PartialDeep<T>
): T {
  throw new Error(NoTransformerError);
}
