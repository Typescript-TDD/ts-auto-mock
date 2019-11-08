import { Provider } from 'ts-auto-mock/extension';

// tslint:disable:no-any
Provider.instance.provideMethod((name: string, value: () => any) => {
    return jasmine.createSpy(name).and.callFake(value);
});

const frameworkContext: __WebpackModuleApi.RequireContext = require.context('./', true, /\.test\.ts$/);
frameworkContext.keys().map(frameworkContext);
