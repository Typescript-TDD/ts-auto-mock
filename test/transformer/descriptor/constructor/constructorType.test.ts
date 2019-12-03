import { createMock } from 'ts-auto-mock';

describe('constructorType', () => {
  describe('of an interface', () => {
    it('should create a concrete newable type of the interface', () => {
      interface Test {
        a: string;
        b: number;
      }

      const mockConstructorType: new () => Test = createMock<new () => Test>();
      const mockInstance: Test = new mockConstructorType();

      expect(mockInstance.a).toEqual('');
      expect(mockInstance.b).toEqual(0);
    });
    
    it('should not create a singleton newable type of the interface', () => {
      interface Test {
        a: string;
        b: number;
      }

      const mockConstructorType: new () => Test = createMock<new () => Test>();
      const mockInstance1: Test = new mockConstructorType();
      const mockInstance2: Test = new mockConstructorType();
      const mockInstance3: Test = new mockConstructorType();
      
      mockInstance1.a = 'test1';
      mockInstance2.a = 'test2';
      mockInstance3.a = 'test3';

      expect(mockInstance1.a).toEqual('test1');
      expect(mockInstance2.a).toEqual('test2');
      expect(mockInstance3.a).toEqual('test3');
    });
  });
  
  describe('of a class', () => {
    it('should create a concrete newable type of the class', () => {
      class Test {
        a: string;
        b: number;
      }

      const mockConstructorType: new () => Test = createMock<new () => Test>();
      const mockInstance: Test = new mockConstructorType();

      expect(mockInstance.a).toEqual('');
      expect(mockInstance.b).toEqual(0);
    });
  });

  describe('in a property', () => {
    it('should create a concrete newable type in the property', () => {
      interface Test {
        a: string;
        b: number;
        c: new () => Test;
      }

      const mock: Test = createMock<Test>();
      const instance: Test = new mock.c();

      expect(instance.a).toEqual('');
      expect(instance.b).toEqual(0);
    });
  });

  describe('in a method', () => {
    it('should create a concrete newable type as a method returned value', () => {
      interface Test {
        a: string;
        b: number;
        c(): new () => Test;
      }

      const mock: Test = createMock<Test>();
      const instance: Test = new (mock.c())();

      expect(instance.a).toEqual('');
      expect(instance.b).toEqual(0);
    });
  });

  describe('from a type', () => {
    it('should create a concrete newable type', () => {
      interface Test {
        a: string;
        b: number;
      }

      type TestType = new () => Test;

      const mockType: TestType = createMock<TestType>();
      const instance: Test = new mockType();

      expect(instance.a).toEqual('');
      expect(instance.b).toEqual(0);
    });
  });
});
