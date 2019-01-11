export {};
import { CheckType } from "./mock-definition";

interface SpyWithReturnType<TR> {
  (...params: any[]): TR;

  and: jasmine.SpyAnd;
  calls: jasmine.Calls;
  withArgs(...args: any[]): jasmine.Spy;
}

declare module './mock-definition' {
  interface MockMethodExtension<TReturn> extends SpyWithReturnType<CheckType<TReturn>> {

  }

  interface MockArrayExtension<TElement> {
    generateList(quantity: number): void;
  }
}