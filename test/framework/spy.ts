import { createMock } from "ts-auto-mock";

describe('when testing with the mock factory jasmine', () => {
    it('should create a spy for methods with the return value', () => {
        interface Interface {
            a(): string;
        }

        const mock: Interface = createMock<Interface>();

        expect(mock.a()).toBe("");
        expect(mock.a).toHaveBeenCalledWith();
    });

    it('should call the spy the correct number of times', () => {
        interface Interface {
            a(): string;
        }

        const mock: Interface = createMock<Interface>();
        let callTimes = (mock.a as jasmine.Spy).calls.count();
        expect(callTimes).toBe(0);
        mock.a();
        callTimes = (mock.a as jasmine.Spy).calls.count();
        expect(callTimes).toBe(1);
    });

    it('should not create a spy for properties', () => {
        interface Interface {
            b: number;
        }

        const mock: Interface = createMock<Interface>();
        expect(mock.b).toBe(0);
    });

    it('should create a spy for nested object', () => {
        interface Interface {
            b: {
                c: () => string
            };
        }

        const mock: Interface = createMock<Interface>();
        expect(mock.b.c()).toBe("");
        expect(mock.b.c).toHaveBeenCalledWith();
        const callTimes = (mock.b.c as jasmine.Spy).calls.count();
        expect(callTimes).toBe(1);
    });
});