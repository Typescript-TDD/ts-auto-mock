import { createMock } from 'ts-auto-mock';

describe('Overloads interface', () => {
  describe('for construct signature', () => {
    interface InterfaceWithConstructSignatureOverload {
      new (a: number): { a: number };
      new (b: string): { b: string };
      new (): { c: Date };
    }

    it('should use the correct signature as requested by input', () => {
      const properties: InterfaceWithConstructSignatureOverload = createMock<InterfaceWithConstructSignatureOverload>();

      expect(typeof (new properties(0)).a).toBe('number');
      expect(typeof (new properties('')).b).toBe('string');
      expect((new properties()).c).toBeInstanceOf(Date);
    });

    it('should (re-)use the same constructor on a per-signature basis', () => {
      const properties: InterfaceWithConstructSignatureOverload = createMock<InterfaceWithConstructSignatureOverload>();

      const firstInstance: { a: number } = new properties(0);
      const secondInstance: { a: number } = new properties(0);
      const thirdInstance: { b: string } = new properties('');

      expect(firstInstance.constructor).toBe(secondInstance.constructor);
      expect(secondInstance.constructor).not.toBe(thirdInstance.constructor);
    });
  });

  describe('call signature', () => {
    interface InterfaceWithCallSignature {
      (a: number): number;
      (a: string): string;
      b: string;
    }

    it('should consider all signature declarations and properties', () => {
      const properties: InterfaceWithCallSignature = createMock<InterfaceWithCallSignature>();

      expect(typeof properties.b).toBe('string');
      expect(typeof properties(2)).toBe('number');
      expect(typeof properties('2')).toBe('string');
    });
  });
});
