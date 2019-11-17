import { createMock } from 'ts-auto-mock';

describe('generic multiple declaration', () => {
    interface Interface<T> {
        generic: T;
    }

    interface Interface<T> {
        generic2: T;
    }

    it('should assign the correct values', () => {
        const mock: Interface<string> = createMock<Interface<string>>();

        expect(mock.generic).toBe('');
        expect(mock.generic2).toBe('');
    });
});
