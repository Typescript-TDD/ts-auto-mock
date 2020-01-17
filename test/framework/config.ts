import { Provider } from 'ts-auto-mock/extension';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Provider.instance.provideMethodWithDeferredValue((name: string, value: () => any) => jasmine.createSpy(name).and.callFake(value));
