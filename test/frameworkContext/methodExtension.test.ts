import { createMock } from 'ts-auto-mock';
import { method, On } from 'ts-auto-mock/extension';

describe('Extension: functionMethod', () => {
    interface Interface {
        m(): string;
    }

    it('should be able to retrieve the functionMethod using arrow function', () => {
        const mock: Interface = createMock<Interface>();

        expect(On(mock).get(method((x: Interface) => x.m))).toBe(mock.m);
    });

    it('should be able to retrieve the functionMethod using a string', () => {
        const mock: Interface = createMock<Interface>();

        expect(On(mock).get(method('m'))).toBe(mock.m);
    });
});
