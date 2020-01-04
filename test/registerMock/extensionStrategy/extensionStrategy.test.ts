import { createMock } from 'ts-auto-mock';
import { On } from 'ts-auto-mock/extension';
import { FakePromise } from '../fakePromise';

function asFakePromise<T, TProp extends Promise<T>, TFake extends FakePromise<T>>(prop: Promise<T>): FakePromise<T> {
    return prop as unknown as FakePromise<T>;
}

describe('extension strategy for fake promise', () => {
    it('should retrieve the fake promise correctly', (done: Function) => {
        interface WithPromise {
            promise: Promise<string>;
            a: number;
        }

        const mock: WithPromise = createMock<WithPromise>();

        On(mock).get('promise', asFakePromise).resolve('custom resolution value');

        mock.promise.then((value: string) => {
            expect(value).toBe('custom resolution value');
            done();
        });
    });
});
