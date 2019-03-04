import { createMock, Mock } from "ts-auto-mock";

describe('not reusable', () => {
    it('should give the default value ', () => {
      // @ts-ignore
        const mock: Mock<string> = createMock<string>();
        // @ts-ignore
        const mock2: Mock<number> = createMock<number>();
        expect(mock).toBe("");
        // @ts-ignore
        expect(mock2).toBe(0);
    });

    it('should give the default value', () => {
        type Type = string;
        // @ts-ignore
        const mock: Mock<Type> = createMock<Type>();
        expect(mock).toBe("");
    });
});