export declare function registerMock<T extends object, TCustomMock extends T>(factory: (mock: any, propName: string | number | symbol, prop: T) => TCustomMock):
  <TMock, TProp extends keyof TMock>(mock: TMock, propName: TProp, prop: T) => TCustomMock;
