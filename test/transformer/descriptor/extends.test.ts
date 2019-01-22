import { createMock } from "ts-auto-mock";
import { Mock } from "ts-auto-mock";

describe('for extends', () => {
    describe('for interface', () => {
        interface Keys {
            a: string;
            b: string;
            c: number;
        }
        interface Interface extends Keys {
            property: boolean;
            e: AnotherInterface;
            a: string;
        }

        interface AnotherInterface extends Keys {
            f: boolean;
        }

        it('should set the default types', () => {
            const properties: Mock<Interface> = createMock<Interface>();
            expect(properties.a).toBe("");
            expect(properties.property).toBe(false);
            expect(properties.b).toBe("");
            expect(properties.c).toBe(0);
            expect(properties.e.a).toBe("");
        });
    });

    describe('for classes', () => {
        class BaseClass {
            a: string;
            b: number;
        }

        class Class extends BaseClass {
          property: boolean;
          a: string;
        }

        it('should set the default types', () => {
            const properties: Mock<Class> = createMock<Class>();
            expect(properties.a).toBe("");
            expect(properties.property).toBe(false);
            expect(properties.b).toBe(0);
        });
    });

    describe('extends types', () => {
        type Type = {
            c: string;
        }
        interface Interface extends Type {}
            
        it('should set the correct value', () => {
            const properties: Mock<Interface> = createMock<Interface>();
            expect(properties.c).toBe(""); 
        });
    });

    describe('extends typescript libs Array', () => {
        interface Interface extends Array<string> {
            a: number;
        }
            
        it('should set the correct value', () => {
            const properties: Mock<Interface> = createMock<Interface>();
            expect(properties as any).toEqual({a: 0}); 
        });
    });

    describe('extends typescript libs Promise', () => {
        interface Interface extends Promise<string> {
            a: number;
        }
            
        it('should ignore the typescript library', () => {
            const properties: Mock<Interface> = createMock<Interface>();
            
            expect(properties as any).toEqual({ a: 0 })
        });
    });

    describe('extends type with boolean', () => {
        type Type = boolean[]
        interface Interface extends Type {}
            
        it('should ignore the typescript library', () => {
            const properties: Mock<Interface> = createMock<Interface>();
            expect(properties as any).toEqual({}); 
        });
    });
});