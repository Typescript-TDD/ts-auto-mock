import { createMock } from 'ts-auto-mock';


describe('properties inferred type', () => {
  function funcReturningNumber(): number {
    return 3;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function funcReturningNumberNoTypeDef() {
    return 3;
  }

  class Test {
    // eslint-disable-next-line @typescript-eslint/typedef
    public test = 2;
    // eslint-disable-next-line @typescript-eslint/typedef
    public testFunctionCall = funcReturningNumber();
    // eslint-disable-next-line @typescript-eslint/typedef
    public testFunctionCallNoTypeDef = funcReturningNumberNoTypeDef();
  }

  it('should infer the correct type for numbers', () => {
    const mock: Test = createMock<Test>();

    expect(mock.test).toBe(2);
  });

  it('should infer the correct type for function calls of functions with type def', () => {
    const mock: Test = createMock<Test>();

    expect(mock.testFunctionCall).toBe(0);
  });

  it('should infer the correct type for function calls of functions with no type def', () => {
    const mock: Test = createMock<Test>();

    expect(mock.testFunctionCallNoTypeDef).toBe(3);
  });
});
