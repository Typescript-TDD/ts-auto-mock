import { createMock, createMockList } from 'ts-auto-mock';

describe('create-mock-values', () => {
    interface Interface {
        property: string;
        method(): void;
    }

    it('should create the mock merging the values provided', () => {
        const properties: Interface = createMock<Interface>({
            property: 'sss',
        });

        expect(properties.property).toBe('sss');
        properties.method();
    });

    it('should create an array of mocks with all the value defined', () => {
        const properties: Array<Interface> = createMockList<Interface>(2, (index: number) => {
            return {
                property: 'sss' + index,
            };
        });

        expect(properties[0].property).toBe('sss0');
        expect(properties[0].method());
        expect(properties[1].property).toBe('sss1');
    });
});
