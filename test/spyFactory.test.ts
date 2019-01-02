import { ClassWithOneMethod } from "./mock/oneMethod";
import { Spy } from "../src/spy/spy";
import { SpyFactory } from "../src/spy/spyFactory";
import { ClassWithMultipleMethod } from "./mock/multipleMethod";
import { ClassWithProperties } from "./mock/withProperties";

describe('createSpy', () => {
    describe('when creating for one method class', () => {
        let spyClass: Spy<ClassWithOneMethod>;

        beforeEach(() => {
            spyClass = SpyFactory.forClass(ClassWithOneMethod);
        });

        it('should contain the method', () => {
          expect(spyClass.method).toBeDefined();
        });

        it('should have a spy', () => {
          spyClass.method();
          expect(spyClass.method).toHaveBeenCalledWith();
        });
    });

    describe('when creating for multiple method class', () => {
        let spyClass: Spy<ClassWithMultipleMethod>;

        beforeEach(() => {
            spyClass = SpyFactory.forClass(ClassWithMultipleMethod);
        });

        it('should contain the methods', () => {
            expect(spyClass.method).toBeDefined();
            expect(spyClass.method2).toBeDefined();
            expect(spyClass.method3).toBeDefined();
        });

        it('should have all the spies', () => {
            spyClass.method();
            expect(spyClass.method).toHaveBeenCalledWith();
            expect(spyClass.method2).not.toHaveBeenCalled();
            spyClass.method2();
            expect(spyClass.method2).toHaveBeenCalledWith();
            spyClass.method3();
            expect(spyClass.method3).toHaveBeenCalledWith();
        });
    });

    describe('when creating for a class with properties', () => {
        let spyClass: Spy<ClassWithProperties>;

        beforeEach(() => {

            spyClass = SpyFactory.forClass(ClassWithProperties);
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
            spyClass.method();
            expect(spyClass.method).toHaveBeenCalledWith();
        });
    });
});