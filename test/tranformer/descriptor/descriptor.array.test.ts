import { createMock } from "../../../config/create-mock";

describe('for declared interface with array', () => {
	interface Interface {
		a: boolean[];
	}
	
	it('should set an empty array', () => {
		const properties: Interface = createMock<Interface>();
		expect(properties.a).toEqual([])
	});
});