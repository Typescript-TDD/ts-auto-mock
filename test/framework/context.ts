import { MockFactory } from 'ts-auto-mock';

MockFactory.instance.registerFactory((name: string, value: any) => {
    return jasmine.createSpy(name).and.returnValue(value);
});

const frameworkContext: __WebpackModuleApi.RequireContext = require.context('./', true, /\.test\.ts$/);
frameworkContext.keys().map(frameworkContext);
