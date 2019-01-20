import { createMock } from "ts-auto-mock";
import { ImportInterface, ImportInterfaceWithNestedInterface } from "./utils/interfaces/importInterface";
import ImportDefaultInterface from "./utils/interfaces/importDefaultInterface";
import { ImportNamespace } from "./utils/interfaces/importNameSpace";
import { ImportType, Type } from "./utils/types/type";
import { Mock } from "ts-auto-mock";

describe('with import', () => {
	describe('for interfaces', () => {
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

		it('should be possible to change the value', () => {
			const properties: ImportNamespace.Interface2 = createMock<ImportNamespace.Interface2>();
			expect(properties.b).toBe(0);
			properties.b = 2;
			expect(properties.b).toBe(2);
		});
	});

	describe('for types', () => {
		it('should set the correct property', () => {
			const properties: Type = createMock<Type>();
			expect(properties.a).toBe("");
		});

		it('should set the correct property', () => {
			const properties: Mock<{ a: ImportType }> = createMock<{ a: ImportType }>();
			expect(properties.a).toBeUndefined();
		});
	});
});