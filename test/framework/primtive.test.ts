import { createMock } from 'ts-auto-mock';
import { method, On } from 'ts-auto-mock/extension';

describe('primitives', () => {
    type a = string;
    let mock: a;

    beforeEach(() => {
        // @ts-ignore
        mock = createMock<a>();
    });

    it('should not be able to get the mock', () => {
        expect(() => {
            // @ts-ignore
            On(mock).get(method((x: string) => x.apply));
        }).toThrow();
    });
});
