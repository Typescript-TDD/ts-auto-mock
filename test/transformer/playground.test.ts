import { createMock } from 'ts-auto-mock';
import { ClassWithGenerics } from './utilities/classWithGenerics';

describe('with import and generics', () => {
    interface B<T> {
        c: number;
    }

    it('should set the generic value', () => {
        const properties: B<boolean> = createMock<B<boolean>>();
        expect(properties.c).toBe(0);
    });
});
