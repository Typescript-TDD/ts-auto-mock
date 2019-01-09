import { createMock } from "../../../src/transformer/create-mock";

describe('typescript lib', () => {
    it('should set an empty array', () => {
        interface Interface {
            a: Array<boolean>;
        }
        const properties: Interface = createMock<Interface>();
        expect(properties.a).toEqual([])
    });

    it('should set the default value for a number', () => {
        interface Interface {
            a: Number;
        }
        const properties: Interface = createMock<Interface>();
        expect(properties.a).toBe(0);
    });

    it('should set the default value for a string', () => {
        interface Interface {
            a: String;
        }
        const properties: Interface = createMock<Interface>();
        expect(properties.a).toBe("");
    });

    it('should set the default value for a boolean', () => {
        interface Interface {
            a: Boolean;
        }
        const properties: Interface = createMock<Interface>();
        expect(properties.a).toBe(false);
    });

    it('should set the default value for empty object', () => {
        interface Interface {
            a: Object;
        }
        const properties: Interface = createMock<Interface>();
        expect(properties.a).toEqual({});
    });
});