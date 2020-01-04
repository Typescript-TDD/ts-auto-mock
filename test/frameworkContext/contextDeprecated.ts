import { Provider } from 'ts-auto-mock/extension';

// tslint:disable:no-any
Provider.instance.provideMethod((name: string, value: any) => {
    return jasmine.createSpy(name).and.returnValue(value);
});

// @ts-ignore
// tslint:disable-next-line:typedef
const frameworkContext = require.context('./', true, /\.test(\.deprecated)?\.ts$/);
frameworkContext.keys().map(frameworkContext);
