export {};

type ReturnType = jasmine.Spy;

declare module 'ts-auto-mock/extension' {
  interface Method<TR> extends ReturnType {}
}
