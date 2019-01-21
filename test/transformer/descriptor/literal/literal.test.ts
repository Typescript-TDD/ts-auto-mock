import { createMock } from "ts-auto-mock";
import { TypeUnion, TypeUnionTokenNumber, TypeUnionToken, TypeUnionObject, TypeUnionFunction } from "../utils/types/typeUnion";

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

	describe('with import', () => {
		interface Interface {
			literal: TypeUnion;
		}
		
		it('should set the first one', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.literal).toBe("1");
		});
	});

	describe('with import token string', () => {
		interface Interface {
			literal: TypeUnionToken;
		}
		
		it('should set the first one', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.literal).toBe("a");
		});
	});

	describe('with import token number', () => {
		interface Interface {
			literal: TypeUnionTokenNumber;
		}
		
		it('should set the first one', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.literal).toBe(1);
		});
	});

	describe('with import object', () => {
		interface Interface {
			literal: TypeUnionObject;
		}
		
		it('should set the first one', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.literal).toEqual({
				a: ""
			});
		});
	});

	describe('with import function', () => {
		interface Interface {
			literal: TypeUnionFunction;
		}
		
		it('should set the first one', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.literal()).toBeUndefined();
		});
	});
});