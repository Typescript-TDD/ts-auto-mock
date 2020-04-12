import { TsAutoMockCacheOptions } from './cache';
import { TsAutoMockDebugOptions } from './debug';
import { defaultOptions } from './default';

export interface TsAutoMockOptions {
  debug: TsAutoMockDebugOptions;
  cacheBetweenTests: TsAutoMockCacheOptions;
}

let tsAutoMockOptions: TsAutoMockOptions = defaultOptions;

export function SetTsAutoMockOptions(options?: TsAutoMockOptions): void {
  tsAutoMockOptions = {
    ...defaultOptions,
    ...options,
  };
}

export function GetOptionByKey<T extends keyof TsAutoMockOptions>(optionKey: T): TsAutoMockOptions[T] {
  return tsAutoMockOptions[optionKey];
}
