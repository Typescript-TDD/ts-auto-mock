import { GetOptionByKey } from './options';

export type TsAutoMockRandomValuesOptions = boolean;

export function GetTsAutoMockRandomValuesOptions(): TsAutoMockRandomValuesOptions {
  return GetOptionByKey('useRandomValues');
}
