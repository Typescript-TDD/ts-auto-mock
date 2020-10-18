import { Provider } from 'ts-auto-mock/extension';

Provider.instance.provideMethodWithDeferredValue(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (name: string, value: () => any) =>
    jasmine.createSpy(name).and.callFake(value)
);
