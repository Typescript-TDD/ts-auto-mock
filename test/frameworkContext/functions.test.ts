import { createMock } from 'ts-auto-mock';
import { method, On } from 'ts-auto-mock/extension';

describe('functions', () => {
  let mock: A;
  type A = () => void;

  beforeEach(() => {
    mock = createMock<A>();
  });

  it('should work as a spy', () => {
    function hello(myMethod: A): void {
      myMethod();
    }

    hello(mock);
    expect(mock).toHaveBeenCalled();
  });

  it('should not be able to get the mock', () => {
    expect(() => {
      On(mock).get(method((x: A) => x.apply));
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
