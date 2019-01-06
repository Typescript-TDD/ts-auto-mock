import { createMock } from "../../../config/create-mock";

describe('for declared interface with a method', () => {
	interface Interface {
		a(): void;
		b(): number;
		c(): string;
		d(): string[];
	}
	
	it('should set the functions', () => {
		const properties: Interface = createMock<Interface>();
		expect(properties.a()).toBeNull();
		expect(properties.b()).toBe(0);
		expect(properties.c()).toBe("");
		expect(properties.d()).toEqual([]);
	});
});