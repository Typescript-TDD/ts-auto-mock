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

        interface WithExtends<T extends toBeExtended>{
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
});