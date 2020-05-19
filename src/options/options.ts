import { TsAutoMockCacheOptions } from './cache';
import { TsAutoMockDebugOptions } from './debug';
import { TsAutoMockFeaturesOptions } from './features';
import { defaultOptions } from './default';

export interface TsAutoMockOptions {
  debug: TsAutoMockDebugOptions;
  cacheBetweenTests: TsAutoMockCacheOptions;
  features: TsAutoMockFeaturesOptions;
}

let tsAutoMockOptions: TsAutoMockOptions = defaultOptions;

export function SetTsAutoMockOptions(options: TsAutoMockOptions): void {
  tsAutoMockOptions = {
    ...defaultOptions,
    ...options,
  };
}

export function GetOptionByKey<T extends keyof TsAutoMockOptions>(optionKey: T): TsAutoMockOptions[T] {
  return tsAutoMockOptions[optionKey];
}
