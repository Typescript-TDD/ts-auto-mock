import { createMock } from 'ts-auto-mock';
import { Test } from './declaration';

describe('extends callExpression', () => {
  it('should set all the values from both classes', () => {
    const type: Test = createMock<Test>();
    expect(type.a).toBe(0);
    expect(type.b).toBe('');
  });
});
