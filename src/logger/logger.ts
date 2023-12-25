import {
  GetTsAutoMockDebugOptions,
  TsAutoMockDebugOptions,
} from '../options/debug';
import { ConsoleLogger } from './consoleLogger';
import { ILogger } from './logger.interface';
import { SilentLogger } from './silentLogger';
import { FileLogger } from './fileLogger';

const now: () => string = () => new Date().toISOString();

export type MessageFormatter = (
  service: string,
  level: string,
  message: string,
) => string;

const formatter: MessageFormatter = (
  service: string,
  level: string,
  message: string,
) => `${now()}-${level.toUpperCase()}: ${service} - ${message}`;

export function Logger(service: string): ILogger {
  const options: TsAutoMockDebugOptions = GetTsAutoMockDebugOptions();

  if (!options) {
    return SilentLogger();
  }

  if (options === 'file') {
    return FileLogger(formatter, service);
  }

  return ConsoleLogger(formatter, service);
}
