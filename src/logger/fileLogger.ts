import fs from 'fs';
import { ILogger } from './logger.interface';
import { MessageFormatter } from './messageFormatter';

export function FileLogger(
  messageFormatter: MessageFormatter,
  service: string,
): ILogger {
  const filePath: string = 'tsAutoMock.log';

  const writeData: (data: string) => void = (data: string) => {
    fs.writeFileSync(filePath, data, {
      flag: 'a',
    });
  };

  return {
    info: (message: string): void => {
      writeData(messageFormatter(service, 'info', message));
      writeData('\n');
    },
    warning: (message: string): void => {
      writeData(messageFormatter(service, 'warning', message));
      writeData('\n');
    },
    error: (message: string): void => {
      writeData(messageFormatter(service, 'error', message));
      writeData('\n');
    },
  };
}
