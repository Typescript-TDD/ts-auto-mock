export {};

export declare type Mock<T> = {
  [key in keyof T]: CheckType<T[key]>;
}

export declare type F<R> = R extends Object ? Mock<R> : R;

export declare type CheckType<T> = T extends
  (() => infer TR) ? MockMethod<TR> : T extends
  (...args: any[]) => infer TR ? MockArgsMethod<TR> : T extends
  Array<infer TE> ? MockArray<TE> : T;

export declare type MockMethod<TR> = MockMethodExtension<TR> & (() => CheckType<TR>);
export declare type MockArgsMethod<TR> = MockMethodExtension<TR> & ((...args: any[]) => CheckType<TR>);

export declare type MockArray<T> = Array<T> & MockArrayExtension<T>;

export declare interface MockMethodExtension<TReturn> {}
export declare interface MockArrayExtension<TElement> {}