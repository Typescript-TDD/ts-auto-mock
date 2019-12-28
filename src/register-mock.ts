export declare function registerMock<T extends object, TCustomMock extends T>(
    factory: (mock: any, propName: string | number | symbol, prop: T) => TCustomMock, // tslint:disable-line no-any
): void;
