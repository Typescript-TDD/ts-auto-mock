import { createMock } from "../../../src/transformer/create-mock";

describe('for array', () => {
	interface Interface {
		a: boolean[];
	}
	
	it('should set an empty array', () => {
		const properties: Interface = createMock<Interface>();
		expect(properties.a).toEqual([])
	});
});