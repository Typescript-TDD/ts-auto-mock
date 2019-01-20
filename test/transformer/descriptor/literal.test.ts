import { createMock } from "ts-auto-mock";

describe('for literal', () => {
	describe('with a specific string', () => {
		interface Interface {
			a: "string2";
		}
		
		it('should set null', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a).toBe("string2")
		});
	});
	
	describe('with a specific number', () => {
		interface Interface {
			a: 2;
		}
		
		it('should set null', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a).toBe(2)
		});
	});
});