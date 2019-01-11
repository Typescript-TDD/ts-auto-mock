import { createMock } from "ts-auto-mock";

describe('names', () => {
    it('should give a name to the spy', () => {
        interface Interface {
            a(): string;
            b: () => string;
        }

        const mock: Interface = createMock<Interface>();

        expect((mock.a as jasmine.Spy).and.identity).toBe("a");
        expect((mock.b as jasmine.Spy).and.identity).toBe("b");
    });
});
