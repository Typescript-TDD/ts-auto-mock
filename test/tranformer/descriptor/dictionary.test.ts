import { createMock } from "../../../src/transformer/create-mock";

describe('for dictionary', () => {
    interface Test {
        hello: string;
    }
    type Dictionary<T> = {
        [key: string]: T;
    }

    it('should set an empty object', () => {
        const properties: Dictionary<Test> = createMock<Dictionary<Test>>();
        expect(properties).toEqual({});
    });
});

