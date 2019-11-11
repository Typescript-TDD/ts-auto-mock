import { createMock } from 'ts-auto-mock';

describe('with nested generics types that extends itself', () => {
    // tslint:disable-next-line
    type A<T> = {
        a: T;
        b: A<T>;
    };

    interface B<T> extends A<T> {
        c: number;
        d: T;
    }

    it('should set the generic value', () => {
        const properties: B<number> = createMock<B<number>>();
        expect(properties.a).toBe(0);
        expect(properties.c).toBe(0);
        expect(properties.b.b.a).toBe(0);
    });
});
