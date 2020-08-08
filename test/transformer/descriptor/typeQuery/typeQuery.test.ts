import { createMock } from 'ts-auto-mock';
import * as STAR_DEFAULT from '../utils/interfaces/exportDefaultDeclaration';
import { ImportInterface } from '../utils/interfaces/importInterface';
import * as STAR from '../utils/typeQuery/typeQueryUtils';
import {
  ExportedClass,
  ExportedDeclaredClass,
  exportedDeclaredFunction,
  ExportedEnum,
  exportedFunction,
  WrapExportedClass,
  WrapExportedEnum,
} from '../utils/typeQuery/typeQueryUtils';
import REQUIRE_DEFAULT = require('../utils/interfaces/exportDefaultDeclaration');
import REQUIRE_EQUAL = require('../utils/interfaces/exportEqualObject');
import REQUIRE = require('../utils/typeQuery/typeQueryUtils');

declare function functionDeclaration(): number;

describe('typeQuery', () => {
  describe('for function', () => {
    it('should assign the function mock for a function declaration', () => {
      const functionMock: typeof functionDeclaration = createMock<
        typeof functionDeclaration
      >();

      expect(functionMock()).toEqual(0);
    });

    it('should assign the function mock for an function declaration with body', () => {
      function func(): string {
        return 'ok';
      }

      const functionMock: typeof func = createMock<typeof func>();

      expect(functionMock()).toEqual('');
    });

    it('should assign the function mock for an imported function declaration', () => {
      const functionMock: typeof exportedDeclaredFunction = createMock<
        typeof exportedDeclaredFunction
      >();

      expect(functionMock()).toEqual('');
    });

    it('should assign the function mock for an imported function declaration with body', () => {
      const functionMock: typeof exportedFunction = createMock<
        typeof exportedFunction
      >();

      expect(functionMock()).toEqual(0);
    });

    it('should return undefined for an intersection', () => {
      function func(): string {
        return 'ok';
      }

      type Intersection = {} & typeof func;

      const functionMock: Intersection = createMock<Intersection>();

      expect(functionMock).toBeUndefined();
    });

    it('should return correct properties with multiple declarations', () => {
      function MultipleDeclaration(): MultipleDeclaration {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return { a: 's' };
      }

      interface MultipleDeclaration {
        b: string;
      }

      const functionMock: typeof MultipleDeclaration = createMock<
        typeof MultipleDeclaration
      >();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(functionMock()).toEqual({
        b: '',
      });
    });
  });

  describe('for class', () => {
    it('should create a newable class for a class declaration in file', () => {
      class MyClass {
        public prop: string;
      }

      const classMock: typeof MyClass = createMock<typeof MyClass>();

      expect(new classMock().prop).toEqual('');
    });

    it('should create a newable class for an imported class declaration', () => {
      const classMock: typeof ExportedDeclaredClass = createMock<
        typeof ExportedDeclaredClass
      >();

      expect(new classMock().prop).toEqual('');
    });

    it('should create a newable class for an imported class', () => {
      const classMock: typeof ExportedClass = createMock<
        typeof ExportedClass
      >();

      expect(new classMock().prop).toEqual(0);
    });

    it('should create a newable class for an wrapped imported typeof class', () => {
      const classMock: WrapExportedClass = createMock<WrapExportedClass>();

      expect(new classMock().prop).toEqual(0);
    });

    it('should return undefined for an intersection', () => {
      type Intersection = {} & WrapExportedClass;

      const functionMock: Intersection = createMock<Intersection>();

      expect(functionMock).toBeUndefined();
    });
  });

  describe('for enum', () => {
    it('should assign the enum to the mock', () => {
      enum Enum {
        A,
        B = 'some',
      }

      const enumMock: typeof Enum = createMock<typeof Enum>();

      expect(enumMock.A).toEqual(Enum.A);
      expect(enumMock.B).toEqual(Enum.B);
    });

    it('should assign the imported enum to the mock', () => {
      const enumMock: typeof ExportedEnum = createMock<typeof ExportedEnum>();

      expect(enumMock.A).toEqual(0);
      expect(enumMock.B).toEqual('B');
      expect(enumMock.C).toEqual('MaybeC');
    });

    it('should assign the imported enum to the mock when typeof wrapped in a type', () => {
      type WrapEnum = typeof ExportedEnum;

      const enumMock: WrapEnum = createMock<WrapEnum>();

      expect(enumMock.A).toEqual(0);
      expect(enumMock.B).toEqual('B');
      expect(enumMock.C).toEqual('MaybeC');
    });

    it('should assign the enum to the mock when importing enum wrapper', () => {
      const enumMock: WrapExportedEnum = createMock<WrapExportedEnum>();

      expect(enumMock.A).toEqual(0);
      expect(enumMock.B).toEqual('B');
      expect(enumMock.C).toEqual('MaybeC');
    });

    it('should return undefined for an intersection', () => {
      type Intersection = {} & WrapExportedEnum;

      const functionMock: Intersection = createMock<Intersection>();

      expect(functionMock).toBeUndefined();
    });
  });

  describe('for variable', () => {
    it('should create the imported interface mock from the type of a variable', () => {
      let aVariable: ImportInterface;

      const mock: typeof aVariable = createMock<typeof aVariable>();

      expect(mock.a.b).toEqual('');
    });

    it('should create the imported typeof enum mock from the type of a variable', () => {
      let aVariable: WrapExportedEnum;

      const mock: typeof aVariable = createMock<typeof aVariable>();

      expect(mock.A).toEqual(0);
    });

    it('should work for a method in an object', () => {
      const aVariable: {
        a(): string;
      } = {
        a(): string {
          return 'wow';
        },
      };

      const mock: typeof aVariable.a = createMock<typeof aVariable.a>();

      expect(mock()).toEqual('');
    });

    it('should return undefined for an intersection', () => {
      let aVariable: WrapExportedEnum;

      type Intersection = {} & typeof aVariable;

      const functionMock: Intersection = createMock<Intersection>();

      expect(functionMock).toBeUndefined();
    });

    describe('import star', () => {
      it('should mock every materialisable export (no types or interfaces)', () => {
        const mock: typeof STAR = createMock<typeof STAR>();

        expect(mock.ExportedEnum.A).toBe(ExportedEnum.A);
        expect(new mock.ExportedClass().prop).toEqual(0);
        expect(new mock.ExportedDeclaredClass().prop).toEqual('');
        expect(mock.exportedDeclaredFunction()).toEqual('');
      });

      it('should mock the default', () => {
        const mock: typeof STAR_DEFAULT = createMock<typeof STAR_DEFAULT>();

        expect(mock.functionDefault('input')).toBe(false);
        expect(mock.default('input')).toBe(false);
        expect(mock.functionNotDefault('input')).toBe(false);
      });
    });

    describe('import require', () => {
      it('should mock every materialisable export (no types or interfaces)', () => {
        const mock: typeof REQUIRE = createMock<typeof REQUIRE>();

        expect(mock.ExportedEnum.A).toBe(ExportedEnum.A);
        expect(new mock.ExportedClass().prop).toEqual(0);
        expect(new mock.ExportedDeclaredClass().prop).toEqual('');
        expect(mock.exportedDeclaredFunction()).toEqual('');
      });

      it('should mock the default', () => {
        const mock: typeof REQUIRE_DEFAULT = createMock<
          typeof REQUIRE_DEFAULT
        >();

        expect(mock.functionDefault('input')).toBe(false);
        expect(mock.default('input')).toBe(false);
        expect(mock.functionNotDefault('input')).toBe(false);
      });

      it('should mock the `export =`', () => {
        const mock: typeof REQUIRE_EQUAL = createMock<typeof REQUIRE_EQUAL>();

        expect(new mock().prop).toBe(0);
      });
    });

    describe('inferred type', () => {
      it('should work for inferred object', () => {
        // eslint-disable-next-line @typescript-eslint/typedef
        const aVariable = { prop: 'asd' };

        const mock: typeof aVariable = createMock<typeof aVariable>();

        expect(mock.prop).toEqual('asd');
      });

      it('should work for enum', () => {
        // eslint-disable-next-line @typescript-eslint/typedef
        const aVariable = ExportedEnum;

        const mock: typeof aVariable = createMock<typeof aVariable>();

        expect(mock.A).toEqual(0);
      });

      it('should work for function call of a variable with no explicit return type of function', () => {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/typedef
        const testExplicitType: (value: boolean) => { prop: string } = (
          value: boolean
        ) => {
          if (value) {
            return { prop: 'asd' };
          }

          return { prop: 'wooo' };
        };

        // eslint-disable-next-line @typescript-eslint/typedef
        const aVariable = testExplicitType(true);

        const mock: typeof aVariable = createMock<typeof aVariable>();

        expect(mock.prop).toEqual('');
      });

      it('should work for function call of a variable with no explicit type', () => {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/typedef
        const test = (value: boolean): { prop: string } => {
          if (value) {
            return { prop: 'asd' };
          }

          return { prop: 'wooo' };
        };

        // eslint-disable-next-line @typescript-eslint/typedef
        const aVariable = test(true);

        const mock: typeof aVariable = createMock<typeof aVariable>();

        expect(mock.prop).toEqual('');
      });

      it('should work for function call of a variable with no explicit type and no explicit return type of function', () => {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/typedef
        const test = (value: boolean) => {
          if (value) {
            return { prop: 'asd' };
          }

          return { prop: 'wooo' };
        };

        // eslint-disable-next-line @typescript-eslint/typedef
        const aVariable = test(true);

        const mock: typeof aVariable = createMock<typeof aVariable>();

        expect(mock.prop).toEqual('wooo');
      });

      it('should work for function call', () => {
        function test(value: boolean): { prop: string } {
          if (value) {
            return { prop: 'asd' };
          }

          return { prop: 'wooo' };
        }

        // eslint-disable-next-line @typescript-eslint/typedef
        const aVariable = test(true);

        const mock: typeof aVariable = createMock<typeof aVariable>();

        expect(mock.prop).toEqual('');
      });

      it('should work for function call of a function with no explicit return type', () => {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        function test(value: boolean) {
          if (value) {
            return { prop: 'asd' };
          }

          return { second: 7 };
        }

        // eslint-disable-next-line @typescript-eslint/typedef
        const aVariable = test(true);

        const mock: typeof aVariable = createMock<typeof aVariable>();

        expect(mock.second).toEqual(7);
      });

      it('should not call the real function to get the type for function call', () => {
        let count: number = 0;

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        function test(value: boolean) {
          count++;

          if (value) {
            return { prop: 'asd' };
          }

          return { second: 7 };
        }

        // eslint-disable-next-line @typescript-eslint/typedef
        const aVariable = test(true);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const mock: typeof aVariable = createMock<typeof aVariable>();

        expect(count).toEqual(1);
      });

      it('should work for module', () => {
        // eslint-disable-next-line @typescript-eslint/typedef
        const aVariable = STAR;

        const mock: typeof aVariable = createMock<typeof aVariable>();

        expect(mock.ExportedEnum.A).toEqual(ExportedEnum.A);
      });
    });
  });
});
