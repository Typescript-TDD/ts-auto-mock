import { createMock } from 'ts-auto-mock';
import { method, On } from 'ts-auto-mock/extension';

describe('functions', () => {
  let mock: a;
    type a = () => void;

    beforeEach(() => {
      mock = createMock<a>();
    });

    it('should work as a spy', () => {
      function hello(myMethod: a): void {
        myMethod();
      }

      hello(mock);
      expect(mock).toHaveBeenCalled();
    });

    it('should not be able to get the mock', () => {
      expect(() => {
        On(mock).get(method((x: a) => x.apply));
      }).toThrow();
    });

    it('should create different factories for different functions mock', () => {
      interface AMock {
        first: Function;
        second: Function;
      }

      const anotherMock: AMock = createMock<AMock>();

      expect((anotherMock.first as jasmine.Spy).and.identity).toBe('first');
      expect((anotherMock.second as jasmine.Spy).and.identity).toBe('second');
    });
});
