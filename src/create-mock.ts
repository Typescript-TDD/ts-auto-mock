import { DeepPartial } from './partial/deepPartial';

export declare function createMock<T extends object | undefined>(values?: DeepPartial<T>): T;
