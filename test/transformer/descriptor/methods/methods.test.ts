import { createMock } from 'ts-auto-mock';

describe('for methods', () => {
    interface InterfaceReturnMethod {
        a: string;
    }

    interface Interface {
        a(): void;
        b(): number;
        c(): string;
        d(): string[];
        e(): InterfaceReturnMethod;
    }

    it('should set the functions', () => {
        const properties: Interface = createMock<Interface>();
        expect(properties.a()).toBeUndefined();
        expect(properties.b()).toBe(0);
        expect(properties.c()).toBe('');
        expect(properties.d()).toEqual([]);
        expect(properties.e().a).toBe('');
    });

    describe('for interface declaration', () => {
        interface InterfaceWithDeclaration {
            method: () => number;
        }

        it('should set the functions', () => {
            const properties: InterfaceWithDeclaration = createMock<InterfaceWithDeclaration>();
            expect(properties.method()).toBe(0);
        });
    });

    describe('for declaration', () => {
        class MyClass {
            public method(): number {
                return 2;
            }
        }

        it('should set the functions', () => {
            const properties: MyClass = createMock<MyClass>();
            expect(properties.method()).toBe(0);
        });
});

    describe('for undeclared return value', () => {
        class MyClass {
            // tslint:disable-next-line
            public method() {
                return 2;
            }
        }

        it('should infer the return value from return statement', () => {
            const properties: MyClass = createMock<MyClass>();
            expect(properties.method()).toBe(2);
        });
    });

    describe('for a type function', () => {
        type Fn = () => string;
        it('should set the functions', () => {
            const properties: Fn = createMock<Fn>();
            expect(properties()).toBe('');
        });
    });

    describe('for an interface without return value', () => {
        interface InterfaceWithoutReturnValue {
            // tslint:disable-next-line
            method();
        }

        it('should return null', () => {
            const a: InterfaceWithoutReturnValue = createMock<InterfaceWithoutReturnValue>();

            expect(a.method()).toBeNull();
        });
    });
});
