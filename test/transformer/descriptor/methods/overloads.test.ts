import { createMock } from 'ts-auto-mock';

import {
  exportedDeclaredOverloadedFunction,
  // ExportedDeclaredClass,
} from '../utils/typeQuery/typeQueryUtils';

describe('for overloads', () => {

  describe('for type query', () => {

    it('should assign the correct function mock for literal inputs', () => {
      const functionMock: typeof exportedDeclaredOverloadedFunction = createMock<typeof exportedDeclaredOverloadedFunction>();

      // eslint-disable-next-line
      const expectations = [
        ['', 0, false],
        [false, '', 0],
        [0, false, ''],
        [false, false, false],
        [''],
        [false],
        [0],
      ];

      for (const args of expectations) {
        // eslint-disable-next-line
        const [first] = args;

        // @ts-ignore
        expect(functionMock(...args)).toEqual(first);
      }
    });

    // FIXME: Support more than just literals
    // it('should assign the correct function mock for mockable inputs', () => {
    //   const classMock: typeof ExportedDeclaredClass = createMock<typeof ExportedDeclaredClass>();

    //   const functionMock: typeof exportedDeclaredOverloadedFunction = createMock<typeof exportedDeclaredOverloadedFunction>();

    //   expect(functionMock(new classMock())).toBeInstanceOf(ExportedDeclaredClass);
    // });

  });

  describe('for interface', () => {
    describe('for construct signature', () => {
      interface InterfaceWithConstructSignatureOverload {
        new (a: number): { a: number };
        new (b: string): { b: string };
        new (): { c: Date };
      }

      it('should use the correct signature as requested by input', () => {
        const properties: InterfaceWithConstructSignatureOverload = createMock<InterfaceWithConstructSignatureOverload>();
        expect((new properties(0)).a).toBe(0);
        expect((new properties('')).b).toBe('');
        // FIXME: Enable after Date PR
        // expect((new properties()).c).toBeInstanceOf(Date);
      });
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
      expect(properties(2)).toBe(0);
      expect(properties('2')).toBe('');
      expect(properties.b).toBe('');
    });
  });

});
