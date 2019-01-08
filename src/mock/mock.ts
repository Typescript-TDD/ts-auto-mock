type MockMethod<T, TMock> = T & TMock;

export type Mock<TClass, TMock> = {
    [key in keyof TClass]: TClass[key] extends Function ? MockMethod<TClass[key], TMock> : TClass[key];
};