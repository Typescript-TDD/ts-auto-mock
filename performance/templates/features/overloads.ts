import { createMock } from 'ts-auto-mock';
import { overloadedFunction } from '../types/functions';

describe('overloads', () => {
  it('work', () => {
    const properties: typeof overloadedFunction = createMock<typeof overloadedFunction>();
    expect(properties(0)).toBe(0);
    expect(properties('')).toBe('');
    expect(properties(false)).toBe(false);
    expect(properties()).toBeUndefined();
  });
});
