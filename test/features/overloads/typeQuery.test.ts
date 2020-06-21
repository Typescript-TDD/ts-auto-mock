import { createMock } from 'ts-auto-mock';

import {
  exportedDeclaredOverloadedFunction,
  ExportedDeclaredClass,
} from '../../transformer/descriptor/utils/typeQuery/typeQueryUtils';

describe('Overloads type query', () => {

  it('should assign the correct function mock for literal inputs', () => {
    const functionMock: typeof exportedDeclaredOverloadedFunction = createMock<typeof exportedDeclaredOverloadedFunction>();

    expect(functionMock('', 0, false)).toMatch(/.{6}$/);
    expect(typeof functionMock(false, '', 0)).toBe('boolean');
    expect(typeof functionMock(0, false, '')).toBe('number');
    expect(typeof functionMock(false, false, false)).toBe('boolean');
    expect(functionMock('')).toMatch(/.{6}$/);
    expect(typeof functionMock(false)).toBe('boolean');
    expect(typeof functionMock(0)).toBe('number');
  });

  it('should assign the correct function mock for mockable inputs', () => {
    const classMock: typeof ExportedDeclaredClass = createMock<typeof ExportedDeclaredClass>();

    const functionMock: typeof exportedDeclaredOverloadedFunction = createMock<typeof exportedDeclaredOverloadedFunction>();

    expect(typeof functionMock(new classMock()).prop).toBe('number');
  });

});
