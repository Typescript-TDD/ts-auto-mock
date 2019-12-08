import { createMock } from 'ts-auto-mock';
import { MyEnum } from '../../../playground/enums';
import { ImportInterface } from '../utils/interfaces/importInterface';
import {
  ExportedClass,
  ExportedDeclaredClass,
  exportedDeclaredFunction, ExportedEnum,
  exportedFunction, WrapExportedClass, WrapExportedEnum,
} from '../utils/typeQuery/typeQueryUtils';

declare function functionDeclaration(): number;

describe('typeQuery', () => {
  describe('for function', () => {
    it('should assign the function mock for a function declaration', () => {
      const functionMock: typeof functionDeclaration = createMock<typeof functionDeclaration>();

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
      const functionMock: typeof exportedDeclaredFunction = createMock<typeof exportedDeclaredFunction>();

      expect(functionMock()).toEqual('');
    });

    it('should assign the function mock for an imported function declaration with body', () => {
      const functionMock: typeof exportedFunction = createMock<typeof exportedFunction>();

      expect(functionMock()).toEqual(0);
    });
  });

  describe('for class', () => {
    it('should create a newable class for an imported class declaration', () => {
      const classMock: typeof ExportedDeclaredClass = createMock<typeof ExportedDeclaredClass>();

      expect(new classMock().prop).toEqual('');
    });

    it('should create a newable class for an imported class', () => {
      const classMock: typeof ExportedClass = createMock<typeof ExportedClass>();

      expect(new classMock().prop).toEqual(0);
    });

    it('should create a newable class for an wrapped imported typeof class', () => {
      const classMock: WrapExportedClass = createMock<WrapExportedClass>();

      expect(new classMock().prop).toEqual(0);
    });
  });

  describe('for enum', () => {
    it('should assign the enum to the mock', () => {
      enum Enum {
        A,
        B = 'some'
      }

      const enumMock: typeof Enum = createMock<typeof Enum>();

      expect(enumMock.A).toEqual(0);
      expect(enumMock.B).toEqual('some');
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

    describe('inferred type', () => {
      it('should work for inferred object', () => {
        const aVariable = { prop: 'asd' };

        const mock: typeof aVariable = createMock<typeof aVariable>();

        expect(mock.prop).toEqual('');
      });
      
      it('should work for enum', () => {
        const aVariable = MyEnum;

        const mock: typeof aVariable = createMock<typeof aVariable>();

        expect(mock.A).toEqual(0);
      });
      
      it('should work for function call', () => {
        function test(value) {
          if(value) {
            return { prop: 'asd' };
          }
          
          return { second: 7 };
        }

        const aVariable = test(true);

        const mock: typeof aVariable = createMock<typeof aVariable>();

        expect(mock.prop).toEqual('');
      });
    });
  });
});
