import { createMock } from 'ts-auto-mock';

describe('oneInterfaceMock', () => {
    interface Interface {
        a: string;
    }

    it('work', () => {
        const properties: Interface = createMock<Interface>();
        expect(properties.a).toBe('');
    });
});
