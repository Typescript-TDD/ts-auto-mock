import { createMock } from 'ts-auto-mock';
import { anImportedObject } from '../utils/object/object';

describe('functions without types defined', () => {
  it('should infer basic boolean object literal types', () => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function functionToMock() {
      // eslint-disable-next-line @typescript-eslint/typedef
      const primitiveValue = false;

      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      function whateverFunction() {
        return true;
      }

      return { primitiveValue, whateverFunction };
    }

    const type: typeof functionToMock = createMock<typeof functionToMock>();
    expect(type().primitiveValue).toBe(false);
    expect(type().whateverFunction()).toBe(true);
  });

  it('should infer basic string object literal types', () => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function functionToMock() {
      // eslint-disable-next-line @typescript-eslint/typedef
      const primitiveValue = 'Hello world';

      return { primitiveValue };
    }

    const type: typeof functionToMock = createMock<typeof functionToMock>();
    expect(type().primitiveValue).toBe('Hello world');
  });

  it('should infer basic object literal types', () => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function functionToMock() {
      // eslint-disable-next-line @typescript-eslint/typedef
      const primitiveValue = {
        test: 'hello',
      };

      return { primitiveValue };
    }

    const type: typeof functionToMock = createMock<typeof functionToMock>();
    expect(type().primitiveValue).toEqual({
      test: 'hello',
    });
  });

  it('should use the default behaviour for variables with a type defined', () => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function functionToMock() {
      const primitiveValue: boolean = true;

      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      function whateverFunction() {
        return true;
      }

      return { primitiveValue, whateverFunction };
    }

    const type: typeof functionToMock = createMock<typeof functionToMock>();
    expect(type().primitiveValue).toBe(false);
  });

  it('should use the default behaviour for internal function declarations with a type defined', () => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function functionToMock() {
      const primitiveValue: boolean = true;

      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      function whateverFunction(): boolean {
        return true;
      }

      return { primitiveValue, whateverFunction };
    }

    const type: typeof functionToMock = createMock<typeof functionToMock>();
    expect(type().whateverFunction()).toBe(false);
  });

  it('should use the default behaviour for internal function declarations with a type defined', () => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function functionToMock() {
      const primitiveValue: boolean = true;

      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      function whateverFunction(): boolean {
        return true;
      }

      return { primitiveValue, whateverFunction };
    }

    const type: typeof functionToMock = createMock<typeof functionToMock>();
    expect(type().whateverFunction()).toBe(false);
  });

  it('should infer object literal return types', () => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function functionToMock() {
      return { a: 'hello world', b: 123 };
    }

    const type: typeof functionToMock = createMock<typeof functionToMock>();
    expect(type()).toEqual({
      a: 'hello world',
      b: 123,
    });
  });

  it('should infer variables outside the function', () => {
    // eslint-disable-next-line @typescript-eslint/typedef
    const anObject = { a: 'hello world', b: 123 };
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function functionToMock() {
      return anObject;
    }

    const type: typeof functionToMock = createMock<typeof functionToMock>();
    expect(type()).toEqual({
      a: 'hello world',
      b: 123,
    });
  });

  it('should infer variables from a different file', () => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function functionToMock() {
      return anImportedObject;
    }

    const type: typeof functionToMock = createMock<typeof functionToMock>();
    expect(type()).toEqual({
      a: 'hello world',
      b: 123,
    });
  });

  it('should infer a spread object', () => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function functionToMock() {
      return {
        ...anImportedObject,
      };
    }

    const type: typeof functionToMock = createMock<typeof functionToMock>();
    expect(type()).toEqual({
      a: 'hello world',
      b: 123,
    });
  });

  it('should set null when a parameter has not type', () => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function functionToMock(param) {
      return {
        param,
      };
    }

    const type: typeof functionToMock = createMock<typeof functionToMock>();
    expect(
      type({
        test: 'hello',
      })
    ).toEqual({
      param: null,
    });
  });

  it('should be able to infer parameter types', () => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function functionToMock(param: string) {
      return {
        param,
      };
    }

    const type: typeof functionToMock = createMock<typeof functionToMock>();
    expect(type('hello')).toEqual({
      param: '',
    });
  });
});
