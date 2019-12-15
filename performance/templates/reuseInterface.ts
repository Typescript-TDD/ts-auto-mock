import { createMock } from 'ts-auto-mock';
import { Interface } from './types/interface';

describe('oneInterfaceMock', () => {
    it('work', () => {
        const properties: Interface = createMock<Interface>();
        expect(properties.a).toBe('');
    });
});
