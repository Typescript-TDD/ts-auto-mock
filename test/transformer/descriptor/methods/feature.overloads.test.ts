import { createMock } from 'ts-auto-mock';

import {
  exportedDeclaredOverloadedFunction,
  ExportedDeclaredClass,
} from '../utils/typeQuery/typeQueryUtils';

const isFeatureEnabled: boolean = process.env.FEATURE === 'transformOverloads';

describe('feature', () => {

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
          expect(functionMock(...args)).toEqual(isFeatureEnabled ? first : false);
        }
      });

      it('should assign the correct function mock for mockable inputs', () => {
        const classMock: typeof ExportedDeclaredClass = createMock<typeof ExportedDeclaredClass>();

        const functionMock: typeof exportedDeclaredOverloadedFunction = createMock<typeof exportedDeclaredOverloadedFunction>();

        if (isFeatureEnabled) {
          expect(functionMock(new classMock()).prop).toBe(0);
        } else {
          expect(functionMock(new classMock()).prop).toBeUndefined();
        }
      });

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

          if (isFeatureEnabled) {
            expect((new properties('')).b).toBe('');
            expect((new properties()).c).toBeInstanceOf(Date);
          } else {
            expect((new properties('')).b).toBeUndefined();
            expect((new properties()).c).toBeUndefined();
          }
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

        expect(properties.b).toBe('');
        expect(properties(2)).toBe(0);

        if (isFeatureEnabled) {
          expect(properties('2')).toBe('');
        } else {
          // @ts-ignore
          expect(properties('2')).toBe(0);
        }
      });
    });

  });
});
