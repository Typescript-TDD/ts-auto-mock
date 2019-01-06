import { createMock } from "../../../config/create-mock";

describe('for methods', () => {
	interface InterfaceReturnMethod {
		a: string;
	}
	
	interface Interface {
		a(): void;
		b(): number;
		c(): string;
		d(): string[];
		e(): InterfaceReturnMethod;
	}
	
	it('should set the functions', () => {
		const properties: Interface = createMock<Interface>();
		expect(properties.a()).toBeNull();
		expect(properties.b()).toBe(0);
		expect(properties.c()).toBe("");
		expect(properties.d()).toEqual([]);
		expect(properties.e().a).toBe("");
	});
});