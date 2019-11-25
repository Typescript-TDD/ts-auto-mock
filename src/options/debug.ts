import { GetOptionByKey } from './options';

export type TsAutoMockDebugOptions = 'file' | 'console' | boolean;

export function GetTsAutoMockDebugOptions(): TsAutoMockDebugOptions {
    return GetOptionByKey('debug');
}
