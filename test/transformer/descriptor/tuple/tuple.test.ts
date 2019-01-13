import { createMock } from "../../../../src/transformer/create-mock";
import { Mock } from "ts-auto-mock";

describe('for tuple', () => {
	interface Interface {
		a: [string, number];
	}
	
	it('should set an empty string', () => {
		const properties: Mock<Interface> = createMock<Interface>();
		expect(properties.a).toEqual([])
	});
});