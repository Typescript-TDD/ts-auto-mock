import { Format, TransformableInfo } from 'logform';
import * as winston from 'winston';
import { ConsoleTransportInstance } from 'winston/lib/winston/transports';

export function ConsoleLogger(): ConsoleTransportInstance {
    const customFormat: Format = winston.format.printf((info: TransformableInfo) => {
        return `${info.level}: ${info.message}`;
    });

    return new winston.transports.Console(
        {
            level: 'error',
            format: winston.format.combine(
                winston.format((info: TransformableInfo) => {
                    info.level = info.level.toUpperCase();
                    return info;
                })(),
                winston.format.colorize(),
                winston.format.simple(),
                customFormat,
            ),
        },
    );
}
