import { Provider } from 'ts-auto-mock/extension';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Provider.instance.provideMethodWithDeferredValue((name: string, value: () => any) => jasmine.createSpy(name).and.callFake(value));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/typedef
const frameworkContext = require.context('./', true, /\.test(\.valid)?\.ts$/);
frameworkContext.keys().map(frameworkContext);
