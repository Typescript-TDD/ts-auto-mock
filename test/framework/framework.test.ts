import { keys } from 'ts-transformer-keys';

beforeEach(() => {
    interface Test2 {
        s: number;
    }

    type TestFunction = () => void
    type TestFunction2 = () => void | void

    interface Test {
        property: string;
        a: () => void;
        // a2: () => Test2;
        a3: () => () => void;
        // a4: () => TestFunction;
        // a5: () => TestFunction2;
        a6: () => string;
        a7: () => number;
        a8: () => boolean;
        a9: number;
        a10: boolean;
        a11: any;
    }

    const keysOfProps = keys<Test>();

    console.log(keysOfProps);
});

describe('createSpy', () => {

    it('should work', () => {
      expect(1).toBe(1);
    });
    // describe('when creating for one method class', () => {
    //     let spyClass: FrameworkAutoSpy<ClassWithOneMethod>;
    //
    //     beforeEach(() => {
    //         spyClass = FameworkSpyFactory.forClass(ClassWithOneMethod);
    //     });
    //
    //     it('should contain the method', () => {
    //         expect(spyClass.method).toBeDefined();
    //     });
    //
    //     it('should have a spy', () => {
    //         expect(spyClass.method.spyName).toBe("method");
    //     });
    // });
    //
    // describe('when creating for multiple method class', () => {
    //     let spyClass: FrameworkAutoSpy<ClassWithMultipleMethod>;
    //
    //     beforeEach(() => {
    //         spyClass = FameworkSpyFactory.forClass(ClassWithMultipleMethod);
    //     });
    //
    //     it('should contain the methods', () => {
    //         expect(spyClass.method).toBeDefined();
    //         expect(spyClass.method2).toBeDefined();
    //         expect(spyClass.method3).toBeDefined();
    //     });
    //
    //     it('should have all the spies', () => {
    //         expect(spyClass.method.spyName).toBe("method");
    //         expect(spyClass.method2.spyName).toBe("method2");
    //         expect(spyClass.method3.spyName).toBe("method3");
    //     });
    // });
    //
    // describe('when creating for a class with properties', () => {
    //     let spyClass: FrameworkAutoSpy<ClassWithProperties>;
    //
    //     beforeEach(() => {
    //         spyClass = FameworkSpyFactory.forClass(ClassWithProperties);
    //     });
    //
    //     it('should contain the method', () => {
    //         expect(spyClass.method).toBeDefined();
    //     });
    //
    //     it('should not contain the properties', () => {
    //         expect(spyClass.property).toBeUndefined();
    //         expect(spyClass.property2).toBeUndefined();
    //         spyClass.property = "test";
    //         expect(spyClass.property).toBe("test");
    //         spyClass.property2 = 2;
    //         expect(spyClass.property2).toBe(2);
    //     });
    //
    //     it('should have all the spies', () => {
    //         expect(spyClass.method.spyName).toBe("method");
    //     });
    // });
});