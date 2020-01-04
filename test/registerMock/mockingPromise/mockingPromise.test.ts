import { createMock } from 'ts-auto-mock';
import { FakePromise } from '../fakePromise';

describe('mocking the registered promise', () => {
  describe('when doing it in intersection', () => {
    it('should not interfere', () => {
      type A = {} & Promise<string>;
      const intersectionMock: A = createMock<A>();
      const actualPromiseMock: Promise<string> = createMock<Promise<string>>();
      
      expect(intersectionMock.then).toBeUndefined();
      expect(actualPromiseMock.then).not.toBeUndefined();
      expect(actualPromiseMock.constructor).toBe(FakePromise);
    });
  });
  
  describe('when doing it in intersection with generic', () => {
    it('should not interfere', () => {
      type A<T> = {} & Promise<T>;

      const intersectionMock: A<number> = createMock<A<number>>();
      const actualPromiseMock: Promise<number> = createMock<Promise<number>>();

      expect(intersectionMock.then).toBeUndefined();
      expect(actualPromiseMock.then).not.toBeUndefined();
      expect(actualPromiseMock.constructor).toBe(FakePromise);
    });
  });
  
  describe('when doing it in type alias', () => {
    it('should use the registered mock for simple assignment', () => {
      type A<T> = Promise<T>;

      const typeAliasMock: A<number> = createMock<A<number>>();
      const actualPromiseMock: Promise<number> = createMock<Promise<number>>();

      expect(typeAliasMock.then).not.toBeUndefined();
      expect(typeAliasMock.constructor).toBe(FakePromise);
      expect(actualPromiseMock.then).not.toBeUndefined();
      expect(actualPromiseMock.constructor).toBe(FakePromise);
    });
    
    it('should use the registered mock for deep assignment', () => {
      type A<T> = Promise<T>;
      type B<T> = A<T>;

      const typeAliasMock: B<number> = createMock<B<number>>();
      const actualPromiseMock: Promise<number> = createMock<Promise<number>>();

      expect(typeAliasMock.then).not.toBeUndefined();
      expect(typeAliasMock.constructor).toBe(FakePromise);
      expect(actualPromiseMock.then).not.toBeUndefined();
      expect(actualPromiseMock.constructor).toBe(FakePromise);
    });
  });

  describe('when doing it in an interface', () => {
    it('should not interfere for an extension', () => {
      interface A extends Promise<string> {

      }

      const interfaceMock: A = createMock<A>();
      const actualPromiseMock: Promise<number> = createMock<Promise<number>>();

      expect(interfaceMock.then).toBeUndefined();
      expect(actualPromiseMock.then).not.toBeUndefined();
      expect(actualPromiseMock.constructor).toBe(FakePromise);
    });

    it('should not interfere for an extension with generics', () => {
      interface A<T> extends Promise<T> {

      }

      const interfaceMock: A<string> = createMock<A<string>>();
      const actualPromiseMock: Promise<number> = createMock<Promise<number>>();

      expect(interfaceMock.then).toBeUndefined();
      expect(actualPromiseMock.then).not.toBeUndefined();
      expect(actualPromiseMock.constructor).toBe(FakePromise);
    });

    it('should use the registered mock in a property', () => {
      interface A<T> {
        prop: Promise<T>;
      }

      const interfaceMock: A<string> = createMock<A<string>>();
      const actualPromiseMock: Promise<number> = createMock<Promise<number>>();

      expect(interfaceMock.prop.then).not.toBeUndefined();
      expect(interfaceMock.prop.constructor).toBe(FakePromise);
      expect(actualPromiseMock.then).not.toBeUndefined();
      expect(actualPromiseMock.constructor).toBe(FakePromise);
    });
  });
});
