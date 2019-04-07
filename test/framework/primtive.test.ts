import { createMock, method, On } from 'ts-auto-mock';

describe('primitives', () => {
    type a = string;
    let mock: a;

    beforeEach(() => {
        // @ts-ignore
        mock = createMock<a>();
    });

    it('should not be able to get the mock', () => {
        expect(() => {
            // tslint:disable
            // @ts-ignore
            On(mock).get(method((x) => x.apply));
        }).toThrow();
    });
});
