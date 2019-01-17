import { createMock, Mock } from "ts-auto-mock";

describe('invalid', () => {
    it('should give a readable error', () => {
      // @ts-ignore
        const mock: Mock<string> = createMock<string>();
        expect(mock).toBeNull();
    });

    it('should give a readable error', () => {
        type Type = string;
        // @ts-ignore
        const mock: Mock<Type> = createMock<Type>();
        expect(mock).toBeNull();
    });
});