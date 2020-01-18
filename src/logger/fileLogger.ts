import { Format, TransformableInfo } from 'logform';
import * as winston from 'winston';
import { FileTransportInstance } from 'winston/lib/winston/transports';

export function FileLogger(): FileTransportInstance {
  const customFormat: Format = winston.format.printf((info: TransformableInfo) => `${info.timestamp} - ${info.level}: ${info.message}`);

  return new winston.transports.File(
    {
      filename: 'tsAutoMock.log',
      level: 'error',
      format: winston.format.combine(
        winston.format((info: TransformableInfo) => {
          info.level = info.level.toUpperCase();
          return info;
        })(),
        winston.format.simple(),
        winston.format.timestamp(),
        customFormat,
      ),
    },
  );
}
