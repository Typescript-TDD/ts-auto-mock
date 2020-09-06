import { registerMock } from 'ts-auto-mock';
import { FakePromise } from './fakePromise';

registerMock<Promise<unknown>>(() => new FakePromise<unknown>());
