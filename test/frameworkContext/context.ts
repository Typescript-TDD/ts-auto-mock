import { Provider } from 'ts-auto-mock/extension';

// tslint:disable:no-any
Provider.instance.provideMethodWithDeferredValue((name: string, value: () => any) => {
    return jasmine.createSpy(name).and.callFake(value);
});

const frameworkContext: __WebpackModuleApi.RequireContext = require.context('./', true, /\.test(\.valid)?\.ts$/);
frameworkContext.keys().map(frameworkContext);
