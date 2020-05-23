import { createMock } from 'ts-auto-mock';

describe('Random string', () => {
  it('should return a random string value with the property name and 6 character', () => {
    interface WithString {
      prop: string;
    }

    const mock: WithString = createMock<WithString>();

    expect(mock.prop).toMatch(/prop.{6}/);
  });

  it('should include the property name at the beginning of the value', () => {
    interface WithString {
      propertyName: string;
    }

    const mock: WithString = createMock<WithString>();

    expect(mock.propertyName).toMatch(/propertyName.*/);
  });

  it('should include the function name when the string is the result of the function', () => {
    type WithString = {
      fnReturnsString: () => string;
    };

    const mock: WithString = createMock<WithString>();

    expect(mock.fnReturnsString()).toMatch(/fnReturnsString.*/);
  });
});
