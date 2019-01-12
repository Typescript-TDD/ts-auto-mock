export {};
import { Mock } from "ts-auto-mock";

interface SpyWithReturnType<TR> {
  (...params: any[]): TR;

  and: jasmine.SpyAnd;
  calls: jasmine.Calls;
  withArgs(...args: any[]): jasmine.Spy;
}

declare module 'ts-auto-mock' {
  interface MockMethodExtension<TReturn> extends SpyWithReturnType<Mock<TReturn>> {}
}