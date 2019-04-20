import { createMockList } from 'ts-auto-mock';

describe('create-mock-list', () => {
    interface Interface {
        property: string;
        method(): void;
    }

    it('should have different mocks for each item', () => {
        const properties: Interface[] = createMockList<Interface>(2);
        properties[0].method();
        expect(properties[0].method).toHaveBeenCalled();
        expect(properties[1].method).not.toHaveBeenCalled();
    });
});
