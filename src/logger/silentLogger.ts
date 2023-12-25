import { ILogger } from './logger.interface';
/* eslint-disable @typescript-eslint/no-empty-function */
export function SilentLogger(): ILogger {
  return {
    info: (_: string): void => {},
    warning: (_: string): void => {},
    error: (_: string): void => {},
  };
}
/* eslint-enable @typescript-eslint/no-empty-function */
