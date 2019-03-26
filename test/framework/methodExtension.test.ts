import {createMock, method, MockMethod, On} from "ts-auto-mock";

describe('Extension: method', () => {
    interface Interface {
        m(): string;
    }
    
    it('should be able to retrieve the method using arrow function', () => {
        const mock: Interface = createMock<Interface>();

        expect(On(mock).get(method(x => x.m))).toBe(mock.m);
    });
    
    it('should be able to retrieve the method using a string', () => {
        const mock: Interface = createMock<Interface>();

        expect(On(mock).get(method("m"))).toBe(mock.m);
    });
});