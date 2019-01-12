import { createMock } from "../../../src/transformer/create-mock";
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
});