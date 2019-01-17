import { createMock } from "ts-auto-mock";

describe('when assigned directly from a method', () => {
	describe('return number', () => {
		class MyClass {
			public value = () =>  2;
		}
		
		it('should return the number', () => {
			const properties: MyClass = createMock<MyClass>();
			expect(properties.value()).toBe(2);
		});
	});
	
	describe('return string', () => {
		class MyClass {
			public value = function() {
				return "valueString";
			}
		}
		
		it('should set the value', () => {
			const properties: MyClass = createMock<MyClass>();
			expect(properties.value()).toBe("valueString");
		});
	});
	
	describe('return false', () => {
		class MyClass {
			public value = ()=> false;
		}
		
		it('should set the value', () => {
			const properties: MyClass = createMock<MyClass>();
			expect(properties.value()).toBe(false);
		});
	});
	
	describe('return true', () => {
		class MyClass {
			public value = () => true;
		}
		
		it('should set the value', () => {
			const properties: MyClass = createMock<MyClass>();
			expect(properties.value()).toBe(true);
		});
	});
	
	describe('return arrow', () => {
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
	
	describe('return expression', () => {
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