import { GetOptionByKey } from './options';

export type TsAutoMockOverloadOptions = boolean;

export function GetTsAutoMockOverloadOptions(): TsAutoMockOverloadOptions {
  return GetOptionByKey('transformOverloads');
}
