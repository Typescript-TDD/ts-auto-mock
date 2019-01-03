import { FrameworkAutoSpy } from "../../src/framework/frameworkAutoSpy";
import { ClassWithOneMethod } from "../mock/oneMethod";
import { FameworkSpyFactory } from "../../src/framework/fameworkSpyFactory";
import { ClassWithMultipleMethod } from "../mock/multipleMethod";
import { ClassWithProperties } from "../mock/withProperties";

describe('createSpy', () => {
    describe('when creating for one method class', () => {
        let spyClass: FrameworkAutoSpy<ClassWithOneMethod>;

        beforeEach(() => {
            spyClass = FameworkSpyFactory.forClass(ClassWithOneMethod);
        });

        it('should contain the method', () => {
            expect(spyClass.method).toBeDefined();
        });

        it('should have a spy', () => {
            expect(spyClass.method.spyName).toBe("method");
        });
    });

    describe('when creating for multiple method class', () => {
        let spyClass: FrameworkAutoSpy<ClassWithMultipleMethod>;

        beforeEach(() => {
            spyClass = FameworkSpyFactory.forClass(ClassWithMultipleMethod);
        });

        it('should contain the methods', () => {
            expect(spyClass.method).toBeDefined();
            expect(spyClass.method2).toBeDefined();
            expect(spyClass.method3).toBeDefined();
        });

        it('should have all the spies', () => {
            expect(spyClass.method.spyName).toBe("method");
            expect(spyClass.method2.spyName).toBe("method2");
            expect(spyClass.method3.spyName).toBe("method3");
        });
    });

    describe('when creating for a class with properties', () => {
        let spyClass: FrameworkAutoSpy<ClassWithProperties>;

        beforeEach(() => {
            spyClass = FameworkSpyFactory.forClass(ClassWithProperties);
        });

        it('should contain the method', () => {
            expect(spyClass.method).toBeDefined();
        });

        it('should not contain the properties', () => {
            expect(spyClass.property).toBeUndefined();
            expect(spyClass.property2).toBeUndefined();
            spyClass.property = "test";
            expect(spyClass.property).toBe("test");
            spyClass.property2 = 2;
            expect(spyClass.property2).toBe(2);
        });

        it('should have all the spies', () => {
            expect(spyClass.method.spyName).toBe("method");
        });
    });
});