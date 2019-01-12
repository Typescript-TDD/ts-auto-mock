export {};

export declare type Mock<T> = T extends
  (() => infer TR) ? MockMethod<TR> : T extends
  (...args: any[]) => infer TR ? MockArgsMethod<TR> : T extends
  Function ? MockMethod<any> : T extends
  Array<infer TE> ? MockArray<TE> : T extends
  Number | String | Boolean ? T : T extends
  object ? MockObject<T> : T;

export declare type MockObject<T> = {
  [key in keyof T]: Mock<T[key]>;
}

export declare type MockMethod<TR> = MockMethodExtension<TR> & (() => Mock<TR>);
export declare type MockArgsMethod<TR> = MockMethodExtension<TR> & ((...args: any[]) => Mock<TR>);
export declare interface MockArray<T> extends Array<Mock<T>> {}

export declare interface MockMethodExtension<TReturn> {}
export declare interface MockArrayExtension<TElement> {}