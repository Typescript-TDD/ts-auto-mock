import { NoTransformerError } from './errors/no-transformer.error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function registerMock<T extends object>(factory: () => T): void {
  throw new Error(NoTransformerError);
}
