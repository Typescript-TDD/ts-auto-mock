import { Provider } from 'ts-auto-mock/extension';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Provider.instance.provideMethod((name: string, value: any) => jasmine.createSpy(name).and.returnValue(value));

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/typedef
const frameworkContext = require.context('./', true, /\.test(\.deprecated)?\.ts$/);
frameworkContext.keys().map(frameworkContext);
