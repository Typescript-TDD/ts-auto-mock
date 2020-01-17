import { Logger } from '../../logger/logger';
import { ILogger } from '../../logger/logger.interface';

let logger: ILogger;

export interface TransformerLogger {
  unexpectedCreateMock(mockFileName: string, expectedFileName: string): void;
  typeNotSupported(type: string): void;
}

export function TransformerLogger(): TransformerLogger {
  logger = logger || Logger('Transformer');

  return {
    unexpectedCreateMock(mockFileName: string, expectedFileName: string): void {
      logger.warning(`I\'ve found a mock creator but it comes from a different folder
            found: ${mockFileName}
            expected: ${expectedFileName}`);
    },
    typeNotSupported(type: string): void {
      logger.warning(`Not supported type: ${type} - it will convert to null`);
    },
  };
}
