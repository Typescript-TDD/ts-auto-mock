import { registerMock } from 'ts-auto-mock';
import { FakePromise } from './fakePromise';

registerMock<Promise<unknown>>(() => new FakePromise<unknown>());

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/typedef
const registerMockContext = require.context('./', true, /\.test\.ts$/);
registerMockContext.keys().map(registerMockContext);
