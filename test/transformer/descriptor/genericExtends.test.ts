import { createMock } from "ts-auto-mock";
import { Mock } from "ts-auto-mock";

describe('for generic', () => {
    describe('interfaces', () => {
        interface toBeExtended {
            a: string;
        }

        interface ItWillExtend extends toBeExtended {
            b: boolean
        }

        interface WithExtends<T extends toBeExtended> {
            iAmGeneric: T
        }

        interface WithExtendsMethod<T>{
            method<S extends T>(): S
        }

        it('should set the generic value', () => {
            const properties: WithExtends<ItWillExtend> = createMock<WithExtends<ItWillExtend>>();
            expect(properties.iAmGeneric.b).toBe(false);
            expect(properties.iAmGeneric.a).toBe("");
        });

        it('should return the value as null', () => { // we do not know the type at runtime of the invoke function
            const properties: Mock<WithExtendsMethod<toBeExtended>> = createMock<WithExtendsMethod<toBeExtended>>();
            expect(properties.method()).toBeNull();
        });
    });

    describe("with nested generics", () => {
        interface A<T> {
            a: T
        }

        interface B<T> extends A<T> {
            b: number
        } 
        it('should set the generic value', () => {
            const properties: B<string> = createMock<B<string>>();
            expect(properties.a).toBe("");
            expect(properties.b).toBe(0);
        });
    });

    describe("with nested generics declared", () => {
        interface A<T> {
            a: T
        }

        interface B<T> extends A<string> {
            b: number
        } 

        it('should set the generic value', () => {
            const properties: B<string> = createMock<B<string>>();
            expect(properties.a).toBe("");
            expect(properties.b).toBe(0);
        });
    });

    describe("with nested generics declared with a type", () => {
        type Type = {
            value: string;
        }

        type Test = number;
        interface A<T> {
            a: T
        }

        interface C<T> {
            c: T;
        }

        interface B<T> extends A<Type>, C<Test> {
            b: number
        } 

        it('should set the generic value', () => {
            const properties: B<string> = createMock<B<string>>();
            expect(properties.a.value).toBe("");
            expect(properties.c).toBe(0);
            expect(properties.b).toBe(0);
        });
    });

    describe("with nested generics declared with literal type", () => {    
        interface A<T> {
            a: T
        }            

        interface B<T> extends A<{a: number}> {
            b: number
        } 

        it('should set the generic value', () => {
            const properties: B<string> = createMock<B<string>>();
            expect(properties.a.a).toBe(0);
            expect(properties.b).toBe(0);
        });
    });
});