import { createMock } from 'ts-auto-mock';

describe('when assigned directly from a functionMethod', () => {
  describe('return number', () => {
    class MyClass {
      // eslint-disable-next-line
      public value = () => 2;
    }

    it('should return the number', () => {
      const properties: MyClass = createMock<MyClass>();
      expect(properties.value()).toBe(2);
    });
  });

  describe('return string', () => {
    class MyClass {
      // eslint-disable-next-line
      public value = function () {
        return 'valueString';
      };
    }

    it('should set the value', () => {
      const properties: MyClass = createMock<MyClass>();
      expect(properties.value()).toBe('valueString');
    });
  });

  describe('return false', () => {
    class MyClass {
      // eslint-disable-next-line
      public value = () => false;
    }

    it('should set the value', () => {
      const properties: MyClass = createMock<MyClass>();
      expect(properties.value()).toBe(false);
    });
  });

  describe('return true', () => {
    class MyClass {
      // eslint-disable-next-line
      public value = () => true;
    }

    it('should set the value', () => {
      const properties: MyClass = createMock<MyClass>();
      expect(properties.value()).toBe(true);
    });
  });

  describe('return arrow', () => {
    class MyClass {
      // eslint-disable-next-line
      public method = () => {
        return 's';
      };
    }

    class MyClassWithReturnArrow {
      // eslint-disable-next-line
      public method = () => () => {
        return 's';
      };
    }

    it('should set the function', () => {
      const properties: MyClassWithReturnArrow = createMock<
        MyClassWithReturnArrow
      >();
      expect(properties.method()()).toBe('s');
    });

    it('should set the function', () => {
      const properties: MyClass = createMock<MyClass>();
      expect(properties.method()).toBe('s');
    });
  });

  describe('return expression', () => {
    class MyClass {
      // eslint-disable-next-line
      public method = function () {
        return 's';
      };
    }

    class MyClassWithReturnExpression {
      // eslint-disable-next-line
      public method = function () {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        return function () {
          return 's';
        };
      };
    }

    it('should set the function', () => {
      const properties: MyClass = createMock<MyClass>();
      expect(properties.method()).toBe('s');
    });

    it('should set the function', () => {
      const properties: MyClassWithReturnExpression = createMock<
        MyClassWithReturnExpression
      >();
      expect(properties.method()()).toBe('s');
    });
  });
});
