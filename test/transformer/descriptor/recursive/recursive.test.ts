import { createMock, Mock } from "ts-auto-mock";

describe('recursive', () => {
    interface Interface {
        a: number;
        b: Interface;
    }

    it('should not fail', () => {
        const mock: Mock<Interface> = createMock<Interface>();
        expect(mock.a).toBe(0);
        expect(mock.b.a).toBe(0);
    });
});