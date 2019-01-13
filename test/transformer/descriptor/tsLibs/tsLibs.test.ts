import { createMock } from "../../../../src/transformer/create-mock";
import { Mock } from "ts-auto-mock";

describe('typescript lib', () => {
    it('should set an empty array', () => {
        interface Interface {
            a: Array<boolean>;
        }
        const properties: Mock<Interface> = createMock<Interface>();
        expect(properties.a).toEqual([])
    });

    it('should set the default value for a number', () => {
        interface Interface {
            a: Number;
        }
        const properties: Mock<Interface> = createMock<Interface>();
        expect(properties.a).toBe(0);
    });

    it('should set the default value for a string', () => {
        interface Interface {
            a: String;
        }
        const properties: Mock<Interface> = createMock<Interface>();
        expect(properties.a).toBe("");
    });

    it('should set the default value for a boolean', () => {
        interface Interface {
            a: Boolean;
        }
        const properties: Mock<Interface> = createMock<Interface>();
        expect(properties.a).toBe(false);
    });

    it('should set the default value for empty object', () => {
        interface Interface {
            a: object;
        }
        const properties: Mock<Interface> = createMock<Interface>();
        expect(properties.a).toEqual({});
    });

    it('should set an empty function for a function', () => {
        interface Interface {
            a: Function;
        }
        const properties: Mock<Interface> = createMock<Interface>();
        expect(properties.a()).toBeUndefined();
    });
	
	it('should set an empty array for a ReadOnlyArray', () => {
		interface Interface {
			a: ReadonlyArray<boolean>;
		}
		const properties: Mock<Interface> = createMock<Interface>();
		expect(properties.a).toEqual([]);
	});
	
	it('should set undefined for a Date', () => {
		interface Interface {
			a: Date;
		}
		
		const properties: Mock<Interface> = createMock<Interface>();
		expect(properties.a).toBeUndefined();
	});
});