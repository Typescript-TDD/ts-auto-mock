import { Provider } from 'ts-auto-mock/provider';

// tslint:disable:no-any
Provider.instance.provideMethod((name: string, value: any) => {
    return jasmine.createSpy(name).and.returnValue(value);
});

const frameworkContext: __WebpackModuleApi.RequireContext = require.context('./', true, /\.test\.ts$/);
frameworkContext.keys().map(frameworkContext);
