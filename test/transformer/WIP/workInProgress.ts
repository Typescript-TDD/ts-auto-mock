import { createMock } from "../../../src/transformer/create-mock";
import { Mock } from "ts-auto-mock";
import { TypeUnion } from "../descriptor/utils/types/typeUnion";
describe('for functions assigned', () => {
	describe('for recursion', () => {
	    interface Interface {
	        a: Interface;
	        b: string;
        }
        
		it('should work', () => {
			const properties: Interface = createMock<Interface>();
			expect(properties.b).toBe("");
		});
	});
	
	describe('extends typescript libs', () => {
		interface Interface extends Array<string> {
			b: string;
		}
		
		it('should work', () => {
			const properties: Mock<Interface> = createMock<Interface>();
			expect(properties).toBe("");
		});
	});
	
	describe('intersection with typescript lib', () => {
		type TypeIntersection = {} & Promise<string>;
		
		interface Intersection {
			a: TypeIntersection;
		}
		it('should work', () => {
			const properties: Mock<Intersection> = createMock<Intersection>();
			expect(properties.a.then).toBeUndefined();
		});
	});
	
	describe('union type string imported', () => {
		it('should assign the first value as if it would declared literal', () => {
			interface UnionContainer {
				union: TypeUnion;
			}

			const properties: Mock<UnionContainer> = createMock<UnionContainer>();
			expect(properties.union).toBe("1");
		});
	});
});