import { createMock } from "../../../src/transformer/create-mock";
describe('for simple properties', () => {
	describe('for declared interface with string', () => {
		interface Interface {
			a: string;
		}
		
		it('should set an empty string', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a).toBe("")
		});
	});
	
	describe('for declared interface with number', () => {
		interface Interface {
			a: number;
		}
		
		it('should set 0', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a).toBe(0)
		});
	});
	
	describe('for declared interface with boolean', () => {
		interface Interface {
			a: boolean;
		}
		
		it('should set false', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a).toBe(false)
		});
	});
	
	describe('for interface with null', () => {
		interface Interface {
			a: null;
		}
		
		it('should set null', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a).toBe(null)
		});
	});
	
	describe('for interface with any', () => {
		interface Interface {
			a: any;
		}
		
		it('should set null', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a).toBe(null)
		});
	});
	
	describe('for interface with unknown', () => {
		interface Interface {
			a: unknown;
		}
		
		it('should set null', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a).toBe(null)
		});
	});
	
	describe('for interface with undefined', () => {
		interface Interface {
			a: undefined;
		}
		
		it('should set null', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a).toBe(null)
		});
	});
});


