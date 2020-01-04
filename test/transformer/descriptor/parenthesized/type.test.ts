import { createMock } from 'ts-auto-mock';

describe('parenthesized type ', () => {
    it('should return the correct type for functions', () => {
        type A = (() => string);

        const mock: A = createMock<A>();

        expect(mock()).toBe('');
    });

    it('should return the correct type for objects', () => {
        type A = ({a: string});

        const mock: A = createMock<A>();

        expect(mock.a).toBe('');
    });
});
