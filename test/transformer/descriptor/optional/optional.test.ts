import { createMock } from "../../../../src/transformer/create-mock";

describe('optional', () => {
	class MyClass {
		test?: string;
	}
	
	it('should not set the value', () => {
		const properties: MyClass = createMock<MyClass>();
		expect(properties.test).toBeUndefined();
	});
});