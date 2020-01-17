import * as winston from 'winston';
import { AbstractConfigSet } from 'winston/lib/winston/config';
import { GetTsAutoMockDebugOptions, TsAutoMockDebugOptions } from '../options/debug';
import { ConsoleLogger } from './consoleLogger';
import { FileLogger } from './fileLogger';
import { ILogger } from './logger.interface';

function LoggerConfig(): AbstractConfigSet {
  return {
    levels: {
      info: 0,
      warning: 1,
      error: 2,
    },
    colors: {
      info: 'green',
      warning: 'yellow',
      error: 'red',
    },
  };
}

export function Logger(service: string): ILogger {
  const config: AbstractConfigSet = LoggerConfig();

  const winstonLogger: winston.Logger = winston.createLogger({
    levels: config.levels,
  });

  winston.addColors(config.colors);

  winstonLogger.silent = true;

  const options: TsAutoMockDebugOptions = GetTsAutoMockDebugOptions();

  if (options) {
    winstonLogger.silent = false;

    if (options === 'file') {
      winstonLogger.add(FileLogger());
    } else {
      winstonLogger.add(ConsoleLogger());
    }
  }

  return {
    info: (message: string): void => {
      winstonLogger.info(`${service} - ${message}`);
    },
    warning: (message: string): void => {
      winstonLogger.warning(`${service} - ${message}`);
    },
    error: (message: string): void => {
      winstonLogger.error(`${service} - ${message}`);
    },
  };
}
