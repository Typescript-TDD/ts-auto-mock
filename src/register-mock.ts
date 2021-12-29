import { NoTransformerError } from './errors/no-transformer.error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function registerMock<T extends object>(factory: (...args) => T): void {
  throw new Error(NoTransformerError);
}
