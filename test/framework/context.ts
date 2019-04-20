import { MockFactory } from 'ts-auto-mock';

// tslint:disable:no-any
MockFactory.instance.registerFactory((name: string, value: any) => {
    return jasmine.createSpy(name).and.returnValue(value);
});

const frameworkContext: __WebpackModuleApi.RequireContext = require.context('./', true, /\.test\.ts$/);
frameworkContext.keys().map(frameworkContext);
