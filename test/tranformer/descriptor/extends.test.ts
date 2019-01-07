import { createMock } from "../../../config/create-mock";

describe('for extends', () => {
	interface Keys {
		a: string;
		b: string;
		c: number;
	}
	interface Interface extends Keys {
		property: boolean;
		e: AnotherInterface;
	}
	
	interface AnotherInterface extends Keys {
		f: boolean;
	}
	
	it('should set the default types', () => {
		const properties: Interface = createMock<Interface>();
		expect(properties.a).toBe("");
		expect(properties.property).toBe(false);
		expect(properties.b).toBe("");
		expect(properties.c).toBe(0);
		expect(properties.e.a).toBe("");
	});
});