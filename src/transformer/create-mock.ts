import { Mock } from '../mock/mock';

export declare function createMock<T extends object>(): T & Mock<T>;
