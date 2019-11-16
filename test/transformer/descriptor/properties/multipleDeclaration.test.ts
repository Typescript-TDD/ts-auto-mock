import { createMock } from 'ts-auto-mock';

describe('properties multiple declaration', () => {
    interface Interface {
        prop: string;
    }

    interface Interface {
        prop: string;
    }

    it('should assign the correct values', () => {
        const mock: Interface = createMock<Interface>();

        expect(mock.prop).toBe('');
    });
});
