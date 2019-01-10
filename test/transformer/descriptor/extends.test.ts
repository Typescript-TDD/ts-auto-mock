import { createMock } from "../../../src/transformer/create-mock";

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
            const properties: Interface = createMock<Interface>();
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
            const properties: Class = createMock<Class>();
            expect(properties.a).toBe("");
            expect(properties.property).toBe(false);
            expect(properties.b).toBe(0);
        });
    });
});