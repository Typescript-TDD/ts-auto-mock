type SpyMethod<T, TSpy> = T & TSpy;

export type Spy<TClass, TSpy> = {
    [key in keyof TClass]: TClass[key] extends Function ? SpyMethod<TClass[key], TSpy> : TClass[key];
};