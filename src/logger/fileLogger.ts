import { TransformableInfo } from 'logform';
import * as winston from 'winston';
import { FileTransportInstance } from 'winston/lib/winston/transports';

let winstonFileLogger: FileTransportInstance;

export function FileLogger(): FileTransportInstance {
  return (
    winstonFileLogger ||
    (winstonFileLogger = new winston.transports.File({
      filename: 'tsAutoMock.log',
      options: { flags: 'w' },
      level: 'error',
      format: winston.format.combine(
        winston.format((info: TransformableInfo) => {
          info.level = info.level.toUpperCase();
          return info;
        })(),
        winston.format.simple(),
        winston.format.timestamp(),
        winston.format.printf(
          (info: TransformableInfo) =>
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            `${info.timestamp} - ${info.level}: ${info.message}`
        )
      ),
    }))
  );
}
