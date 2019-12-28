import { registerMock } from 'ts-auto-mock';
import { FakePromise } from './fakePromise';

registerMock<Promise<unknown>>(() => new FakePromise<unknown>());

const frameworkContext: __WebpackModuleApi.RequireContext = require.context('./', true, /\.test\.ts$/);
frameworkContext.keys().map(frameworkContext);
