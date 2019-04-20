import { createMockList } from 'ts-auto-mock';

describe('create-mock-list', () => {
    interface Interface {
        property: string;
        method(): void;
    }

    it('should create an array of mocks with all the value defined', () => {
        const properties: Interface[] = createMockList<Interface>(2);
        expect(properties[0].property).toBe('');
        expect(properties[1].property).toBe('');
        expect(properties.length).toBe(2);
    });

    it('should create an array of 2 mocks', () => {
        const properties: Interface[] = createMockList<Interface>(2);
        expect(properties.length).toBe(2);
    });

    it('should create an array of 1 mocks', () => {
        const properties: Interface[] = createMockList<Interface>();
        expect(properties.length).toBe(1);
    });

    it('should create an array of 10 mocks', () => {
        const properties: Interface[] = createMockList<Interface>(10);
        expect(properties.length).toBe(10);
    });

    it('should create an empty array', () => {
        const properties: Interface[] = createMockList<Interface>(-10);
        expect(properties.length).toBe(0);
    });

    it('should have different mocks for each item', () => {
        const properties: Interface[] = createMockList<Interface>(2);
        expect(properties[0]).not.toBe(properties[1]);
    });
});
