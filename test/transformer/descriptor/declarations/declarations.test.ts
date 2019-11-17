import { createMock } from 'ts-auto-mock';
import { ClassDeclaration, InterfaceDeclaration, TypeDeclaration } from '../utils/declarations/declaration';
import { MultipleClassDeclaration, MultipleInterfaceDeclaration, MultipleLiteralTypeDeclaration, MultipleTypeDeclaration } from '../utils/declarations/multipleDeclaration';

describe('declarations', () => {
    describe('for one declaration', () => {
        describe('class', () => {
            class MyClass {
                public value: 2;
            }

            it('should return the correct properties', () => {
                const properties: MyClass = createMock<MyClass>();
                expect(properties.value).toBe(2);
            });
        });

        describe('interface', () => {
            interface Interface {
                value: boolean;
            }

            it('should return the correct properties', () => {
                const properties: Interface = createMock<Interface>();
                expect(properties.value).toBe(false);
            });
        });

        describe('type', () => {
            //tslint:disable
            type Type = {
                value: boolean
            }

            it('should return the correct properties', () => {
                const properties: Type = createMock<Type>();
                expect(properties.value).toBe(false);
            });
        });

        describe('interface imported', () => {
            it('should return the correct properties', () => {
                const properties: InterfaceDeclaration = createMock<InterfaceDeclaration>();
                expect(properties.a).toBe('');
            });
        });


        describe('class imported', () => {
            it('should return the correct properties', () => {
                const properties: ClassDeclaration = createMock<ClassDeclaration>();
                expect(properties.a).toBe('');
            });
        });

        describe('type imported', () => {
            it('should return the correct properties', () => {
                const properties: TypeDeclaration = createMock<TypeDeclaration>();
                expect(properties.a).toBe('');
            });
        });
    });


    describe('for multiple declaration', () => {
        describe('class', () => {
            // @ts-ignore
            class MyClass {
                public value: 2;
            }

            // @ts-ignore
            class MyClass {
                public value: 3;
                public value2: 3;
            }

            it('should return the properties from the first declaration', () => {
                const properties: MyClass = createMock<MyClass>();
                expect(properties.value).toBe(2);
                // @ts-ignore
                expect(properties.value2).toBeUndefined();
            });
        });


        describe('interface', () => {
            interface Interface {
                value: boolean;
                value3: number;
            }

            interface Interface {
                value: boolean;
                value2: string;
            }

            it('should mix the properties', () => {
                const properties: Interface = createMock<Interface>();
                expect(properties.value).toBe(false);
                expect(properties.value2).toBe('');
                expect(properties.value3).toBe(0);
            });
        });

        describe('interface and variable', () => {
            var Interface: Interface;

            interface Interface {
                value: boolean;
                value2: string;
            }

            it('should ignore the variable', () => {
                const properties: Interface = createMock<Interface>();
                expect(properties.value).toBe(false);
                expect(properties.value2).toBe('');
            });
        });

        describe('type', () => {
            // @ts-ignore
            type Type = {
                value: boolean
            }

            // @ts-ignore
            type Type = {
                value: string
            }

            it('should return the first declarations properties', () => {
                const properties: Type = createMock<Type>();
                expect(properties.value).toBe(false);
            });
        });

        describe('interface imported', () => {
            it('should ignore variables declaration', () => {
                const properties: MultipleInterfaceDeclaration = createMock<MultipleInterfaceDeclaration>();
                expect(properties.a).toBe('');
            });
        });


        describe('class imported', () => {
            it('should consider first declarations', () => {
                // @ts-ignore
                const properties: MultipleClassDeclaration = createMock<MultipleClassDeclaration>();
                expect(properties.a).toBe('');
            });
        });

        describe('type imported', () => {
            it('should return the correct properties', () => {
                const properties: MultipleTypeDeclaration = createMock<MultipleTypeDeclaration>();
                expect(properties.a).toBe('');
            });
        });

        describe('literal imported', () => {
            it('should return the correct properties', () => {
                interface Interface {
                    test: MultipleLiteralTypeDeclaration;
                }
                const properties: Interface = createMock<Interface>();
                expect(properties.test).toBe('string');
            });
        });
    });
});
