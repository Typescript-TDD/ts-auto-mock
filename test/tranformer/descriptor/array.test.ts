import { createMock } from "../../../src/transformer/create-mock";

describe('for array', () => {
	interface Interface {
		a: boolean[];
	}

    interface InterfaceType {
        a: Array<boolean>;
    }
	
	it('should set an empty array', () => {
		const properties: Interface = createMock<Interface>();
		expect(properties.a).toEqual([])
	});

    it('should set an empty array', () => {
        const properties: InterfaceType = createMock<InterfaceType>();
        expect(properties.a).toEqual([]);
    });
});