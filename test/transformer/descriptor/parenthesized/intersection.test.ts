import { createMock } from 'ts-auto-mock';

describe('parenthesized intersection ', () => {
    it('should return undefined for primitive and object ', () => {
        interface B {}

        type A = (string) & B;

        expect(createMock<A>()).toBeUndefined();
    });

    it('it should intersect correctly for function and object ', () => {
        interface B {
            prop: number;
        }

        type A = (() => string) & B;

        const mock: A = createMock<A>();
        expect(mock()).toBe('');
        expect(mock.prop).toBe(0);
    });
});
