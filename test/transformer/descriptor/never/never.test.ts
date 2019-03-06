import { createMock } from "ts-auto-mock";

describe('for never', () => {
	interface Interface {
		a: never;
	}
	
	it('should set undefined', () => {
		const properties: Interface = createMock<Interface>();
		expect(properties.a).toBeUndefined()
	});
});