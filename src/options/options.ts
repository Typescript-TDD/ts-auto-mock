import { TsAutoMockCacheOptions } from './cache';
import { TsAutoMockDebugOptions } from './debug';
import { defaultOptions } from './default';

export interface TsAutoMockOptions {
    debug: TsAutoMockDebugOptions;
    cacheBetweenTests: TsAutoMockCacheOptions;
}

let options: TsAutoMockOptions = null;

export function SetTsAutoMockOptions(_options: TsAutoMockOptions): void {
    options = _options;
}

export function GetOptionByKey<T extends keyof TsAutoMockOptions>(optionKey: T): TsAutoMockOptions[T] {
    if (options) {
        return options.hasOwnProperty(optionKey) ? options[optionKey] : defaultOptions[optionKey];
    }

    return defaultOptions[optionKey];
}
