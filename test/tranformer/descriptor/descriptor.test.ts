import { createMock } from "../../../config/create-mock";
import { ImportInterface, ImportInterfaceWithNestedInterface } from "./interfaces/importInterface";
import ImportDefaultInterface from "./interfaces/importDefaultInterface";
import { ImportNamespace } from "./interfaces/importNameSpace";
import { Type } from "./types/type";
import { Class } from "./classes/class";
import { EmptyClass } from "./classes/EmptyClass";
import { AbstractClass } from "./classes/AbstractClass";

describe('descriptor', () => {
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
	
	describe('for declared interface with array', () => {
		interface Interface {
			a: boolean[];
		}
		
		it('should set false', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a).toEqual([])
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
	
	describe('for interface with a specific string', () => {
		interface Interface {
			a: "string2";
		}
		
		it('should set null', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a).toBe("string2")
		});
	});
	
	describe('for interface with a specific number', () => {
		interface Interface {
			a: 2;
		}
		
		it('should set null', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a).toBe(2)
		});
	});
	
	
	describe('for declared interface with multiple properties', () => {
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
	
	describe('for declared interface with nested objects', () => {
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
	
	describe('for declared interface with nested interface reference', () => {
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
	
	describe('for declared interface with nested type refence', () => {
		interface Interface {
			a: Type
		}
		
		type Type = string;
		
		it('should set the default property', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.a).toBe("");
		});
	});
	
	describe('for declared interface with nested complex type reference', () => {
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
	
	describe('for imported interfaces', () => {
		it('should set the default property for import', () => {
			const properties: ImportInterface = createMock<ImportInterface>();
			expect(properties.a.b).toBe("");
		});
		
		it('should set the default property for import with sub imports', () => {
			const properties: ImportInterfaceWithNestedInterface = createMock<ImportInterfaceWithNestedInterface>();
			expect(properties.a.test).toBe(false);
		});
		
		it('should set the default property for default', () => {
			const properties: ImportDefaultInterface = createMock<ImportDefaultInterface>();
			expect(properties.a).toBe("");
		});
		
		it('should set the default property for namespace', () => {
			const properties: ImportNamespace.Interface = createMock<ImportNamespace.Interface>();
			expect(properties.a).toBe("");
		});
		
		it('should set the default property for namespace', () => {
			const properties: ImportNamespace.Interface2 = createMock<ImportNamespace.Interface2>();
			expect(properties.b).toBe(0);
		});
	});
	
	describe('for imported types', () => {
		it('should set the correct property', () => {
			const properties: Type = createMock<Type>();
			expect(properties.a).toBe("");
		});
	});
	
	describe('for classes', () => {
		class Test {
			private _a: string;
			public a: string;
		}
		
		it('should set the correct property for internal class', () => {
			const properties: Test = createMock<Test>();
			expect(properties.a).toBe("");
			expect(properties["_a"]).toBeUndefined();
		});
		
		it('should set the correct property for imported class', () => {
			const properties: Class = createMock<Class>();
			expect(properties.a).toBe("");
			expect(properties.b).toBe("");
			expect(properties["_a"]).toBeUndefined();
		});
		
		it('should set an empty object for empty class', () => {
			const properties: EmptyClass = createMock<EmptyClass>();
			expect(properties).toEqual({});
		});
		
		it('should set the correct properties for an abstract class', () => {
			const properties: AbstractClass = createMock<AbstractClass>();
			expect(properties.abstractProperty).toBe("");
			expect(properties.property).toBe("");
			expect(properties.publicProperty).toBe("");
			expect(properties["privateProperty"]).toBeUndefined();
		});
	});
});