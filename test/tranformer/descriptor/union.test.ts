import { createMock } from "../../../src/transformer/create-mock";

describe('for union', () => {
	interface Interface {
		a: string | number;
	}
	
	it('should set the first type', () => {
		const properties: Interface = createMock<Interface>();
		expect(properties.a).toBe("");
	});
});