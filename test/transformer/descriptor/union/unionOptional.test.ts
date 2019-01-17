// import { createMock } from "ts-auto-mock";
// import { ImportType } from "../utils/types/type";
// import { ImportInterface } from "../utils/interfaces/importInterface";
//
// describe('union optional', () => {
// 	describe('type reference', () => {
// 		type Type = null;
// 		class MyClass {
// 			test: string | Type;
// 		}
//
// 		it('should not set the value', () => {
// 			const properties: MyClass = createMock<MyClass>();
// 			expect(properties.test).toBeUndefined();
// 		});
// 	});
//
// 	describe('type import', () => {
// 		class MyClass {
// 			test: string | ImportType;
// 		}
//
// 		it('should not set the value', () => {
// 			const properties: MyClass = createMock<MyClass>();
// 			expect(properties.test).toBeUndefined();
// 		});
// 	});
//
// 	describe('type interface import', () => {
// 		class MyClass {
// 			test: string | ImportInterface;
// 		}
//
// 		it('should not set the value', () => {
// 			const properties: MyClass = createMock<MyClass>();
// 			expect(properties.test).toBe("");
// 		});
// 	});
//
// 	describe('type object declared', () => {
// 		class MyClass {
// 			test: string | { a: string } | null;
// 		}
//
// 		it('should not set the value', () => {
// 			const properties: MyClass = createMock<MyClass>();
// 			expect(properties.test).toBeUndefined();
// 		});
// 	});
//
// 	describe('type declared value', () => {
// 		class MyClass {
// 			test: "2" | null;
// 		}
//
// 		it('should not set the value', () => {
// 			const properties: MyClass = createMock<MyClass>();
// 			expect(properties.test).toBeUndefined();
// 		});
// 	});
//
// 	describe('type reference optional', () => {
// 		type TypeOptional = string | null;
//
// 		class MyClass {
// 			test: TypeOptional | number;
// 		}
//
// 		it('should not set the value', () => {
// 			const properties: MyClass = createMock<MyClass>();
// 			expect(properties.test).toBeUndefined();
// 		});
// 	});
//
// 	describe('type reference optional second', () => {
// 		type TypeOptional = string | null;
//
// 		class MyClass {
// 			test: number | TypeOptional;
// 		}
//
// 		it('should not set the value', () => {
// 			const properties: MyClass = createMock<MyClass>();
// 			expect(properties.test).toBeUndefined();
// 		});
// 	});
//
// 	describe('type reference optional and extends', () => {
// 		type TypeOptional = { a: string} & { b: number} | null;
//
// 		class MyClass {
// 			test: number | TypeOptional;
// 		}
//
// 		it('should not set the value', () => {
// 			const properties: MyClass = createMock<MyClass>();
// 			expect(properties.test).toBeUndefined();
// 		});
// 	});
// });
