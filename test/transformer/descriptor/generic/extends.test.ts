import { createMock } from 'ts-auto-mock';

describe('for generic', () => {
    describe('interfaces', () => {
        interface ToBeExtended {
            a: string;
        }

        interface ItWillExtend extends ToBeExtended {
            b: boolean;
        }

        interface WithExtends<T extends ToBeExtended> {
            iAmGeneric: T;
        }

        interface WithExtendsMethod<T> {
            method<S extends T>(): S;
        }

        it('should set the generic value', () => {
            const properties: WithExtends<ItWillExtend> = createMock<WithExtends<ItWillExtend>>();
            expect(properties.iAmGeneric.b).toBe(false);
            expect(properties.iAmGeneric.a).toBe('');
        });

        it('should return the value as null', () => { // we do not know the type at runtime of the invoke function
            const properties: WithExtendsMethod<ToBeExtended> = createMock<WithExtendsMethod<ToBeExtended>>();
            expect(properties.method()).toBeNull();
        });
    });

    describe('with nested generics', () => {
        interface A<T> {
            a: T;
        }

        interface B<T> extends A<T> {
            b: number;
        }
        it('should set the generic value', () => {
            const properties: B<string> = createMock<B<string>>();
            expect(properties.a).toBe('');
            expect(properties.b).toBe(0);
        });
    });

    describe('with nested generics declared', () => {
        interface A<T> {
            a: T;
        }

        interface B<T> extends A<string> {
            b: number;
        }

        it('should set the generic value', () => {
            const properties: B<string> = createMock<B<string>>();
            expect(properties.a).toBe('');
            expect(properties.b).toBe(0);
        });
    });

    describe('with nested generics declared with a type', () => {
        interface Type {
            value: string;
        }

        type Test = number;
        interface A<T> {
            a: T;
        }

        interface C<T> {
            c: T;
        }

        interface B<T> extends A<Type>, C<Test> {
            b: number;
        }

        it('should set the generic value', () => {
            const properties: B<string> = createMock<B<string>>();
            expect(properties.a.value).toBe('');
            expect(properties.c).toBe(0);
            expect(properties.b).toBe(0);
        });
    });

    describe('with nested generics declared with literal type', () => {
        interface A<T> {
            a: T;
        }

        interface B<T> extends A<{a: number}> {
            b: number;
        }

        it('should set the generic value', () => {
            const properties: B<string> = createMock<B<string>>();
            expect(properties.a.a).toBe(0);
            expect(properties.b).toBe(0);
        });
    });

    describe('with nested generics that extends itself', () => {
        interface A<T> {
            a: T;
            b: A<T>;
        }

        interface B<T> extends A<T> {
            c: number;
        }

        it('should set the generic value', () => {
            const properties: B<string> = createMock<B<string>>();
            expect(properties.a).toBe('');
            expect(properties.c).toBe(0);
            expect(properties.b.b.a).toBe('');
        });
    });

    describe('with nested generics classes that extends itself', () => {
        class A<T> {
            public a: T;
            public b: A<T>;
        }

        class B<T> extends A<T> {
            public c: number;
            private d: T;
        }

        it('should set the generic value', () => {
            const properties: B<number> = createMock<B<number>>();
            expect(properties.a).toBe(0);
            expect(properties.c).toBe(0);
            expect(properties.b.b.a).toBe(0);
            // @ts-ignore
            expect(properties.d).toBeUndefined();
        });
    });

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

    describe('with generics that extends typescript libraries', () => {
        // tslint:disable-next-line

        interface B<T> extends Array<T> {
            c: number;
            d: T;
        }

        it('should not consider typescript library', () => {
            const properties: B<number> = createMock<B<number>>();
            expect(properties.c).toBe(0);
            expect(properties).not.toBe([]);
        });
    });
});
