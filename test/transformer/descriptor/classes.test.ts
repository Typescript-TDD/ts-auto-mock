import { createMock } from "../../../src/transformer/create-mock";
import { Class } from "./utils/classes/class";
import { AbstractClass } from "./utils/classes/AbstractClass";
import { EmptyClass } from "./utils/classes/EmptyClass";
import { Mock } from "ts-auto-mock";

describe('for classes', () => {
	class Test {
		private _a: string;
		public a: string;
	}
	
	it('should set the correct property for internal class', () => {
		const properties: Mock<Test> = createMock<Test>();
		expect(properties.a).toBe("");
		expect(properties["_a"]).toBeUndefined();
	});
	
	it('should set the correct property for imported class', () => {
		const properties: Mock<Class> = createMock<Class>();
		expect(properties.a).toBe("");
		expect(properties.b).toBe("");
		expect(properties["_a"]).toBeUndefined();
	});
	
	it('should set an empty object for empty class', () => {
		const properties: EmptyClass = createMock<EmptyClass>();
		expect(properties).toEqual({});
	});
	
	it('should set the correct properties for an abstract class', () => {
		const properties: Mock<AbstractClass> = createMock<AbstractClass>();
		expect(properties.abstractProperty).toBe("");
		expect(properties.property).toBe("");
		expect(properties.publicProperty).toBe("");
		expect(properties["privateProperty"]).toBeUndefined();
	});

	it('should be possible to change the value', () => {
        const properties: Mock<AbstractClass> = createMock<AbstractClass>();
        
        properties.property = "changedValue";
        expect(properties.property).toBe("changedValue");
	});
});
