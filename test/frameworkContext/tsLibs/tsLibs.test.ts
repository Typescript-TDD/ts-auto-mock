import { createMock } from 'ts-auto-mock';
import { method, On } from 'ts-auto-mock/extension';

describe('tsLib', () => {
  it('should return a spy with a name', () => {
    interface Interface {
      a: Function;
    }

    const mock: Interface = createMock<Interface>();
    const spy: jasmine.Spy = On(mock).get(method((x: Interface) => x.a));

    expect(spy.and.identity).toBe('a');

    mock.a();
    expect(mock.a).toHaveBeenCalledWith();
  });
});
