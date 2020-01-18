import { GetOptionByKey } from './options';

export type TsAutoMockCacheOptions = boolean;

export function GetTsAutoMockCacheOptions(): TsAutoMockCacheOptions {
  return GetOptionByKey('cacheBetweenTests');
}
