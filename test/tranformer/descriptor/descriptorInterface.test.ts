import { createMock } from "../../../config/create-mock";


describe('for interfaces', () => {
	describe('with multiple properties', () => {
		interface Interface {
			a: boolean;
			b: string;
			c: number;
		}
		
		it('should set the default properties', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a).toBe(false);
			expect(properties.b).toBe("");
			expect(properties.c).toBe(0);
		});
	});

    describe('without properties', () => {
        interface Interface {}

        it('should not fail', () => {
            const properties: Interface = createMock<Interface>();
            expect(properties).toEqual({});
        });
    });
	
	describe('with nested properties', () => {
		interface Interface {
			a: {
				b: {
					c: string;
				}
			};
		}
		
		it('should set the default properties to the nested object', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a.b.c).toBe("");
		});
	});
	
	describe('with nested interfaces', () => {
		interface Interface {
			a: InterfaceSub
		}
		
		interface InterfaceSub {
			subA: string
		}
		
		it('should set the default properties to the nested object', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a.subA).toBe("");
		});
	});
	
	describe('with nested type reference', () => {
		interface Interface {
			a: Type
		}
		
		type Type = string;
		
		it('should set the default property', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a).toBe("");
		});
	});
	
	describe('with nested type reference with objects', () => {
		interface Interface {
			a: Type
		}
		
		type Type = {
			e: string;
			f: number;
		};
		
		it('should set the default property', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a.e).toBe("");
			expect(properties.a.f).toBe(0);
		});
	});
	
});




