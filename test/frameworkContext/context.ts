import { Provider } from 'ts-auto-mock/extension';

// tslint:disable:no-any
Provider.instance.provideMethodWithDeferredValue((name: string, value: () => any) => {
    return jasmine.createSpy(name).and.callFake(value);
});

// @ts-ignore
// tslint:disable-next-line:typedef
const frameworkContext = require.context('./', true, /\.test(\.valid)?\.ts$/);
frameworkContext.keys().map(frameworkContext);
