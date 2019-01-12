import { createMock } from "../../../../src/transformer/create-mock";

describe('for methods assignments', () => {
	describe('arrow', () => {
		class MyClass {
			public method = () => {
				return "s"
			}
		}
		
		class MyClassWithReturnArrow {
			public method = () => () => {
				return "s"
			}
		}
		
		
		it('should set the function', () => {
			const properties: MyClassWithReturnArrow = createMock<MyClassWithReturnArrow>();
			expect(properties.method()()).toBe("s");
		});
		
		it('should set the function', () => {
			const properties: MyClass = createMock<MyClass>();
			expect(properties.method()).toBe("s");
		});
	});
	
	describe('expression', () => {
		class MyClass {
			public method = function() {
				return "s"
			}
		}
		
		class MyClassWithReturnExpression {
			public method = function() {
				return function() {
					return "s"
				}
			}
		}
		
		it('should set the function', () => {
			const properties: MyClass = createMock<MyClass>();
			expect(properties.method()).toBe("s");
		});
		
		it('should set the function', () => {
			const properties: MyClassWithReturnExpression = createMock<MyClassWithReturnExpression>();
			expect(properties.method()()).toBe("s");
		});
	});
});