import { ILogger } from '../../../src/logger/logger.interface';
import { Logger } from '../../../src/logger/logger';

let logger: ILogger;

export interface TransformerLogger {
    moduleWithoutValidTypeStatements(moduleName: string): void;
}

export function DefinitelyTypedTransformerLogger(): TransformerLogger {
    logger = logger || Logger('DefinitelyTypedTransformer');

    return {
        moduleWithoutValidTypeStatements(moduleName: string): void {
            logger.warning(`Cannot find any valid type for this module ${moduleName}`);
        }
    };
}
