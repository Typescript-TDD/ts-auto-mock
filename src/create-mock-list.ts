import { DeepPartial } from './partial/deepPartial';
export declare function createMockList<T extends object>(quantity: number, iterator?: (index: number) => DeepPartial<T>): T[];
