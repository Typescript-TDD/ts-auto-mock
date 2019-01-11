export {};
import { CheckType } from "../../../src/mock/mock";

interface SpyWithReturnType<TR> {
  (...params: any[]): TR;

  and: jasmine.SpyAnd;
  calls: jasmine.Calls;
  withArgs(...args: any[]): jasmine.Spy;
}

declare module '../../../src/mock/mock' {
  interface MockMethodExtension<TReturn> extends SpyWithReturnType<CheckType<TReturn>> {}

  interface MockArrayExtension<TElement> {
    generateList(quantity: number): void;
  }
}