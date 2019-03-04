export {};

type ReturnType = jasmine.Spy;

declare module 'ts-auto-mock' {
  interface MockMethod<TR> extends ReturnType {}
}