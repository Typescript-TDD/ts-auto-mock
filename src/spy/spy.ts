export type Spy<T> = {
    [key in keyof T]: T[key] extends Function ? SpyMethod<T[key]> : T[key];
} & Function;

type SpyMethod<T> = T & jasmine.Spy;