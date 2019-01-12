import { createMock } from "../../../src/transformer/create-mock";
describe('for functions assigned', () => {
    describe('union optional', () => {
        class MyClass {
            test: string | void;
            test2: string | null;
            test3: string | unknown;
        }

        it('should not set the value', () => {
            const properties: MyClass = createMock<MyClass>();
            expect(properties.test).toBeUndefined();
            expect(properties.test2).toBeUndefined();
            expect(properties.test3).toBeUndefined();
        });
    });
	
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