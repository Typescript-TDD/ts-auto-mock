import { createMock } from 'ts-auto-mock';

describe('for tuple', () => {
    interface Interface {
        a: [string, number];
    }

    it('should set an empty string', () => {
        const properties: Interface = createMock<Interface>();
        expect(properties.a).toEqual([]);
    });
});
