import { createMock } from "../../../src/transformer/create-mock";

describe('work in progress', () => {
    it('should give a name to the spy', () => {
        interface Interface {
            a(): string;
            b: () => string;
        }

        const mock: Interface = createMock<Interface>();

        expect((mock.a as jasmine.Spy).name).toBe("a");
        expect((mock.b as jasmine.Spy).name).toBe("b");
    });

});
