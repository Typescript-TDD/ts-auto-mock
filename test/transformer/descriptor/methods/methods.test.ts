import { createMock } from 'ts-auto-mock';

describe('for methods', () => {
  interface InterfaceReturnMethod {
    a: string;
  }

  interface Interface {
    a(): void;
    b(): number;
    c(): string;
    d(): string[];
    e(): InterfaceReturnMethod;
  }

  it('should set the functions', () => {
    const properties: Interface = createMock<Interface>();
    expect(properties.a()).toBeUndefined();
    expect(properties.b()).toBe(0);
    expect(properties.c()).toBe('');
    expect(properties.d()).toEqual([]);
    expect(properties.e().a).toBe('');
  });

  describe('for interface declaration', () => {
    interface InterfaceWithDeclaration {
      method: () => number;
    }

    it('should set the functions', () => {
      const properties: InterfaceWithDeclaration =
        createMock<InterfaceWithDeclaration>();
      expect(properties.method()).toBe(0);
    });
  });

  describe('for interface call signature', () => {
    interface InterfaceWithCallSignature {
      (a: number): number;
      b: string;
    }

    interface InterfaceWithCallSignatureReturn {
      (a: number): InterfaceWithCallSignature;
      b: string;
    }

    it('should set the function and properties', () => {
      const properties: InterfaceWithCallSignature =
        createMock<InterfaceWithCallSignature>();
      expect(properties(2)).toBe(0);
      expect(properties.b).toBe('');
    });

    it('should set the function with return value function', () => {
      const properties: InterfaceWithCallSignatureReturn =
        createMock<InterfaceWithCallSignatureReturn>();
      expect(properties(2)(2)).toBe(0);
      expect(properties(2).b).toBe('');
      expect(properties.b).toBe('');
    });
  });

  describe('for interface call signature with overload', () => {
    interface InterfaceWithCallSignature {
      (a: number): number;
      (a: string): string;
      b: string;
    }

    it('should only consider the first signature declaration', () => {
      const properties: InterfaceWithCallSignature =
        createMock<InterfaceWithCallSignature>();

      expect(properties(2)).toBe(0);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(properties('2')).toBe(0);
      expect(properties.b).toBe('');
    });
  });

  describe('for interface call signature with recursive', () => {
    interface InterfaceWithCallSignature<T> {
      (a: number): InterfaceWithCallSignature<T>;
      b: InterfaceWithCallSignature<T>;
      c: string;
      d: T;
    }

    it('should set the value for same interface with generic', () => {
      const propertiesWithGeneric: InterfaceWithCallSignature<number> =
        createMock<InterfaceWithCallSignature<number>>();
      expect(propertiesWithGeneric(2)(2)(2).b.b.b.d).toBe(0);
    });
  });

  describe('for interface call signature with undeclared return value', () => {
    interface InterfaceWithCallSignature {
      (a: number);
    }

    it('should set the function with undefined return value', () => {
      const properties: InterfaceWithCallSignature =
        createMock<InterfaceWithCallSignature>();
      expect(properties(1)).toBeUndefined();
    });
  });

  describe('for interface construct signature', () => {
    interface InterfaceWithConstructSignature {
      new (a: number): { a: number };
      b: string;
    }

    interface InterfaceWithConstructSignatureReturn {
      new (a: number): InterfaceWithConstructSignature;
      b: string;
    }

    interface InterfaceWithConstructSignatureOverload {
      new (a: number): { a: number };
      new (b: string): { b: string };
      new (): { c: Date };
    }

    it('should set the constructor and properties', () => {
      const properties: InterfaceWithConstructSignature =
        createMock<InterfaceWithConstructSignature>();
      expect(new properties(2).a).toBe(0);
      expect(properties.b).toBe('');
    });

    it('should set the constructor with return value constructor', () => {
      const properties: InterfaceWithConstructSignatureReturn =
        createMock<InterfaceWithConstructSignatureReturn>();
      expect(new new properties(2)(2).a).toBe(0);
      expect(new properties(2).b).toBe('');
      expect(properties.b).toBe('');
    });

    it('should use the first overload if any', () => {
      const properties: InterfaceWithConstructSignatureOverload =
        createMock<InterfaceWithConstructSignatureOverload>();
      // eslint-disable-next-line
      expect((new properties() as any).a).toBe(0);
    });
  });

  describe('for interface construct signature', () => {
    interface InterfaceWithCallSignature {
      new (a: number): { a: number };
      b: string;
    }

    interface InterfaceWithCallSignatureReturn {
      new (a: number): InterfaceWithCallSignature;
      b: string;
    }

    it('should set the constructor and properties', () => {
      const properties: InterfaceWithCallSignature =
        createMock<InterfaceWithCallSignature>();
      expect(new properties(2).a).toBe(0);
      expect(properties.b).toBe('');
    });

    it('should set the constructor with return value constructor', () => {
      const properties: InterfaceWithCallSignatureReturn =
        createMock<InterfaceWithCallSignatureReturn>();
      expect(new new properties(2)(2).a).toBe(0);
      expect(new properties(2).b).toBe('');
      expect(properties.b).toBe('');
    });
  });

  describe('for declaration', () => {
    class MyClass {
      public method(): number {
        return 2;
      }
    }

    it('should set the functions', () => {
      const properties: MyClass = createMock<MyClass>();
      expect(properties.method()).toBe(0);
    });
  });

  describe('for undeclared return value', () => {
    class MyClass {
      // eslint-disable-next-line
      public method() {
        return 2;
      }
    }

    it('should infer the return value from return statement', () => {
      const properties: MyClass = createMock<MyClass>();
      expect(properties.method()).toBe(2);
    });
  });

  describe('for a type function', () => {
    type Fn = () => string;
    it('should set the functions', () => {
      const properties: Fn = createMock<Fn>();
      expect(properties()).toBe('');
    });
  });

  describe('for an interface without return value', () => {
    interface InterfaceWithoutReturnValue {
      method();
    }

    it('should return null', () => {
      const a: InterfaceWithoutReturnValue =
        createMock<InterfaceWithoutReturnValue>();

      expect(a.method()).toBeNull();
    });
  });
});
