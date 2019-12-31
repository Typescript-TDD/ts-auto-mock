import { registerMock } from 'ts-auto-mock';
import { FakePromise } from './fakePromise';

registerMock<Promise<unknown>>(() => new FakePromise<unknown>());

// @ts-ignore
// tslint:disable-next-line:typedef
const registerMockContext = require.context('./', true, /\.test\.ts$/);
registerMockContext.keys().map(registerMockContext);
