import { ILogger } from './logger.interface';
import { MessageFormatter } from './logger';

/* eslint-disable no-console */
export function ConsoleLogger(
  messageFormatter: MessageFormatter,
  service: string,
): ILogger {
  return {
    info: (message: string): void => {
      console.log(messageFormatter(service, 'info', message));
    },
    warning: (message: string): void => {
      console.log(messageFormatter(service, 'warning', message));
    },
    error: (message: string): void => {
      console.log(messageFormatter(service, 'error', message));
    },
  };
}
/* eslint-enable no-console */
