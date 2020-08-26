import { createMock } from 'ts-auto-mock';

describe('intersection', () => {
  describe('recursion interface', () => {
    interface Interface {
      a: Interface & { s: string };
      b: string;
      c: Interface & { s: boolean };
    }

    it('should be able to reference to itself', () => {
      const properties: Interface = createMock<Interface>();
      expect(properties.b).toBe('');
      expect(properties.a.a.a.a.a.a.a.b).toBe('');
      expect(properties.a.c.a.a.c.a.a.c.s).toBe(false);
    });
  });

  describe('recursion types', () => {
    // tslint:disable
    type Test = {
      s: Test & Interface;
    };

    interface Interface {
      a: Test;
      b: number;
    }

    it('should be able to reference to itself', () => {
      const properties: Interface = createMock<Interface>();
      expect(properties.a.s.a.s.a.s.s.a.s.b).toBe(0);
    });
  });

  describe('recursion classes', () => {
    class Test {
      public s: Test & Interface;
    }

    interface Interface {
      a: Test;
      b: number;
    }

    it('should be able to reference to itself', () => {
      const properties: Interface = createMock<Interface>();
      expect(properties.a.s.a.s.a.s.s.a.s.b).toBe(0);
    });
  });
});
