import { createMock, mockedMethod, On } from "ts-auto-mock";

describe('names', () => {
    it('should give a name to the spy', () => {
        interface Interface {
            a(): string;
            b: () => string;
        }

        const mock: Interface = createMock<Interface>();
        const spyA: jasmine.Spy = On.Mock(mock).get(mockedMethod(x => x.a));
        const spyB: jasmine.Spy = On.Mock(mock).get(mockedMethod(x => x.b));

        expect(spyA.and.identity).toBe("a");
        expect(spyB.and.identity).toBe("b");
    });
});
