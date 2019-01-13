import { createMock } from "../../../src/transformer/create-mock";
import { Mock } from "ts-auto-mock";
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
});